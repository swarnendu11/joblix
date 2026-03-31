"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const stripe_1 = __importDefault(require("stripe"));
const auth_1 = require("../lib/auth");
const prisma_1 = __importDefault(require("../lib/prisma"));
const users_1 = require("../lib/users");
const router = (0, express_1.Router)();
const MOCK_SESSION_ID = 'mock_session';
function hasConfiguredValue(value) {
    return Boolean(value && value.trim() && !value.includes('REPLACE'));
}
function getFrontendUrl() {
    return process.env.FRONTEND_URL || 'http://localhost:3000';
}
function getStripeClient() {
    if (!hasConfiguredValue(process.env.STRIPE_SECRET_KEY)) {
        return null;
    }
    return new stripe_1.default(process.env.STRIPE_SECRET_KEY);
}
async function upgradeUserToPro(clerkUserId, options = {}) {
    const user = await (0, users_1.getCurrentUserOrThrow)(clerkUserId);
    return prisma_1.default.user.update({
        where: { id: user.id },
        data: {
            plan: client_1.Plan.PRO,
            ...(options.customerId !== undefined ? { stripeCustomerId: options.customerId } : {}),
            ...(options.subscriptionId !== undefined ? { subscriptionId: options.subscriptionId } : {}),
        },
    });
}
router.post('/checkout', auth_1.requireAuth, async (req, res) => {
    const clerkUserId = req.auth?.clerkUserId;
    if (!clerkUserId) {
        return res.status(401).json({ error: 'Authentication required' });
    }
    try {
        const user = await (0, users_1.getCurrentUserOrThrow)(clerkUserId);
        const stripe = getStripeClient();
        if (!stripe || !hasConfiguredValue(process.env.STRIPE_PRO_PRICE_ID)) {
            await upgradeUserToPro(clerkUserId);
            return res.json({ url: `${getFrontendUrl()}/success?mock=true` });
        }
        const session = await stripe.checkout.sessions.create({
            // @ts-ignore - automatic_payment_methods is supported in this version of Stripe
            automatic_payment_methods: { enabled: true },
            mode: 'subscription',
            line_items: [
                {
                    price: process.env.STRIPE_PRO_PRICE_ID,
                    quantity: 1,
                },
            ],
            success_url: `${getFrontendUrl()}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${getFrontendUrl()}/pricing`,
            customer_email: user.email ?? undefined,
            metadata: {
                clerkId: clerkUserId,
            },
        });
        return res.json({ url: session.url });
    }
    catch (error) {
        console.error('Checkout error:', error);
        return res.status(500).json({ error: 'Failed to create Stripe checkout session' });
    }
});
router.get('/session/:sessionId', auth_1.requireAuth, async (req, res) => {
    const clerkUserId = req.auth?.clerkUserId;
    const rawSessionId = req.params.sessionId;
    const sessionId = Array.isArray(rawSessionId) ? rawSessionId[0] : rawSessionId;
    if (!clerkUserId) {
        return res.status(401).json({ error: 'Authentication required' });
    }
    if (!sessionId) {
        return res.status(400).json({ error: 'Session ID is required' });
    }
    try {
        if (sessionId === MOCK_SESSION_ID) {
            await upgradeUserToPro(clerkUserId);
            return res.json({ id: sessionId, status: 'complete', paymentStatus: 'paid', mock: true });
        }
        const stripe = getStripeClient();
        if (!stripe) {
            return res.status(503).json({ error: 'Stripe is not configured on the backend' });
        }
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (session.metadata?.clerkId && session.metadata.clerkId !== clerkUserId) {
            return res.status(403).json({ error: 'This checkout session belongs to a different user' });
        }
        if (session.status === 'complete' || session.payment_status === 'paid') {
            const customerId = typeof session.customer === 'string'
                ? session.customer
                : session.customer && !('deleted' in session.customer)
                    ? session.customer.id
                    : null;
            const subscriptionId = typeof session.subscription === 'string' ? session.subscription : session.subscription?.id ?? null;
            await upgradeUserToPro(clerkUserId, { customerId, subscriptionId });
        }
        return res.json({
            id: session.id,
            status: session.status,
            paymentStatus: session.payment_status,
        });
    }
    catch (error) {
        console.error('Session verification error:', error);
        return res.status(500).json({ error: 'Failed to verify checkout session' });
    }
});
router.post('/webhook', async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const verifiedWebhookSecret = hasConfiguredValue(webhookSecret) ? webhookSecret : null;
    const stripe = getStripeClient();
    let event;
    try {
        if (!stripe || !verifiedWebhookSecret) {
            return res.status(200).json({ received: true, skipped: true });
        }
        event = stripe.webhooks.constructEvent(req.body, sig, verifiedWebhookSecret);
    }
    catch (err) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    try {
        const session = event.data.object;
        switch (event.type) {
            case 'checkout.session.completed': {
                const clerkId = session.metadata?.clerkId;
                const subscriptionId = session.subscription;
                const customerId = session.customer;
                if (clerkId) {
                    await upgradeUserToPro(clerkId, { customerId, subscriptionId });
                    console.log(`User ${clerkId} upgraded to PRO`);
                }
                break;
            }
            case 'customer.subscription.deleted': {
                const sub = event.data.object;
                await prisma_1.default.user.updateMany({
                    where: { subscriptionId: sub.id },
                    data: {
                        plan: client_1.Plan.FREE,
                        subscriptionId: null,
                    },
                });
                console.log(`Subscription ${sub.id} cancelled`);
                break;
            }
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
        return res.json({ received: true });
    }
    catch (error) {
        console.error('Webhook processing error:', error);
        return res.status(500).json({ error: 'Webhook processing failed' });
    }
});
exports.default = router;

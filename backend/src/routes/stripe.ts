import { Router } from 'express';
import { Plan } from '@prisma/client';
import Stripe from 'stripe';
import { requireAuth, AuthenticatedRequest } from '../lib/auth';
import prisma from '../lib/prisma';
import { getCurrentUserOrThrow } from '../lib/users';

const router = Router();
const MOCK_SESSION_ID = 'mock_session';

function hasConfiguredValue(value?: string | null) {
  return Boolean(value && value.trim() && !value.includes('REPLACE'));
}

function getFrontendUrl() {
  return process.env.FRONTEND_URL || 'http://localhost:3000';
}

function getStripeClient() {
  if (!hasConfiguredValue(process.env.STRIPE_SECRET_KEY)) {
    return null;
  }

  return new Stripe(process.env.STRIPE_SECRET_KEY as string);
}

async function upgradeUserToPro(
  clerkUserId: string,
  options: { customerId?: string | null; subscriptionId?: string | null } = {},
) {
  const user = await getCurrentUserOrThrow(clerkUserId);

  return prisma.user.update({
    where: { id: user.id },
    data: {
      plan: Plan.PRO,
      ...(options.customerId !== undefined ? { stripeCustomerId: options.customerId } : {}),
      ...(options.subscriptionId !== undefined ? { subscriptionId: options.subscriptionId } : {}),
    },
  });
}

router.post('/checkout', requireAuth, async (req: AuthenticatedRequest, res) => {
  const clerkUserId = req.auth?.clerkUserId;

  if (!clerkUserId) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const user = await getCurrentUserOrThrow(clerkUserId);
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
          price: process.env.STRIPE_PRO_PRICE_ID as string,
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
  } catch (error) {
    console.error('Checkout error:', error);
    return res.status(500).json({ error: 'Failed to create Stripe checkout session' });
  }
});

router.get('/session/:sessionId', requireAuth, async (req: AuthenticatedRequest, res) => {
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
      const customerId =
        typeof session.customer === 'string'
          ? session.customer
          : session.customer && !('deleted' in session.customer)
            ? session.customer.id
            : null;
      const subscriptionId =
        typeof session.subscription === 'string' ? session.subscription : session.subscription?.id ?? null;

      await upgradeUserToPro(clerkUserId, { customerId, subscriptionId });
    }

    return res.json({
      id: session.id,
      status: session.status,
      paymentStatus: session.payment_status,
    });
  } catch (error) {
    console.error('Session verification error:', error);
    return res.status(500).json({ error: 'Failed to verify checkout session' });
  }
});

router.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const verifiedWebhookSecret = hasConfiguredValue(webhookSecret) ? webhookSecret : null;
  const stripe = getStripeClient();

  let event: Stripe.Event;

  try {
    if (!stripe || !verifiedWebhookSecret) {
      return res.status(200).json({ received: true, skipped: true });
    }

    event = stripe.webhooks.constructEvent(req.body, sig, verifiedWebhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    const session = event.data.object as Stripe.Checkout.Session;

    switch (event.type) {
      case 'checkout.session.completed': {
        const clerkId = session.metadata?.clerkId;
        const subscriptionId = session.subscription as string;
        const customerId = session.customer as string;

        if (clerkId) {
          await upgradeUserToPro(clerkId, { customerId, subscriptionId });
          console.log(`User ${clerkId} upgraded to PRO`);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        await prisma.user.updateMany({
          where: { subscriptionId: sub.id },
          data: {
            plan: Plan.FREE,
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
  } catch (error) {
    console.error('Webhook processing error:', error);
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
});

export default router;

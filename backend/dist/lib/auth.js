"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
const clerk_sdk_node_1 = require("@clerk/clerk-sdk-node");
function hasConfiguredClerkSecret() {
    return Boolean(process.env.CLERK_SECRET_KEY && !process.env.CLERK_SECRET_KEY.includes('REPLACE'));
}
function getDevClerkUserId(req) {
    const header = req.headers['x-clerk-user-id'];
    return typeof header === 'string' && header.trim() ? header : null;
}
async function requireAuth(req, res, next) {
    const header = req.headers.authorization;
    const token = header?.startsWith('Bearer ') ? header.slice(7) : null;
    const allowDevFallback = process.env.NODE_ENV !== 'production' && !hasConfiguredClerkSecret();
    const devClerkUserId = getDevClerkUserId(req);
    if (!token) {
        if (allowDevFallback && devClerkUserId) {
            req.auth = { clerkUserId: devClerkUserId };
            return next();
        }
        return res.status(401).json({ error: 'Authentication required' });
    }
    try {
        if (!hasConfiguredClerkSecret()) {
            throw new Error('Backend Clerk secret is not configured');
        }
        const payload = await clerk_sdk_node_1.clerkClient.verifyToken(token);
        if (!payload.sub) {
            return res.status(401).json({ error: 'Invalid authentication token' });
        }
        req.auth = { clerkUserId: payload.sub };
        return next();
    }
    catch (error) {
        if (allowDevFallback && devClerkUserId) {
            req.auth = { clerkUserId: devClerkUserId };
            return next();
        }
        console.error('Auth verification failed:', error);
        return res.status(401).json({ error: 'Invalid or expired authentication token' });
    }
}

import type { NextFunction, Request as ExpressRequest, Response } from 'express';
import { clerkClient } from '@clerk/clerk-sdk-node';

export interface AuthenticatedRequest extends ExpressRequest {
  auth?: {
    clerkUserId: string;
  };
}

function hasConfiguredClerkSecret() {
  return Boolean(process.env.CLERK_SECRET_KEY && !process.env.CLERK_SECRET_KEY.includes('REPLACE'));
}

function getDevClerkUserId(req: ExpressRequest) {
  const header = req.headers['x-clerk-user-id'];

  return typeof header === 'string' && header.trim() ? header : null;
}

export async function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
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

    const payload = await clerkClient.verifyToken(token);

    if (!payload.sub) {
      return res.status(401).json({ error: 'Invalid authentication token' });
    }

    req.auth = { clerkUserId: payload.sub };
    return next();
  } catch (error) {
    if (allowDevFallback && devClerkUserId) {
      req.auth = { clerkUserId: devClerkUserId };
      return next();
    }

    console.error('Auth verification failed:', error);
    return res.status(401).json({ error: 'Invalid or expired authentication token' });
  }
}

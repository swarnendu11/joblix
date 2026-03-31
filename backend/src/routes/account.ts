import { ResumeStatus } from '@prisma/client';
import { Router } from 'express';
import { requireAuth, AuthenticatedRequest } from '../lib/auth';
import prisma from '../lib/prisma';
import { getCurrentUserOrThrow } from '../lib/users';

const router = Router();

router.use(requireAuth);

router.get('/me', async (req, res) => {
  try {
    const clerkUserId = (req as AuthenticatedRequest).auth!.clerkUserId;
    const user = await getCurrentUserOrThrow(clerkUserId);
    const resumeCount = await prisma.resume.count({
      where: {
        userId: user.id,
        status: ResumeStatus.ACTIVE,
      },
    });

    return res.json({
      id: user.id,
      clerkId: user.clerkId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      plan: user.plan,
      resumeCount,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch account details' });
  }
});

export default router;

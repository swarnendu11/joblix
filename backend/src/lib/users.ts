import { clerkClient } from '@clerk/clerk-sdk-node';
import type { User } from '@prisma/client';
import prisma from './prisma';

function hasConfiguredClerkSecret() {
  return Boolean(process.env.CLERK_SECRET_KEY && !process.env.CLERK_SECRET_KEY.includes('REPLACE'));
}

async function getClerkProfile(clerkUserId: string) {
  if (!hasConfiguredClerkSecret()) {
    console.warn(`Clerk secret is missing. Using mock profile for ${clerkUserId}`);
    return {
      email: `${clerkUserId}@dev.joblix.com`,
      firstName: 'Dev',
      lastName: 'User',
    };
  }

  try {
    const clerkUser = await clerkClient.users.getUser(clerkUserId);
    const primaryEmail = clerkUser.emailAddresses.find(
      (email) => email.id === clerkUser.primaryEmailAddressId,
    );

    return {
      email: primaryEmail?.emailAddress ?? null,
      firstName: clerkUser.firstName ?? null,
      lastName: clerkUser.lastName ?? null,
    };
  } catch (error) {
    console.error('Failed to sync Clerk profile:', error);
    return {
      email: null,
      firstName: null,
      lastName: null,
    };
  }
}

export async function ensureUser(clerkUserId: string) {
  const profile = await getClerkProfile(clerkUserId);

  if (!profile.email) {
    throw new Error('User must have an email to be synchronized.');
  }

  return prisma.user.upsert({
    where: { clerkId: clerkUserId },
    update: {
      email: profile.email,
      firstName: profile.firstName,
      lastName: profile.lastName,
    },
    create: {
      clerkId: clerkUserId,
      email: profile.email,
      firstName: profile.firstName,
      lastName: profile.lastName,
    },
  });
}

export async function getCurrentUserOrThrow(clerkUserId: string): Promise<User> {
  return ensureUser(clerkUserId);
}

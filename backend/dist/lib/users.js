"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureUser = ensureUser;
exports.getCurrentUserOrThrow = getCurrentUserOrThrow;
const clerk_sdk_node_1 = require("@clerk/clerk-sdk-node");
const prisma_1 = __importDefault(require("./prisma"));
function hasConfiguredClerkSecret() {
    return Boolean(process.env.CLERK_SECRET_KEY && !process.env.CLERK_SECRET_KEY.includes('REPLACE'));
}
async function getClerkProfile(clerkUserId) {
    if (!hasConfiguredClerkSecret()) {
        console.warn(`Clerk secret is missing. Using mock profile for ${clerkUserId}`);
        return {
            email: `${clerkUserId}@dev.joblix.com`,
            firstName: 'Dev',
            lastName: 'User',
        };
    }
    try {
        const clerkUser = await clerk_sdk_node_1.clerkClient.users.getUser(clerkUserId);
        const primaryEmail = clerkUser.emailAddresses.find((email) => email.id === clerkUser.primaryEmailAddressId);
        return {
            email: primaryEmail?.emailAddress ?? null,
            firstName: clerkUser.firstName ?? null,
            lastName: clerkUser.lastName ?? null,
        };
    }
    catch (error) {
        console.error('Failed to sync Clerk profile:', error);
        return {
            email: null,
            firstName: null,
            lastName: null,
        };
    }
}
async function ensureUser(clerkUserId) {
    const profile = await getClerkProfile(clerkUserId);
    if (!profile.email) {
        throw new Error('User must have an email to be synchronized.');
    }
    return prisma_1.default.user.upsert({
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
async function getCurrentUserOrThrow(clerkUserId) {
    return ensureUser(clerkUserId);
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = require("express");
const auth_1 = require("../lib/auth");
const prisma_1 = __importDefault(require("../lib/prisma"));
const users_1 = require("../lib/users");
const router = (0, express_1.Router)();
router.use(auth_1.requireAuth);
router.get('/me', async (req, res) => {
    try {
        const clerkUserId = req.auth.clerkUserId;
        const user = await (0, users_1.getCurrentUserOrThrow)(clerkUserId);
        const resumeCount = await prisma_1.default.resume.count({
            where: {
                userId: user.id,
                status: client_1.ResumeStatus.ACTIVE,
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to fetch account details' });
    }
});
exports.default = router;

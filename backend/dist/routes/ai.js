"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const openai_1 = __importDefault(require("openai"));
const auth_1 = require("../lib/auth");
const prisma_1 = __importDefault(require("../lib/prisma"));
const router = (0, express_1.Router)();
// Apply auth protection
router.use(auth_1.requireAuth);
// Mock OpenAI for demoing without keys
const generateMockSummary = (role) => `As a ${role}, I have consistently delivered high-quality software solutions. I specialize in modern tech stacks and have a track record of improving team efficiency and product quality. Focused on result-driven development and scalable architectures.`;
router.post('/generate', async (req, res) => {
    const clerkUserId = req.auth?.clerkUserId;
    const { role, company, description } = req.body;
    if (!role)
        return res.status(400).json({ error: 'Role is required' });
    if (!clerkUserId)
        return res.status(401).json({ error: 'Auth context missing' });
    try {
        const user = await prisma_1.default.user.findUnique({ where: { clerkId: clerkUserId } });
        // Example Plan Gating:
        // if (user?.plan !== 'PRO') {
        //   return res.status(403).json({ error: 'AI generation is a PRO feature' });
        // }
        // If key is placeholder, use mock
        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes('REPLACE')) {
            return res.json({ content: generateMockSummary(role) });
        }
        const openai = new openai_1.default({ apiKey: process.env.OPENAI_API_KEY });
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are an expert resume writer. Generate 3 professional bullet points for a resume experience section based on the role and company description provided. Use strong action verbs and focus on achievements.'
                },
                {
                    role: 'user',
                    content: `Role: ${role}, Company: ${company}, Description: ${description}`
                }
            ]
        });
        res.json({ content: response.choices[0].message.content });
    }
    catch (error) {
        console.error('AI error:', error);
        res.json({ content: generateMockSummary(role) });
    }
});
exports.default = router;

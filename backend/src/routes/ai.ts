import { Router } from 'express';
import OpenAI from 'openai';
import { requireAuth, AuthenticatedRequest } from '../lib/auth';
import prisma from '../lib/prisma';

const router = Router();

// Apply auth protection
router.use(requireAuth);

// Mock OpenAI for demoing without keys
const generateMockSummary = (role: string) => `As a ${role}, I have consistently delivered high-quality software solutions. I specialize in modern tech stacks and have a track record of improving team efficiency and product quality. Focused on result-driven development and scalable architectures.`;

router.post('/generate', async (req, res) => {
  const clerkUserId = (req as AuthenticatedRequest).auth?.clerkUserId;
  const { role, company, description } = req.body;
  
  if (!role) return res.status(400).json({ error: 'Role is required' });
  if (!clerkUserId) return res.status(401).json({ error: 'Auth context missing' });

  try {
    const user = await prisma.user.findUnique({ where: { clerkId: clerkUserId } });
    
    // Example Plan Gating:
    // if (user?.plan !== 'PRO') {
    //   return res.status(403).json({ error: 'AI generation is a PRO feature' });
    // }

    // If key is placeholder, use mock
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes('REPLACE')) {
      return res.json({ content: generateMockSummary(role) });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
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
  } catch (error) {
    console.error('AI error:', error);
    res.json({ content: generateMockSummary(role) });
  }
});

export default router;

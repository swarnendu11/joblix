import { Router } from 'express';
import prisma from '../lib/prisma';
import { requireAuth, AuthenticatedRequest } from '../lib/auth';

const router = Router();

// Apply auth to all routes
router.use(requireAuth);

// Get all resumes for authenticated user
router.get('/', async (req, res) => {
  const clerkUserId = (req as AuthenticatedRequest).auth?.clerkUserId;
  if (!clerkUserId) return res.status(401).json({ error: 'Auth context missing' });

  try {
    const resumes = await prisma.resume.findMany({
      where: { user: { clerkId: clerkUserId } },
      orderBy: { updatedAt: 'desc' },
    });
    res.json(resumes);
  } catch (error) {
    console.error('Fetch resumes error:', error);
    res.status(500).json({ error: 'Failed to fetch resumes' });
  }
});

// Create a new resume for authenticated user
router.post('/', async (req, res) => {
  const clerkUserId = (req as AuthenticatedRequest).auth?.clerkUserId;
  const { title, template, data, email } = req.body;
  if (!clerkUserId) return res.status(401).json({ error: 'Auth context missing' });

  try {
    // Ensure user exists in our local DB
    const user = await prisma.user.upsert({
      where: { clerkId: clerkUserId },
      update: {},
      create: {
        clerkId: clerkUserId,
        email: email || 'user@example.com', // fallback if email not provided in first login
        plan: 'FREE'
      }
    });

    const resume = await prisma.resume.create({
      data: {
        title: title || 'Untitled',
        template: template || 'modern',
        data: data || {},
        userId: user.id
      }
    });
    res.status(201).json(resume);
  } catch (error) {
    console.error('Create resume error:', error);
    res.status(500).json({ error: 'Failed to create resume' });
  }
});

// Update latest resume for auto-save (scoped to user)
router.put('/latest', async (req, res) => {
  const clerkUserId = (req as AuthenticatedRequest).auth?.clerkUserId;
  const { title, template, data } = req.body;
  if (!clerkUserId) return res.status(401).json({ error: 'Auth context missing' });

  try {
    const user = await prisma.user.findUnique({ where: { clerkId: clerkUserId } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    let resume = await prisma.resume.findFirst({
        where: { userId: user.id },
        orderBy: { updatedAt: 'desc' }
    });

    if (!resume) {
        resume = await prisma.resume.create({
            data: {
                userId: user.id,
                title: title || 'Auto-saved Resume',
                data: data || {},
                template: template || 'modern'
            }
        });
    } else {
        resume = await prisma.resume.update({
            where: { id: resume.id },
            data: { title, template, data }
        });
    }
    res.json(resume);
  } catch (error) {
    console.error('Auto-save error:', error);
    res.status(500).json({ error: 'Auto-save failed' });
  }
});

// Update a specific resume by ID (scoped to user)
router.put('/:id', async (req, res) => {
  const clerkUserId = (req as AuthenticatedRequest).auth?.clerkUserId;
  const { id } = req.params;
  const { title, template, data } = req.body;
  if (!clerkUserId) return res.status(401).json({ error: 'Auth context missing' });

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.status(400).json({ error: 'Invalid ID' });

  try {
    const resume = await prisma.resume.findFirst({
      where: { id: parsedId, user: { clerkId: clerkUserId } }
    });

    if (!resume) return res.status(404).json({ error: 'Resume not found' });

    const updated = await prisma.resume.update({
      where: { id: parsedId },
      data: { 
        title, 
        template, 
        data 
      }
    });
    res.json(updated);
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: 'Failed to update resume' });
  }
});

// Delete a resume (scoped to user)
router.delete('/:id', async (req, res) => {
  const clerkUserId = (req as AuthenticatedRequest).auth?.clerkUserId;
  const { id } = req.params;
  if (!clerkUserId) return res.status(401).json({ error: 'Auth context missing' });

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.status(400).json({ error: 'Invalid ID' });

  try {
    const resume = await prisma.resume.findFirst({
      where: { id: parsedId, user: { clerkId: clerkUserId } }
    });

    if (!resume) return res.status(404).json({ error: 'Resume not found' });

    await prisma.resume.delete({ where: { id: parsedId } });
    res.status(204).end();
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete resume' });
  }
});

export default router;

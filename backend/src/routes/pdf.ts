import { Router } from 'express';
import puppeteer from 'puppeteer';
import { requireAuth } from '../lib/auth';
import { getCurrentUserOrThrow } from '../lib/users';

const router = Router();

router.use(requireAuth);

router.post('/generate', async (req, res) => {
  const { htmlContent } = req.body;

  if (!htmlContent) {
    return res.status(400).json({ error: 'HTML content is required' });
  }

  try {
    const user = await getCurrentUserOrThrow(req.auth!.clerkUserId);

    if (user.plan !== 'PRO') {
      return res.status(403).json({ error: 'Upgrade to Pro to export PDF resumes' });
    }

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true,
    });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' },
    });

    await browser.close();

    res.contentType('application/pdf');
    return res.send(pdfBuffer);
  } catch (error) {
    console.error('PDF Generation Error:', error);
    return res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

export default router;

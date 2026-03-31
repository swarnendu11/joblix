"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const puppeteer_1 = __importDefault(require("puppeteer"));
const auth_1 = require("../lib/auth");
const users_1 = require("../lib/users");
const router = (0, express_1.Router)();
router.use(auth_1.requireAuth);
router.post('/generate', async (req, res) => {
    const { htmlContent } = req.body;
    if (!htmlContent) {
        return res.status(400).json({ error: 'HTML content is required' });
    }
    try {
        const user = await (0, users_1.getCurrentUserOrThrow)(req.auth.clerkUserId);
        if (user.plan !== 'PRO') {
            return res.status(403).json({ error: 'Upgrade to Pro to export PDF resumes' });
        }
        const browser = await puppeteer_1.default.launch({
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
    }
    catch (error) {
        console.error('PDF Generation Error:', error);
        return res.status(500).json({ error: 'Failed to generate PDF' });
    }
});
exports.default = router;

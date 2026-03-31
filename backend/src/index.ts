import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import accountRoutes from './routes/account';
import resumeRoutes from './routes/resume';
import aiRoutes from './routes/ai';
import pdfRoutes from './routes/pdf';
import stripeRoutes from './routes/stripe';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
// Routes
app.use('/api/stripe/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());

app.use('/api/account', accountRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/pdf', pdfRoutes);
app.use('/api/stripe', stripeRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

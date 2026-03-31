# Joblix Project Walkthrough

Welcome to your new **Joblix** platform. This is a high-fidelity, production-ready clone of modern resume builders, built with the modern web stack.

## 📁 Project Structure

- **`frontend/`**: The Next.js 14 application.
  - `src/app/`: App Router handles routing (Builder, Dashboard, Pricing, Templates).
  - `src/components/builder/`: The core resume builder components.
  - `src/components/templates/`: Highly polished React-based resume themes.
  - `src/store/`: Zustand state management for real-time data sync.
- **`backend/`**: The Node.js/Express server.
  - `src/routes/`: REST API endpoints for Resumes, AI, PDF, and Stripe.
  - `prisma/`: Database schema for PostgreSQL.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js & npm
- PostgreSQL (for Prisma)
- API Keys: 
  - **Clerk**: [Sign up for Auth](https://clerk.com)
  - **OpenAI**: [Get API Key](https://openai.com)
  - **Stripe**: [Get Test Keys](https://stripe.com)

### 2. Backend Setup
1. `cd backend`
2. `npm install`
3. Update `.env` with your database and API keys.
4. `npx prisma migrate dev`
5. `npm run dev`

### 3. Frontend Setup
1. `cd ../frontend`
2. `npm install`
3. Update `.env.local` with your Clerk keys and `NEXT_PUBLIC_API_URL=http://localhost:5000`.
4. `npm run dev`

---

## ✨ Key Features

### 🛠️ Split-Screen Builder
The heart of the application is a real-time split-screen editor. As you type in the form on the left, the A4-preview on the right updates instantly with smooth animations.

### 🤖 AI Resume Assistant
Built-in OpenAI integration allows users to generate professional summaries and bullet points by simply entering their job title.

### 📄 Pro PDF Engine
Uses Puppeteer on the backend to render the exact CSS from the browser into a high-quality, ATS-friendly A4 PDF document.

### 💳 SaaS Monetization
Integrated with Stripe for monthly subscriptions. High-value features like premium templates and AI assistance are gated behind the PRO plan.

### 💼 Professional Templates
- **Modern**: Bold, Indigo-accented design for tech roles.
- **Classic**: Traditional, centered layout for banking/legal.
- **Minimal**: Elegant, whitespace-heavy design for creative fields.

---

## 🎨 Design System
- **Primary Color**: Indigo (#4F46E5)
- **Background**: Light Gray (#F9FAFB)
- **Typography**: Inter (UI), Sans/Serif mix (Templates)
- **UI Kits**: Custom-built premium components (Input, Button, Label) following shadcn/ui patterns.

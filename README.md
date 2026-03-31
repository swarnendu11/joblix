# Joblix — AI-Powered Resume Builder SaaS

Building a professional resume is no longer a chore. **Joblix** is a high-fidelity, production-ready SaaS platform that leverages AI and a boutique template library to turn your career history into a competitive application in minutes.

![Premium UI Mockup](https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop)

## ✨ Core Features

- ** boutique Template Collection**: 50+ hand-crafted, ATS-optimized templates for every industry.
- **AI Content Engine**: Real-time content suggestions and optimization for your bullet points.
- **Premium Checkout flow**: Integrated UPI, QR, and credit card payments for Pro access.
- **Real-Time Data**: Seamless synchronization between the resume builder and the user dashboard.
- **Cinematic Experience**: Modern dark-mode UI with smooth micro-interactions and glassmorphic designs.

## 🚀 Tech Stack

- **Frontend**: Next.js 15, TailwindCSS, Lucide React, Clerk Auth
- **Backend**: Express.js, TypeScript, Prisma ORM, Stripe Payments
- **Database**: SQLite (Development) / PostgreSQL (Production)
- **AI Integration**: OpenAI GPT-4o for content optimization

## 🛠️ Getting Started

### Prerequisites

- Node.js 22+ (LTS recommended)
- A Clerk account for authentication
- Stripe keys for the payment gateway

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/swarnendu11/joblix.git
   cd joblix
   ```

2. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Backend Setup:**
   ```bash
   cd ../backend
   npm install
   npx prisma generate
   npm run dev
   ```

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built with ❤️ by [Antigravity](https://github.com/swarnendu11/joblix).

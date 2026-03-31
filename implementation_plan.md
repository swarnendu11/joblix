# Implementation Plan - Joblix (Full-Stack SaaS)

This plan outlines the steps to build a modern, high-fidelity resume builder platform.

## Architecture & Tech Stack

- **Frontend**: Next.js 14 (App Router), Tailwind CSS, shadcn/ui, Zustand (State Management), Clerk (Auth UI).
- **Backend**: Node.js with Express, REST API, Prisma ORM, PostgreSQL.
- **Features**: 
    - **PDF Generation**: Puppeteer (HTML to PDF converter on backend).
    - **AI Assistance**: OpenAI API for bullet points and summaries.
    - **Payments**: Stripe for Pro subscriptions.
    - **Auth**: Clerk for user management.
- **Design System**: Indigo (#4F46E5) primary, Light gray (#F9FAFB) background, 12-16px rounded corners, Inter/Poppins fonts.

---

## Phase 1: Project Foundation & Database

1.  **Initialize Project Structure**: 
    - `backend/`: Express + Prisma + Node.
    - `frontend/`: Next.js 14 + Tailwind.
2.  **Prisma Setup**: Define `User` and `Resume` models as per requirements.
3.  **Express Server Setup**: Basic REST framework, Prisma client integration, and CORS.

## Phase 2: Backend Core Features

1.  **Clerk Middleware**: Secure backend routes with Clerk.
2.  **Resume CRUD**: API endpoints for creating, reading, updating, and deleting resumes.
3.  **AI Assistant Service**: Integration with OpenAI for resume content generation.
4.  **PDF Engine**: Setup Puppeteer to render a template (HTML/CSS) into an A4 PDF.
5.  **Payment Service**: Stripe integration for subscription management.

## Phase 3: Frontend - The Builder UI

1.  **Global Store (Zustand)**: Manage real-time resume data (JSON) and current template selection.
2.  **Builder Layout**:
    - **Left Siderbar**: Step-by-step navigation (Personal -> Experience -> Education -> Skills -> Projects -> Summary).
    - **Main Area (Editor)**: Dynamic forms for each step.
    - **Right Preview**: Real-time rendering of the resume using selected templates.
3.  **Template System**: Build 3 templates (Modern, Classic, Minimal) as professional React components.
4.  **Real-time Synchronization**: Auto-save logic to the backend.

## Phase 4: Dashboard & Landing

1.  **User Dashboard**: Card-based UI to manage multiple resumes.
2.  **Template Selection**: Grid layout to pick a theme.
3.  **Pricing Page**: Comparison cards for Free vs Pro.
4.  **Authentication**: Clerk's Sign-in/Sign-up integration.

## Phase 5: Polishing & SEO

1.  **Visual Excellence**: Add hover effects, smooth transitions between builder steps, and glassmorphism elements.
2.  **SEO Optimization**: Metadata for the builder, landing, and dashboard.
3.  **Responsive Design**: Ensure the builder and dashboard are mobile-friendly.

---

## Database Schema (Prisma)

```prisma
model User {
  id        String   @id @default(uuid())
  clerkId   String   @unique
  email     String   @unique
  plan      String   @default("FREE") // FREE, PRO
  resumes   Resume[]
  createdAt DateTime @default(now())
}

model Resume {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  title     String   @default("Untitled Resume")
  data      JSON
  template  String   @default("modern")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

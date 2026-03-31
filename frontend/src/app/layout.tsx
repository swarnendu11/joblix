import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Outfit, Space_Grotesk } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'Joblix | Professional Resume Builder',
  description: 'Create a job-winning resume in minutes with premium templates and AI-powered guidance.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${outfit.variable} ${spaceGrotesk.variable} font-sans`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

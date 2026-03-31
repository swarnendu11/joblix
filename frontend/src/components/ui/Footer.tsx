'use client';

import Image from 'next/image';
import Link from 'next/link';

const footerSections = [
  {
    title: 'Service',
    links: [
      { name: 'Create Resume', href: '/builder' },
      { name: 'Dashboard Access', href: '/dashboard' },
      { name: 'Pro Subscription', href: '/pricing' },
      { name: 'Modern Templates', href: '/templates' },
    ],
  },
  {
    title: 'Support',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Community', href: '/community' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'Privacy Statement', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Legal Information', href: '/legal' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Sign In', href: '/sign-in' },
      { name: 'Create Account', href: '/sign-up' },
      { name: 'Hiring Insights', href: '/' },
      { name: 'Platform API', href: '/' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-28 overflow-hidden w-[100vw] ml-[calc(50%-50vw)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-32 overflow-hidden">
        <div className="absolute inset-x-0 top-[-3.5rem] h-28 origin-top-left -skew-y-3 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-600 shadow-[0_10px_40px_rgba(16,185,129,0.2)]" />
        <div className="absolute inset-x-0 top-0 h-16 bg-white/10 opacity-30 blur-xl" />
      </div>

      <div className="relative z-10 bg-[#080b14] pt-28">
        <div className="mx-auto w-full max-w-7xl px-5 pb-14 md:px-8">
          <div className="grid gap-12 border-b border-white/5 pb-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-16">
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-8">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/90">
                  {section.title}
                </h3>
                <ul className="space-y-5">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="inline-block text-sm font-medium text-white/40 transition-all duration-300 hover:translate-x-1 hover:text-white"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-6 pt-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <Image
                src="/logo.png"
                width={32}
                height={32}
                className="h-8 w-8 cursor-pointer object-contain grayscale opacity-30 transition-all hover:opacity-100 hover:grayscale-0"
                alt="Joblix Small Logo"
              />
              <p className="text-[10px] font-black uppercase tracking-[0.32em] text-white/20">
                Copyright 2026 Joblix Industries
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 md:gap-10">
               {/* Social links removed */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Show, UserButton } from '@clerk/nextjs';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex w-[94%] max-w-7xl h-18 items-center justify-between px-5 md:px-10 glass border border-white/60 shadow-2xl rounded-[32px]">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-4">
          <Image src="/logo.png" alt="Joblix logo" width={48} height={48} className="h-12 w-12 rounded-2xl border border-white/70 object-contain shadow-[0_8px_24px_rgba(79,70,229,0.16)]" />
          <div>
            <p className="font-display text-2xl font-bold tracking-tight text-slate-900">Joblix</p>
            <p className="text-xs uppercase tracking-[0.26em] text-slate-400">Resume design studio</p>
          </div>
        </Link>
      </div>

      <div className="hidden items-center gap-8 text-sm font-medium text-slate-500 md:flex">
        <Link href="/" className={cn("transition-colors hover:text-slate-900", pathname === '/' && "text-slate-900 font-bold")}>Home</Link>
        <Link href="/templates" className={cn("transition-colors hover:text-slate-900", pathname === '/templates' && "text-slate-900 font-bold")}>Templates</Link>
        <Link href="/pricing" className={cn("transition-colors hover:text-slate-900", pathname === '/pricing' && "text-slate-900 font-bold")}>Pricing</Link>
        <Link href="/dashboard" className={cn("transition-colors hover:text-slate-900", pathname === '/dashboard' && "text-slate-900 font-bold")}>Dashboard</Link>
        <Link href="/contact" className={cn("transition-colors hover:text-slate-900", pathname === '/contact' && "text-slate-900 font-bold")}>Contact</Link>
      </div>

      <div className="flex items-center gap-3">
        <Show when="signed-out">
          <Link href="/sign-in">
            <Button variant="ghost" className="rounded-full px-4">Sign in</Button>
          </Link>
          <Link href="/sign-up">
            <Button className="rounded-full px-5">Register</Button>
          </Link>
        </Show>
        <Show when="signed-in">
          <div className="flex items-center justify-center p-1">
            <UserButton />
          </div>
        </Show>
      </div>
    </nav>
  );
}

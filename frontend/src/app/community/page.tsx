'use client';

import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { Button } from '@/components/ui/button';
import { Users2, MessageSquare, Globe2 } from 'lucide-react';

export default function CommunityPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden pt-36 px-5 md:px-12 font-['Outfit'] flex flex-col">
      <div className="blob left-1/2 -translate-x-1/2 top-[10%] h-[700px] w-[700px] bg-fuchsia-300/15" />
      <Navbar />

      <main className="mx-auto w-full max-w-5xl flex-grow flex flex-col gap-16 pb-20 items-center text-center">
        <header className="max-w-3xl z-10">
           <div className="w-20 h-20 mx-auto rounded-[28px] bg-gradient-to-br from-fuchsia-100 to-white border border-fuchsia-200/50 shadow-sm text-fuchsia-600 flex items-center justify-center mb-8">
              <Users2 size={36} />
           </div>
           <h1 className="text-5xl md:text-7xl font-black text-gray-950 tracking-[-0.04em] leading-[0.9] mb-6">
             Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-pink-500">10,000+</span> builders.
           </h1>
           <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed mb-10">
             The Joblix network is a global community of developers, designers, and marketers sharing interview strategies, ATS hacks, and resume feedback.
           </p>
           <Button className="h-[56px] rounded-[20px] bg-gradient-to-r from-fuchsia-600 to-pink-500 px-10 font-black shadow-fuchsia-200/50 shadow-xl border border-fuchsia-400/30 text-[16px]">
              <MessageSquare size={20} className="mr-3" /> Jump into Discord
           </Button>
        </header>

        <section className="grid sm:grid-cols-2 gap-6 w-full z-10">
           <div className="surface-strong rounded-[32px] p-10 border border-white/80 shadow-sm bg-white/50 backdrop-blur-xl flex flex-col items-center text-center">
               <Globe2 size={40} className="text-indigo-400 mb-6" />
               <h3 className="text-4xl font-black text-gray-900 mb-2">108+</h3>
               <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Countries Active</p>
           </div>
           <div className="surface-strong rounded-[32px] p-10 border border-white/80 shadow-sm bg-white/50 backdrop-blur-xl flex flex-col items-center text-center">
               <MessageSquare size={40} className="text-emerald-400 mb-6" />
               <h3 className="text-4xl font-black text-gray-900 mb-2">45k+</h3>
               <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Monthly Messages</p>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

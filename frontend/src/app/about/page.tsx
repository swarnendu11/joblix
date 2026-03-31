'use client';

import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { Target, Users, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden pt-36 px-5 md:px-12 font-['Outfit'] flex flex-col">
      <div className="blob left-[-5rem] top-20 h-[500px] w-[500px] bg-indigo-300/15" />
      <div className="blob right-[-5rem] top-40 h-[600px] w-[600px] bg-cyan-300/10" />

      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-grow flex flex-col gap-16 pb-20">
        <header className="text-center max-w-3xl mx-auto z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/50 text-indigo-700 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
             <Target size={12} className="text-indigo-400" />
             Our Mission
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-950 tracking-[-0.04em] leading-[0.9] mb-6">
             Empowering the world to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-violet-600 to-cyan-500">get hired.</span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed">
             Joblix was built out of frustration with clunky, outdated resume builders. We believe your professional story deserves a beautiful canvas.
          </p>
        </header>

        <section className="grid md:grid-cols-3 gap-8 z-10 w-full max-w-5xl mx-auto">
           {[
             { icon: Users, title: 'User First', desc: 'Every feature is built starting from what helps candidates succeed in modern ATS systems.' },
             { icon: Zap, title: 'Speed & Elegance', desc: 'No complex menus or confusing formatting. Just type, and watch your resume perfectly arrange itself.' },
             { icon: Target, title: 'Precision Layouts', desc: 'Our templates are mathematically aligned for maximum readability by human recruiters.' }
           ].map((val, i) => (
             <div key={i} className="surface-strong rounded-[32px] p-8 border border-white/80 shadow-sm bg-white/50 backdrop-blur-xl hover:-translate-y-1 transition-transform">
                <div className="w-14 h-14 rounded-[20px] bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 shadow-sm text-indigo-600 flex items-center justify-center mb-6">
                   <val.icon size={24} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3">{val.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{val.desc}</p>
             </div>
           ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}

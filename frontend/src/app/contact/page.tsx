'use client';

import { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import { Button } from '@/components/ui/button';
import { Send, MapPin, Mail, Sparkles, ArrowUpRight } from 'lucide-react';
import Footer from '@/components/ui/Footer';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate network request
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden pt-8 font-['Outfit'] flex flex-col">
      {/* Background Ambient Network */}
      <div className="blob bg-indigo-200 top-1/4 -left-10 w-[400px] h-[400px] opacity-20 blur-[100px]" />
      <div className="blob bg-fuchsia-300 top-1/2 -right-20 w-[600px] h-[600px] opacity-15 blur-[120px]" />

      {/* Global Capsule Navbar */}
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-10 pb-32 flex-grow relative w-full">
        <div className="grid lg:grid-cols-2 gap-20 items-start mt-10">
          
          {/* Left Column: Context & Info */}
          <div className="space-y-10">
            <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/60 shadow-sm text-indigo-700 text-xs font-black uppercase tracking-widest">
                  <Sparkles size={14} className="text-indigo-400" /> Executive Support
                </div>
                <h1 className="text-5xl md:text-7xl font-black tracking-[-0.05em] text-gray-950 leading-[0.9]">
                  Let&apos;s craft your <span className="text-gradient">advantage.</span>
                </h1>
                <p className="text-xl text-gray-500 font-medium max-w-md leading-relaxed">
                  Whether you are exploring enterprise licenses or need help fine-tuning your resume layout, our specialists are ready.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
               <div className="glass p-6 rounded-[28px] border-white/60 shadow-lg hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-[18px] flex items-center justify-center mb-6">
                     <Mail size={22} />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-2">Direct Channel</h3>
                  <a href="mailto:hello@joblix.com" className="text-lg font-bold text-gray-900 flex items-center gap-2 hover:text-indigo-600 transition-colors">
                     hello@joblix.com <ArrowUpRight size={16} />
                  </a>
               </div>

               <div className="glass p-6 rounded-[28px] border-white/60 shadow-lg hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-12 h-12 bg-fuchsia-50 text-fuchsia-600 rounded-[18px] flex items-center justify-center mb-6">
                     <MapPin size={22} />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-2">Global HQ</h3>
                  <p className="text-lg font-bold text-gray-900">
                     San Francisco, CA<br/>
                     <span className="text-sm font-medium text-gray-500">Innovation District</span>
                  </p>
               </div>
            </div>

            {/* Micro FAQ */}
            <div className="pt-8 border-t border-gray-100">
               <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-300 mb-4">Response Times</p>
               <div className="flex gap-4 text-sm font-medium text-gray-500">
                   <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Email: 2-4 Hours</div>
                   <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-400" /> General: 24 Hours</div>
               </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="relative">
             {/* Decorative Form Background Glow */}
             <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-fuchsia-400/10 to-transparent blur-3xl rounded-[40px] -z-10" />
             
             <form onSubmit={handleSubmit} className="glass rounded-[40px] p-8 md:p-10 border border-white/80 shadow-[0_40px_80px_-20px_rgba(79,70,229,0.15)] flex flex-col gap-6 relative overflow-hidden">
                {success && (
                  <div className="absolute inset-0 bg-white/90 backdrop-blur z-20 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
                     <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-xl">
                        <CheckCircle2 size={40} className="animate-in zoom-in duration-500 delay-150" />
                     </div>
                     <h3 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Message Sent!</h3>
                     <p className="text-gray-500 font-medium">Our team will be in touch shortly.</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-2">First Name</label>
                       <input required type="text" placeholder="John" className="w-full h-14 bg-white/60 border border-white/80 rounded-2xl px-5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all shadow-inner placeholder:text-gray-400" />
                   </div>
                   <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-2">Last Name</label>
                       <input required type="text" placeholder="Doe" className="w-full h-14 bg-white/60 border border-white/80 rounded-2xl px-5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all shadow-inner placeholder:text-gray-400" />
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-2">Work Email</label>
                   <input required type="email" placeholder="john@company.com" className="w-full h-14 bg-white/60 border border-white/80 rounded-2xl px-5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all shadow-inner placeholder:text-gray-400" />
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-2">How can we help?</label>
                   <textarea required rows={5} placeholder="Tell us about your goals..." className="w-full bg-white/60 border border-white/80 rounded-2xl p-5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all shadow-inner resize-none placeholder:text-gray-400" />
                </div>

                <Button disabled={loading} type="submit" className="btn-premium h-14 w-full mt-4 text-sm gap-2">
                   {loading ? <Sparkles className="animate-spin" size={20} /> : <Send size={20} />} 
                   {loading ? 'Transmitting...' : 'Send Message'}
                </Button>
             </form>
          </div>
        </div>
      </main>
      
      {/* We utilize our new premium footer here */}
      <Footer />
    </div>
  );
}

// Add an icon that wasn't imported
function CheckCircle2({ size, className }: { size?: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
      <path d="m9 12 2 2 4-4"></path>
    </svg>
  );
}

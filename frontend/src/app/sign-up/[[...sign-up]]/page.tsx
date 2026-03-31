'use client';
import Image from 'next/image';
import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white p-6 font-['Outfit']">
       {/* Background Blobs */}
       <div className="blob bg-indigo-500 top-1/4 -left-20 w-[40rem] h-[40rem] opacity-30 animate-pulse" />
       <div className="blob bg-rose-300 bottom-1/4 -right-20 w-[30rem] h-[30rem] opacity-20 animate-pulse" />
       
       <Link href="/" className="absolute top-10 left-10 glass px-6 py-3 rounded-2xl flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-600 hover:scale-105 transition-all shadow-lg z-20">
          <ChevronLeft size={16} /> Back to Hub
       </Link>

       <div className="z-10 flex flex-col items-center gap-10 animate-in zoom-in-95 duration-700">
           <div className="flex flex-col items-center gap-4">
               <Image src="/logo.png" width={64} height={64} className="h-16 w-16 object-contain rounded-[24px] shadow-2xl border border-white/40" alt="Joblix Logo" />
               <h1 className="text-4xl font-black text-gradient tracking-tighter uppercase tracking-[0.2em]">Joblix</h1>
           </div>

           <div className="glass p-2 rounded-[40px] shadow-2xl border-white/60 bg-white/30 backdrop-blur-3xl overflow-hidden mb-12">
               <SignUp 
                 appearance={{
                   elements: {
                     rootBox: "shadow-none",
                     card: "bg-transparent shadow-none border-none",
                     headerTitle: "text-2xl font-black tracking-tight text-gray-900 font-['Outfit']",
                     headerSubtitle: "text-sm font-semibold text-gray-400",
                     socialButtonsBlockButton: "rounded-2xl border-gray-100 hover:bg-gray-50 transition-all text-sm font-bold",
                     formButtonPrimary: "btn-premium border-none h-12 text-sm shadow-indigo-100",
                     footerActionLink: "text-indigo-600 font-bold hover:text-indigo-700",
                     formFieldInput: "rounded-xl border-gray-100 focus:ring-2 focus:ring-indigo-100 transition-all",
                     formFieldLabel: "text-xs font-black uppercase tracking-widest text-gray-500 mb-2"
                   }
                 }}
               />
           </div>
       </div>

       <footer className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-4">
         <div className="h-px w-40 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
         <p className="text-center text-[11px] font-black uppercase tracking-[0.32em] text-slate-300">
           Secured by Joblix Securitas v2.1
         </p>
       </footer>
    </div>
  );
}

'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white pointer-events-none">
       {/* Background decorative blobs just for the loader */}
       <div className="blob bg-indigo-200 top-1/4 left-1/4 w-[30rem] h-[30rem] scale-150" />
       <div className="blob bg-rose-200 bottom-1/4 right-1/4 w-[30rem] h-[30rem] scale-150" />

       <div className="relative flex flex-col items-center gap-10">
          {/* Stunning Spinning Logo Container */}
          <motion.div 
             className="relative w-32 h-32"
             animate={{ rotate: 360 }}
             transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
             <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 via-violet-600 to-fuchsia-600 rounded-[32px] shadow-2xl opacity-80 blur-lg animate-pulse" />
             <div className="absolute inset-2 glass rounded-[24px] flex items-center justify-center border-white/60 shadow-inner">
                <Image src="/logo.png" width={64} height={64} className="h-16 w-16 object-contain" alt="Joblix Loader" />
             </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center gap-2"
          >
            <h2 className="text-2xl font-black text-gradient uppercase tracking-[0.5em] leading-none">Joblix</h2>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">Synchronizing Your Potential</p>
          </motion.div>
       </div>
    </div>
  );
}

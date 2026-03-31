'use client';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export default function CookiesPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden pt-36 px-5 md:px-12 font-['Outfit'] flex flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-4xl flex-grow flex flex-col gap-10 pb-20">
         <div className="text-center mb-8 z-10">
            <h1 className="text-4xl md:text-5xl font-black text-gray-950 tracking-[-0.03em]">Cookie Policy</h1>
            <p className="text-gray-500 mt-4 text-base font-medium">Last updated: March 30, 2026</p>
         </div>
         <div className="surface-strong rounded-[40px] p-8 md:p-14 border border-white/80 shadow-sm bg-white/50 backdrop-blur-xl space-y-8 text-gray-600 font-medium z-10">
            <h2 className="text-2xl font-black text-gray-900">1. Essential Cookies</h2>
            <p>We deploy strict cookies specifically for authentication state management (via Clerk) and vital security protocols. These cannot be disabled as they ensure platform traversal securely.</p>
            
            <h2 className="text-2xl font-black text-gray-900">2. Analytics</h2>
            <p>Non-identifiable telemetry data is collected to analyze template usage friction and UI heatmaps, optimizing future layout designs.</p>
         </div>
      </main>
      <Footer />
    </div>
  );
}

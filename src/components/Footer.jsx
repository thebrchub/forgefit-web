import React from 'react';

export default function Footer({ navigate }) {
  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-20 pb-28 md:pb-0 overflow-hidden relative">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-16 mb-24">
          
          {/* Left: Brand & Mission */}
          {/* Left: Brand & Mission */}
          <div className="max-w-sm w-full">
             {/* Replaced text logo with the official image asset */}
             <div className="mb-6 flex items-center">
               <img 
                 src="/logo1.svg" 
                 alt="ForgeFit Logo" 
                 className="h-20 md:h-30 w-auto object-contain" 
               />
             </div>
             <p className="text-white/40 text-sm font-sans leading-relaxed">
               Zero aesthetic filters. Genuine structural alterations. We engineer absolute physical progression for those who demand more.
             </p>
          </div>

          {/* Right: Minimal Links & Global Hubs - FIX: Side-by-side on mobile */}
          <div className="grid grid-cols-2 gap-8 sm:gap-24 w-full md:w-auto">
            <div>
              <span className="text-white font-mono text-xs uppercase tracking-widest mb-6 block border-b border-white/10 pb-3">Platform</span>
              <ul className="space-y-4 text-sm text-white/50 font-mono">
                <li><button onClick={() => navigate('programs')} className="hover:text-[#C7FF00] hover:translate-x-1 transition-all duration-300">Programs</button></li>
                <li><button onClick={() => navigate('trainers')} className="hover:text-[#C7FF00] hover:translate-x-1 transition-all duration-300">Lab Directors</button></li>
                <li><button onClick={() => navigate('membership')} className="hover:text-[#C7FF00] hover:translate-x-1 transition-all duration-300">Architecture</button></li>
              </ul>
            </div>
            
            <div>
              <span className="text-white font-mono text-xs uppercase tracking-widest mb-6 block border-b border-white/10 pb-3">Global Hubs</span>
              <ul className="space-y-4 text-sm text-white/50 font-mono">
                <li className="hover:text-white transition-colors cursor-default">Austin, TX <span className="text-[#C7FF00] text-[10px] ml-1">// HQ</span></li>
                <li className="hover:text-white transition-colors cursor-default">Miami, FL</li>
                <li className="hover:text-white transition-colors cursor-default">London, UK</li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Utility Strip with BRC Hub Credit - FIX: Increased text size & spacing */}
        <div className="flex flex-col md:flex-row justify-between items-center py-6 border-t border-white/10 text-xs sm:text-sm font-mono text-white/50 tracking-wide text-center md:text-left gap-4 md:gap-0">
           <p className="uppercase">© {new Date().getFullYear()} FORGEFIT PERFORMANCE CLUB.</p>
           <div>
             <span className="uppercase text-white/40 mr-1">Designed & Developed by</span>
             <a 
               href="https://www.brchub.tech" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-white hover:text-[#C7FF00] transition-colors font-bold border-b border-transparent hover:border-[#C7FF00] uppercase"
             >
               BRC Hub LLP
             </a>
           </div>
        </div>

      </div>

      {/* Massive Brand Watermark - Pushed to the absolute bottom edge */}
      <div className="w-full text-center leading-none select-none translate-y-[25%] pointer-events-none overflow-hidden flex justify-center">
        <h1 className="font-display text-[22vw] md:text-[18vw] text-white/[0.03] uppercase tracking-tighter whitespace-nowrap">
          FORGEFIT
        </h1>
      </div>
      
    </footer>
  );
}
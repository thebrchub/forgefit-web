import React from 'react';
import { motion } from 'framer-motion';

// Upgraded mock data: Clinical, results-oriented, with quotes.
const transformations = [
  { 
    id: 1, 
    name: "David K.", 
    challenge: "Extreme Body Recomposition", 
    program: "Hypertrophy & Strength Track",
    duration: "16 Weeks", 
    before: "108 kg (28% BF)", 
    after: "88 kg (12% BF)", 
    imgBefore: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?q=80&w=600&auto=format&fit=crop", // "Before" vibe (softer, unfocused)
    imgAfter: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600&auto=format&fit=crop", // "After" vibe (intense, lifting heavy)
    quote: "I thought I knew how to train. The Lab Directors tore my routine down to the studs and rebuilt my entire physical architecture. The data doesn't lie."
  },
  { 
    id: 2, 
    name: "Sarah M.", 
    challenge: "Metabolic Baseline Reset", 
    program: "Metabolic Conditioning Track",
    duration: "12 Weeks", 
    before: "VO2 Max: 32", 
    after: "VO2 Max: 48", 
    imgBefore: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop", 
    imgAfter: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop", 
    quote: "I was exhausted after 10 minutes of cardio. Now I'm running elite-level intervals. ForgeFit isn't a gym, it's a high-performance clinic."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 20 } }
};

export default function Transformations({ navigate }) {
  return (
    <div className="py-16 pb-28 md:pb-20 px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
      
      {/* ─── HEADER ─── */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        // FIX: Removed max-w-4xl, added w-full and flex centering
        className="w-full flex flex-col items-center text-center mb-16 md:mb-24"
      >
        <span className="text-[#C7FF00] uppercase tracking-widest text-xs font-mono block mb-3 font-bold">
          // The Evidence
        </span>
        <h1 className="font-display text-4xl sm:text-5xl md:text-[5rem] lg:text-[6.5rem] uppercase tracking-tight mb-6 leading-[0.9] whitespace-nowrap">
          PROOF OF PROTOCOL
        </h1>
        {/* We keep the max-width only on the paragraph so it stays readable */}
        <p className="text-white/60 font-sans text-sm md:text-base leading-relaxed max-w-2xl text-center">
          Zero aesthetic filters. Zero gimmicks. We measure genuine structural alterations systematically across multiple macrocycles. These are documented architectural changes.
        </p>
      </motion.div>
      {/* ─── CASE STUDIES FEED ─── */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-16 md:space-y-24"
      >
        {transformations.map((item, index) => (
          <motion.div 
            variants={itemVariants}
            key={item.id} 
            // Alternate layout directions for visual rhythm
            className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
          >
            
            {/* Visuals: Before / After Overlap Layout */}
            <div className="w-full lg:w-1/2 relative group">
              {/* Back Image (Before) */}
              <div className="relative w-4/5 aspect-[4/5] md:aspect-square overflow-hidden border border-white/10 bg-brand-bg opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                <img src={item.imgBefore} alt="Before state" className="w-full h-full object-cover grayscale" loading="lazy" />
                <div className="absolute inset-0 bg-black/40" />
                <span className="absolute top-4 left-4 bg-black/80 text-white/50 font-mono text-[10px] uppercase tracking-widest px-3 py-1 border border-white/10 backdrop-blur-sm">
                  Initial Phase
                </span>
              </div>
              
              {/* Front Image (After) - Overlaps the Before image */}
              <div className="absolute -bottom-8 -right-4 w-3/4 aspect-[4/5] md:aspect-square overflow-hidden border-2 border-[#C7FF00]/50 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-10 transform group-hover:-translate-y-4 transition-transform duration-500">
                <img src={item.imgAfter} alt="After state" className="w-full h-full object-cover" loading="lazy" />
                <span className="absolute bottom-4 left-4 bg-[#C7FF00] text-black font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 shadow-lg">
                  Post Protocol
                </span>
              </div>
            </div>

            {/* Metrics & Content Cluster */}
            <div className="w-full lg:w-1/2 pt-12 lg:pt-0">
              <div className="inline-flex items-center gap-2 border border-[#C7FF00]/30 bg-[#C7FF00]/5 px-3 py-1 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF00]" />
                <span className="text-[#C7FF00] text-[10px] tracking-widest uppercase font-mono font-bold">Case Study: {item.name}</span>
              </div>
              
              <h3 className="font-display text-4xl md:text-5xl uppercase tracking-tight mb-2 text-white">
                {item.challenge}
              </h3>
              <div className="text-white/40 font-mono text-xs uppercase tracking-widest mb-8">
                Protocol: <span className="text-white/80">{item.program}</span>
              </div>
              
              {/* Data Grid */}
              <div className="grid grid-cols-3 gap-4 p-6 bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
                <div>
                  <span className="text-white/40 block text-[10px] font-mono uppercase tracking-widest mb-2">Duration</span>
                  <span className="text-lg md:text-xl text-white font-display tracking-wider">{item.duration}</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px] font-mono uppercase tracking-widest mb-2">Start Matrix</span>
                  <span className="text-lg md:text-xl text-red-400 font-display tracking-wider">{item.before}</span>
                </div>
                <div>
                  <span className="text-[#C7FF00]/60 block text-[10px] font-mono uppercase tracking-widest mb-2">Final Matrix</span>
                  <span className="text-xl md:text-2xl text-[#C7FF00] font-display tracking-wider">{item.after}</span>
                </div>
              </div>

              {/* Client Quote */}
              <blockquote className="border-l-2 border-[#C7FF00] pl-6 py-2">
                <p className="text-white/80 italic text-sm md:text-base leading-relaxed">
                  "{item.quote}"
                </p>
              </blockquote>
            </div>

          </motion.div>
        ))}
      </motion.div>

      {/* ─── BOTTOM CTA ─── */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-24 md:mt-32 text-center border-t border-white/10 pt-16 md:pt-20"
      >
        <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tight mb-4">
          Become The Next Benchmark.
        </h2>
        <p className="text-white/60 text-sm mb-8 max-w-md mx-auto">
          Stop guessing. Start measuring. Book your baseline assessment today and let's map your architectural shift.
        </p>
        <button 
          onClick={() => navigate('book-trial')}
          className="w-full sm:w-auto bg-[#C7FF00] text-black font-display text-xl tracking-wider uppercase px-12 py-5 hover:bg-white transition-all transform md:hover:-translate-y-1 duration-200 shadow-[0_0_20px_rgba(199,255,0,0.2)] md:hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] font-bold"
        >
          Book Baseline Assessment
        </button>
      </motion.div>

    </div>
  );
}
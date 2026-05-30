import React from 'react';
import { motion } from 'framer-motion';

const programsList = [
  { 
    id: 'strength', 
    title: 'Hypertrophy & Strength', 
    intensity: 'High', 
    description: 'Heavy structural loading designed to maximize absolute mechanical tension and muscular force production.', 
    specs: ['Barbell Mastery', '1-on-1 Tracking', 'Periodized Splits'],
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000&auto=format&fit=crop'
  },
  { 
    id: 'hiit', 
    title: 'Metabolic Conditioning', 
    intensity: 'Extreme', 
    description: 'High-intensity intervals structured to elevate EPOC and spike cardiovascular performance thresholds.', 
    specs: ['Sprints', 'Rowers / Bikes', 'Heart Rate Zones'],
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop'
  },
  { 
    id: 'crossfit', 
    title: 'Functional Athleticism', 
    intensity: 'High', 
    description: 'Multi-planar movements engineered to build power, coordination, and real-world durability.', 
    specs: ['Olympic Lifting', 'Gymnastics Rings', 'Plyometrics'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop'
  },
  { 
    id: 'recovery', 
    title: 'Cryo & Soft Tissue Recovery', 
    intensity: 'Low', 
    description: 'Dedicated down-regulation protocols to accelerate tissue healing and restore systemic autonomic balance.', 
    specs: ['Cold Plunges', 'Infrared Sauna', 'Compression Gear'],
    image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=1000&auto=format&fit=crop'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
};

export default function Programs({ navigate }) {
  return (
    
    <div className="py-16 pb-28 md:pb-16 px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
      
      {/* ─── HEADER ─── */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="border-l-4 border-brand-lime pl-4 sm:pl-5 mb-12 sm:mb-16"
      >
        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-brand-lime block mb-2 font-bold">
          // Ecosystem Framework
        </span>
       
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9] break-words">
          PERFORMANCE TRACKS
        </h1>
        <p className="text-white/70 mt-4 max-w-xl font-sans text-sm leading-relaxed">
          Select your protocol. Every track is rigorously engineered by our elite coaching staff to guarantee measurable physical adaptation.
        </p>
      </motion.div>

      {/* ─── INTERACTIVE GRID ─── */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12"
      >
        {programsList.map((program) => (
          <motion.div 
            variants={cardVariants}
            key={program.id} 

            className="group relative h-[380px] md:h-[450px] overflow-hidden border border-white/10 bg-brand-surface cursor-pointer hover:border-brand-lime/50 transition-colors duration-500"
          >
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
              <img 
                src={program.image} 
                alt={program.title}
                className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-brand-bg/80 to-transparent group-hover:via-brand-bg/60 transition-colors duration-500" />
            </div>

            {/* Content Layer */}
            <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8">
              
              {/* Top Meta */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 bg-black/60 backdrop-blur-md text-brand-gray border border-white/20 group-hover:border-brand-lime/50 group-hover:text-brand-lime transition-all duration-300 shadow-lg">
                  Intensity: {program.intensity}
                </span>
              </div>
              
              {/* Bottom Content Cluster */}
              <div className="transform transition-transform duration-500 ease-out md:translate-y-8 md:group-hover:translate-y-0">
                <h3 className="font-display text-3xl lg:text-4xl uppercase tracking-tight text-white mb-2 md:mb-3 drop-shadow-md group-hover:text-brand-lime transition-colors">
                  {program.title}
                </h3>
                
                {/* Description fades in and slides up on hover (Visible by default on mobile for better UX) */}
                <p className="text-white/80 text-xs md:text-sm leading-relaxed mb-4 md:mb-6 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 md:delay-100 md:h-0 md:group-hover:h-auto md:overflow-hidden">
                  {program.description}
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-3 gap-2 border-t border-white/20 pt-4">
                  {program.specs.map((spec, index) => (
                    <div 
                      key={index} 
                      className="text-[9px] md:text-[10px] lg:text-[11px] font-mono text-white/90 bg-black/50 backdrop-blur-sm px-1 py-2 text-center border border-white/10 group-hover:border-brand-lime/30 transition-colors duration-300"
                    >
                      {spec}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ─── BOTTOM CTA ─── */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-12 md:mt-16 text-center border-t border-white/10 pt-10 md:pt-12"
      >
        <p className="text-white/50 font-mono text-xs uppercase tracking-widest mb-4 md:mb-6">Unsure where to start?</p>
        <button 
          onClick={() => navigate('book-trial')}
          className="w-full md:w-auto bg-brand-lime text-black font-display text-xl tracking-wider uppercase px-12 py-5 hover:bg-white transition-all transform hover:-translate-y-1 duration-200 shadow-[0_0_20px_rgba(199,255,0,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] font-bold"
        >
          Book Consultation
        </button>
      </motion.div>

    </div>
  );
}
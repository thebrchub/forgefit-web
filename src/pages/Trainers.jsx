import React from 'react';
import { motion } from 'framer-motion';

// Expanded mock data focused on selling expertise
const trainers = [
  {
    id: 1,
    firstName: "Marcus",
    name: "Marcus Vance",
    role: "Head of Strength & Conditioning",
    // Updated local image path
    image: "/coach/1.png",
    specialization: "Olympic Lifting, Hypertrophy",
    certs: ["CSCS", "USAW Level 2"],
    bio: "Former collegiate powerlifter focused on raw mechanical tension and absolute force production. Marcus doesn't do fluff—he builds structural dominance.",
    status: "Accepting Clients"
  },
  {
    id: 2,
    firstName: "Aria",
    name: "Aria Thorne",
    role: "HIIT & Mobility Specialist",
    // Updated local image path
    image: "/coach/2.png",
    specialization: "Functional Athleticism, Recovery",
    certs: ["NASM-PES", "FMS Level 1"],
    bio: "Specializes in extreme metabolic conditioning and kinetic chain optimization. Aria bulletproofs your joints while torching body fat.",
    status: "Waitlist Only"
  },
  {
    id: 3,
    firstName: "Julian",
    name: "Julian Reyes",
    role: "Tactical Conditioning Lead",
    // Updated local image path
    image: "/coach/3.png",
    specialization: "Cross-Training, Endurance",
    certs: ["CF-L3", "Precision Nutrition L2"],
    bio: "Military-style endurance protocols designed to elevate VO2 max and build mental resilience. Julian trains the mind as hard as the body.",
    status: "Accepting Clients"
  },
  {
    id: 4,
    firstName: "Elena",
    name: "Elena Rostova",
    role: "Recovery & Biomechanics Director",
    // Updated local image path
    image: "/coach/4.png",
    specialization: "Injury Rehab, Mobility",
    certs: ["DPT", "FRCms"],
    bio: "Doctor of Physical Therapy ensuring your systemic recovery. Elena focuses on joint centration, active mobility, and soft tissue restoration.",
    status: "Accepting Clients"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
};

export default function Trainers({ navigate }) {
  return (
    <div className="py-16 pb-28 md:pb-20 px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
      
      {/* ─── HEADER ─── */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-4xl mx-auto mb-12 md:mb-16"
      >
        <span className="text-[#C7FF00] uppercase tracking-widest text-xs font-mono block mb-3 font-bold">
          // The Infrastructure
        </span>
        <h1 className="font-display text-4xl sm:text-5xl md:text-[5rem] lg:text-[6rem] uppercase tracking-tight mb-6 leading-[0.9] break-words md:whitespace-nowrap">
          THE LAB DIRECTORS
        </h1>
        <p className="text-white/60 font-sans text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          We do not employ floor-walkers or casual trainers. Our roster consists entirely of vetted strength professionals with competitive sports backgrounds and advanced biomechanical degrees.
        </p>
      </motion.div>

      {/* ─── THE STANDARD (Owner's Trust Factor) ─── */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 border-y border-white/10 py-8 mb-16 md:mb-24"
      >
        <div className="text-center px-4 border-b border-white/10 pb-4 md:border-none md:pb-0">
          <div className="text-[#C7FF00] font-display text-3xl mb-1">10,000+</div>
          <div className="text-xs uppercase tracking-widest text-white/50 font-mono">Hours Coached Minimum</div>
        </div>
        <div className="text-center px-4 border-b border-white/10 pb-4 md:border-none md:pb-0 md:border-x border-white/10">
          <div className="text-[#C7FF00] font-display text-3xl mb-1">100%</div>
          <div className="text-xs uppercase tracking-widest text-white/50 font-mono">Nationally Certified</div>
        </div>
        <div className="text-center px-4">
          <div className="text-[#C7FF00] font-display text-3xl mb-1">0</div>
          <div className="text-xs uppercase tracking-widest text-white/50 font-mono">Cookie-Cutter Programs</div>
        </div>
      </motion.div>

      {/* ─── TRAINERS GRID ─── */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12"
      >
        {trainers.map((coach) => (
          <motion.div 
            variants={cardVariants}
            key={coach.id} 
            className="bg-brand-surface/40 border border-white/10 flex flex-col sm:flex-row overflow-hidden group hover:border-[#C7FF00]/60 hover:shadow-[0_0_30px_rgba(199,255,0,0.05)] transition-all duration-500 rounded-lg md:rounded-none relative"
          >
            {/* Status Tag */}
            <div className={`absolute top-4 left-4 z-20 text-[9px] font-mono uppercase tracking-widest px-2 py-1 border font-bold ${coach.status === 'Waitlist Only' ? 'bg-black/80 text-orange-400 border-orange-400/50' : 'bg-[#C7FF00] text-black border-black'}`}>
              {coach.status}
            </div>

            {/* Image Section */}
            <div className="w-full sm:w-2/5 h-80 sm:h-auto overflow-hidden relative bg-black">
              <img 
                src={coach.image} 
                alt={coach.name} 
                className="w-full h-full object-cover transition-all duration-700 ease-out grayscale-0 opacity-90 md:grayscale md:opacity-70 md:group-hover:scale-105 md:group-hover:grayscale-0 md:group-hover:opacity-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent sm:bg-gradient-to-r md:group-hover:opacity-0 transition-opacity duration-500" />
            </div>

            {/* Content Section */}
            <div className="w-full sm:w-3/5 p-6 md:p-8 flex flex-col justify-between relative z-10 bg-transparent sm:bg-transparent">
              <div>
                <span className="text-[#C7FF00] font-mono text-[10px] md:text-xs uppercase tracking-widest block mb-2">
                  {coach.role}
                </span>
                <h3 className="font-display text-3xl md:text-4xl uppercase tracking-wide text-white mb-4 group-hover:text-[#C7FF00] transition-colors duration-300">
                  {coach.name}
                </h3>
                
                <p className="text-white/70 text-xs md:text-sm leading-relaxed mb-6 border-l-2 border-[#C7FF00]/50 pl-3">
                  {coach.bio}
                </p>
                
                <div className="space-y-4 font-sans text-xs md:text-sm bg-black/30 p-4 border border-white/5">
                  <div>
                    <span className="text-white/40 block text-[10px] font-mono uppercase tracking-widest mb-1">Focus Areas</span>
                    <p className="text-white font-medium">{coach.specialization}</p>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[10px] font-mono uppercase tracking-widest mb-1">Credentials</span>
                    <p className="text-white font-medium">{coach.certs.join(' / ')}</p>
                  </div>
                </div>
              </div>
              
              {/* Direct Booking CTA */}
              <button 
                onClick={() => navigate('book-trial')}
                disabled={coach.status === 'Waitlist Only'}
                className={`mt-6 w-full py-4 text-xs font-mono uppercase tracking-widest transition-all duration-300 border ${
                  coach.status === 'Waitlist Only' 
                  ? 'border-white/10 text-white/30 cursor-not-allowed'
                  : 'border-[#C7FF00]/50 text-white hover:bg-[#C7FF00] hover:text-black hover:border-[#C7FF00]'
                }`}
              >
                {coach.status === 'Waitlist Only' ? 'Join Waitlist' : `Train With ${coach.firstName}`}
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ─── BOTTOM CTA ─── */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-16 md:mt-24 text-center border-t border-white/10 pt-12 md:pt-16"
      >
        <h2 className="font-display text-4xl md:text-5xl uppercase tracking-tight mb-4">
          Not sure who to choose?
        </h2>
        <p className="text-white/60 text-sm mb-8 max-w-md mx-auto">Let our head of programming assess your baseline and pair you with the right lab director.</p>
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
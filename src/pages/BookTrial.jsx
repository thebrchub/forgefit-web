import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const goalsList = [
  "Absolute Power & Mass",
  "Metabolic Rate Conditioning",
  "Functional Athletic Output",
  "Systemic Recovery & Rehab",
  "General Athletic Base"
];

export default function BookTrial() {
  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('Select Primary Objective');
  
  // UI Interaction States
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | processing | success

  // Simulated Submission Process
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedGoal === 'Select Primary Objective') {
      setIsDropdownOpen(true);
      return;
    }
    
    setStatus('processing');
    
    // Simulate API call and digital terminal processing
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <div className="min-h-screen py-24 px-6 lg:px-12 flex flex-col justify-center relative overflow-hidden bg-brand-bg">
      
      {/* Background Graphic Elements */}
      <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#C7FF00] rounded-full mix-blend-multiply filter blur-[150px] opacity-10 animate-pulse" />

      <div className="max-w-7xl mx-auto w-full z-10">
        
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            /* ─── SUCCESS TICKET STATE ─── */
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              className="max-w-2xl mx-auto mt-12"
            >
              <div className="bg-brand-surface border-2 border-[#C7FF00] p-8 md:p-12 relative overflow-hidden shadow-[0_0_50px_rgba(199,255,0,0.15)]">
                <div className="absolute top-0 left-0 w-4 h-4 bg-brand-bg border-r border-b border-[#C7FF00]" />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-brand-bg border-l border-t border-[#C7FF00]" />
                
                <span className="text-[#C7FF00] uppercase tracking-widest text-[10px] font-mono block mb-6 font-bold animate-pulse">
                  // Connection Established
                </span>
                
                <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter text-white mb-6 leading-none">
                  ACCESS<br/><span className="text-[#C7FF00]">GRANTED.</span>
                </h2>
                
                <div className="border-t border-white/10 pt-6 mb-8">
                  <p className="text-white/70 text-sm md:text-base leading-relaxed font-sans">
                    Your baseline parameters for <strong className="text-white font-mono uppercase">{selectedGoal}</strong> have been logged. 
                    Check your digital inbox (<span className="text-[#C7FF00]">{email}</span>) within 5 minutes for terminal hub onboarding details and your encrypted gate pass.
                  </p>
                </div>

                <div className="bg-black/50 p-4 border border-white/5 flex justify-between items-center font-mono text-xs text-white/40">
                  <span>ID: F-FIT-{Math.floor(Math.random() * 90000) + 10000}</span>
                  <span className="text-[#C7FF00]">STATUS: VERIFIED</span>
                </div>
              </div>
            </motion.div>

          ) : (

            /* ─── BOOKING INTERFACE ─── */
            <motion.div 
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, filter: 'blur(5px)' }}
              className="w-full"
            >
              
              {/* 1. CENTERED HEADER */}
              <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
                <span className="text-[#C7FF00] uppercase tracking-widest text-xs font-mono block mb-4 font-bold">
                  // System Initialization
                </span>
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight mb-6 leading-[0.9]">
                  SECURE YOUR TRIAL PASS
                </h1>
                <p className="text-white/60 font-sans text-sm md:text-base leading-relaxed">
                  No upfront payment. No high-pressure sales floor. Generate your 24-hour pass, access the facility, and let the architectural environment speak for itself.
                </p>
              </div>

              {/* 2. SPLIT LAYOUT: FORM (LEFT) & IMAGE/STEPS (RIGHT) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                
                {/* LEFT SIDE: The Interactive Terminal Form */}
                <div className="w-full order-2 lg:order-1">
                  <div className="bg-brand-surface p-8 md:p-12 border border-white/10 shadow-2xl relative">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C7FF00] to-transparent opacity-50" />

                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 gap-8">
                        {/* Name Input */}
                        <div className="group">
                          <label className="block text-[10px] font-mono uppercase tracking-widest text-white/50 mb-2 transition-colors group-focus-within:text-[#C7FF00]">
                            Primary Identification
                          </label>
                          <input 
                            required 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="First Name"
                            className="w-full bg-black border-b border-white/20 text-white px-4 py-4 text-sm focus:outline-none focus:border-[#C7FF00] focus:bg-white/5 transition-all placeholder:text-white/20" 
                          />
                        </div>
                        
                        {/* Email Input */}
                        <div className="group">
                          <label className="block text-[10px] font-mono uppercase tracking-widest text-white/50 mb-2 transition-colors group-focus-within:text-[#C7FF00]">
                            Digital Mail Address
                          </label>
                          <input 
                            required 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email@domain.com"
                            className="w-full bg-black border-b border-white/20 text-white px-4 py-4 text-sm focus:outline-none focus:border-[#C7FF00] focus:bg-white/5 transition-all placeholder:text-white/20" 
                          />
                        </div>
                      </div>

                      {/* Custom Animated Dropdown */}
                      <div className="relative z-20">
                        <label className="block text-[10px] font-mono uppercase tracking-widest text-white/50 mb-2">
                          Core Training Objective
                        </label>
                        <button 
                          type="button"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className={`w-full flex justify-between items-center bg-black border-b text-sm px-4 py-4 transition-all ${isDropdownOpen || selectedGoal !== 'Select Primary Objective' ? 'border-[#C7FF00] text-white bg-white/5' : 'border-white/20 text-white/60 hover:border-white/50'}`}
                        >
                          {selectedGoal}
                          <motion.span animate={{ rotate: isDropdownOpen ? 180 : 0 }} className="text-[#C7FF00] ml-2 text-xs">
                            ▼
                          </motion.span>
                        </button>

                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.ul 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                              className="absolute top-full left-0 w-full mt-1 bg-[#1A1A1A] border border-white/10 shadow-2xl max-h-60 overflow-y-auto z-50"
                            >
                              {goalsList.map((goal, idx) => (
                                <li 
                                  key={idx}
                                  onClick={() => {
                                    setSelectedGoal(goal);
                                    setIsDropdownOpen(false);
                                  }}
                                  className="px-4 py-4 text-sm text-white/70 hover:bg-[#C7FF00] hover:text-black cursor-pointer transition-colors border-b border-white/5 last:border-none font-mono"
                                >
                                  {goal}
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Submit Button */}
                      <button 
                        type="submit" 
                        disabled={status === 'processing'}
                        className="w-full relative overflow-hidden bg-[#C7FF00] text-black font-display text-xl md:text-2xl tracking-[0.15em] uppercase py-6 mt-8 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed group shadow-[0_0_15px_rgba(199,255,0,0.15)] hover:shadow-[0_0_40px_rgba(199,255,0,0.5)]"
                      >
                        {/* Tech Accents - Inner Corners */}
                        <span className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-black/40 z-20 transition-all duration-300 group-hover:border-black group-hover:scale-110" />
                        <span className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-black/40 z-20 transition-all duration-300 group-hover:border-black group-hover:scale-110" />

                        {/* Background Slide Effect */}
                        <div className="absolute inset-0 w-0 bg-white group-hover:w-full transition-all duration-500 ease-out z-0" />

                        {status === 'processing' ? (
                          <span className="relative z-10 flex items-center justify-center gap-3 animate-pulse font-bold">
                            <svg className="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            ESTABLISHING LINK...
                          </span>
                        ) : (
                          <span className="relative z-10 flex items-center justify-center gap-3 font-bold group-hover:text-black transition-colors duration-300">
                            <span className="text-black/30 group-hover:text-black/60 transition-colors duration-300">{'[ '}</span>
                            INITIALIZE GATE PASS
                            <span className="text-black/30 group-hover:text-black/60 transition-colors duration-300">{' ]'}</span>
                          </span>
                        )}
                      </button>
                    </form>
                  </div>
                </div>

                {/* RIGHT SIDE: Moody Gym Image & Floating Steps */}
                <div className="w-full h-[500px] lg:h-[600px] relative overflow-hidden border border-white/10 group order-1 lg:order-2">
                  <img 
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop" 
                    alt="Dark Gym Equipment" 
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 group-hover:scale-105 group-hover:opacity-40 transition-all duration-1000"
                  />
                  {/* Heavy gradient to ensure the text overlays pop */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-0" />
                  
                  {/* Floating Steps Panel */}
                  <div className="absolute inset-0 z-10 flex flex-col justify-center px-8 md:px-12 space-y-6">
                    {[
                      "Enter Identity Parameters",
                      "Receive Encrypted Gate Code",
                      "Scan at Hub Reception"
                    ].map((step, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + (index * 0.15) }}
                        className="flex items-center gap-5 p-4 md:p-5 bg-black/40 backdrop-blur-md border border-white/10 transform transition-transform hover:translate-x-2 hover:bg-black/60 hover:border-[#C7FF00]/30 w-full max-w-sm"
                      >
                        <span className="w-10 h-10 shrink-0 rounded-full border border-[#C7FF00]/50 bg-[#C7FF00]/10 flex items-center justify-center text-[#C7FF00] font-mono shadow-[0_0_15px_rgba(199,255,0,0.2)]">
                          {index + 1}
                        </span>
                        <span className="text-white font-mono tracking-widest text-xs md:text-sm uppercase">
                          {step}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
      </div>
    </div>
  );
}
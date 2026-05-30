import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BmiCalculator() {
  const [weight, setWeight] = useState(75);
  const [height, setHeight] = useState(175);
  const [result, setResult] = useState(null);

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);

    let category = '';
    let color = '';
    let barColor = '';

    // Standard clinical breakpoints
    if (bmiValue < 18.5) {
      category = 'Sub-Optimal Mass (Underweight)';
      color = 'text-yellow-400';
      barColor = 'bg-yellow-400';
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      category = 'Optimal Architecture (Normal)';
      color = 'text-[#C7FF00]';
      barColor = 'bg-[#C7FF00]';
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      category = 'Excess Mass (Overweight)';
      color = 'text-orange-400';
      barColor = 'bg-orange-400';
    } else {
      category = 'Critical Mass (Obese)';
      color = 'text-red-500';
      barColor = 'bg-red-500';
    }

    // Map the BMI onto a 0-100% scale for the visual gauge
    // We'll set the visual range from BMI 15 (0%) to BMI 40 (100%)
    const minBMI = 15;
    const maxBMI = 40;
    const range = maxBMI - minBMI;
    let position = ((bmiValue - minBMI) / range) * 100;
    
    // Clamp the position so the marker doesn't fly off the screen
    position = Math.max(0, Math.min(position, 100));

    setResult({ bmi: bmiValue, category, color, barColor, position });
  };

  return (
    <div className="w-full">
      
      {/* ─── MASS CONFIGURATION ─── */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <label className="text-[10px] font-mono uppercase tracking-widest text-white/50">Mass Index Configuration</label>
          <span className="font-mono text-white font-bold text-sm">{weight} KG</span>
        </div>
        <input
          type="range"
          min="40"
          max="150"
          value={weight}
          onChange={(e) => {
            setWeight(e.target.value);
            setResult(null); 
          }}
          className="w-full h-1.5 bg-white/10 appearance-none outline-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#C7FF00]"
          style={{
            background: `linear-gradient(to right, #C7FF00 ${((weight - 40) / (150 - 40)) * 100}%, rgba(255,255,255,0.1) ${((weight - 40) / (150 - 40)) * 100}%)`
          }}
        />
      </div>

      {/* ─── HEIGHT CONFIGURATION ─── */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <label className="text-[10px] font-mono uppercase tracking-widest text-white/50">Vertical Scale Configuration</label>
          <span className="font-mono text-white font-bold text-sm">{height} CM</span>
        </div>
        <input
          type="range"
          min="140"
          max="220"
          value={height}
          onChange={(e) => {
            setHeight(e.target.value);
            setResult(null);
          }}
          className="w-full h-1.5 bg-white/10 appearance-none outline-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#C7FF00]"
          style={{
            background: `linear-gradient(to right, #C7FF00 ${((height - 140) / (220 - 140)) * 100}%, rgba(255,255,255,0.1) ${((height - 140) / (220 - 140)) * 100}%)`
          }}
        />
      </div>

      {/* ─── ACTION BUTTON ─── */}
      <button
        onClick={calculateBMI}
        className="w-full bg-white text-black font-display text-lg md:text-xl tracking-widest uppercase py-4 transition-all duration-300 hover:bg-[#C7FF00] mb-2 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(199,255,0,0.4)]"
      >
        Analyze Architecture
      </button>

      {/* ─── SMOOTH EXPANDING RESULTS BLOCK ─── */}
      <AnimatePresence initial={false}>
        {result && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }} 
            className="overflow-hidden" 
          >
            <div className="pt-8 mt-4 border-t border-white/10">
              
              <div className="flex justify-between items-end mb-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">Calculated Index</span>
                <span className={`text-5xl font-display tracking-wider leading-none ${result.color}`}>
                  {result.bmi}
                </span>
              </div>

              {/* THE VISUAL SPECTRUM GAUGE */}
              <div className="mb-8 relative">
                {/* Scale Labels */}
                <div className="flex justify-between text-[8px] font-mono text-white/40 mb-1">
                  <span>15.0</span>
                  <span>40.0+</span>
                </div>
                
                {/* Color Track */}
                <div className="h-2 w-full flex bg-white/5 overflow-hidden">
                  {/* These widths mathematically match the clinical BMI brackets on a 15-40 scale */}
                  <div className="h-full bg-yellow-400 opacity-80" style={{ width: '14%' }} title="Underweight" />
                  <div className="h-full bg-[#C7FF00]" style={{ width: '26%' }} title="Normal" />
                  <div className="h-full bg-orange-400 opacity-80" style={{ width: '20%' }} title="Overweight" />
                  <div className="h-full bg-red-500 opacity-80" style={{ width: '40%' }} title="Obese" />
                </div>

                {/* Animated Targeting Reticle */}
                <div className="relative w-full h-4 mt-1">
                  <motion.div
                    initial={{ left: '0%' }}
                    animate={{ left: `${result.position}%` }}
                    transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.3 }}
                    className="absolute top-0 -ml-2 w-4 flex flex-col items-center"
                  >
                    {/* The Triangle Pointer */}
                    <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-white" />
                  </motion.div>
                </div>
              </div>

              {/* Status Output Box */}
              <div className={`flex justify-between items-center bg-black/40 p-4 border border-white/5 border-l-2 ${result.color.replace('text-', 'border-')}`}>
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">Status</span>
                <span className={`text-xs font-mono font-bold uppercase tracking-widest ${result.color}`}>
                  {result.category}
                </span>
              </div>
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
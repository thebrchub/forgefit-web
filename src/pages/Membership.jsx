import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Upgraded Owner's Data: Value stacking & precise naming conventions
const pricingData = {
  monthly: [
    { name: "Base Protocol", desc: "Standard architectural access.", price: 69, popular: false, features: ["24/7 Access to 1 Hub", "Free Weights & Calibrated Iron", "Locker Room Access", "Basic Biometric App Tracking"] },
    { name: "Elite Athlete", desc: "The optimal performance standard.", price: 119, popular: true, features: ["Access to All Global Hubs", "Unlimited Group Conditioning", "1 PT Assessment / Month", "Full Recovery Lab Access", "Advanced App Metrics"] },
    { name: "Apex Director", desc: "Unfair physical advantages.", price: 249, popular: false, features: ["Everything in Elite", "Weekly 1-on-1 Lab Sessions", "Custom Nutrition Blueprint", "Unlimited Cryotherapy", "Dedicated VIP Locker"] }
  ],
  annual: [
    { name: "Base Protocol", desc: "Standard architectural access.", price: 55, popular: false, features: ["24/7 Access to 1 Hub", "Free Weights & Calibrated Iron", "Locker Room Access", "Basic Biometric App Tracking"] },
    { name: "Elite Athlete", desc: "The optimal performance standard.", price: 95, popular: true, features: ["Access to All Global Hubs", "Unlimited Group Conditioning", "1 PT Assessment / Month", "Full Recovery Lab Access", "Advanced App Metrics"] },
    { name: "Apex Director", desc: "Unfair physical advantages.", price: 199, popular: false, features: ["Everything in Elite", "Weekly 1-on-1 Lab Sessions", "Custom Nutrition Blueprint", "Unlimited Cryotherapy", "Dedicated VIP Locker"] }
  ]
};

const faqs = [
  { q: "Are there initiation fees?", a: "Zero. We don't believe in arbitrary setup fees. Your membership fee goes entirely toward your coaching and facility access." },
  { q: "Can I pause my architecture?", a: "Yes. You can freeze your account for up to 3 months per calendar year directly through the client portal. No questions asked." },
  { q: "What is the cancellation policy?", a: "Monthly commitments can be terminated with a 14-day notice. Annual commitments are locked for 12 months for maximum adaptation." },
  { q: "Is the Recovery Lab included?", a: "The Elite and Apex tiers include full access to cold plunges and infrared saunas. Base members can purchase day passes." }
];

export default function Membership({ navigate }) {
  const [billingCycle, setBillingCycle] = useState('monthly');

  return (
    <div className="py-16 pb-32 md:pb-24 px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
      
      {/* ─── HEADER & TOGGLE ─── */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full flex flex-col items-center text-center mb-16 md:mb-20 px-4"
      >
        <span className="text-[#C7FF00] uppercase tracking-widest text-xs font-mono block mb-3 font-bold">
          // Secure Access
        </span>
        
        {/* FIX: Replaced explicit massive sizes with a fluid clamp. 
            It scales smoothly between 2.5rem (mobile) and 5.5rem (large desktop), 
            ensuring it never overflows the screen horizontally. */}
        <h1 className="font-display uppercase tracking-tight mb-6 leading-[0.9] text-center w-full"
            style={{ fontSize: "clamp(2.5rem, 8vw, 5.5rem)" }}>
          MEMBERSHIP ARCHITECTURE
        </h1>
        
        <p className="text-white/60 font-sans text-sm md:text-base leading-relaxed mb-10 max-w-xl text-center">
          Choose your tier of discipline. Cancel or adjust your parameters anytime. No hidden setup fees, just absolute physical progression.
        </p>
        
        {/* Animated Premium Toggle */}
        <div className="relative inline-flex items-center bg-white/5 border border-white/10 p-1 rounded-sm backdrop-blur-sm">
          {['monthly', 'annual'].map((cycle) => (
            <button 
              key={cycle}
              onClick={() => setBillingCycle(cycle)}
              className={`relative px-8 py-3 text-xs font-mono uppercase tracking-widest z-10 transition-colors duration-300 ${billingCycle === cycle ? 'text-black font-bold' : 'text-white/50 hover:text-white'}`}
            >
              {cycle === 'annual' ? 'Annual (Save 20%)' : 'Monthly'}
              {billingCycle === cycle && (
                <motion.div 
                  layoutId="activeCycle"
                  className="absolute inset-0 bg-[#C7FF00] -z-10 rounded-sm shadow-[0_0_15px_rgba(199,255,0,0.3)]"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ─── PRICING GRID ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center max-w-6xl mx-auto mb-24">
        {pricingData[billingCycle].map((plan, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            key={plan.name}
            className={`flex flex-col h-full relative p-8 md:p-10 transition-all duration-300 ${
              plan.popular 
                ? 'bg-brand-surface border border-[#C7FF00] shadow-[0_0_40px_rgba(199,255,0,0.1)] lg:scale-105 z-10' 
                : 'bg-white/5 border border-white/10 hover:border-white/30'
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#C7FF00] text-black font-mono text-[10px] font-extrabold uppercase px-4 py-1.5 tracking-widest shadow-lg">
                The Core Standard
              </div>
            )}
            
            <div className="flex-grow">
              <h3 className={`font-display text-2xl uppercase tracking-wider mb-2 ${plan.popular ? 'text-[#C7FF00]' : 'text-white'}`}>
                {plan.name}
              </h3>
              <p className="text-white/50 text-xs font-mono">{plan.desc}</p>
              
              <div className="flex items-baseline gap-1 my-8">
                <span className="text-4xl font-display text-white">$</span>
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={plan.price}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="text-7xl font-display tracking-tight text-white"
                  >
                    {plan.price}
                  </motion.span>
                </AnimatePresence>
                <span className="text-white/40 text-xs font-mono ml-2 uppercase">/ mo</span>
              </div>
              
              <ul className="space-y-4 border-t border-white/10 pt-8 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/70 group">
                    <span className="text-[#C7FF00] text-base mt-0.5">▹</span>
                    <span className="group-hover:text-white transition-colors">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button 
              className={`w-full font-display text-lg tracking-wider uppercase py-4 transition-all duration-300 mt-auto ${
                plan.popular 
                  ? 'bg-[#C7FF00] text-black hover:bg-white shadow-[0_0_20px_rgba(199,255,0,0.2)]' 
                  : 'bg-transparent border border-white/20 text-white hover:border-[#C7FF00] hover:text-[#C7FF00]'
              }`}
            >
              Select Protocol
            </button>
          </motion.div>
        ))}
      </div>

      {/* ─── OBJECTION HANDLING (FAQ) ─── */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto border-t border-white/10 pt-16 md:pt-20"
      >
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tight text-white mb-4">Systems Query / FAQ</h2>
          <p className="text-white/50 text-sm font-mono">Common inquiries regarding access parameters.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-brand-surface/30 p-6 md:p-8 border border-white/5 hover:border-white/20 transition-colors">
              <h4 className="text-[#C7FF00] font-mono text-xs uppercase tracking-widest mb-3">{faq.q}</h4>
              <p className="text-white/60 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ─── FALLBACK CTA ─── */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 md:mt-24 text-center border-t border-[#C7FF00]/20 pt-16 md:pt-20"
      >
        <h2 className="font-display text-4xl md:text-5xl uppercase tracking-tight mb-4">
          Not ready to commit?
        </h2>
        <p className="text-white/60 text-sm mb-8 max-w-md mx-auto">
          Experience the facility firsthand. No hard sells. Come in, lift the calibrated iron, and feel the environment.
        </p>
        <button 
          onClick={() => navigate('book-trial')}
          className="w-full sm:w-auto bg-transparent border border-[#C7FF00] text-[#C7FF00] font-display text-xl tracking-wider uppercase px-12 py-4 hover:bg-[#C7FF00] hover:text-black transition-all duration-300"
        >
          Claim 1-Day Pass
        </button>
      </motion.div>

    </div>
  );
}
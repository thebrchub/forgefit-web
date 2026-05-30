import React, { useEffect, useRef, useState } from 'react';
import BmiCalculator from '../components/BmiCalculator';
import { motion, AnimatePresence } from 'framer-motion';

// ─── HELPER HOOK ──────────────────────────────────────────────────────────
function useScrollAnimation() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Trigger only once
        }
      },
      { threshold: 0.2 } // Trigger when 20% visible
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

// ─── HELPER COMPONENT: DYNAMIC VIDEO CARD ────────────────────────────────
const DisciplineVideoCard = ({ tag, title, video, index, navigate, sectionVisible }) => {
  const videoRef = useRef(null);
  const cardRef = useRef(null);

  // Handle play/pause on intersection for mobile devices
  useEffect(() => {
    const isHoverable = window.matchMedia('(hover: hover)').matches;
    if (isHoverable) return; // Desktop relies on mouse events instead

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.5 } 
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  // Desktop Hover Controls
  const handleMouseEnter = () => {
    const isHoverable = window.matchMedia('(hover: hover)').matches;
    if (isHoverable) videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    const isHoverable = window.matchMedia('(hover: hover)').matches;
    if (isHoverable) videoRef.current?.pause();
  };

  return (
    <div
      ref={cardRef}
      onClick={() => navigate('programs')}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative h-64 sm:h-80 md:h-96 group overflow-hidden border border-white/5 cursor-pointer hover:border-[#C7FF00]/40 transition-all duration-700 transform rounded-lg md:rounded-none ${sectionVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <video
        ref={videoRef}
        src={video}
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out grayscale-0 opacity-80 md:grayscale md:opacity-50 md:group-hover:scale-110 md:group-hover:grayscale-0 md:group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent md:from-black md:via-black/50 opacity-90 md:opacity-80 md:group-hover:opacity-90 transition-opacity" />
      <div className="absolute bottom-0 left-0 p-6 md:p-8 transform md:group-hover:-translate-y-2 transition-transform duration-500">
        <span className="bg-[#C7FF00] text-black text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-1 mb-2 md:mb-3 inline-block shadow-[0_0_10px_rgba(199,255,0,0.5)]">
          {tag}
        </span>
        <h3 className="font-display text-3xl md:text-4xl text-white uppercase tracking-wider shadow-black drop-shadow-md">
          {title}
        </h3>
      </div>
      <div className="absolute top-6 right-6 md:top-8 md:right-8 text-white text-xs md:text-sm font-mono opacity-0 md:group-hover:opacity-100 transition-all transform md:translate-x-8 md:group-hover:translate-x-0 duration-500 tracking-widest bg-black/50 px-3 py-1 border border-white/20 backdrop-blur-sm">
        EXPLORE →
      </div>
    </div>
  );
};

// ─── MAIN HOME PAGE COMPONENT ─────────────────────────────────────────────
export default function Home({ navigate }) {
  // Sticky nav: adds backdrop on scroll
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Stat counter animation on scroll
  const statsRef = useRef(null);
  const [counted, setCounted] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !counted) setCounted(true); },
      { threshold: 0.4 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [counted]);

  // Animation Refs
  const [heroRef, heroVisible] = useScrollAnimation();
  const [manifestoRef, manifestoVisible] = useScrollAnimation();
  const [disciplinesRef, disciplinesVisible] = useScrollAnimation();
  const [caseStudyRef, caseStudyVisible] = useScrollAnimation();
  const [bmiRef, bmiVisible] = useScrollAnimation();
  const [ctaRef, ctaVisible] = useScrollAnimation();

  return (
    <div className="w-full bg-brand-bg selection:bg-[#C7FF00] selection:text-black overflow-x-hidden">

      {/* ─── 1. HERO (GYM ACTION VIDEO) ────────────────────────────────── */}
      <section className="relative min-h-[95vh] flex items-center px-6 lg:px-12 overflow-hidden">
        
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-[25%_center] md:object-center z-0 opacity-60"
        >
          <source src="/gym.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 z-0 bg-gradient-to-r from-brand-bg via-brand-bg/90 to-transparent md:to-brand-bg/40" />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-brand-bg via-brand-bg/40 to-transparent" />

        <div 
          ref={heroRef}
          className={`max-w-5xl z-10 relative -mt-16 md:mt-0 pt-10 md:pt-20 transition-all duration-1000 ease-out transform ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <h1 className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] uppercase tracking-tighter leading-[0.88] text-white mb-6 md:mb-8">
            PAIN IS<br />TEMPORARY.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C7FF00] via-white to-brand-gray">
              LEGACY IS<br />FOREVER.
            </span>
          </h1>

          <p className={`text-white/80 text-sm sm:text-base md:text-lg max-w-xl font-sans mb-8 md:mb-10 leading-relaxed border-l-2 border-[#C7FF00] pl-4 sm:pl-6 transition-all duration-1000 delay-300 ${heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            Stop looking for excuses. Enter a premium ecosystem designed for those
            who demand absolute physical dominance. Expert coaching, top-tier
            recovery, zero compromises.
          </p>

          <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-4 transition-all duration-1000 delay-500 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <button
              onClick={() => navigate('book-trial')}
              className="bg-[#C7FF00] text-black font-display text-lg sm:text-xl tracking-wider uppercase px-8 sm:px-12 py-5 sm:py-6 hover:bg-white transition-all transform hover:-translate-y-1 duration-200 shadow-[0_0_24px_rgba(199,255,0,0.35)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] font-bold active:scale-95 text-center"
            >
              Start Free Trial
            </button>
            <button
              onClick={() => navigate('membership')}
              className="border border-white/30 hover:border-[#C7FF00] text-white/80 hover:text-white font-display text-lg tracking-wider uppercase px-8 sm:px-10 py-5 sm:py-6 transition-all duration-200 bg-black/40 backdrop-blur-sm hover:bg-white/5 active:scale-95 text-center"
            >
              View Memberships
            </button>
          </div>
        </div>
      </section>

      {/* ─── 2. BRAND MANIFESTO & FEATURE CARDS ───────────────────────── */}
      <section ref={manifestoRef} className="py-20 md:py-28 px-6 lg:px-12 max-w-7xl mx-auto relative z-10">
        <div className={`flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6 md:gap-8 transition-all duration-1000 ${manifestoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-2xl w-full">
            <span className="text-[#C7FF00] uppercase tracking-widest text-xs font-mono block mb-3 md:mb-4 font-bold">
              — The Protocol
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl uppercase tracking-tight leading-[0.9]">
              Engineered For<br />Absolute Output
            </h2>
          </div>
          <p className="text-white/60 w-full md:max-w-md text-sm md:text-base leading-relaxed">
            We don't do casual fitness. Our infrastructure is built for athletes,
            by athletes. Every square foot of our hubs is optimized for
            performance, recovery, and measurable progression.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-px bg-transparent md:bg-white/5">
          {[
            { num: '01', title: 'Elite Arsenal', body: 'Competition-grade barbells, calibrated plates, and specialized machines you wont find in commercial chains.' },
            { num: '02', title: 'Data-Driven Coaching', body: 'Stop guessing. Our coaches map your biomechanics and metabolic rate to construct a bulletproof training blueprint.' },
            { num: '03', title: 'Recovery Labs', body: 'Train like a weapon, recover like a pro. Access cold plunges, infrared saunas, and hyperbaric chambers on-site.' },
          ].map(({ num, title, body }, index) => (
            <div
              key={num}
              className={`bg-brand-surface border border-white/10 p-8 md:p-10 hover:border-[#C7FF00]/60 transition-all duration-500 group relative overflow-hidden transform rounded-lg md:rounded-none ${manifestoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="absolute -bottom-4 -right-2 font-display text-[6rem] md:text-[8rem] text-white/[0.03] leading-none select-none pointer-events-none group-hover:text-[#C7FF00]/[0.08] group-hover:-translate-y-2 group-hover:-translate-x-2 transition-all duration-500">
                {num}
              </div>
              <div className="text-[#C7FF00] font-mono text-xs tracking-widest font-bold mb-6 uppercase transition-transform group-hover:translate-x-2 duration-300">
                {num}
              </div>
              <div className="w-8 h-px bg-[#C7FF00] mb-4 group-hover:w-16 transition-all duration-300" />
              <h3 className="font-display text-2xl uppercase tracking-wider mb-3 md:mb-4 text-white group-hover:text-[#C7FF00] transition-colors">
                {title}
              </h3>
              <p className="text-white/55 text-sm leading-relaxed relative z-10 group-hover:text-white/80 transition-colors">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 3. DISCIPLINES TEASER ────────────────────────────────────── */}
      <section ref={disciplinesRef} className="py-12 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { tag: 'Strength', title: 'Hypertrophy', video: '/home/1.mp4' },
            { tag: 'Metabolic', title: 'Conditioning', video: '/home/2.mp4' },
            { tag: 'Power', title: 'Athletic Edge', video: '/home/3.mp4' },
          ].map((item, index) => (
            <DisciplineVideoCard 
              key={item.title} 
              tag={item.tag}
              title={item.title}
              video={item.video}
              index={index} 
              navigate={navigate} 
              sectionVisible={disciplinesVisible} 
            />
          ))}
        </div>

        <div className={`flex justify-center mt-8 md:mt-10 transition-all duration-1000 delay-500 ${disciplinesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button
            onClick={() => navigate('programs')}
            className="group relative overflow-hidden border border-white/20 hover:border-[#C7FF00] text-white/60 hover:text-black font-mono text-xs uppercase tracking-widest px-8 py-4 transition-all duration-300 w-full sm:w-auto text-center"
          >
            <span className="absolute inset-0 w-full h-full bg-[#C7FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />
            <span className="relative z-10">View All Programs →</span>
          </button>
        </div>
      </section>

      {/* ─── 4. STATS STRIP ────────────────────────────────────────────── */}
      <section
        ref={statsRef}
        className="bg-brand-surface mt-16 md:mt-20 py-16 md:py-20 px-6 lg:px-12 border-y border-white/10"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-4 md:gap-8 text-center divide-x-0 md:divide-x divide-white/10">
          {[
            { value: '4+', label: 'Premium Hubs' },
            { value: '25+', label: 'Elite Coaches' },
            { value: '98%', label: 'Success Rate' },
            { value: '15k+', label: 'Members Forged' },
          ].map(({ value, label }, idx) => (
            <div key={label} className="group hover:bg-white/5 transition-colors duration-300 py-2 md:py-4 border-l border-white/10 md:border-none first:border-none">
              <div
                className={`font-display text-4xl sm:text-5xl md:text-7xl text-[#C7FF00] transition-all duration-700 transform group-hover:scale-110 ${
                  counted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: counted ? `${idx * 150}ms` : '0ms' }}
              >
                {value}
              </div>
              <div className="text-[10px] md:text-xs uppercase tracking-widest mt-2 font-mono font-bold text-white/50 group-hover:text-white transition-colors duration-300">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 5. FEATURED CASE STUDY (OVERLAP LAYOUT) ────────────────────── */}
      <section ref={caseStudyRef} className="py-20 md:py-32 px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
        <div className={`flex flex-col lg:flex-row gap-16 lg:gap-20 items-center transition-all duration-1000 ${caseStudyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          
          <div className="w-full lg:w-1/2 relative group mb-8 lg:mb-0">
            <div className="relative w-4/5 aspect-[4/5] md:aspect-square overflow-hidden border border-white/10 bg-brand-bg opacity-70 group-hover:opacity-100 transition-opacity duration-500">
              <img src="https://images.unsplash.com/photo-1599058917765-a780eda07a3e?q=80&w=600&auto=format&fit=crop" alt="Before state" className="w-full h-full object-cover grayscale" loading="lazy" />
              <div className="absolute inset-0 bg-black/40" />
              <span className="absolute top-4 left-4 bg-black/80 text-white/50 font-mono text-[10px] uppercase tracking-widest px-3 py-1 border border-white/10 backdrop-blur-sm">
                Initial Phase
              </span>
            </div>
            
            <div className="absolute -bottom-8 -right-4 w-3/4 aspect-[4/5] md:aspect-square overflow-hidden border-2 border-[#C7FF00]/50 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-10 transform group-hover:-translate-y-4 transition-transform duration-500">
              <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600&auto=format&fit=crop" alt="After state" className="w-full h-full object-cover" loading="lazy" />
              <span className="absolute bottom-4 left-4 bg-[#C7FF00] text-black font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 shadow-lg">
                Post Protocol
              </span>
            </div>
          </div>

          <div className="w-full lg:w-1/2 pt-12 lg:pt-0">
            <div className="inline-flex items-center gap-2 border border-[#C7FF00]/30 bg-[#C7FF00]/5 px-3 py-1 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF00]" />
              <span className="text-[#C7FF00] text-[10px] tracking-widest uppercase font-mono font-bold">Featured Benchmark</span>
            </div>
            
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight mb-4 text-white leading-[0.9]">
              Visual Evidence Of<br />Absolute Output
            </h2>
            <p className="text-white/60 font-sans text-sm md:text-base leading-relaxed mb-8">
              We don't just promise results; we engineer them. Observe the structural shift achieved through our Hypertrophy & Strength track. Data-driven programming yields undeniable physical manifestations.
            </p>
            
            <div className="grid grid-cols-3 gap-4 p-6 bg-brand-surface/50 border border-white/10 mb-8 backdrop-blur-sm">
              <div>
                <span className="text-white/40 block text-[10px] font-mono uppercase tracking-widest mb-2">Duration</span>
                <span className="text-xl md:text-2xl text-white font-display tracking-wider">16 WKS</span>
              </div>
              <div>
                <span className="text-white/40 block text-[10px] font-mono uppercase tracking-widest mb-2">Start Matrix</span>
                <span className="text-xl md:text-2xl text-red-400 font-display tracking-wider">28% BF</span>
              </div>
              <div>
                <span className="text-[#C7FF00]/60 block text-[10px] font-mono uppercase tracking-widest mb-2">Final Matrix</span>
                <span className="text-2xl md:text-3xl text-[#C7FF00] font-display tracking-wider">12% BF</span>
              </div>
            </div>

            <button
              onClick={() => navigate('transformations')}
              className="group relative overflow-hidden border border-white/20 hover:border-[#C7FF00] text-white/80 hover:text-black font-mono text-xs uppercase tracking-widest px-8 py-4 transition-all duration-300 w-full sm:w-auto text-center inline-block"
            >
              <span className="absolute inset-0 w-full h-full bg-[#C7FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />
              <span className="relative z-10">View All Case Studies →</span>
            </button>
          </div>

        </div>
      </section>

      {/* ─── 6. BMI CALCULATOR ───────────────────────────────────────── */}
      <section ref={bmiRef} className="py-24 md:py-32 relative border-y border-white/5 bg-[#050505] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_rgba(199,255,0,0.04),_transparent_50%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
          
          <div className={`transition-all duration-1000 ${bmiVisible ? 'opacity-100 translate-x-0' : 'opacity-0 md:-translate-x-12 translate-y-8 md:translate-y-0'}`}>
            <span className="text-[#C7FF00] uppercase tracking-widest text-xs font-mono block mb-4 font-bold border-l-2 border-[#C7FF00] pl-3">
              // System Diagnostics
            </span>
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tight mb-6 leading-[0.9]">
              ANALYZE YOUR<br />COMPOSITION
            </h2>
            <p className="text-white/60 font-sans text-sm md:text-base leading-relaxed mb-8 max-w-lg">
              Your body mass index is a foundational starting metric. While it
              doesn't calculate raw muscle index, it provides a solid structural
              trajectory baseline. Use our clean, client-side calculator instantly
              to see where you stand before booking a consultation.
            </p>
            
            <ul className="space-y-4 mb-10 border-l border-white/10 pl-6">
              {['Client-Side Execution', 'Zero Data Retention', 'Instant Architecture Analysis'].map((item, idx) => (
                <li
                  key={item}
                  className="flex items-center gap-4 text-xs md:text-sm text-white/50 font-mono group"
                >
                  <span className="text-[#C7FF00] text-lg leading-none transform group-hover:scale-125 transition-transform duration-300">⎔</span>
                  <span className="group-hover:text-white transition-colors tracking-wide">{item}</span>
                </li>
              ))}
            </ul>
            
            <button
              onClick={() => navigate('book-trial')}
              className="group relative overflow-hidden bg-transparent border border-white/20 text-white font-mono text-xs uppercase tracking-widest px-10 py-5 transition-all duration-300 hover:border-[#C7FF00]"
            >
              <span className="absolute inset-0 w-0 bg-[#C7FF00] group-hover:w-full transition-all duration-300 ease-out z-0" />
              <span className="relative z-10 group-hover:text-black font-bold transition-colors">Book a Consultation →</span>
            </button>
          </div>

          <div className={`relative transition-all duration-1000 delay-300 ${bmiVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 md:translate-x-12 translate-y-8 md:translate-y-0 scale-95'}`}>
            <div className="bg-[#0a0a0a] border border-white/10 p-8 md:p-12 relative shadow-[0_0_50px_rgba(0,0,0,0.8)]">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#C7FF00]/50" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#C7FF00]/50" />
              
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Diagnostic Tool v1.2</span>
                <span className="w-2 h-2 rounded-full bg-[#C7FF00] animate-pulse shadow-[0_0_10px_rgba(199,255,0,0.8)]" />
              </div>

              <div className="relative z-10">
                <BmiCalculator />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── FOOTER CTA STRIP ─────────────────────────────────────────── */}
      <section ref={ctaRef} className="border-t border-white/10 py-16 md:py-20 pb-24 md:pb-20 px-6 lg:px-12 text-center overflow-hidden">
        <div className={`transition-all duration-1000 ${ctaVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <span className="text-[#C7FF00] uppercase tracking-widest text-xs font-mono block mb-3 md:mb-4 font-bold">
            — Ready to Forge?
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl uppercase tracking-tight mb-6 md:mb-8 leading-[0.9]">
            Your First Session<br />Is On Us.
          </h2>
          <button
            onClick={() => navigate('book-trial')}
            className="w-full sm:w-auto bg-[#C7FF00] text-black font-display text-lg sm:text-xl tracking-wider uppercase px-10 sm:px-14 py-5 sm:py-6 hover:bg-white transition-all transform md:hover:-translate-y-2 duration-300 shadow-[0_0_24px_rgba(199,255,0,0.3)] md:hover:shadow-[0_20px_40px_rgba(255,255,255,0.4)] font-bold active:scale-95 text-center"
          >
            Claim Free Pass
          </button>
        </div>
      </section>

    </div>
  );
}
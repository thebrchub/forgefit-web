import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar({ currentPage, navigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll listener for dynamic navbar shrinking/blurring
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'programs', label: 'Programs' },
    { id: 'trainers', label: 'Coaches' },
    { id: 'transformations', label: 'Results' },
    { id: 'membership', label: 'Pricing' },
  ];

  const handleNavClick = (id) => {
    navigate(id);
    setIsMobileMenuOpen(false); // Close menu after clicking
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 lg:px-12 flex items-center justify-between
          ${isScrolled || isMobileMenuOpen
            ? 'py-3 bg-black/95 backdrop-blur-lg border-b border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]' 
            : 'py-5 md:py-6 bg-transparent border-b border-transparent'
          }`}
      >
        
        <div 
          onClick={() => handleNavClick('home')} 
          className="cursor-pointer z-50 relative flex items-center group"
        >
          <img 
            src="/logo.svg" 
            alt="ForgeFit Logo" 
            className="h-14 sm:h-8 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
          />
        </div>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`group relative text-sm font-medium tracking-wide uppercase transition-colors duration-200 py-1 ${
                currentPage === item.id ? 'text-white' : 'text-brand-gray hover:text-white'
              }`}
            >
              {item.label}
              
              {/* Animated Underline */}
              <span 
                className={`absolute bottom-0 left-0 h-[2px] bg-[#C7FF00] transition-all duration-300 ease-out
                  ${currentPage === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`} 
              />
            </button>
          ))}
        </div>

        {/* DESKTOP CTA BUTTON */}
        <div className="hidden md:block">
          <button 
            onClick={() => handleNavClick('book-trial')}
            className="relative overflow-hidden border border-[#C7FF00] text-[#C7FF00] font-display tracking-wider text-sm uppercase px-6 py-2.5 transition-all duration-300 group hover:shadow-[0_0_15px_rgba(199,255,0,0.4)]"
          >
            <span className="absolute inset-0 w-full h-full bg-[#C7FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">
              Book Free Pass
            </span>
          </button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white hover:text-[#C7FF00] transition-colors z-50 relative p-2"
        >
          {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </nav>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            /* FIX: Shifted to justify-start and added pt-32 to lift content above the bottom CTA */
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-start pt-32 pb-24 px-6 overflow-y-auto"
          >
            {/* Reduced gap slightly on small screens to ensure everything fits perfectly */}
            <div className="flex flex-col items-center gap-6 sm:gap-8 w-full max-w-sm">
              {navItems.map((item, i) => (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`font-display text-4xl uppercase tracking-widest w-full text-center transition-colors ${
                    currentPage === item.id ? 'text-[#C7FF00]' : 'text-white hover:text-[#C7FF00]'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
              
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.05 + 0.1 }}
                onClick={() => handleNavClick('book-trial')}
                className="mt-6 sm:mt-8 w-full border border-[#C7FF00] text-[#C7FF00] font-display text-2xl uppercase py-4 hover:bg-[#C7FF00] hover:text-black transition-colors"
              >
                Book Free Pass
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Membership from './pages/Membership';
import Trainers from './pages/Trainers';
import Programs from './pages/Programs';
import Transformations from './pages/Transformations';
import BookTrial from './pages/BookTrial';
import Footer from './components/Footer';

export default function App() {
  // 1. Read the URL hash on load (e.g., "#programs" becomes "programs"). Default to 'home'.
  const getHashPage = () => window.location.hash.replace('#', '') || 'home';
  const [currentPage, setCurrentPage] = useState(getHashPage());

  // 2. Listen for URL changes (handles browser Back/Forward buttons and refreshes)
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getHashPage());
      // Smoothly scroll to top whenever the URL hash changes
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // 3. Centralized navigation function that updates the URL instead of just state
  const navigate = useCallback((page) => {
    window.location.hash = page;
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home navigate={navigate} />;
      case 'membership': return <Membership navigate={navigate} />;
      case 'trainers': return <Trainers navigate={navigate} />;
      case 'programs': return <Programs navigate={navigate} />;
      case 'transformations': return <Transformations navigate={navigate} />;
      case 'book-trial': return <BookTrial navigate={navigate} />;
      default: return <Home navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg text-white flex flex-col antialiased selection:bg-[#C7FF00] selection:text-black">
      {/* Navbar sits outside the animation so it never re-renders or breaks */}
      <Navbar currentPage={currentPage} navigate={navigate} />
      
      {/* FIX: Added 'flex-grow flex flex-col' to main. 
        This prevents layout collapsing when Framer Motion unmounts the page.
      */}
      <main className="flex-grow flex flex-col relative pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full flex-grow"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer navigate={navigate} />
      
      {/* Sticky Mobile CTA */}
      <div className="md:hidden fixed bottom-6 left-0 right-0 z-50 px-4">
        <button 
          onClick={() => navigate('book-trial')}
          className="w-full bg-[#C7FF00] text-black font-display text-xl py-4 tracking-wide shadow-2xl active:scale-[0.98] transition-transform uppercase duration-150 font-bold"
        >
          Claim Your Free Pass
        </button>
      </div>
    </div>
  );
}
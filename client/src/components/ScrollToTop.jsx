import React, { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-50
        w-11 h-11 flex items-center justify-center
        rounded-full backdrop-blur-lg
        bg-white/10 border border-white/20
        text-white shadow-lg
        transition-all duration-300

        hover:bg-yellow-400 hover:text-black hover:scale-110

        ${visible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-6 pointer-events-none'}
      `}
    >
      <FiArrowUp size={18} />
    </button>
  );
};

export default ScrollToTop;
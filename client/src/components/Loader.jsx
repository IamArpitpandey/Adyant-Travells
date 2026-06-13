import React from 'react';

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="text-center">
        <div className="mb-6">
          <div className="loader-ring mx-auto"></div>
        </div>
        <div className="font-display text-3xl text-gold-DEFAULT mb-2">Adyant</div>
        <div className="font-script text-gold-light text-xl">Travells & Marriage Planner</div>
        <div className="mt-4 text-white/50 text-sm font-body tracking-widest uppercase animate-pulse">
          Crafting Your Dream Journey...
        </div>
      </div>
    </div>
  );
};

export default Loader;

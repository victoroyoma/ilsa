import React from 'react';
export const Footer: React.FC = () => {
  return <footer className="relative z-10 py-8 mt-12 border-t border-white/10 bg-black/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="text-amber-500 font-bold text-xl tracking-tight mb-2">
              ILSA<span className="text-white">2025</span>
            </div>
            <p className="text-white/60 text-sm max-w-md">
              International Longevity Summit Africa 2025
              <br />
              Sun Sibaya Hotel, Durban, KwaZulu-Natal, South Africa
            </p>
          </div>
          <div className="text-center md:text-right">
            <h4 className="text-white font-medium mb-2">With thanks to:</h4>
            <div className="text-white/60 text-sm">
              <p>TAFFD's</p>
              <p>Afrolongevity</p>
              <p>South African Tourism Board</p>
              <p>KwaZulu-Natal Convention Bureau</p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} International Longevity Summit Africa.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
};
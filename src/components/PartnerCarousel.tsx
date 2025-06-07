import React, { useEffect, useState } from 'react';
const partners = [{
  name: 'BioTech Africa',
  logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&crop=center&q=80'
}, {
  name: 'Health Innovation Lab',
  logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&h=100&fit=crop&crop=center&q=80'
}, {
  name: 'African Research Council',
  logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&h=100&fit=crop&crop=center&q=80'
}, {
  name: 'Global Longevity Institute',
  logo: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=200&h=100&fit=crop&crop=center&q=80'
}, {
  name: 'Future Health Foundation',
  logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=100&fit=crop&crop=center&q=80'
}, {
  name: 'Tech Innovations SA',
  logo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=100&fit=crop&crop=center&q=80'
}];
export const PartnerCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % (partners.length - 2));
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return <div className="w-full overflow-hidden bg-gradient-to-b from-blue-900/20 to-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-8">
      <div className="relative">
        <div className="flex transition-transform duration-500 ease-in-out" style={{
        transform: `translateX(-${currentIndex * (100 / 3)}%)`
      }}>
          {/* Duplicate the partners array for infinite scroll effect */}
          {[...partners, ...partners].map((partner, index) => <div key={index} className="w-1/3 flex-shrink-0 px-4" style={{
          minWidth: 'calc(100% / 3)'
        }}>
              <div className="bg-black/30 rounded-lg p-4 h-32 flex items-center justify-center group hover:bg-black/40 transition-all duration-300">
                <img src={partner.logo} alt={partner.name} className="max-h-20 max-w-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <p className="text-center text-white/60 text-sm mt-2">
                {partner.name}
              </p>
            </div>)}
        </div>
      </div>
    </div>;
};
import React, { useEffect, useState } from 'react';
// Background slideshow images
const images = ['https://images.unsplash.com/photo-1564325724739-bae0bd08762c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80', 'https://images.unsplash.com/photo-1526142684086-7ebd69df27a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80', 'https://images.unsplash.com/photo-1516600164266-f3b8166ae679?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80', 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80' // African cultural elements
];
export const Background: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [previousImageIndex, setPreviousImageIndex] = useState(-1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setPreviousImageIndex(currentImageIndex);
      setIsTransitioning(true);
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
      const transitionTimeout = setTimeout(() => {
        setIsTransitioning(false);
      }, 1000);
      return () => clearTimeout(transitionTimeout);
    }, 6000);
    return () => clearInterval(interval);
  }, [currentImageIndex]);
  return <div className="fixed inset-0 w-full h-full overflow-hidden">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/90 z-10"></div>
      {/* Holographic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-purple-800/10 to-amber-700/20 z-20"></div>
      {/* Background particle effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,215,0,0.05)_0%,_rgba(0,0,0,0)_70%)] z-20"></div>
      {/* Current image */}
      <div className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${isTransitioning ? 'opacity-100' : 'opacity-100'}`} style={{
      backgroundImage: `url(${images[currentImageIndex]})`
    }}></div>
      {/* Previous image (for transition) */}
      {previousImageIndex >= 0 && <div className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-0'}`} style={{
      backgroundImage: `url(${images[previousImageIndex]})`
    }}></div>}
    </div>;
};
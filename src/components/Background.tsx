import React, { useEffect, useState } from 'react';

// Cloudinary images for ILSA 2025 (replace public_ids with your actual images)
const images = [
  'https://res.cloudinary.com/dmqjqn6x3/image/upload/v1749332680/IMG_7604-scaled_idxrlg.jpg',
  'https://res.cloudinary.com/dmqjqn6x3/image/upload/v1749332685/IMG_7992-scaled_ovyl6b.jpg',
  'https://res.cloudinary.com/dmqjqn6x3/image/upload/v1749332666/IMG_7334-1-scaled_cxite9.jpg',
  'https://res.cloudinary.com/dmqjqn6x3/image/upload/v1749332651/IMG_7638-scaled_bvzfh4.jpg',
  'https://res.cloudinary.com/dmqjqn6x3/image/upload/v1749332645/IMG_7643-1-scaled_dzdqxd.jpg',
  'https://res.cloudinary.com/dmqjqn6x3/image/upload/v1749332656/IMG_7327-1-scaled_m9la3f.jpg',
  'https://res.cloudinary.com/dmqjqn6x3/image/upload/v1749332691/de-grey_tdrbef.jpg',
];

export const Background: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Preload images to avoid flicker
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // Cycle images every 6 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Calculate previous image index (handle first image case)
  const previousImageIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      {/* Previous image (fading out) */}
      <div
        key={previousImageIndex}
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out opacity-0"
        style={{ backgroundImage: `url(${images[previousImageIndex]})` }}
        aria-hidden="true"
      ></div>
      {/* Current image (fading in) */}
      <div
        key={currentImageIndex}
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out opacity-100"
        style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
        aria-hidden="true"
      ></div>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/90 z-10"></div>
      {/* Holographic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-purple-800/10 to-amber-700/20 z-20"></div>
      {/* Background particle effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,215,0,0.05)_0%,_rgba(0,0,0,0)_70%)] z-20"></div>
    </div>
  );
};
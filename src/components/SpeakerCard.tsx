import React, { useState } from 'react';
interface SpeakerProps {
  name: string;
  title: string;
  organization: string;
  bio: string;
  imageUrl: string;
}
export const SpeakerCard: React.FC<SpeakerProps> = ({
  name,
  title,
  organization,
  bio,
  imageUrl
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  return <div className="h-[400px] w-full perspective-1000 cursor-pointer group" onClick={() => setIsFlipped(!isFlipped)}>
      <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden bg-gradient-to-b from-blue-900/40 to-black/60 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-blue-500/10"></div>
          <div className="h-1/2 overflow-hidden mt-4 mx-4">
            <img 
              src={imageUrl} 
              alt={name} 
              className="w-full h-full object-cover object-center rounded-lg border border-white/20" 
            />
          </div>
          <div className="p-6 flex flex-col justify-between h-1/2">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
              <p className="text-amber-400 font-medium mb-2">{title}</p>
              <p className="text-white/70 text-sm">{organization}</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/50">Tap to view bio</span>
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                <span className="text-amber-400 text-xs">+</span>
              </div>
            </div>
          </div>
        </div>
        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-b from-blue-900/40 to-black/60 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 shadow-xl p-6 flex flex-col">
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-blue-500/10"></div>
          <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
          <p className="text-amber-400 font-medium mb-4">{title}</p>
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <p className="text-white/80 text-sm leading-relaxed">{bio}</p>
          </div>
          <div className="mt-4 flex items-center justify-between pt-2 border-t border-white/10">
            <span className="text-xs text-white/50">Tap to return</span>
          </div>
        </div>
      </div>
    </div>;
};
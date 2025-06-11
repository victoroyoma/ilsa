import React, { useState } from 'react';

interface SpeakerProps {
  name: string;
  title: string;
  organization: string;
  linkedInUrl: string;
  imageUrl: string;
}

export const SpeakerCard: React.FC<SpeakerProps> = ({
  name,
  title,
  organization,
  linkedInUrl,
  imageUrl
}) => {
  const [] = useState(false);

  return (
    <div className="h-[400px] w-full perspective-1000 cursor-pointer group">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 to-black/60 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-blue-500/10"></div>
          <div className="mx-4 mt-4">
            <img
              src={imageUrl}
              alt={name}
              className="w-full max-h-[200px] object-cover object-top rounded-lg border border-white/20"
            />
          </div>
          <div className="p-6 flex flex-col justify-between flex-1">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
              <p className="text-amber-400 font-medium mb-2">{title}</p>
              <p className="text-white/70 text-sm">{organization}</p>
            </div>
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg text-blue-400 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              View Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
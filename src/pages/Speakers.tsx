import React, { useEffect, useState } from 'react';
import { SpeakerCard } from '../components/SpeakerCard';
// Sample speaker data
const speakersData = [{
  name: 'Tesfahun Admasu, PhD',
  title: 'Project Scientist',
  organization: 'SIT',
  imageUrl: 'https://res.cloudinary.com/dmqjqn6x3/image/upload/v1778178787/afro1_ropgk5.jpg',
  imagePosition: 'object-top'
}, {
  name: 'Rozalyn Anderson PhD',
  title: 'Vilas Distinguished Professor, Director Wisconsin Nathan Shock Center',
  organization: 'Department of Medicine, SMPH, University of Wisconsin-Madison',
  imageUrl: 'https://res.cloudinary.com/dmqjqn6x3/image/upload/v1778178788/afro2_p9yast.jpg'
}, {
  name: 'Holly M. Brown-Borg, Ph.D.',
  title: 'UND Chester Fritz Distinguished Professor, Department of Biomedical Sciences',
  organization: 'University of North Dakota School of Medicine & Health Sciences',
  imageUrl: 'https://res.cloudinary.com/dmqjqn6x3/image/upload/v1778178787/afro3_te91xo.jpg'
}, {
  name: 'Rochelle Buffenstein, Ph.D',
  title: 'Comparative Biologist, Distinguished Research Professor',
  organization: 'University of Illinois Chicago, USA',
  imageUrl: 'https://res.cloudinary.com/dmqjqn6x3/image/upload/v1778178788/afro4_ijemno.jpg'
}, {
  name: 'Antonia Schultze-Mosgau PhD',
  title: 'Neuroeconomist & Psychologist, President',
  organization: 'Oxford Society of Aging and Longevity',
  imageUrl: 'https://res.cloudinary.com/dmqjqn6x3/image/upload/v1778178789/afro5_o9bkif.jpg'
}, {
  name: 'Didier Coeurnelle',
  title: 'Chair',
  organization: 'Heales (Healthy Life Extension Society), Brussels, Belgium',
  imageUrl: 'https://res.cloudinary.com/dmqjqn6x3/image/upload/v1778178788/afro6_fprvgr.jpg'
}, {
  name: 'Prof. Ilia Stambler, PhD',
  title: 'Chief Science Officer and Chairman of Vetek (Seniority) Association',
  organization: 'International Longevity Alliance (ILA)',
  imageUrl: 'https://res.cloudinary.com/dmqjqn6x3/image/upload/v1778178787/afro7_jzjf7m.jpg'
},];
export const Speakers: React.FC = () => {
  const handleDownload = () => {
  const pdfUrl = "https://drive.google.com/file/d/1awdNrheBcPeR2hDFxZerrieBjIDqJJcf/view?usp=sharing";
  const link = document.createElement("a");
  link.href = pdfUrl;
  link.download = "ILSA_2026_CFA1.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


  const [visibleSpeakers, setVisibleSpeakers] = useState<typeof speakersData>([]);
  useEffect(() => {
    // Animate speakers appearing one by one
    const timer = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < speakersData.length) {
          setVisibleSpeakers(prev => [...prev, speakersData[index]]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 200);
      return () => clearInterval(interval);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  return <div className="w-full min-h-screen pt-24">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fadeIn">
            Summit <span className="text-amber-400">Speakers</span>
          </h1>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Meet the visionary leaders, researchers, and innovators who are
            shaping the future of longevity science in Africa and beyond.
          </p>
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-900/30 to-blue-900/10 backdrop-blur-sm border border-blue-500/30">
            <span className="text-blue-400 mr-2">●</span>
            <span className="text-white/80 text-sm">
              Call for abstracts now open
            </span>
          </div>
        </div>
        {/* Abstract submission section */}
        <div className="max-w-4xl mx-auto mb-20 bg-gradient-to-b from-blue-900/20 to-black/40 backdrop-blur-sm rounded-xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Submit Your Abstract
          </h2>
          <p className="text-white/70 mb-6">
            We invite researchers, scientists, and innovators to submit
            abstracts for consideration at ILSA 2026. Selected abstracts will be
            featured in our Innovation & Research Showcases.
          </p>


   <div className="flex justify-center items-center py-10">
  <button
    className="bg-gradient-to-r from-amber-500 to-amber-600 text-black px-6 py-3 rounded-md font-medium hover:from-amber-400 hover:to-amber-500 transition-all duration-300"
    onClick={handleDownload}
  >
    See Guidelines and Download Abstract Template
  </button>
</div>
        </div>

        {/* Speakers grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleSpeakers.map((speaker, index) => <div key={index} className="animate-fadeInUp" style={{
          animationDelay: `${index * 100}ms`
        }}>
              <SpeakerCard {...speaker} />
            </div>)}
        </div>
        {/* Summit advisors */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-white mb-8">
            Summit <span className="text-amber-400">Advisors</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {['Scientific Committee', 'Ethics Board', 'Innovation Panel', 'Industry Partners'].map((advisor, index) => <div key={index} className="bg-gradient-to-b from-blue-900/20 to-black/40 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10">
                <span className="text-white/80">{advisor}</span>
              </div>)}
          </div>
        </div>
      </div>
    </div>;

};
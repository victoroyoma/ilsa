import React, { useEffect, useRef } from 'react';
import { Button } from '../components/Button';
import { CountdownTimer } from '../components/CountdownTimer';
import { MapPinIcon, CalendarIcon } from 'lucide-react';
import { PartnerCarousel } from '../components/PartnerCarousel';

export const Home: React.FC = () => {
  const taglineRef = useRef<HTMLDivElement>(null);
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    // Typewriter effect for tagline
    const tagline = '“Africa is fast becoming the leader in shaping the frame of longevity science and driving the solutions that will leap frog its progress , be part of the conversation !';
    const taglineElement = taglineRef.current;
    if (taglineElement) {
      taglineElement.textContent = '';
      let i = 0;
      const typeWriter = () => {
        if (i < tagline.length) {
          taglineElement.textContent += tagline.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        }
      };
      setTimeout(() => {
        typeWriter();
      }, 1000);
    }
    // Animate phases
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    phaseRefs.current.forEach(phase => {
      if (phase) {
        observer.observe(phase);
      }
    });
    return () => {
      phaseRefs.current.forEach(phase => {
        if (phase) {
          observer.unobserve(phase);
        }
      });
    };
  }, []);

  return <div className="w-full min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fadeIn">
              International Longevity Summit Africa
              <span className="text-amber-400 block mt-2">ILSA 2025</span>
            </h1>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-8 text-white/80">
              <div className="flex items-center">
                <CalendarIcon className="w-5 h-5 text-amber-400 mr-2" />
                <span>September 10–11, 2025</span>
              </div>
              <div className="flex items-center">
                <MapPinIcon className="w-5 h-5 text-amber-400 mr-2" />
                <span>Sun Sibaya Hotel, Durban, South Africa</span>
              </div>
            </div>
            <div ref={taglineRef} className="text-xl md:text-2xl font-semibold text-white/90 mb-10 h-20 md:h-16 flex items-center justify-center"></div>
            <p className="text-white/70 mb-10 max-w-2xl mx-auto">
              Join us for an in-person summit focused on real-time collaboration
              and innovation in longevity science.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button variant="primary" to="/tickets">
                Registration
              </Button>
              <Button variant="secondary" to="/speakers">
                Call for Abstract
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Countdown Section */}
      <section className="py-16 bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-8">
          <CountdownTimer />
        </div>
      </section>
      {/* Event Structure Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
            Summit <span className="text-amber-400">Structure</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
            title: 'Masterclasses',
            description: 'Equip and challenge participants with cutting-edge knowledge and practical skills in longevity science.',
            icon: '🧠'
          }, {
            title: 'Keynote Addresses',
            description: 'Inspire and guide  the Future of leadership in  the global longevity research and innovation',
            icon: '🌟'
          }, {
            title: 'Innovation & Research Showcases',
            description: 'Redefine possibilities in health, aging, and science through groundbreaking African innovations.',
            icon: '🔬'
          }].map((phase, index) => <div key={index} ref={el => phaseRefs.current[index] = el} className="bg-gradient-to-b from-blue-900/20 to-black/40 backdrop-blur-sm rounded-xl p-8 border border-white/10 transition-all duration-700 opacity-0 translate-y-10" style={{
            transitionDelay: `${index * 200}ms`
          }}>
                <div className="text-4xl mb-4">{phase.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {phase.title}
                </h3>
                <p className="text-white/70">{phase.description}</p>
              </div>)}
          </div>
        </div>
      </section>
      {/* Location Map Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            <span className="text-amber-400">Venue</span> Location
          </h2>
          <div className="bg-gradient-to-b from-blue-900/20 to-black/40 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10">
            <div className="aspect-video w-full">
               <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55135.73390643207!2d31.056359996948434!3d-29.691294476390183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ef70f97c85e48b7%3A0x8ee3d0f199db339f!2sSibaya%20Casino%20%26%20Entertainment%20Kingdom!5e0!3m2!1sen!2sng!4v1749202107235!5m2!1sen!2sng" width="100%" height="100%" style={{
              border: 0
            }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Venue Location"></iframe>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">
                Sun Sibaya Hotel
              </h3>
              <p className="text-white/70">
                Durban, KwaZulu-Natal, South Africa
                <br />
                10 minutes from King Shaka International Airport. <br /> 
                <b>Discounted Shuttle service available at the airport for registered delegates</b>
              </p>
              <p className="text-white/70 mt-4">
                Paid registered attendees get a discount for their stay in that week <br />
                ( you need a registration number to qualify for discount )
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Partners & Sponsors Section */}
      <section className="py-20 bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Our <span className="text-amber-400">Previous Partners</span>
          </h2>
          <PartnerCarousel />
          <div className="mt-8 text-center">
            <p className="text-white/60 text-sm">
              Interested in becoming an ILSA2025 partner? Contact us at
              afrolongevity@taffds.org
            </p>
          </div>
        </div>
      </section>
    </div>;
};
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
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fadeIn">
            International Longevity Summit Africa
            <span className="text-amber-400 block mt-2">ILSA 2026</span>
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-amber-300 mb-6">
            From Biology to Society: Advancing Healthy Aging in Africa
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-8 text-white/80">
            <div className="flex items-center">
              <CalendarIcon className="w-5 h-5 text-amber-400 mr-2" />
              <span>13–15 August 2026</span>
            </div>
            <div className="flex items-center">
              <MapPinIcon className="w-5 h-5 text-amber-400 mr-2" />
              <span>Shaggar Institute of Technology, Addis Ababa, Ethiopia</span>
            </div>
          </div>
          <div ref={taglineRef} className="text-lg md:text-xl font-medium text-white/90 mb-8 h-12 flex items-center justify-center"></div>
          <p className="text-white/70 mb-6 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            Africa is undergoing a profound demographic and health transition. ILSA 2026 convenes African and global leaders across biology, medicine, technology, policy, ethics, and innovation to advance a shared goal: building systems that support healthy, dignified living across the African lifespan.
          </p>
          <p className="text-white/60 mb-10 max-w-2xl mx-auto text-sm md:text-base">
            Organised by Afrolongevity & Shaggar Institute of Technology
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
    {/* Global Alignment Section */}
    <section className="py-20 bg-black/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-white">
          Global & Continental <span className="text-amber-400">Alignment</span>
        </h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-white/80 mb-6 text-center">
            In 2020, the World Health Organization declared 2020–2030 the <strong className="text-amber-400">Decade of Healthy Aging</strong>, calling on governments and institutions worldwide to redesign health systems around functional ability, prevention, and quality of life.
          </p>
          <p className="text-white/70 text-center mb-8">
            ILSA exists to translate these global and continental frameworks into African-owned platforms, dialogue, and action, positioning the continent not as a passive recipient of global aging agendas, but as an active architect of the future of longevity science and healthy aging policy.
          </p>
        </div>
      </div>
    </section>

    {/* Programme Structure Section */}
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
          Programme <span className="text-amber-400">Structure</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[{
            title: 'Keynote Addresses',
            description: 'High-level presentations from global and African leaders in longevity science, policy, and innovation.',
            icon: '🎤'
          }, {
            title: 'Scientific & Policy Sessions',
            description: 'Plenary sessions addressing biology of aging, clinical practice, and policy implementation.',
            icon: '🧬'
          }, {
            title: 'Thematic Panels',
            description: 'Technical discussions on biotechnology, healthtech, ethics, and innovation ecosystems.',
            icon: '💡'
          }, {
            title: 'Research Showcases',
            description: 'Platform for presenting cutting-edge research and innovations in healthy aging.',
            icon: '🔬'
          }, {
            title: 'Policy Roundtables',
            description: 'Implementation-focused discussions with policymakers, regulators, and development partners.',
            icon: '🏛️'
          }, {
            title: 'Networking Sessions',
            description: 'Partnership-building opportunities across academia, industry, healthcare, and government.',
            icon: '🤝'
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
    {/* Venue Section */}
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          <span className="text-amber-400">Venue</span> & Location
        </h2>
        <div className="bg-gradient-to-b from-blue-900/20 to-black/40 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10">
          <div className="aspect-video w-full">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.3969744524726!2d38.7577606!3d9.0247685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cf0e1cd1f5%3A0x9dcd91fe1db93f77!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2s!4v1234567890" width="600" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-2">
              Shaggar Institute of Technology
            </h3>
            <p className="text-white/70 mb-4">
              Addis Ababa, Ethiopia
            </p>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6">
              <h4 className="text-amber-400 font-semibold mb-2">Why Addis Ababa?</h4>
              <p className="text-white/70 text-sm">
                Addis Ababa is Africa's diplomatic and policy capital, hosting the African Union, the United Nations Economic Commission for Africa, and numerous continental and international institutions. By convening ILSA 2026 here, the summit situates healthy aging discussions at the intersection of science, policy, and continental decision-making.
              </p>
            </div>
            <p className="text-white/60 text-sm mb-6">
              Detailed information on accommodation, transport, and travel guidance will be provided to registered participants.
            </p>
          </div>
        </div>
      </div>
    </section>
    {/* Who Should Attend Section */}
    <section className="py-16 bg-black/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          Who Should <span className="text-amber-400">Attend</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[{
            title: 'Researchers & Clinicians',
            description: 'Biomedical, clinical, and public health researchers working on aging, longevity medicine, and healthcare professionals',
            icon: '🔬'
          }, {
            title: 'Innovators & Industry',
            description: 'HealthTech, BioTech, AgeTech innovators, pharmaceutical professionals, and wellness industry leaders',
            icon: '💡'
          }, {
            title: 'Policy & Academia',
            description: 'Policymakers, regulators, development partners, academic leaders, educators, and investors',
            icon: '🎓'
          }].map((audience, index) => <div key={index} className="bg-gradient-to-b from-blue-900/20 to-black/40 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-amber-500/30 transition-all duration-300">
            <div className="text-4xl mb-4">{audience.icon}</div>
            <h3 className="text-xl font-bold text-white mb-4">
              {audience.title}
            </h3>
            <p className="text-white/70">{audience.description}</p>
          </div>)}
        </div>
        <div className="text-center mt-12">
          <p className="text-white/80 text-lg mb-4">
            ILSA 2026 convenes a multidisciplinary and influence-oriented audience committed to advancing healthy aging across Africa.
          </p>
        </div>
      </div>
    </section>
    {/* Partners & Sponsors Section */}
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          Our <span className="text-amber-400">Partners</span>
        </h2>
        <PartnerCarousel />
        <div className="mt-8 text-center">
          <p className="text-white/60 text-sm mb-2">
            ILSA 2026 is delivered through a strategic collaboration between Afrolongevity and Shaggar Institute of Technology
          </p>
          <p className="text-white/60 text-sm">
            Interested in becoming an ILSA 2026 partner? Contact us at afrolongevity@taffds.org
          </p>
        </div>
      </div>
    </section>
  </div>;
};
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
    <section className="py-16 relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://res.cloudinary.com/dmqjqn6x3/image/upload/v1778178788/afrobg1_mcq2yf.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-bold text-center mb-10 text-white">
          <span className="text-amber-400">Venue</span> & Location
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left: venue photo */}
          <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl min-h-[340px]">
            <img
              src="https://res.cloudinary.com/dmqjqn6x3/image/upload/v1778178788/afrogb2_ietljm.jpg"
              alt="Shaggar Institute of Technology"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <span className="inline-block bg-amber-500/90 text-black text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
                Conference Venue
              </span>
              <h3 className="text-xl font-bold text-white drop-shadow">Shaggar Institute of Technology</h3>
              <p className="text-white/80 text-sm">Addis Ababa, Ethiopia</p>
            </div>
          </div>

          {/* Right: info */}
          <div className="flex flex-col gap-5">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">📍</span>
                <h4 className="text-white font-bold text-lg">Location</h4>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                Shaggar Institute of Technology, Addis Ababa — Africa's diplomatic and policy capital, home to the African Union and the UN Economic Commission for Africa.
              </p>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 backdrop-blur-sm flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🌍</span>
                <h4 className="text-amber-400 font-bold text-lg">Why Addis Ababa?</h4>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                By convening ILSA 2026 here, the summit situates healthy aging discussions at the intersection of science, policy, and continental decision-making — where global commitments meet African ambition.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🏨</span>
                <h4 className="text-white font-bold text-lg">Accommodation & Travel</h4>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Detailed information on accommodation, transport, and travel guidance will be provided to registered participants.
              </p>
            </div>
          </div>
        </div>

        {/* WhatsApp + Visa row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

          {/* WhatsApp group */}
          <div className="bg-[#075E54]/20 border border-[#25D366]/30 rounded-2xl p-6 backdrop-blur-sm flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#25D366]/20 flex items-center justify-center">
              <svg className="w-7 h-7 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div>
              <h4 className="text-white font-bold text-base mb-1">Join the Delegates Group</h4>
              <p className="text-white/60 text-xs mb-4">Stay updated with all conference announcements and connect with fellow delegates.</p>
              <a
                href="https://chat.whatsapp.com/H9mMnbWvjhM8IcEXSVbm6z?mode=gi_t"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bc5a] text-black text-sm font-bold px-5 py-2.5 rounded-full transition-colors"
              >
                Join WhatsApp Group
              </a>
            </div>
          </div>

          {/* Visa info */}
          <div className="lg:col-span-2 bg-blue-900/20 border border-blue-500/20 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🛂</span>
              <h4 className="text-white font-bold text-lg">Visa Guidelines — Addis Ababa, Ethiopia</h4>
            </div>

            {/* Two option cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-emerald-400 text-base">✅</span>
                  <p className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Recommended: Visa on Arrival</p>
                </div>
                <p className="text-white/70 text-xs leading-relaxed">
                  Tourist Visa on Arrival is available for eligible countries — check the full list at{' '}
                  <a href="https://www.evisa.gov.et" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">evisa.gov.et</a>.
                  Pay upon arrival in <span className="text-white font-medium">USD, EUR, GBP or CAD</span> (card also accepted).
                  This is the easiest option — we strongly recommend it over a conference visa.
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-blue-400 text-base">🌐</span>
                  <p className="text-blue-300 text-xs font-bold uppercase tracking-wider">Alternative: e-Visa (Before Departure)</p>
                </div>
                <p className="text-white/70 text-xs leading-relaxed">
                  Apply online at{' '}
                  <a href="https://www.evisa.gov.et" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">evisa.gov.et</a>{' '}
                  before you travel. Apply at least <span className="text-white font-medium">7–10 days</span> in advance.{' '}
                  <span className="text-amber-300 font-medium">Print your approved visa</span> — a payment receipt alone is NOT accepted at the border.
                  If not secured beforehand, you will be required to repay the visa fee on arrival.
                </p>
              </div>
            </div>

            {/* Important notes */}
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-4">
              <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">⚠️ Important Notes</p>
              <ul className="text-white/70 text-xs leading-relaxed space-y-1">
                <li>• Passengers entering for <span className="text-white font-medium">non-tourism purposes</span> (meetings, NGO activities, media, investment) must apply to the Immigration and Citizenship Service in advance.</li>
                <li>• Passport must be valid for at least <span className="text-white font-medium">6 months</span> from the arrival date.</li>
                <li>• Fake, damaged, premature, or electronically modified visas outside their validity period will not be accepted.</li>
              </ul>
            </div>

            {/* Documents + contacts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">Documents Required</p>
                <ul className="text-white/70 text-xs leading-relaxed space-y-1">
                  <li>• Valid passport (6+ months validity)</li>
                  <li>• Passport photo</li>
                  <li>• Official invitation letter from SIT <span className="text-white/40">(provided on confirmation)</span></li>
                  <li>• Proof of funds</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">Further Information</p>
                <ul className="text-white/70 text-xs leading-relaxed space-y-2">
                  <li>🌐 <a href="https://www.evisa.gov.et/faq" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">evisa.gov.et/faq</a></li>
                  <li>📧 <a href="mailto:support@evisa.gov.et" className="text-blue-400 hover:underline">support@evisa.gov.et</a></li>
                  <li>☎️ +251 111 262 635</li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl px-4 py-3 text-xs text-white/70">
              ✉️ For invitation letters and visa support documents:{' '}
              <a href="mailto:afrolongevity@taffds.org" className="text-amber-400 hover:underline font-medium">afrolongevity@taffds.org</a>
            </div>
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
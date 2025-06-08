import React, { useEffect, useState } from 'react';
import { SpeakerCard } from '../components/SpeakerCard';
// Sample speaker data
const speakersData = [{

  name: 'Dr. Joel I. Osorio, MD',
  title: 'CEO & Founder',
  organization: 'REGENERAGE® Elite Clinic UAE',
  bio: 'Dr. Dlamini is a pioneering researcher in stem cell therapies with over 15 years of experience in regenerative medicine. Her groundbreaking work on telomere extension in African populations has been published in leading scientific journals and has opened new avenues for longevity research.',
  imageUrl: 'https://res.cloudinary.com/ddkndbz6g/image/upload/v1749304883/speakers/joel_fccfwc.jpg'
}, {
  name: 'Prof. Edward Kunonga',
  title: 'Director of Population',
  organization: 'Health Management NENC ICB and NECS',
  bio: 'Professor Mbeki has dedicated his career to studying the genetic factors that contribute to longevity in diverse African populations. His research team has identified several novel biomarkers that may predict healthy aging outcomes across different ethnic groups.',
  imageUrl: 'https://res.cloudinary.com/ddkndbz6g/image/upload/v1749304884/speakers/edward_n1y83r.jpg'
}, {
  name: 'James Strole',
  title: 'Co-founder People Unlimited, Director',
  organization: 'Coalition for Radical Life Extension, RAADfest.',
  bio: 'Dr. Okafor combines computational biology with artificial intelligence to develop predictive models for age-related diseases. Her work has led to the development of several AI-driven diagnostic tools that are currently being implemented in healthcare systems across Africa.',
  imageUrl: 'https://res.cloudinary.com/ddkndbz6g/image/upload/v1749304884/speakers/james_ulqj9t.jpg'
}, {
  name: 'Aubrey de Grey, PhD',
  title: 'Founder, President and Chief Science Officer',
  organization: 'LEV Foundation.',
  bio: "Professor Nkrumah's research focuses on the social determinants of health span in African communities. His longitudinal studies on centenarians in rural villages have provided valuable insights into lifestyle factors that contribute to exceptional longevity.",
  imageUrl: 'https://res.cloudinary.com/ddkndbz6g/image/upload/v1749304883/speakers/aubrey_s3mfg4.jpg'
}, {
  name: 'Prof. Natasha, PhD',
  title: 'Leading Expert on Human Enhancement',
  organization: '',
  bio: 'Dr. Al-Maktoum is at the forefront of epigenetic research, studying how environmental factors influence gene expression and aging processes. Her team has developed novel interventions that target epigenetic modifications to potentially reverse aspects of cellular aging.',
  imageUrl: 'https://res.cloudinary.com/ddkndbz6g/image/upload/v1749304884/speakers/nathasha_fcx6cg.jpg'
}, {
  name: 'Prof. Yu-Xuan Lyu (Lu)',
  title: '',
  organization: 'Prof. Yu-Xuan Lyu (Lu)',
  bio: "Dr. Osei's research examines the biochemical pathways through which traditional African diets may contribute to longevity. His work has identified several compounds in indigenous foods that appear to activate longevity-associated genes and cellular pathways.",
  imageUrl: 'https://www.conference.taffds.org/wp-content/uploads/2024/08/WhatsApp-Image-2025-05-27-at-13.33.16_df41176d.jpg'
}, 
  {
  name: 'Jasmine Smith',
  title: 'CEO',
  organization: 'Rejuve.ai',
  bio: 'Professor Mbeki has dedicated his career to studying the genetic factors that contribute to longevity in diverse African populations. His research team has identified several novel biomarkers that may predict healthy aging outcomes across different ethnic groups.',
  imageUrl: 'https://res.cloudinary.com/ddkndbz6g/image/upload/v1749304883/speakers/jasmine_cghpbv.jpg'
}, {
  name: 'Dr. Nadine Hoosen',
  title: 'Chief Science Officer',
  organization: 'Afrolongevity',
  bio: 'Dr. Okafor combines computational biology with artificial intelligence to develop predictive models for age-related diseases. Her work has led to the development of several AI-driven diagnostic tools that are currently being implemented in healthcare systems across Africa.',
  imageUrl: 'https://res.cloudinary.com/ddkndbz6g/image/upload/v1749304884/speakers/nadine_mdpcy6.jpg'
}, {
  name: 'Ifeanyi Okeke Kenneth',
  title: 'Founder',
  organization: 'Ralex Technologies',
  bio: "Professor Nkrumah's research focuses on the social determinants of health span in African communities. His longitudinal studies on centenarians in rural villages have provided valuable insights into lifestyle factors that contribute to exceptional longevity.",
  imageUrl: 'https://res.cloudinary.com/ddkndbz6g/image/upload/v1749307105/speakers/ifeanyi_mwtfsh.jpg'
}, {
  name: 'Dr. Tamara Pheiffer',
  title: 'Chief Science and Research Officer',
  organization: 'Afrolongevity',
  bio: 'Dr. Al-Maktoum is at the forefront of epigenetic research, studying how environmental factors influence gene expression and aging processes. Her team has developed novel interventions that target epigenetic modifications to potentially reverse aspects of cellular aging.',
  imageUrl: 'https://res.cloudinary.com/ddkndbz6g/image/upload/v1749304885/speakers/tamara_lpow4w.jpg'
}, {
  name: 'Osinakachi Akuma Kalu',
  title: 'Biophilosopher Founder',
  organization: 'TAFFDS',
  bio: "Dr. Osei's research examines the biochemical pathways through which traditional African diets may contribute to longevity. His work has identified several compounds in indigenous foods that appear to activate longevity-associated genes and cellular pathways.",
  imageUrl: 'https://res.cloudinary.com/ddkndbz6g/image/upload/v1749304883/speakers/akuma_fmyffi.jpg'
},
{
  name: 'Charity Ifunanya Ogbodo PhD',
  title: 'Lecturer',
  organization: 'Nnamdi Azikiwe University',
  bio: 'Professor Mbeki has dedicated his career to studying the genetic factors that contribute to longevity in diverse African populations. His research team has identified several novel biomarkers that may predict healthy aging outcomes across different ethnic groups.',
  imageUrl: 'https://res.cloudinary.com/ddkndbz6g/image/upload/v1749304884/speakers/charity_efmvmx.jpg'
}, {
  name: 'Prof. Maduike C. O Ezeibe',
  title: 'Professor of Veterinary Medicine and Clinical Virology',
  organization: 'Michael Okpara University of Agriculture in Umudike, Nigeria',
  bio: 'Dr. Okafor combines computational biology with artificial intelligence to develop predictive models for age-related diseases. Her work has led to the development of several AI-driven diagnostic tools that are currently being implemented in healthcare systems across Africa.',
  imageUrl: 'https://res.cloudinary.com/ddkndbz6g/image/upload/v1749304884/speakers/ezeibe_zjci61.jpg'
}, {
  name: 'Brenda Ramokopelwa',
  title: 'CEO',
  organization: 'Afrolongevity & TAFFDS',
  bio: "Professor Nkrumah's research focuses on the social determinants of health span in African communities. His longitudinal studies on centenarians in rural villages have provided valuable insights into lifestyle factors that contribute to exceptional longevity.",
  imageUrl: 'https://res.cloudinary.com/ddkndbz6g/image/upload/v1749304883/speakers/brenda_nmszjg.jpg'
}, {
  name: 'Chogwu Abdul PhD',
  title: 'Director Transhumanist Africa',
  organization: 'University of Abuja',
  bio: 'Dr. Al-Maktoum is at the forefront of epigenetic research, studying how environmental factors influence gene expression and aging processes. Her team has developed novel interventions that target epigenetic modifications to potentially reverse aspects of cellular aging.',
  imageUrl: 'https://res.cloudinary.com/ddkndbz6g/image/upload/v1749304883/speakers/abdul_hhqkfh.jpg'
}, {
  name: 'Oleg Teterin Jr',
  title: 'Founder',
  organization: 'Longevity InTime BioTech, Delaware, USA',
  bio: "Dr. Osei's research examines the biochemical pathways through which traditional African diets may contribute to longevity. His work has identified several compounds in indigenous foods that appear to activate longevity-associated genes and cellular pathways.",
  imageUrl: 'https://res.cloudinary.com/ddkndbz6g/image/upload/v1749304885/speakers/oleg_gql2ya.jpg'
},];
export const Speakers: React.FC = () => {
  8
const handleDownload = () => {
  const pdfUrl = "https://drive.google.com/file/d/1awdNrheBcPeR2hDFxZerrieBjIDqJJcf/view?usp=sharing"; 
  const link = document.createElement("a");
  link.href = pdfUrl;
  link.download = "ILSA_2025_CFA1.pdf";
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
            abstracts for consideration at ILSA 2025. Selected abstracts will be
            featured in our Innovation & Research Showcases.
          </p>


   <div className="flex justify-center items-center py-10">
  <button
    className="bg-gradient-to-r from-amber-500 to-amber-600 text-black px-6 py-3 rounded-md font-medium hover:from-amber-400 hover:to-amber-500 transition-all duration-300"
    onClick={handleDownload}
  >
    Request Abstract Form
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
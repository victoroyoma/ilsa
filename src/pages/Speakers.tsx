import React, { useEffect, useState } from 'react';
import { SpeakerCard } from '../components/SpeakerCard';
// Sample speaker data
const speakersData = [{
  name: 'Dr. Nkosazana Dlamini',
  title: 'PhD, Chief Science Officer',
  organization: 'African Longevity Institute',
  bio: 'Dr. Dlamini is a pioneering researcher in stem cell therapies with over 15 years of experience in regenerative medicine. Her groundbreaking work on telomere extension in African populations has been published in leading scientific journals and has opened new avenues for longevity research.',
  imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
}, {
  name: 'Prof. Thabo Mbeki',
  title: 'MD, PhD, Research Director',
  organization: 'Global Health Innovations',
  bio: 'Professor Mbeki has dedicated his career to studying the genetic factors that contribute to longevity in diverse African populations. His research team has identified several novel biomarkers that may predict healthy aging outcomes across different ethnic groups.',
  imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
}, {
  name: 'Dr. Amara Okafor',
  title: 'PhD, Bioinformatics Specialist',
  organization: 'Tech4Longevity',
  bio: 'Dr. Okafor combines computational biology with artificial intelligence to develop predictive models for age-related diseases. Her work has led to the development of several AI-driven diagnostic tools that are currently being implemented in healthcare systems across Africa.',
  imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
}, {
  name: 'Prof. Kwame Nkrumah',
  title: 'MD, Gerontology Expert',
  organization: 'Pan-African Medical Research',
  bio: "Professor Nkrumah's research focuses on the social determinants of health span in African communities. His longitudinal studies on centenarians in rural villages have provided valuable insights into lifestyle factors that contribute to exceptional longevity.",
  imageUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
}, {
  name: 'Dr. Fatima Al-Maktoum',
  title: 'PhD, Epigenetics Researcher',
  organization: 'International Aging Research',
  bio: 'Dr. Al-Maktoum is at the forefront of epigenetic research, studying how environmental factors influence gene expression and aging processes. Her team has developed novel interventions that target epigenetic modifications to potentially reverse aspects of cellular aging.',
  imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
}, {
  name: 'Dr. Samuel Osei',
  title: 'PhD, Nutritional Biochemist',
  organization: 'Dietary Science Foundation',
  bio: "Dr. Osei's research examines the biochemical pathways through which traditional African diets may contribute to longevity. His work has identified several compounds in indigenous foods that appear to activate longevity-associated genes and cellular pathways.",
  imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
}];
export const Speakers: React.FC = () => {
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
          <div className="flex flex-col md:flex-row gap-4">
            <input type="text" placeholder="Email address" className="flex-1 bg-black/30 border border-white/20 rounded-md px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-amber-500/50" />
            <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-black px-6 py-3 rounded-md font-medium hover:from-amber-400 hover:to-amber-500 transition-all duration-300">
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
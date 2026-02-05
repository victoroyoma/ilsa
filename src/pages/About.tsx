import React from 'react'
import { Button } from '../components/Button'
import { ArrowRight, Calendar, Award, Users, Lightbulb, Globe, Target, BookOpen, Building2 } from 'lucide-react'

export const About: React.FC = () => {
  return (
    <div className="w-full min-h-screen pt-24">
      <div className="container mx-auto px-4 md:px-8 py-12">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fadeIn">
            About <span className="text-amber-400">ILSA 2026</span>
          </h1>
          <div className="prose prose-invert max-w-3xl mx-auto">
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              The International Longevity Summit Africa (ILSA) is Africa's premier interdisciplinary platform dedicated to advancing healthy aging through science, innovation, policy, and societal transformation.
            </p>
            <p className="text-white/70 text-base leading-relaxed">
              ILSA is not a conventional medical or academic conference. It is a strategic convening space where biological research, clinical practice, technological innovation, public policy, ethics, and lived African realities intersect. Its focus is not only on ideas, but on implementation, coordination, and long-term capacity building.
            </p>
          </div>
        </div>

        {/* Vision Statement */}
        <div className="max-w-4xl mx-auto mb-20 bg-gradient-to-b from-amber-500/20 to-black/40 backdrop-blur-sm rounded-xl p-8 border border-amber-500/30">
          <p className="text-xl md:text-2xl text-white/90 font-semibold text-center leading-relaxed">
            Hosted in Addis Ababa—Africa's diplomatic and policy capital—ILSA 2026 positions the continent not as a passive recipient of global aging agendas, but as an active architect of the future of longevity science and healthy aging policy.
          </p>
        </div>

        {/* Afrolongevity Legacy Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Afrolongevity: From Mandate to <span className="text-amber-400">Execution</span>
          </h2>
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-gradient-to-b from-blue-900/20 to-black/40 backdrop-blur-sm rounded-xl p-8 border border-white/10 mb-8">
              <p className="text-white/80 mb-4">
                Afrolongevity was launched in 2022 with a clear mandate: <strong className="text-amber-400">to position Africa as an active contributor to global longevity discourse while grounding healthy aging strategies in African biological, cultural, social, and institutional realities.</strong>
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
              year: '2023',
              location: 'Johannesburg, South Africa',
              achievement: 'First dedicated longevity summit on the African continent',
              details: 'Delegates from over 30 countries worldwide, spanning science, medicine, policy, technology, and civil society'
            },
            {
              year: '2024',
              location: 'Lagos, Nigeria',
              achievement: 'College of Medicine, University of Lagos collaboration',
              details: 'Anchored longevity discourse within one of Africa\'s largest health and research ecosystems'
            },
            {
              year: '2025',
              location: 'Durban, South Africa',
              achievement: 'Mangosuthu University of Technology partnership',
              details: 'Strengthened the interface between academia, technology, and industry at Sun Sibaya Hotel'
            }].map((event, index) => (
              <div key={index} className="bg-gradient-to-b from-blue-900/20 to-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-amber-500/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <Calendar className="w-8 h-8 text-amber-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">ILSA {event.year}</h3>
                    <p className="text-amber-400/80 mb-3 font-medium">{event.location}</p>
                    <p className="text-white/80 mb-2 font-semibold text-sm">{event.achievement}</p>
                    <p className="text-white/60 text-sm">{event.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-amber-500/20 to-amber-500/10 rounded-xl p-6 border border-amber-500/30">
              <p className="text-white/80 text-center">
                <strong className="text-amber-400">ILSA 2026</strong>, hosted in collaboration with the Shaggar Institute of Technology, represents the next stage of institutional maturity—consolidating global alignment, continental relevance, and African execution.
              </p>
            </div>
          </div>
        </div>

        {/* Summit Objectives & Thematic Areas */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Summit <span className="text-amber-400">Objectives</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {[{
              icon: <Target className="w-8 h-8" />,
              title: 'Scientific & Clinical Understanding',
              description: 'Advance understanding of aging in African populations through rigorous research and clinical evidence'
            },
            {
              icon: <Building2 className="w-8 h-8" />,
              title: 'Research to Policy Translation',
              description: 'Strengthen translation between research, innovation, and public policy implementation'
            },
            {
              icon: <Users className="w-8 h-8" />,
              title: 'Multi-Sector Collaboration',
              description: 'Foster collaboration across academia, industry, healthcare, and government'
            },
            {
              icon: <Globe className="w-8 h-8" />,
              title: 'Global Discourse Leadership',
              description: 'Elevate African perspectives within global healthy aging discourse'
            },
            {
              icon: <Lightbulb className="w-8 h-8" />,
              title: 'Innovation Ecosystems',
              description: 'Build sustainable ecosystems for longevity science and innovation in Africa'
            },
            {
              icon: <Award className="w-8 h-8" />,
              title: 'Long-Term Impact',
              description: 'Create lasting infrastructure for healthy aging policy, research, and capacity building'
            }].map((objective, index) => (
              <div key={index} 
                className="bg-gradient-to-b from-blue-900/20 to-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-amber-500/30 transition-all duration-300">
                <div className="text-amber-400 mb-4">{objective.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{objective.title}</h3>
                <p className="text-white/70 text-sm">{objective.description}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Thematic <span className="text-amber-400">Focus Areas</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Biology of aging and age-related disease mechanisms',
              'Longevity medicine, prevention, and life-course health',
              'Biotechnology, regenerative medicine, and emerging therapies',
              'HealthTech, MedTech, AI, and digital health systems',
              'Precision medicine for African populations',
              'Nutrition, food systems, and metabolic health',
              'Pharmaceutical integrity, drug safety, and regulation',
              'Bioethics, human enhancement, and responsible innovation',
              'Public health systems, policy implementation, and governance',
              'Industry, investment, and innovation ecosystems'
            ].map((theme, index) => (
              <div key={index} 
                className="bg-gradient-to-b from-blue-900/10 to-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-amber-500/20 transition-all duration-300">
                <p className="text-white/80 text-sm">{theme}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Partnership */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Strategic <span className="text-amber-400">Partnership</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-gradient-to-b from-amber-500/20 to-black/40 backdrop-blur-sm rounded-xl p-8 border border-amber-500/30">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-10 h-10 text-amber-400" />
                <h3 className="text-2xl font-bold text-white">Afrolongevity</h3>
              </div>
              <p className="text-white/80">
                Africa's leading longevity think tank advancing healthspan, lifespan, and quality-of-life frameworks rooted in African realities.
              </p>
            </div>
            
            <div className="bg-gradient-to-b from-blue-500/20 to-black/40 backdrop-blur-sm rounded-xl p-8 border border-blue-500/30">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-10 h-10 text-blue-400" />
                <h3 className="text-2xl font-bold text-white">Shaggar Institute of Technology</h3>
              </div>
              <p className="text-white/80">
                A diaspora-founded academic and research institution led by US-based scientists, with active platforms in Ethiopia and the United States, committed to science-driven education, research excellence, and innovation.
              </p>
            </div>
          </div>
          
          <div className="mt-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-b from-blue-900/20 to-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h4 className="text-white font-semibold mb-4 text-center">This partnership ensures:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Strong academic and research grounding',
                  'Institutional credibility and global knowledge exchange',
                  'Policy-relevant dialogue rooted in African contexts',
                  'Capacity building that extends beyond the summit'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                    <p className="text-white/70 text-sm">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-b from-amber-500/20 to-black/40 backdrop-blur-sm rounded-xl p-8 border border-amber-500/30">
            <h2 className="text-2xl font-bold text-white mb-4">
              Be Part of Africa's Longevity Future
            </h2>
            <p className="text-white/70 mb-8">
              Join us in Addis Ababa for ILSA 2026 and contribute to shaping healthy aging policy, research, and innovation across the continent.
            </p>
            <Button variant="primary" to="/tickets" className="group">
              Register Now
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

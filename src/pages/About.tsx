import React from 'react'
import { Button } from '../components/Button'
import { ArrowRight, Calendar, Award, Users, Lightbulb, Globe } from 'lucide-react'

export const About: React.FC = () => {
  return (
    <div className="w-full min-h-screen pt-24">
      <div className="container mx-auto px-4 md:px-8 py-12">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fadeIn">
            About <span className="text-amber-400">ILSA 2025</span>
          </h1>
          <div className="prose prose-invert max-w-2xl mx-auto">
            <p className="text-white/70 text-lg leading-relaxed">
              While the world debates the future of health, Africa is engineering it—on its own terms.
              ILSA is the only summit where the old and the new collide to forge radical protocols,
              business models, and diplomatic tools to bridge the longevity divide and build true global collaboration for the benefit of humanity.
            </p>
          </div>
        </div>

        {/* Vision Statement */}
        <div className="max-w-4xl mx-auto mb-20 bg-gradient-to-b from-amber-500/20 to-black/40 backdrop-blur-sm rounded-xl p-8 border border-amber-500/30">
          <p className="text-xl md:text-2xl text-white/90 font-semibold italic text-center">
            "ILSA 2025 is not a meeting of minds. It is a gathering of disruptors.
            A rebellion against premature death"
          </p>
        </div>

        {/* Legacy Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            A Legacy of <span className="text-amber-400">Innovation</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[{
              year: '2023',
              location: 'Cradle of Humankind, South Africa',
              theme: 'The Longevity and Biotech Revolution in Africa'
            },
            {
              year: '2024',
              location: 'College of Medicine University of Lagos, Nigeria',
              theme: 'Unlocking Revolutionary Health and Med-Tech Vistas'
            }].map((event, index) => (
              <div key={index} className="bg-gradient-to-b from-blue-900/20 to-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <Calendar className="w-8 h-8 text-amber-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">ILSA {event.year}</h3>
                    <p className="text-amber-400/80 mb-2">{event.location}</p>
                    <p className="text-white/70">{event.theme}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Key Features of <span className="text-amber-400">ILSA 2025</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
              icon: <Award className="w-8 h-8" />,
              title: 'Masterclasses',
              description: 'Expert-led sessions on longevity medicine, anti-aging protocols, and omics tech.'
            },
            {
              icon: <Users className="w-8 h-8" />,
              title: 'Disruptive Panels',
              description: 'Where Africa\'s policymakers, scientists, and innovators collaborate.'
            },
            {
              icon: <Lightbulb className="w-8 h-8" />,
              title: 'Startup Showcases',
              description: 'Featuring the boldest African med-tech and longevity startups.'
            },
            {
              icon: <Globe className="w-8 h-8" />,
              title: 'Longevity Manifesto',
              description: 'Witness the birth of Africa\'s longevity justice roadmap.'
            }].map((feature, index) => (
              <div key={index} 
                className="bg-gradient-to-b from-blue-900/20 to-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-amber-500/30 transition-all duration-300">
                <div className="text-amber-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-b from-amber-500/20 to-black/40 backdrop-blur-sm rounded-xl p-8 border border-amber-500/30">
            <h2 className="text-2xl font-bold text-white mb-4">
              Be Part of History
            </h2>
            <p className="text-white/70 mb-8">
              If you miss ILSA 2025, you won't just miss an event. You'll miss history.
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

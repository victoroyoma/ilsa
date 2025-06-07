import React from 'react'
import { Button } from '../components/Button'
export const About: React.FC = () => {
  return (
    <div className="w-full min-h-screen pt-24">
      <div className="container mx-auto px-4 md:px-8 py-12">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fadeIn">
            About <span className="text-amber-400">ILSA 2025</span>
          </h1>
          <p className="text-white/70 text-lg mb-8">
            Shaping the future of longevity science through African innovation
            and collaboration
          </p>
        </div>
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-b from-blue-900/20 to-black/40 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-white/70">
              To catalyze breakthrough discoveries in longevity science by
              bringing together Africa's brightest minds and fostering
              collaboration between researchers, innovators, and industry
              leaders.
            </p>
          </div>
          <div className="bg-gradient-to-b from-blue-900/20 to-black/40 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-white/70">
              To establish Africa as a global leader in longevity research and
              innovation, creating sustainable solutions that extend healthy
              human lifespans across the continent and beyond.
            </p>
          </div>
        </div>
        {/* Key Objectives */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Key <span className="text-amber-400">Objectives</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Knowledge Exchange',
                description:
                  'Facilitate the sharing of groundbreaking research and innovations in longevity science.',
              },
              {
                title: 'Collaboration',
                description:
                  'Foster partnerships between African institutions and global research organizations.',
              },
              {
                title: 'Innovation',
                description:
                  'Showcase cutting-edge developments in age-related research and biotechnology.',
              },
            ].map((objective, index) => (
              <div
                key={index}
                className="bg-gradient-to-b from-blue-900/20 to-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <h3 className="text-xl font-bold text-white mb-3">
                  {objective.title}
                </h3>
                <p className="text-white/70">{objective.description}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-6">
            Be Part of the Revolution
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Join us in Durban as we write the next chapter in longevity science.
            Together, we can shape a future where healthy aging is accessible to
            all.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button variant="primary" to="/tickets">
              Register Now
            </Button>
            <Button variant="secondary" to="/speakers">
              View Speakers
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

import React from 'react';
import { Button } from '../components/Button';
import { PlaneIcon, CarIcon, ClockIcon, HeadphonesIcon } from 'lucide-react';
export const Logistics: React.FC = () => {
  return <div className="w-full min-h-screen pt-24">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fadeIn">
            Seamless <span className="text-amber-400">Arrival</span> Experience
          </h1>
          <p className="text-white/70 mb-12">
            To ensure a warm and stress-free welcome, our official logistics
            partner, Syavaya, will provide dedicated airport meet-and-greet
            services for all delegates and speakers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[{
            icon: <CarIcon className="w-8 h-8 text-amber-400" />,
            title: 'Professional Transport Coordination',
            description: 'Vehicles will be stationed at the airport to receive all arriving participants, offering a smooth transition from the terminal to your accommodation or the summit venue.'
          }, {
            icon: <PlaneIcon className="w-8 h-8 text-amber-400" />,
            title: 'VIP Concierge',
            description: 'Special provisions will be made for VIPs, including personalized paging boards bearing your name and designation. You will be welcomed with dignity and clarity befitting your status.'
          }, {
            icon: <ClockIcon className="w-8 h-8 text-amber-400" />,
            title: 'Hourly Shuttle Transfers',
            description: 'Our shuttles will operate on an hourly interval, ensuring flexibility and reliability for participants arriving at different times throughout the day.'
          }, {
            icon: <HeadphonesIcon className="w-8 h-8 text-amber-400" />,
            title: 'On-Site Transport Desk',
            description: 'A dedicated transport help desk, staffed by our trained logistics team, will be available at the airport to assist with ad hoc arrivals, queries, or last-minute adjustments.'
          }].map((service, index) => <div key={index} className="bg-gradient-to-b from-blue-900/20 to-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-white/70">{service.description}</p>
              </div>)}
          </div>
          <div className="bg-gradient-to-r from-amber-500/20 to-amber-500/10 rounded-xl p-8 border border-amber-500/30">
            <h2 className="text-2xl font-bold text-white mb-4">
              Book Your Transport
            </h2>
            <p className="text-white/70 mb-6">
              Take advantage of our exclusive partnership with Syavaya to secure
              your transport at special discounted rates for ILSA 2025
              attendees.
            </p>
            <Button variant="primary" onClick={() => window.open('https://syavayagroup.co.za/shuttles-and-chauffeur/', '_blank')}>
              Book Discounted Transport
            </Button>
          </div>
        </div>
      </div>
    </div>;
};
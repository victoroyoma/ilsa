import React from 'react';
import { Button } from '../components/Button';
import { PlaneIcon, HotelIcon, MapPinIcon, InfoIcon } from 'lucide-react';
export const Logistics: React.FC = () => {
  return <div className="w-full min-h-screen pt-24">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fadeIn">
            Venue & <span className="text-amber-400">Travel</span>
          </h1>
          <p className="text-white/70 mb-12">
            ILSA 2026 takes place at the Shaggar Institute of Technology in Addis Ababa, Ethiopia—Africa's diplomatic and policy capital.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[{
            icon: <MapPinIcon className="w-8 h-8 text-amber-400" />,
            title: 'Venue',
            description: 'Shaggar Institute of Technology, Addis Ababa, Ethiopia. The venue is strategically located in Africa\'s diplomatic capital, home to the African Union and numerous international institutions.'
          }, {
            icon: <PlaneIcon className="w-8 h-8 text-amber-400" />,
            title: 'Travel to Addis Ababa',
            description: 'Addis Ababa is served by Bole International Airport, a major hub with connections to cities across Africa, Europe, Middle East, and Asia. Ethiopian Airlines offers extensive international and continental connectivity.'
          }, {
            icon: <HotelIcon className="w-8 h-8 text-amber-400" />,
            title: 'Accommodation',
            description: 'Detailed information on accommodation options, including hotels near the venue and special rates for ILSA 2026 participants, will be provided to registered delegates.'
          }, {
            icon: <InfoIcon className="w-8 h-8 text-amber-400" />,
            title: 'Travel Guidance',
            description: 'Comprehensive travel information, including visa requirements, transport options, and local guidance will be shared with all registered participants prior to the summit.'
          }].map((service, index) => <div key={index} className="bg-gradient-to-b from-blue-900/20 to-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-white/70">{service.description}</p>
              </div>)}
          </div>

          <div className="bg-gradient-to-r from-amber-500/20 to-amber-500/10 rounded-xl p-8 border border-amber-500/30 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Register for ILSA 2026
            </h2>
            <p className="text-white/70 mb-6">
              Complete your registration to receive detailed travel and accommodation information, including guidance on visa processes, recommended hotels, and transport options.
            </p>
            <Button variant="primary" to="/tickets">
              Register Now
            </Button>
          </div>

          <div className="bg-gradient-to-r from-blue-500/20 to-blue-500/10 rounded-xl p-8 border border-blue-500/30">
            <h2 className="text-2xl font-bold text-white mb-4">
              Contact Us
            </h2>
            <p className="text-white/70 mb-4">
              For inquiries about travel, accommodation, or logistics, please contact us:
            </p>
            <div className="text-white/80 space-y-2">
              <p>Email: afrolongevity@taffds.org</p>
              <p>Phone: +27 71 053 3436</p>
              <p>WhatsApp: +27 63 656 8545</p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
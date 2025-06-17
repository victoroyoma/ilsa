import React, { useState } from 'react';
import { Button } from '../components/Button';
import { AlertCircleIcon, CheckIcon } from 'lucide-react';
import { PaymentModal } from '../components/PaymentModal';
import { useNavigate } from 'react-router-dom';
import { getPaystackUrlForTicket } from '../utils/paystackUrls';

interface TicketTierProps {
  name: string;
  price: string;
  features: string[];
  highlight?: boolean;
  availableUntil?: string;
  onPurchase: () => void;
}
const TicketTier: React.FC<TicketTierProps> = ({
  name,
  price,
  features,
  highlight = false,
  availableUntil,
  onPurchase
}) => {
  return <div className={`relative rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105 ${highlight ? 'bg-gradient-to-b from-amber-500/20 to-black/60 border-2 border-amber-500/50' : 'bg-gradient-to-b from-blue-900/20 to-black/40 border border-white/10'}`}>
    {highlight && <div className="absolute top-0 right-0 bg-amber-500 text-black text-xs font-bold py-1 px-3 rounded-bl">
      RECOMMENDED
    </div>}
    <div className="p-6 md:p-8">
      <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
      {availableUntil && <p className="text-amber-400/80 text-sm mb-4">
        Available until {availableUntil}
      </p>}
      <div className="mb-6">
        <span className="text-3xl font-bold text-white">{price}</span>
        <span className="text-white/60 ml-1">ZAR</span>
        <span className="text-white/60 text-xs block mt-1">Excl VAT</span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => <li key={index} className="flex items-start">
          <CheckIcon className="w-5 h-5 text-amber-400 mr-3 mt-0.5 flex-shrink-0" />
          <span className="text-white/80 text-sm">{feature}</span>
        </li>)}
      </ul>
      <Button variant={highlight ? 'primary' : 'secondary'} className="w-full" onClick={onPurchase}>
        Secure Your Place
      </Button>
    </div>
  </div>;
};
export const Tickets: React.FC = () => {
  const [selectedTicket, setSelectedTicket] = useState<{
    type: string;
    price: string;
  } | null>(null);
  const navigate = useNavigate();
  
  const handlePurchase = (type: string, price: string) => {
    // Always navigate to registration form first
    navigate(`/registration/${encodeURIComponent(type)}/${encodeURIComponent(price)}`);
  };

  return <div className="w-full min-h-screen pt-24">
    <div className="container mx-auto px-4 md:px-8 py-12">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-amber-500/30 to-amber-500/10 backdrop-blur-sm border border-amber-500/30 mb-8 animate-pulse">
          <span className="text-amber-400 mr-2">●</span>
          <span className="text-white/80 text-sm">
            Ticket Sales Now Open!
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fadeIn">
          Secure Your <span className="text-amber-400">Place</span>
        </h1>
        <p className="text-white/70 mb-8 max-w-2xl mx-auto">
          Join visionary leaders, researchers, and innovators at the
          International Longevity Summit Africa 2025 for an immersive
          in-person experience that will shape the future of longevity
          science.
        </p>
      </div>
      {/* Ticket tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <TicketTier 
          name="Standard Delegate" 
          price="3,500" 
          features={['Full summit access (2 days)', 'Conference Meals', 'Conference Bag', ' Discounted Airport Transfer ' ]} 
          onPurchase={() => handlePurchase('Standard Delegate', '3500')} 
        />
        <TicketTier 
          name="Student Delegate" 
          price="1,000" 
          features={['Full summit access (2 days)', 'Conference Meals ( verifiable student number required)', 'Current institute of learnings will be verified', ]} 
          onPurchase={() => handlePurchase('Student Delegate', '1000')} 
        />
        <TicketTier 
          name="MasterClass Only (No Conference Access)" 
          price="2,000" 
          features={['Access to Innovation Showcases', 'MasterClass materials and resources']} 
          onPurchase={() => handlePurchase('MasterClass Only', '2000')} 
        />
        <TicketTier 
          name="Full Conference + MasterClass Combo" 
          price="5,500 (R500 Discount)" 
          highlight={true}
          features={['Full summit access (2 days)', 'Conference Meals', 'Conference Bag',]} 
          onPurchase={() => handlePurchase('Full Conference + MasterClass Combo', '5500')} 
        />
        <TicketTier 
          name="VIP Delegate ( Premium Access)" 
          price="13,000" 
          features={['Full summit access (2 days)', ' 2 Nights at Sibaya Lodge', 'VIP transfer from Airport', 'Premium seating at the event', 'VIP networking opportunities', 'Exclusive access to VIP lounge', 'Priority access to all sessions',]} 
          onPurchase={() => handlePurchase('VIP Delegate', '13000')} 
        />
      </div>
      {/* Payment Modal */}
      <PaymentModal isOpen={selectedTicket !== null} onClose={() => setSelectedTicket(null)} ticketType={selectedTicket?.type || ''} price={selectedTicket?.price || ''} />
      {/* Visa application section */}
      <div className="max-w-4xl mx-auto bg-gradient-to-b from-blue-900/20 to-black/40 backdrop-blur-sm rounded-xl p-8 border border-white/10 mb-16">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="md:flex-1">
            <h2 className="text-2xl font-bold text-white mb-4">
              Visa Application Support
            </h2>
            <p className="text-white/70 mb-6">
              International attendees may require a visa to enter South
              Africa. Our team can provide necessary documentation to support
              your visa application process.
            </p>
            <div className="flex items-start mb-6">
              <AlertCircleIcon className="w-5 h-5 text-amber-400 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-white/80 text-sm">
                Request visa application support documents  as soon as you have registered  to avoid delays - inquire with SA embassy in your country or visit their website for entry requirements.
              </span>
            </div>
          </div>
          <div className="w-full md:w-auto">
            <a
              href="https://wa.me/27636568545"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary">Request Visa Documents</Button>
            </a>
          </div>
        </div>
      </div>
      {/* Group discounts */}
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          Group Discounts
        </h2>
        <p className="text-white/70 mb-8">
          Groups of 5 or more attendees from the same organization qualify for
          special discounted rates. Contact our team for more information.
        </p>
        <a
          href="https://wa.me/27636568545"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="primary">Contact for Group Rates</Button>
        </a>
      </div>
    </div>
  </div>;
};
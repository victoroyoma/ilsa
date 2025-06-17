import React, { } from 'react';
import { X as XIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getPaystackUrlForTicket } from '../utils/paystackUrls';
interface PaymentOption {
  id: string;
  name: string;
  description: string;
  icon: string;
}
interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketType: string;
  price: string;
}
const paymentOptions: PaymentOption[] = [{
  id: 'paystack',
  name: 'Card Payment',
  description: 'Pay securely with card via Paystack',
  icon: 'https://website-v3-assets.s3.amazonaws.com/assets/img/hero/Paystack-mark-white-twitter.png'
}, {
  id: 'bank',
  name: 'Bank Transfer',
  description: 'Manual bank transfer to our account',
  icon: '/bank-icon.png'
}];
export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  ticketType,
  price
}) => {
  const navigate = useNavigate();
  
  const handlePayment = (optionId: string) => {
    if (optionId === 'paystack') {
      // Get direct Paystack URL
      const paystackUrl = getPaystackUrlForTicket(ticketType);
      if (paystackUrl) {
        window.location.href = paystackUrl;
      } else {
        // Fallback to registration page if no direct URL exists
        navigate(`/registration/${ticketType}/${price}?method=paystack`);
      }
    } else {
      navigate(`/registration/${ticketType}/${price}?method=bank`);
    }
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative z-10 w-full max-w-xl bg-gradient-to-b from-blue-900/40 to-black/60 rounded-xl border border-white/10 shadow-xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">
              Select Payment Method
            </h3>
            <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
              <XIcon size={24} />
            </button>
          </div>
          <div className="mb-6">
            <div className="bg-white/5 rounded-lg p-4 mb-6">
              <p className="text-white/60 mb-2">Selected Ticket</p>
              <p className="text-white font-bold">{ticketType}</p>
              <p className="text-amber-400 text-xl font-bold mt-2">
                R{price} ZAR
              </p>
            </div>
            <div className="grid gap-4">
              {paymentOptions.map(option => <button key={option.id} onClick={() => handlePayment(option.id)} className="w-full flex items-center p-4 rounded-lg border border-white/10 bg-black/20 
                    hover:border-amber-500/50 hover:bg-white/5 transition-all duration-200">
                  <img src={option.icon} alt={option.name} className="w-8 h-8 object-contain mr-4" />
                  <div className="text-left">
                    <p className="text-white font-medium">{option.name}</p>
                    <p className="text-white/60 text-sm">
                      {option.description}
                    </p>
                  </div>
                </button>)}
            </div>
          </div>
        </div>
      </div>
    </div>;
};
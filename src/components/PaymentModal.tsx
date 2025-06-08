import React, { useState } from 'react';
import { X as XIcon, Loader2Icon } from 'lucide-react';

interface PaymentOption {
  id: string;
  name: string;
  description: string;
  icon: string;
  regions?: string[];
}
interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketType: string;
  price: string;
}
const paymentOptions: PaymentOption[] = [{
  id: 'paypal',
  name: 'PayPal',
  description: 'Fast and secure payment with PayPal',
  icon: 'https://res.cloudinary.com/dmqjqn6x3/image/upload/v1749333059/PAYPAL_m9w2zr.png'
}, {
  id: 'crypto',
  name: 'Cryptocurrency',
  description: 'Pay with Bitcoin, Ethereum, or USDT',
  icon: 'https://res.cloudinary.com/dmqjqn6x3/image/upload/v1749364701/crypto_ugk4vh.jpg'
}, {
  id: 'wire',
  name: 'Wire Transfer',
  description: 'Traditional bank transfer (2-3 business days)',
  icon: 'https://res.cloudinary.com/dmqjqn6x3/image/upload/v1749364701/crypto_ugk4vh.jpg'
}, {
  id: 'Paystack',
  name: 'Paystack',
  description: 'Local payments for African countries',
  icon: 'https://res.cloudinary.com/dmqjqn6x3/image/upload/v1749333066/paystack-banner_sjm3az.jpg',
  regions: ['Nigeria', 'Kenya', 'South Africa', 'Ghana']
}];
export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  ticketType,
  price
}) => {
  const [selectedOption] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const handlePayment = async (optionId: string) => {
    setIsProcessing(true);
    // Simulate API call and redirect
    setTimeout(() => {
      window.location.href = `/checkout/${optionId}/${ticketType}`;
    }, 1500);
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative z-10 w-[95%] max-w-lg md:max-w-2xl bg-gradient-to-b from-blue-900/40 to-black/60 rounded-xl border border-white/10 shadow-xl">
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
          disabled={isProcessing}
        >
          <XIcon size={20} />
        </button>
        <div className="p-4 md:p-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white">
              Complete Your Purchase
            </h3>
          </div>
          <div className="mb-6">
            <div className="bg-white/5 rounded-lg p-4 mb-6">
              <p className="text-white/60 mb-2">Selected Ticket</p>
              <p className="text-white font-bold">{ticketType}</p>
              <p className="text-amber-400 text-xl font-bold mt-2">
                ${price} USD
              </p>
            </div>
            <p className="text-white mb-4">Choose Payment Method:</p>
            <div className="space-y-3">
              {paymentOptions.map(option => <button key={option.id} onClick={() => handlePayment(option.id)} disabled={isProcessing} className={`w-full flex items-center p-4 rounded-lg border transition-all duration-200
                    ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:border-amber-500/50 hover:bg-white/5'}
                    ${selectedOption === option.id ? 'border-amber-500 bg-white/5' : 'border-white/10 bg-black/20'}`}>
                  <img src={option.icon} alt={option.name} className="w-8 h-8 object-contain mr-4" />
                  <div className="text-left">
                    <p className="text-white font-medium">{option.name}</p>
                    <p className="text-white/60 text-sm">
                      {option.description}
                    </p>
                    {option.regions && <p className="text-amber-400/80 text-xs mt-1">
                        Available in: {option.regions.join(', ')}
                      </p>}
                  </div>
                </button>)}
            </div>
          </div>
          {isProcessing && <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl backdrop-blur-sm">
              <div className="text-center">
                <Loader2Icon className="animate-spin text-amber-400 w-8 h-8 mx-auto mb-4" />
                <p className="text-white">Processing your payment...</p>
              </div>
            </div>}
        </div>
      </div>
    </div>;
};
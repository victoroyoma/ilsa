import React, { useState } from 'react';
import { X as XIcon, ClipboardCopyIcon, CheckIcon, HeartIcon } from 'lucide-react';
import { Button } from './Button';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  
  const donationEmail = 'taffdsIncPay@gmail.com';
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handlePayPalDonate = () => {
    // Open PayPal donation link in new tab
    window.open('https://www.paypal.com/', '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative z-10 w-full max-w-md bg-gradient-to-b from-blue-900/40 to-black/60 rounded-xl border border-white/10 shadow-xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <HeartIcon className="w-6 h-6 text-amber-400 mr-2" />
              <h3 className="text-xl font-bold text-white">Support ILSA 2025</h3>
            </div>
            <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
              <XIcon size={24} />
            </button>
          </div>
          
          <div className="mb-6">
            <p className="text-white/80 text-sm mb-4">
              Your donation helps us make longevity science accessible to everyone. 
              Support our mission to advance research and education in longevity.
            </p>
            
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <h4 className="text-white font-medium mb-3">How to Donate:</h4>
              <ol className="list-decimal pl-5 space-y-2 text-white/70 text-sm">
                <li>Click "Donate via PayPal" below to open PayPal</li>
                <li>Enter your desired donation amount</li>
                <li>Complete the payment securely through PayPal</li>
                <li>You'll receive a confirmation email</li>
              </ol>
            </div>
            
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-4">
              <h4 className="text-amber-400 font-medium mb-2">Alternative: Direct PayPal Transfer</h4>
              <p className="text-white/70 text-sm mb-3">
                You can also send a donation directly to our PayPal email:
              </p>
              <div className="flex items-center">
                <div className="flex-1 bg-white/10 border border-white/20 rounded-l-lg px-3 py-2 text-white text-sm font-mono">
                  {donationEmail}
                </div>
                <button 
                  onClick={() => copyToClipboard(donationEmail)}
                  className="bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 rounded-r-lg px-3 py-2 text-amber-400 transition-colors"
                >
                  {copied ? <CheckIcon className="w-4 h-4" /> : <ClipboardCopyIcon className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button 
              variant="primary" 
              className="w-full"
              onClick={handlePayPalDonate}
            >
              Donate via PayPal
            </Button>
            
            <Button 
              variant="secondary" 
              className="w-full"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
          
          <p className="text-white/50 text-xs text-center mt-4">
            Thank you for supporting longevity science research and education!
          </p>
        </div>
      </div>
    </div>
  );
};

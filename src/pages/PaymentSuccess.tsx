// filepath: c:\Users\victo\Downloads\ilsa\src\pages\PaymentSuccess.tsx
import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircleIcon } from 'lucide-react';
import { Button } from '../components/Button';

export const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const method = searchParams.get('method') || 'paystack';
  
  
  return (
    <div className="w-full min-h-screen pt-24">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-b from-blue-900/20 to-black/40 rounded-xl border border-white/10 p-8 text-center">
            <CheckCircleIcon className="w-16 h-16 mx-auto text-green-500 mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Payment Submitted!</h2>
            
            {method === 'eft' ? (
              <p className="text-white/70 mb-6">
                Thank you for your EFT transfer. Our team will verify your payment and send you a confirmation email within 24 hours.
              </p>
            ) : method === 'paystack' ? (
              <p className="text-white/70 mb-6">
                Your payment has been processed successfully. You will receive a confirmation email shortly.
              </p>
            ) : (
              <p className="text-white/70 mb-6">
                Your payment has been submitted successfully. You will receive a confirmation email shortly.
              </p>
            )}
            
            <Button 
              variant="primary" 
              onClick={() => navigate('/')}
              className="w-full"
            >
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
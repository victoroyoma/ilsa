import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { CheckCircleIcon } from 'lucide-react';

export const Confirmation: React.FC = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem('registration_email') || '';
  
  return (
    <div className="w-full min-h-screen pt-24">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-b from-blue-900/20 to-black/40 rounded-xl border border-white/10 p-8 text-center">
            <div className="mb-6 flex justify-center">
              <CheckCircleIcon className="w-20 h-20 text-green-400" />
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-4">
              Registration Complete!
            </h1>
            
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              Thank you for registering for the International Longevity Summit Africa 2025. 
              {email && <span> We have sent a confirmation email to <span className="text-amber-400">{email}</span>.</span>}
            </p>
            
            <div className="bg-white/5 rounded-lg p-6 mb-8 text-left">
              <h3 className="text-lg font-medium text-white mb-4">Next Steps:</h3>
              
              <ul className="space-y-3 text-white/80">
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center text-amber-400 mr-3 flex-shrink-0">1</span>
                  <span>Check your email for confirmation and payment details</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center text-amber-400 mr-3 flex-shrink-0">2</span>
                  <span>Save the event date in your calendar</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center text-amber-400 mr-3 flex-shrink-0">3</span>
                  <span>Follow us on social media for updates about the summit</span>
                </li>
              </ul>
            </div>
            
            <Button 
              variant="primary" 
              onClick={() => navigate('/')}
              className="mb-4"
            >
              Return to Homepage
            </Button>
            
            <div>
              <p className="text-white/60 text-sm">
                If you have any questions, please contact us at <a href="mailto:support@ilsa.africa" className="text-amber-400 hover:underline">support@ilsa.africa</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
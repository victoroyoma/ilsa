import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ClipboardCopyIcon, CheckIcon, ArrowRightIcon } from 'lucide-react';
import { Button } from '../components/Button';
import { updatePaymentInformation } from '../services/registrationService';

export const PayPalInstructions: React.FC = () => {
  const { reference } = useParams<{ reference: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [processing, setProcessing] = useState(false);

  // PayPal details
  const amount = localStorage.getItem('paypal_payment_amount') || '';
  const currency = localStorage.getItem('paypal_payment_currency') || 'ZAR';
  const description = localStorage.getItem('paypal_payment_description') || '';
  const recordId = localStorage.getItem('registration_record_id') || '';
  
  // PayPal account to send money to
  const paypalEmail = 'payments@ilsa2025.com';
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  const handleConfirm = async () => {
    setProcessing(true);
    try {
      if (recordId) {
        // Update payment status to "Pending Verification"
        await updatePaymentInformation(recordId, 'Pending Verification', 'paypal');
      }
      
      // Navigate to success page
      navigate('/payment-success?method=paypal');
    } catch (error) {
      console.error('Failed to update payment status:', error);
      // Still navigate to success page even if update fails
      navigate('/payment-success?method=paypal');
    }
  };
  
  return (
    <div className="w-full min-h-screen pt-24">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-b from-blue-900/20 to-black/40 rounded-xl border border-white/10 p-8">
            <h1 className="text-2xl font-bold text-white mb-6">
              PayPal Payment Instructions
            </h1>
            
            <div className="bg-white/5 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-white mb-4">Please send payment to:</h2>
              
              <div className="mb-6">
                <label className="block text-white/60 text-sm mb-1">PayPal Email Address</label>
                <div className="flex items-center">
                  <div className="flex-1 bg-white/10 border border-white/20 rounded-l-lg px-4 py-3 text-white font-mono">
                    {paypalEmail}
                  </div>
                  <button 
                    onClick={() => copyToClipboard(paypalEmail)}
                    className="bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 rounded-r-lg px-4 py-3 text-amber-400 transition-colors"
                  >
                    {copied ? <CheckIcon className="w-5 h-5" /> : <ClipboardCopyIcon className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-white/60 text-sm mb-1">Amount</label>
                  <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white">
                    {amount} {currency}
                  </div>
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-1">Reference</label>
                  <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white font-mono">
                    {reference || 'ILSA-Ticket'}
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-white/60 text-sm mb-1">Description</label>
                <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white">
                  {description}
                </div>
              </div>
            </div>
            
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-8">
              <h3 className="font-bold text-white mb-2">Important Instructions:</h3>
              <ol className="list-decimal pl-5 space-y-2 text-white/80">
                <li>Log in to your PayPal account and send money to the email address above.</li>
                <li>Enter the exact amount shown above.</li>
                <li>Include your <strong>ticket type</strong> and the <strong>reference number</strong> in the notes.</li>
                <li>After sending payment, click the "I've Completed Payment" button below.</li>
                <li>Our team will verify your payment and send you a confirmation email.</li>
              </ol>
            </div>
            
            <Button 
              variant="primary" 
              className="w-full flex items-center justify-center"
              onClick={handleConfirm}
              disabled={processing}
            >
              {processing ? 'Processing...' : (
                <>
                  I've Completed Payment
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
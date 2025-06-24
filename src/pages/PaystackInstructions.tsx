import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { Button } from '../components/Button';
import { updatePaymentInformation } from '../services/registrationService';
import { getPaystackUrlForTicket } from '../utils/paystackUrls';

export const PaystackInstructions: React.FC = () => {
  const { ticketType, reference } = useParams<{ ticketType: string, reference: string }>();
  const [processing, setProcessing] = useState(false);

  // Get stored information
  const amount = localStorage.getItem('payment_amount') || '';
  const recordId = localStorage.getItem('registration_record_id') || '';
  
  const handleProceedToPayment = async () => {
    setProcessing(true);
    try {
      // Update payment status if we have a record ID
      if (recordId) {
        await updatePaymentInformation(recordId, 'Pending', 'paystack');
      }
      
      // Get Paystack URL for this ticket type
      const paystackUrl = getPaystackUrlForTicket(ticketType || '');
      if (paystackUrl) {
        window.location.href = paystackUrl;
      } else {
        throw new Error('Payment link not available for this ticket type');
      }
    } catch (error: any) {
      console.error('Failed to proceed with payment:', error);
      setProcessing(false);
      alert(error.message || 'Failed to proceed with payment. Please try again.');
    }
  };
  
  return (
    <div className="w-full min-h-screen pt-24">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-b from-blue-900/20 to-black/40 rounded-xl border border-white/10 p-8">
            <h1 className="text-2xl font-bold text-white mb-6">
              Paystack Payment Instructions
            </h1>
            
            <div className="bg-white/5 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-white mb-4">You're about to pay with Paystack</h2>
              
              <div className="mb-6">
                <label className="block text-white/60 text-sm mb-1">Ticket Type</label>
                <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white">
                  {ticketType}
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-white/60 text-sm mb-1">Amount</label>
                <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white">
                  R{amount} ZAR
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-white/60 text-sm mb-1">Reference</label>
                <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white font-mono">
                  {reference || 'ILSA-Ticket'}
                </div>
              </div>
            </div>
            
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-8">
              <h3 className="font-bold text-white mb-2">Important Information:</h3>
              <ol className="list-decimal pl-5 space-y-2 text-white/80">
                <li>You will be redirected to Paystack's secure payment platform.</li>
                <li>You can pay using Visa, Mastercard, or other supported payment methods.</li>
                <li>After successful payment, you will be redirected back to our website.</li>
                <li>You will receive a confirmation email with your ticket details.</li>
              </ol>
            </div>
            
            <Button 
              variant="primary" 
              className="w-full flex items-center justify-center"
              onClick={handleProceedToPayment}
              disabled={processing}
            >
              {processing ? 'Processing...' : (
                <>
                  Proceed to Payment
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

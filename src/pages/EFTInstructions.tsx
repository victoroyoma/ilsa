import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ClipboardCopyIcon, CheckIcon, ArrowRightIcon } from 'lucide-react';
import { Button } from '../components/Button';
import { updatePaymentInformation } from '../services/registrationService';

export const EFTInstructions: React.FC = () => {
  const { ticketType, price } = useParams<{ ticketType: string; price: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [processing, setProcessing] = useState(false);

  // EFT payment details
  const amount = price || localStorage.getItem('payment_amount') || '';
  const reference = localStorage.getItem('payment_reference') || `ILSA-${Date.now()}`;
  const recordId = localStorage.getItem('registration_record_id') || '';
  
  // Bank details for EFT
  const bankDetails = {
    accountName: "TAFFD's Inc",
    accountNumber: "63111409496",
    bankName: "First National Bank (FNB)",
    branchCode: "250655",
    swiftCode: "FIRNZAJJ",
   
  };
  
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
        await updatePaymentInformation(recordId, 'Pending Verification', 'eft');
      }
      
      // Navigate to success page
      navigate('/payment-success?method=eft');
    } catch (error) {
      console.error('Failed to update payment status:', error);
      // Still navigate to success page even if update fails
      navigate('/payment-success?method=eft');
    }
  };
  
  return (
    <div className="w-full min-h-screen pt-24">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-b from-blue-900/20 to-black/40 rounded-xl border border-white/10 p-8">
            <h1 className="text-2xl font-bold text-white mb-6">
              Electronic Fund Transfer (EFT) Instructions
            </h1>
            
            <div className="bg-white/5 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-white mb-4">Please transfer payment to:</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-white/60 text-sm mb-1">Account Name</label>
                  <div className="flex items-center">
                    <div className="flex-1 bg-white/10 border border-white/20 rounded-l-lg px-4 py-3 text-white">
                      {bankDetails.accountName}
                    </div>
                    <button 
                      onClick={() => copyToClipboard(bankDetails.accountName)}
                      className="bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 rounded-r-lg px-4 py-3 text-amber-400 transition-colors"
                    >
                      {copied ? <CheckIcon className="w-5 h-5" /> : <ClipboardCopyIcon className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-white/60 text-sm mb-1">Account Number</label>
                  <div className="flex items-center">
                    <div className="flex-1 bg-white/10 border border-white/20 rounded-l-lg px-4 py-3 text-white font-mono">
                      {bankDetails.accountNumber}
                    </div>
                    <button 
                      onClick={() => copyToClipboard(bankDetails.accountNumber)}
                      className="bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 rounded-r-lg px-4 py-3 text-amber-400 transition-colors"
                    >
                      {copied ? <CheckIcon className="w-5 h-5" /> : <ClipboardCopyIcon className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-white/60 text-sm mb-1">Bank Name</label>
                  <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white">
                    {bankDetails.bankName}
                  </div>
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-1">Branch Code</label>
                  <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white font-mono">
                    {bankDetails.branchCode}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-white/60 text-sm mb-1">Amount</label>
                  <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white">
                    R{amount} ZAR
                  </div>
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-1">Reference</label>
                  <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white font-mono">
                    {reference}
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-white/60 text-sm mb-1">Description</label>
                <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white">
                  ILSA 2025 Conference - {ticketType}
                </div>
              </div>
            </div>
            
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-8">
              <h3 className="font-bold text-white mb-2">Important Instructions:</h3>
              <ol className="list-decimal pl-5 space-y-2 text-white/80">
                <li>Use your internet banking or visit any FNB branch to make the transfer.</li>
                <li>Enter the exact amount shown above (R{amount} ZAR).</li>
                <li>Use the reference number <strong>{reference}</strong> as your payment reference.</li>
                <li>Include your <strong>ticket type</strong> in the payment description.</li>
                <li>After completing the transfer, click the "I've Completed Transfer" button below.</li>
                <li>Our team will verify your payment and send you a confirmation email within 24 hours.</li>
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
                  I've Completed the Transfer
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

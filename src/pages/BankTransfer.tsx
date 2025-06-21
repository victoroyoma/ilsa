import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { ArrowLeftIcon, CheckIcon, CopyIcon } from 'lucide-react';
import { updatePaymentInformation } from '../services/registrationService';

export const BankTransfer: React.FC = () => {
  const { ticketType, price } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  
  const bankDetails = {
    accountName: "ILSA Conference",
    bankName: "Standard Bank",
    accountNumber: "12345678910",
    branchCode: "051001",
    reference: localStorage.getItem('payment_reference') || "ILSA-Ticket"
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };
  
  const handleSubmitPayment = async () => {
    const recordId = localStorage.getItem('registration_record_id');
    
    if (recordId) {
      try {
        await updatePaymentInformation(recordId, 'Pending', 'bank');
        navigate('/confirmation');
      } catch (error) {
        console.error('Failed to update payment status:', error);
        alert('Failed to update payment status. Please contact support.');
      }
    } else {
      alert('Registration information missing. Please try again.');
    }
  };

  return (
    <div className="w-full min-h-screen pt-24">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <button onClick={() => navigate('/tickets')} className="flex items-center text-white/60 hover:text-white mb-8 transition-colors">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Tickets
        </button>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-b from-blue-900/20 to-black/40 rounded-xl border border-white/10 p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-black flex items-center justify-center font-bold mr-2">1</div>
              <div className="h-1 w-12 bg-amber-500"></div>
              <div className="w-8 h-8 rounded-full bg-amber-500 text-black flex items-center justify-center font-bold mx-2">2</div>
              <div className="h-1 w-12 bg-amber-500"></div>
              <div className="w-8 h-8 rounded-full bg-amber-500 text-black flex items-center justify-center font-bold ml-2">3</div>
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-2 text-center">
              Bank Transfer Details
            </h1>
            <p className="text-white/70 text-center mb-8">
              Please make payment to the following bank account
            </p>
            
            <div className="bg-white/5 rounded-lg p-4 mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/60">Selected Ticket</span>
                <span className="text-white font-medium">{ticketType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/60">Amount Due</span>
                <span className="text-amber-400 font-bold">R{price} ZAR</span>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-lg p-6 mb-8 space-y-4">
              <div>
                <div className="text-white/60 text-sm mb-1">Account Name</div>
                <div className="flex justify-between items-center">
                  <div className="text-white">{bankDetails.accountName}</div>
                  <button 
                    onClick={() => copyToClipboard(bankDetails.accountName)}
                    className="text-amber-400 hover:text-amber-300"
                  >
                    {copied ? <CheckIcon className="w-4 h-4" /> : <CopyIcon className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <div>
                <div className="text-white/60 text-sm mb-1">Bank Name</div>
                <div className="flex justify-between items-center">
                  <div className="text-white">{bankDetails.bankName}</div>
                  <button 
                    onClick={() => copyToClipboard(bankDetails.bankName)}
                    className="text-amber-400 hover:text-amber-300"
                  >
                    {copied ? <CheckIcon className="w-4 h-4" /> : <CopyIcon className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <div>
                <div className="text-white/60 text-sm mb-1">Account Number</div>
                <div className="flex justify-between items-center">
                  <div className="text-white">{bankDetails.accountNumber}</div>
                  <button 
                    onClick={() => copyToClipboard(bankDetails.accountNumber)}
                    className="text-amber-400 hover:text-amber-300"
                  >
                    {copied ? <CheckIcon className="w-4 h-4" /> : <CopyIcon className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <div>
                <div className="text-white/60 text-sm mb-1">Branch Code</div>
                <div className="flex justify-between items-center">
                  <div className="text-white">{bankDetails.branchCode}</div>
                  <button 
                    onClick={() => copyToClipboard(bankDetails.branchCode)}
                    className="text-amber-400 hover:text-amber-300"
                  >
                    {copied ? <CheckIcon className="w-4 h-4" /> : <CopyIcon className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <div>
                <div className="text-white/60 text-sm mb-1">Reference (Important)</div>
                <div className="flex justify-between items-center">
                  <div className="text-white font-medium">{bankDetails.reference}</div>
                  <button 
                    onClick={() => copyToClipboard(bankDetails.reference)}
                    className="text-amber-400 hover:text-amber-300"
                  >
                    {copied ? <CheckIcon className="w-4 h-4" /> : <CopyIcon className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-8">
              <p className="text-white/80 text-sm">
                Please use the reference number when making your payment. After making the payment, 
                click the button below to confirm your booking. We will verify your payment and send 
                you a confirmation email.
              </p>
            </div>
            
            <Button 
              variant="primary" 
              className="w-full" 
              onClick={handleSubmitPayment}
            >
              I've Completed the Bank Transfer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
import { getPaystackUrlForTicket } from '../../../utils/paystackUrls';

// ...existing code...

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  try {
    // ...existing code for user registration...
    
    // After successful registration, return the Paystack URL
    const paystackUrl = getPaystackUrlForTicket(req.body.ticketType);
    
    if (paystackUrl) {
      return res.status(200).json({ 
        success: true, 
        message: 'Registration successful',
        redirectUrl: paystackUrl
      });
    } else {
      return res.status(400).json({ 
        success: false, 
        message: 'Payment link not available for this ticket type' 
      });
    }
  } catch (error) {
    // ...existing error handling code...
  }
}
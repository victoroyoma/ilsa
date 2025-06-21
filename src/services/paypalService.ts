const PAYPAL_CLIENT_ID = process.env.REACT_APP_PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.REACT_APP_PAYPAL_CLIENT_SECRET;
const PAYPAL_API_URL = process.env.REACT_APP_PAYPAL_SANDBOX === 'true' 
  ? 'https://api-m.sandbox.paypal.com' 
  : 'https://api-m.paypal.com';

// Get PayPal access token
const getAccessToken = async (): Promise<string> => {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    throw new Error('PayPal credentials not configured');
  }

  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
  
  const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${auth}`
    },
    body: 'grant_type=client_credentials'
  });

  const data = await response.json();
  if (!data.access_token) {
    throw new Error('Failed to get PayPal access token');
  }

  return data.access_token;
};

/**
 * PayPal service for creating and managing PayPal orders
 */

/**
 * Create a PayPal order for a ticket purchase
 * 
 * @param amount - The amount to charge
 * @param currency - The currency code (e.g., 'ZAR')
 * @param description - Description of the purchase
 * @param email - Customer email for reference
 * @returns URL to redirect the user to for payment
 */
export const createPaypalOrder = async (
  amount: number, 
  currency: string, 
  description: string,
  email: string
): Promise<string> => {
  // In a real implementation, this would create a PayPal order via API
  // For now, we'll simulate by redirecting to a PayPal checkout page
  
  // Get payment reference from localStorage
  const reference = localStorage.getItem('payment_reference') || 'ILSA-Ticket';
  
  // Log the attempted PayPal payment
  console.log(`Creating PayPal order: ${amount} ${currency} for ${email} - ${description}`);
  
  // In a real implementation, you would use the PayPal SDK or API
  // For now, simulate with a redirect to PayPal
  return `https://www.paypal.com/checkoutnow?token=demo-${reference}`;
};

/**
 * Verify a PayPal payment
 * 
 * @param orderId - The PayPal order ID to verify
 * @returns boolean indicating if payment was successful
 */
export const verifyPaypalPayment = async (orderId: string): Promise<boolean> => {
  // In a real implementation, this would verify the payment status via PayPal API
  // For now, we'll simulate success
  console.log(`Verifying PayPal payment: ${orderId}`);
  return true;
};

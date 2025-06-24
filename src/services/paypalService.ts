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
 * @returns Direct URL to PayPal payment page
 */
export const createPaypalOrder = async (
  amount: number, 
  currency: string, 
  description: string,
  email: string
): Promise<string> => {
  // Get payment reference from localStorage or generate a new one
  const reference = localStorage.getItem('payment_reference') || `ILSA-Ticket-${Date.now()}`;
  
  // PayPal business email (recipient)
  const businessEmail = 'taffdsIncPay@gmail.com';
  
  // Construct PayPal payment URL with all required parameters
  const paypalUrl = new URL('https://www.paypal.com/cgi-bin/webscr');
  
  // Add required parameters
  paypalUrl.searchParams.append('cmd', '_xclick');
  paypalUrl.searchParams.append('business', businessEmail);
  paypalUrl.searchParams.append('amount', amount.toString());
  paypalUrl.searchParams.append('currency_code', currency);
  paypalUrl.searchParams.append('item_name', description);
  paypalUrl.searchParams.append('custom', reference);
  
  // Customer details
  paypalUrl.searchParams.append('email', email);
  
  // Return URLs
  const returnUrl = new URL('/payment-success?method=paypal', window.location.origin).toString();
  const cancelUrl = new URL('/tickets', window.location.origin).toString();
  
  paypalUrl.searchParams.append('return', returnUrl);
  paypalUrl.searchParams.append('cancel_return', cancelUrl);
  
  // Store reference for later verification
  localStorage.setItem('payment_reference', reference);
  
  return paypalUrl.toString();
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

/**
 * Capture a PayPal payment
 * 
 * @param orderId - The PayPal order ID to capture
 * @returns Object with payment capture details
 */
export const capturePaypalPayment = async (orderId: string): Promise<{ status: string; id: string }> => {
  // In a real implementation, this would capture the payment via PayPal API
  // For now, we'll simulate a successful capture
  console.log(`Capturing PayPal payment: ${orderId}`);
  
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    status: 'COMPLETED',
    id: `CAPTURE-${orderId}`
  };
};

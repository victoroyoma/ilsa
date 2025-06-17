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

// Create PayPal order
export const createPaypalOrder = async (
  amount: number,
  currency: string = 'ZAR',
  description: string,
  userEmail: string
): Promise<string> => {
  try {
    const accessToken = await getAccessToken();
    
    const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: amount.toString()
            },
            description
          }
        ],
        application_context: {
          brand_name: 'ILSA Conference',
          landing_page: 'BILLING',
          user_action: 'PAY_NOW',
          return_url: `${window.location.origin}/payment/verify?method=paypal`,
          cancel_url: `${window.location.origin}/tickets`
        },
        payer: {
          email_address: userEmail
        }
      })
    });

    const data = await response.json();
    
    if (data.id) {
      // Find the approval URL
      const approvalLink = data.links.find((link: any) => link.rel === 'approve');
      if (approvalLink) {
        return approvalLink.href;
      }
      throw new Error('No approval URL found in PayPal response');
    }
    
    throw new Error(data.message || 'Failed to create PayPal order');
  } catch (error) {
    console.error('PayPal error:', error);
    throw new Error('Failed to initialize PayPal payment');
  }
};

export const capturePaypalPayment = async (orderId: string) => {
  try {
    const accessToken = await getAccessToken();
    
    const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    return await response.json();
  } catch (error) {
    console.error('PayPal capture error:', error);
    throw new Error('Failed to capture PayPal payment');
  }
};

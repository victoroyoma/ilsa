const PAYSTACK_SECRET_KEY = process.env.REACT_APP_PAYSTACK_SECRET_KEY;
const PAYSTACK_PUBLIC_KEY = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;

export const initializePayment = async (email: string, amount: number, reference: string, metadata: any = {}) => {
  if (!PAYSTACK_SECRET_KEY) {
    throw new Error('Environment variable REACT_APP_PAYSTACK_SECRET_KEY is not configured');
  }

  const response = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      amount: amount * 100, // Convert to kobo
      currency: 'ZAR',
      reference,
      metadata,
      callback_url: `${window.location.origin}/payment/verify`,
    }),
  });

  const data = await response.json();
  if (data.status) {
    return data.data.authorization_url;
  }
  throw new Error(data.message || 'Failed to initialize payment');
};

export const verifyPayment = async (reference: string) => {
  if (!PAYSTACK_SECRET_KEY) {
    throw new Error('Environment variable REACT_APP_PAYSTACK_SECRET_KEY is not configured');
  }

  const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    },
  });

  const data = await response.json();
  return data;
};

// For client-side initialization (if needed)
export const getPaystackPublicKey = () => {
  if (!PAYSTACK_PUBLIC_KEY) {
    throw new Error('Environment variable REACT_APP_PAYSTACK_PUBLIC_KEY is not configured');
  }
  return PAYSTACK_PUBLIC_KEY;
};

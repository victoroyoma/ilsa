const PAYSTACK_PUBLIC_KEY = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;

export const initializePayment = async (email: string, amount: number) => {
  if (!PAYSTACK_PUBLIC_KEY) {
    throw new Error('Environment variable REACT_APP_PAYSTACK_PUBLIC_KEY is not configured');
  }

  const response = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PAYSTACK_PUBLIC_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      amount: amount * 100, // Convert to kobo
      currency: 'ZAR',
    }),
  });

  const data = await response.json();
  if (data.status) {
    return data.data.authorization_url;
  }
  throw new Error('Failed to initialize payment');
};

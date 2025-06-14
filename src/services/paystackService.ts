const PAYSTACK_PUBLIC_KEY = 'your_paystack_public_key';

export const initializePayment = async (email: string, amount: number) => {
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

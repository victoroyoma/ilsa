interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  jobTitle: string;
  country: string;
  dietaryRequirements: string;
  specialAssistance: string;
  requiresTransport: boolean;
  ticketType: string;
  price: string;
}

export const appendToSheet = async (data: RegistrationData) => {
  const webhookUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL;
  
  if (!webhookUrl) {
    throw new Error('Environment variable VITE_GOOGLE_SHEETS_WEBHOOK_URL is not configured');
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        registrationDate: new Date().toISOString(),
        requiresTransport: data.requiresTransport ? 'Yes' : 'No'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Registration API error:', errorText);
      throw new Error(`Failed to submit registration: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};




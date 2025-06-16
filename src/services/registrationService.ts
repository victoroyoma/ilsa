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

export const submitRegistration = async (data: RegistrationData) => {
  try {
    const webhookUrl = process.env.REACT_APP_GOOGLE_SHEETS_WEBHOOK_URL;
    
    if (!webhookUrl) {
      throw new Error('Webhook URL not configured');
    }

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

    const result = await response.json();

    // Send WhatsApp notification
    const message = encodeURIComponent(
      `*New ILSA 2025 Registration*\n\n` +
      `Name: ${data.firstName} ${data.lastName}\n` +
      `Email: ${data.email}\n` +
      `Ticket: ${data.ticketType}\n` +
      `Price: ${data.price}`
    );
    
    window.open(`https://wa.me/27636568545?text=${message}`, '_blank');

    return result;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

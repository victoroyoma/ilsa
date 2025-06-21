/**
 * Mapping of ticket types to their respective Paystack payment URLs
 */
const ticketPaystackUrls: Record<string, string> = {
  "Standard Delegate": "https://paystack.com/buy/standard-delegate-dvsnlk",
  "Student Delegate": "https://paystack.com/buy/student-delegates-uwphix",
  "MasterClass Only": "https://paystack.com/buy/masterclass-only-rhhktn",
  "Full Conference + MasterClass Combo": "https://paystack.com/buy/full-conference-qzvtar",
  "VIP Delegate": "https://paystack.com/buy/vip-delegate-gupgup"
};

/**
 * Get Paystack payment URL for a specific ticket type
 * @param {string} ticketType - The type of ticket
 * @returns {string|null} - The payment URL or null if not found
 */
export function getPaystackUrlForTicket(ticketType: string): string | null {
  if (!ticketType) return null;
  
  // Try to match the exact ticket type
  if (ticketPaystackUrls[ticketType]) {
    return ticketPaystackUrls[ticketType];
  }
  
  // Try to match partial ticket type (in case the format varies slightly)
  const ticketKey = Object.keys(ticketPaystackUrls).find(key => 
    ticketType.toLowerCase().includes(key.toLowerCase())
  );
  
  return ticketKey ? ticketPaystackUrls[ticketKey] : null;
}

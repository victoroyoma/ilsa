/**
 * Mapping of ticket types to their respective Paystack payment URLs
 */
const ticketPaystackUrls = {
  "vip delegate": "https://paystack.com/buy/vip-delegate-gupgup",
  "standard delegate": "https://paystack.com/buy/standard-delegate-dvsnlk",
  "student delegate": "https://paystack.com/buy/student-delegates-uwphix",
  "masterclass only": "https://paystack.com/buy/masterclass-only-rhhktn",
  "full conference + masterclass combo": "https://paystack.com/buy/full-conference-qzvtar",
  // Legacy mappings (keeping for backward compatibility)
//   "vip": "https://paystack.com/buy/vip-delegate-gupgup",
//   "regular": "https://paystack.com/buy/regular-delegate",
//   "student": "https://paystack.com/buy/student-delegate",
//   "early": "https://paystack.com/buy/early-bird-delegate",
//   "standard": "https://paystack.com/buy/standard-delegate",
//   "group": "https://paystack.com/buy/group-delegate",
};

/**
 * Get Paystack payment URL for a specific ticket type
 * @param {string} ticketType - The type of ticket
 * @returns {string|null} - The payment URL or null if not found
 */
export function getPaystackUrlForTicket(ticketType) {
  if (!ticketType) return null;
  const normalizedType = ticketType.toLowerCase().trim();
  return ticketPaystackUrls[normalizedType] || null;
}

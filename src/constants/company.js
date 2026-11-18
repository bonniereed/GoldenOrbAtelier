export const EMAIL_DISPLAY  = "booking@GoldenOrbAtelier.com";
export const EMAIL_HREF     = "mailto:booking@goldenorbatelier.com";
export const TAGLINE        = "Tattoo & Art For The Haunted Heart";
export const Artists_NOTE = "Artists NOTE PLACEHOLDER";
export const CDN        = "https://www.Golden Orb Atelier.com/_files/ugd/";
export const COMPANY_NAME   = "Golden Orb Atelier LLC";

// Paste a Calendly or Google Appointment Schedule URL here to activate the booking embed.
// Example: "https://calendly.com/your-name" or your Google booking page URL.
export const BOOKING_EMBED_URL = "";

// Booking form submissions (with reference photos) are emailed here via FormSubmit.co.
// The FIRST submission sends an activation email to this address. Click "Activate" in it,
// and FormSubmit will also give you a random alias string you can paste here instead of
// the email address to keep it hidden from spam bots.
// Booking form backend (Forminit). Notifications go to booking@goldenorbatelier.com.
export const BOOKING_FORM_URL = "https://forminit.com/f/e4zmm2y67mb";

// Studio address: shown on the booking page and opened in the visitor's maps app when tapped.
export const STUDIO_ADDRESS = "1017 N Central Expy Ste 200, Plano, TX 75075";

// Builds a link that opens the visitor's default maps app:
// Apple Maps on iPhone/iPad/Mac, the default maps app on Android, Google Maps everywhere else.
export function mapsLink(address = STUDIO_ADDRESS) {
  const q  = encodeURIComponent(address);
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
  if (/iPhone|iPad|iPod|Macintosh/i.test(ua)) return { href: `https://maps.apple.com/?q=${q}`, external: true };
  if (/Android/i.test(ua))                    return { href: `geo:0,0?q=${q}`, external: false };
  return { href: `https://www.google.com/maps/search/?api=1&query=${q}`, external: true };
}

export const INSTAGRAM_URL    = "https://www.instagram.com/goldenorbatelier/";
export const INSTAGRAM_HANDLE = "@goldenorbatelier";

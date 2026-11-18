// Search-engine details for each page: the browser tab title and the
// description Google shows under it. Used by the app (RouteAnnouncer) and by
// scripts/prerender-pages.mjs, which writes a real HTML file for each page.
// Keep this file free of browser-only or Vite-only code so Node can import it.

export const SITE_URL  = "https://goldenorbatelier.com";
export const SITE_NAME = "Golden Orb Atelier";

export const PAGES = [
  {
    path: "/",
    file: "index.html",
    title: `${SITE_NAME} | Tattoo Studio in Plano, TX`,
    description:
      "Woman-owned, appointment-only tattoo studio in Plano, TX, serving the Plano & McKinney area. Dark illustrative blackwork, glitter & custom tattoos by Laura Weaver.",
  },
  {
    path: "/artist",
    file: "artist.html",
    title: `Meet The Artist: Laura Weaver | ${SITE_NAME}`,
    description:
      "Meet Laura Weaver, tattoo artist at Golden Orb Atelier, a woman-owned studio in Plano, TX: five years of tattooing with a love for dark, illustrative blackwork where nature meets the supernatural.",
  },
  {
    path: "/gallery",
    file: "gallery.html",
    title: `Tattoo Gallery | ${SITE_NAME}, Plano TX`,
    description:
      "Browse tattoos by Laura Weaver at Golden Orb Atelier in Plano, TX: illustrative blackwork, color, glitter, patchwork and watercolor pieces.",
  },
  {
    path: "/faq",
    file: "faq.html",
    title: `FAQ: Pricing, Booking & Prep | ${SITE_NAME}`,
    description:
      "Tattoo pricing, deposits, booking policies, touch ups and appointment prep at Golden Orb Atelier, a tattoo studio in Plano, TX.",
  },
  {
    path: "/about",
    file: "about.html",
    title: `Book a Tattoo | ${SITE_NAME}, Plano TX`,
    description:
      "Request a custom tattoo appointment at Golden Orb Atelier, a woman-owned studio at 1017 N Central Expy Ste 200, Plano, TX 75075. Appointment only.",
  },
];

export const NOT_FOUND = {
  title: `Page Not Found | ${SITE_NAME}`,
  description: "This page could not be found. Visit Golden Orb Atelier, a tattoo studio in Plano, TX.",
};

export function pageFor(pathname) {
  const key = pathname.toLowerCase().replace(/\/+$/, "") || "/";
  return PAGES.find((p) => p.path === key) ?? null;
}

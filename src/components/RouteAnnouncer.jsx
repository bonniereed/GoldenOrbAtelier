import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const SITE = "Golden Orb Atelier";

// Browser tab title for each page. Screen readers announce it on navigation.
const TITLES = {
  "/":        `${SITE} | Tattoo & Art For The Haunted Heart`,
  "/artist":  `Meet The Artist | ${SITE}`,
  "/gallery": `Gallery | ${SITE}`,
  "/faq":     `FAQ | ${SITE}`,
  "/about":   `Book a Tattoo | ${SITE}`,
};

// Gives each page its own title, and after an in-site navigation moves
// keyboard / screen reader focus to the new page's main heading.
export default function RouteAnnouncer() {
  const { pathname } = useLocation();
  const firstLoad = useRef(true);

  useEffect(() => {
    const key = pathname.toLowerCase().replace(/\/+$/, "") || "/";
    document.title = TITLES[key] ?? `Page Not Found | ${SITE}`;

    if (firstLoad.current) { firstLoad.current = false; return; }
    const frame = requestAnimationFrame(() => {
      const heading = document.querySelector("main h1");
      if (!heading) return;
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}

import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { pageFor, NOT_FOUND, SITE_URL } from "../constants/pages";

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

// Keeps each page's title, description and canonical link up to date while
// browsing, and after an in-site navigation moves keyboard / screen reader
// focus to the new page's main heading. Titles live in src/constants/pages.js.
export default function RouteAnnouncer() {
  const { pathname } = useLocation();
  const firstLoad = useRef(true);

  useEffect(() => {
    const page = pageFor(pathname);
    const { title, description } = page ?? NOT_FOUND;
    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    if (page) setMeta('link[rel="canonical"]', "href", SITE_URL + page.path);

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

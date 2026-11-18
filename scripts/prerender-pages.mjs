// Runs after `vite build`. GitHub Pages serves plain files, so this writes one
// HTML file per page (dist/gallery.html is served at /gallery), each with its
// own title, description and canonical link for search engines and link
// previews. It also writes dist/404.html so any unknown address still loads
// the site and shows the in-app "Lost in the Web" page.
import { readFileSync, writeFileSync } from "node:fs";
import { PAGES, NOT_FOUND, SITE_URL } from "../src/constants/pages.js";

const DIST = new URL("../dist/", import.meta.url);
const template = readFileSync(new URL("index.html", DIST), "utf8");

const escape = (s) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function replaceOnce(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`prerender: could not find ${label} in dist/index.html`);
  return html.replace(pattern, replacement);
}

function render({ title, description, url, noindex = false }) {
  const t = escape(title);
  const d = escape(description);
  let html = template;
  html = replaceOnce(html, /<title>[\s\S]*?<\/title>/, `<title>${t}</title>`, "<title>");
  html = replaceOnce(html, /(<meta name="description" content=")[^"]*(")/, `$1${d}$2`, "meta description");
  html = replaceOnce(html, /(<meta property="og:title" content=")[^"]*(")/, `$1${t}$2`, "og:title");
  html = replaceOnce(html, /(<meta property="og:description" content=")[^"]*(")/, `$1${d}$2`, "og:description");
  html = replaceOnce(html, /(<meta name="twitter:title" content=")[^"]*(")/, `$1${t}$2`, "twitter:title");
  html = replaceOnce(html, /(<meta name="twitter:description" content=")[^"]*(")/, `$1${d}$2`, "twitter:description");
  if (noindex) {
    html = replaceOnce(html, /\s*<link rel="canonical" href="[^"]*" \/>/, "", "canonical link");
    html = replaceOnce(html, /\s*<meta property="og:url" content="[^"]*" \/>/, "", "og:url");
    html = html.replace("<head>", '<head>\n    <meta name="robots" content="noindex" />');
  } else {
    html = replaceOnce(html, /(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`, "canonical link");
    html = replaceOnce(html, /(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`, "og:url");
  }
  return html;
}

for (const page of PAGES) {
  const url = SITE_URL + (page.path === "/" ? "/" : page.path);
  writeFileSync(new URL(page.file, DIST), render({ ...page, url }));
  console.log(`prerender: ${page.file.padEnd(12)} ${page.title}`);
}
writeFileSync(new URL("404.html", DIST), render({ ...NOT_FOUND, noindex: true }));
console.log("prerender: 404.html");

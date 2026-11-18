import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// The site used to use hash links (goldenorbatelier.com/#/gallery).
// Turn any old link like that into the new address (/gallery) so it keeps working,
// both on first load and if one is opened while already on the site.
function redirectHashLink() {
  if (!location.hash.startsWith("#/")) return;
  const path = location.hash.slice(1).replace(/^\/Artist\b/, "/artist");
  history.replaceState(null, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
redirectHashLink();
window.addEventListener("hashchange", redirectHashLink);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

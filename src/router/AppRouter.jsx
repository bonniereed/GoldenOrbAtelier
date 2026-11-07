import { Routes, Route } from "react-router-dom";
import Home    from "../pages/Home";
import About   from "../pages/About";
import Artist  from "../pages/Artist";
import Gallery from "../pages/Gallery";
import FAQ     from "../pages/FAQ";

export default function AppRouter() {
  return (
    <Routes basename='/Golden-Orb-Atelier'>
      <Route path="/"        element={<Home />} />
      <Route path="/about"   element={<About />} />
      <Route path="/Artist"  element={<Artist />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/faq"     element={<FAQ />} />
    </Routes>
  );
}

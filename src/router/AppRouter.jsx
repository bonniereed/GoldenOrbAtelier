import { Routes, Route } from "react-router-dom";
import Home     from "../pages/Home";
import About    from "../pages/About";
import Artist   from "../pages/Artist";
import Gallery  from "../pages/Gallery";
import FAQ      from "../pages/FAQ";
import NotFound from "../pages/NotFound";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/"        element={<Home />} />
      <Route path="/about"   element={<About />} />
      <Route path="/artist"  element={<Artist />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/faq"     element={<FAQ />} />
      <Route path="*"        element={<NotFound />} />
    </Routes>
  );
}

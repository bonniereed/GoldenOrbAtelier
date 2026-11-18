import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NAV_LINKS } from "../constants/navigation";
const LOGO  = `${import.meta.env.BASE_URL}assets/Golden-Orb-Atelier-small.png`;

export default function Header() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Escape closes the mobile menu and returns focus to the menu button.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        document.querySelector(".nav__hamburger")?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <nav className={`nav${scrolled ? " nav--scrolled" : ""}`} aria-label="Main">
      <Link to="/" onClick={close} className="nav__brand">
        <img src={LOGO} alt="" className="nav__brand-img" />
        <span className="nav__brand-name">Golden Orb Atelier</span>
      </Link>
      <div id="site-menu" className={`nav__links${menuOpen ? " nav__links--open" : ""}`}>
        {NAV_LINKS.map(({ label, to }) => (
          <Link key={to} to={to} onClick={close}>{label}</Link>
        ))}
      </div>
      <button
        type="button"
        className="nav__hamburger"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="site-menu"
      >
        {menuOpen ? "✕" : "☰"}
      </button>
    </nav>
  );
}

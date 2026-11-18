import { Link } from "react-router-dom";
import { BsInstagram } from "react-icons/bs";
import {
  PHONE_HREF,
  EMAIL_DISPLAY, EMAIL_HREF,
  COMPANY_NAME, TAGLINE,
  INSTAGRAM_URL, INSTAGRAM_HANDLE,
} from "../constants/company";
import { NAV_LINKS } from "../constants/navigation";
const LOGO  = `${import.meta.env.BASE_URL}assets/Golden-Orb-Atelier.png`;

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <p className="footer__tagline">{TAGLINE}</p>
        </div>

        <div className="footer__contact">
          <a href={EMAIL_HREF} className="footer__contact-link">{EMAIL_DISPLAY}</a>
          <span className="footer__dot">·</span>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="footer__contact-link footer__contact-link--ig">
            <BsInstagram aria-hidden="true" /> {INSTAGRAM_HANDLE}<span className="sr-only"> (opens in new tab)</span>
          </a>
        </div>

        <nav className="footer__nav" aria-label="Footer navigation">
          {NAV_LINKS.map(({ label, to }) => (
            <Link key={to} to={to} className="footer__nav-link">{label}</Link>
          ))}
        </nav>

        <p className="footer__copy">© {year} {COMPANY_NAME}. All rights reserved.</p>
      </div>
    </footer>
  );
}

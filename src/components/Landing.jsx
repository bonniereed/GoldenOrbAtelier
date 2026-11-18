import { Link } from "react-router-dom";
import { NAV_LINKS } from "../constants/navigation";
const BASE = import.meta.env.BASE_URL;
const LOGO       = `${BASE}assets/Golden-Orb-Atelier.png`;
const WEB     = `${BASE}assets/web.png`;
const FOREARM = `${BASE}assets/gallery/goa-4.jpg`;
const MOON    = `${BASE}assets/gallery/goa-5.jpg`;

export default function Landing() {
  return (
    <div className="landing">

      {/* ── HERO ── */}
      <section className="landing-hero" style={{ backgroundImage: `url(${WEB})` }}>
        <div className="landing-hero__overlay" />
        <div className="landing-hero__content">
          {/* The logo is the visual title; this heading gives screen readers the same. */}
          <h1 className="sr-only">Golden Orb Atelier: Tattoo &amp; Art For The Haunted Heart</h1>
          <img src={LOGO} alt="" className="landing-hero__logo" />
          <p className="landing-hero__sub">
            Dark &amp; Macabre Illustrative Blackwork · Custom Tattoo Art
          </p>
          <div className="landing-hero__actions">
            <Link to="/about" className="btn btn--primary btn--lg">
              Book With Me
            </Link>
            <Link to="/gallery" className="btn btn--outline btn--lg">
              Gallery
            </Link>
          </div>
        </div>
      </section>

        {/* ── BOOK CTA ── */}
      <section className="landing-book" style={{ backgroundImage: `url(${WEB})` }}>
        <div className="landing-book__overlay" />
      </section>
      {/* ── FEATURED WORK ── */}
      <section className="landing-work">
        <div className="landing-work__header">
          <p className="landing-work__eyebrow">Featured Work</p>
          <h2 className="landing-work__heading">Forever Art</h2>
        </div>
        <div className="landing-work__grid">
          <div className="landing-work__piece landing-work__piece--large">
            <img src={FOREARM} alt="Death Encapsulated, illustrative blackwork forearm tattoo by Laura Weaver in Plano, TX" className="landing-work__img" loading="lazy" decoding="async" />
            <div className="landing-work__piece-overlay">
              <span>Illustrative Blackwork</span>
            </div>
          </div>
          <div className="landing-work__piece">
            <img src={MOON} alt="Moon Woman, illustrative blackwork tattoo by Laura Weaver in Plano, TX" className="landing-work__img" loading="lazy" decoding="async" />
            <div className="landing-work__piece-overlay">
              <span>Moon Woman</span>
            </div>
          </div>
          <div className="landing-work__piece landing-work__piece--dragon"
               style={{ backgroundImage: `url(${WEB})` }}>
            <div className="landing-work__piece-overlay landing-work__piece-overlay--cta">
              <Link to="/gallery" className="btn btn--outline">See Full Portfolio →</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

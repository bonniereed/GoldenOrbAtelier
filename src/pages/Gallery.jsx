import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PageBanner from "../components/PageBanner";
import { useReveal } from "../hooks/useReveal";
import gallery, { STYLES } from "../data/galleryData";

function GalleryCard({ item }) {
  const [errored, setErrored] = useState(false);
  return (
    <div className="gallery-card">
      <div className="gallery-card__img-wrap">
        {errored ? (
          <div className="gallery-card__placeholder-bg">
            <svg viewBox="0 0 80 80" fill="none" className="gallery-card__placeholder-icon">
              <rect x="12" y="12" width="56" height="56" rx="4" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 3"/>
              <circle cx="40" cy="32" r="10" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M16 64 Q28 46 40 52 Q52 58 64 42" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
          </div>
        ) : (
          <img
            src={item.src}
            alt={item.title ? `${item.title}, ${item.style.toLowerCase()} tattoo` : `${item.style} tattoo by ${item.Artists}`}
            className="gallery-card__img"
            onError={() => setErrored(true)}
            loading="lazy"
          />
        )}
        {/* Hover overlay repeats the caption below, so screen readers skip it */}
        <div className="gallery-card__overlay" aria-hidden="true">
          <span className="gallery-card__overlay-style">{item.style}</span>
          <span className="gallery-card__overlay-title">{item.title}</span>
        </div>
      </div>
      <div className="gallery-card__info">
        <span className="gallery-card__style">{item.style}</span>
        <span className="gallery-card__title">{item.title}</span>
        <span className="gallery-card__artist">{item.Artists}</span>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const revealRef = useReveal();

  // Group pieces by style, in the order set in galleryData.js
  const sections = useMemo(() => {
    const order = [...STYLES, ...gallery.map((g) => g.style).filter((s) => !STYLES.includes(s))];
    return [...new Set(order)]
      .map((style) => ({ style, items: gallery.filter((g) => g.style === style) }))
      .filter((s) => s.items.length > 0);
  }, []);

  const requested = searchParams.get("style");
  const active = sections.some((s) => s.style === requested) ? requested : "All";
  const visible = active === "All" ? sections : sections.filter((s) => s.style === active);

  const choose = (style) => {
    const next = new URLSearchParams(searchParams);
    if (style === "All") next.delete("style"); else next.set("style", style);
    setSearchParams(next, { replace: true });
  };

  const slug = (s) => "style-" + s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <>
      <PageBanner
        title="Gallery"
        subtitle="A collection of work from Golden Orb Atelier"
      />
      <div className="gallery-page" ref={revealRef}>

        {/* ── Style filter ── */}
        <nav className="gallery-styles" aria-label="Filter by style">
          {["All", ...sections.map((s) => s.style)].map((style) => (
            <button
              key={style}
              type="button"
              className={"gallery-styles__link" + (active === style ? " is-active" : "")}
              aria-pressed={active === style}
              onClick={() => choose(style)}
            >
              {style}
            </button>
          ))}
        </nav>

        {/* ── One section per style ── */}
        {visible.map(({ style, items }) => (
          <section key={style} id={slug(style)} className="gallery-section" aria-labelledby={`${slug(style)}-title`}>
            <header className="gallery-section__head">
              <h2 id={`${slug(style)}-title`} className="gallery-section__title">{style}</h2>
            </header>
            <div className="gallery-grid">
              {items.map((item) => <GalleryCard key={item.id} item={item} />)}
            </div>
          </section>
        ))}

        <div className="gallery-cta">
          <p className="gallery-cta__text">See something you love?</p>
          <Link to="/about" className="btn btn--primary">Book a Consultation</Link>
        </div>

      </div>
    </>
  );
}

import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PageBanner from "../components/PageBanner";
import { useReveal } from "../hooks/useReveal";
import gallery, { Artists, STYLES } from "../data/galleryData";

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
            alt={item.title}
            className="gallery-card__img"
            onError={() => setErrored(true)}
            loading="lazy"
          />
        )}
        <div className="gallery-card__overlay">
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
  const [searchParams] = useSearchParams();
  const [activeArtist, setActiveArtist] = useState(searchParams.get("artist") || "All");
  const [activeStyle,  setActiveStyle]  = useState("All");
  const revealRef = useReveal();

  const filtered = useMemo(() => gallery.filter(item => {
    const byArtist = activeArtist === "All" || item.Artists === activeArtist;
    const byStyle  = activeStyle  === "All" || item.style   === activeStyle;
    return byArtist && byStyle;
  }), [activeArtist, activeStyle]);

  return (
    <>
      <PageBanner
        title="Gallery"
        subtitle="A collection of work from Golden Orb Atelier"
      />
      <div className="gallery-page" ref={revealRef}>


        <div className="gallery-grid">
          {filtered.length === 0 ? (
            <p className="gallery-empty">No pieces match this filter.</p>
          ) : (
            filtered.map(item => <GalleryCard key={item.id} item={item} />)
          )}
        </div>

        <div className="gallery-cta">
          <p className="gallery-cta__text">See something you love?</p>
          <Link to="/about" className="btn btn--primary">Book a Consultation</Link>
        </div>

      </div>
    </>
  );
}

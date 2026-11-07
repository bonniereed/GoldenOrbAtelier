import { Link } from "react-router-dom";
import PageBanner from "../components/PageBanner";
import { useReveal } from "../hooks/useReveal";
import { INTAKE_URL } from "../constants/company";
const base = import.meta.env.BASE_URL;

const ARTISTS = [
  {
    name: "Laura Weaver",
    handle: "@GoldenOrbAtelier",
    specialty: "Dark Macabre Illustrative Blackwork",
    bio: [
      "With five years of tattooing under my belt, I've developed a love and appreciation for many styles of tattooing. While I enjoy bringing all kinds of creative visions to life, my heart belongs to dark, illustrative blackwork. My favorite work lives somewhere between a Stephen King novel and a walk through an ancient, overgrown forest. It's where nature meets supernatural; Where beauty and unease can coexist.",
      "I'm endlessly inspired by North American folklore, cryptids, old superstitions and eerie traditions passed down through the generations. Think dark fairytales, natural history, southern gothic and a healthy dose of the macabre. Above all, I believe getting tattooed should be an experience. My goal is to create a welcoming, comfortable environment where you can be entirely yourself and leave with a little piece of art that is uniquely yours.",
    ],
    styles: ["Dark Macabre","Illustrative Blackwork","Glitter"],
    img: `${base}assets/laura.jpg`,
    bookable: true,
  },
];

function ArtistCard({ artist, reversed }) {
  return (
    <div className={"artist-card" + (reversed ? " artist-card--reversed" : "")}>
      <div className="artist-card__img-wrap">
        <img
          src={artist.img}
          alt={artist.name}
          className="artist-card__img"
          onError={e => { e.currentTarget.style.display = "none"; }}
        />
      </div>

      <div className="artist-card__body">
        <p className="artist-card__handle">{artist.handle}</p>
        <h2 className="artist-card__name" style={{ fontFamily: "var(--font-heading)" }}>{artist.name}</h2>
        <p className="artist-card__specialty">{artist.specialty}</p>

        <div className="artist-card__styles">
          {artist.styles.map(s => (
            <span key={s} className="artist-card__tag">{s}</span>
          ))}
        </div>

        <div className="artist-card__bio">
          {artist.bio.map((p, i) => <p key={i}>{p}</p>)}
        </div>

        <div className="artist-card__actions">
          {artist.bookable ? (
            <a href={INTAKE_URL} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
              Book with {artist.name}
            </a>
          ) : (
            <span className="artist-card__waitlist">Currently on waitlist — check back soon</span>
          )}
          <Link to={`/gallery?artist=${encodeURIComponent(artist.name)}`} className="btn btn--ghost">Check it out →</Link>
        </div>
      </div>
    </div>
  );
}

export default function Artists() {
  const revealRef = useReveal();
  return (
    <>
      <PageBanner
        title="Meet The Artist:"
        subtitle="Tattoos & Art For The Haunted Heart"
      />
      <div className="artists-page" ref={revealRef}>
        {ARTISTS.map((artist, i) => (
          <ArtistCard key={artist.name} artist={artist} reversed={i % 2 !== 0} />
        ))}
      </div>
    </>
  );
}

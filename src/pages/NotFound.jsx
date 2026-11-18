import { Link } from "react-router-dom";
import PageBanner from "../components/PageBanner";

export default function NotFound() {
  return (
    <>
      <PageBanner title="Lost in the Web" subtitle="The page you were looking for has slipped away." />
      <section style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", padding: "3rem 1rem 5rem" }}>
        <Link to="/" className="btn btn--primary btn--lg">Return Home</Link>
        <Link to="/gallery" className="btn btn--outline btn--lg">Gallery</Link>
      </section>
    </>
  );
}

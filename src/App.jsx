import Header   from "./components/Header";
import Footer   from "./components/Footer";
import AppRouter from "./router/AppRouter";
import BatSwarm from "./components/BatSwarm";
import ScrollToTop from "./components/ScrollToTop";
import RouteAnnouncer from "./components/RouteAnnouncer";
import "./styles/global.css";

// The site uses hash URLs (#/page), so the skip link moves focus itself
// instead of using href="#main", which would be read as a route change.
function skipToContent(e) {
  e.preventDefault();
  const main = document.getElementById("main-content");
  main?.focus();
  main?.scrollIntoView();
}

export default function App() {
  return (
    <div>
      <a href="#main-content" className="skip-link" onClick={skipToContent}>Skip to content</a>
      <ScrollToTop />
      <RouteAnnouncer />
      <BatSwarm />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
}

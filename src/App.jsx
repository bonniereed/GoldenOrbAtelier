import Header   from "./components/Header";
import Footer   from "./components/Footer";
import AppRouter from "./router/AppRouter";
import BatSwarm from "./components/BatSwarm";
import ScrollToTop from "./components/ScrollToTop";
import "./styles/global.css";

export default function App() {
  return (
    <div>
      <ScrollToTop />
      <BatSwarm />
      <Header />
      <main>
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
}

import Header   from "./components/Header";
import Footer   from "./components/Footer";
import AppRouter from "./router/AppRouter";
import BatSwarm from "./components/BatSwarm";
import "./styles/global.css";

export default function App() {
  return (
    <div>
      <BatSwarm />
      <Header />
      <main>
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
}

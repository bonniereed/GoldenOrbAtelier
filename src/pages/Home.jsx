import Landing     from "../components/Landing";
import { useReveal } from "../hooks/useReveal";

export default function Home() {
  const trustRef = useReveal();

  return (
    <>
      <Landing />

   
    </>
  );
}

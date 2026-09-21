import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import About from "./components/About";
import ProjectFolderCarousel from "./components/ProjectFolderCarousel";
import Experience from "./components/Experience";
import Approach from "./components/Approach";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Background3D from "./components/Background3D";

export default function App() {
  return (
    <div className="relative min-h-screen bg-transparent">
      <Background3D />
      <Navbar />
      <main>
        <Hero />
        <TechStack />
        <About />
        <ProjectFolderCarousel />
        <Experience />
        <Approach />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

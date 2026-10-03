import ParticleBg from "./components/ParticleBg";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Services from "./components/Services";
import BlogsSection from "./components/BlogsSection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import DigitalTwinChat from "./components/DigitalTwinChat";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <ParticleBg />
      <Navbar />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Services />
        <BlogsSection />
        <Contact />
      </main>
      <Footer />
      <DigitalTwinChat />
    </>
  );
}

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Contact from "../components/ContactForm";
import Footer from "../components/Footer";
import ServiceIntro from "../components/ServiceIntro";
import "../styles/main.css";

function Home() {
  return (
    <>
      <Header />
      <Navbar />
      <Hero />
      <ServiceIntro />
      <Services /> 
      <section className="home-contact-section">
        <div className="container">
          <div className="contact-wrapper">
            <Contact />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/AboutSection";
import Courses from "@/components/Courses";
import FunFacts from "@/components/FunFacts";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import Events from "@/components/Events";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Courses />
      <FunFacts />
      <Team />
      <Testimonials />
      <Events />
      <ContactUs />
      <Footer />
    </>
  );
}

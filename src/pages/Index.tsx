import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import IntroSection from "@/components/home/IntroSection";
import ServicesSection from "@/components/home/ServicesSection";
import WorkSection from "@/components/home/WorkSection";
import JourneySection from "@/components/home/JourneySection";
import ReviewsSection from "@/components/home/ReviewsSection";
import ClientLogosSection from "@/components/home/ClientLogosSection";
import InstagramSection from "@/components/home/InstagramSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <IntroSection />
        <ServicesSection />
        <WorkSection />
        <JourneySection />
        <ReviewsSection />
        <ClientLogosSection />
        <InstagramSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

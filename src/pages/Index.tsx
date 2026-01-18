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

import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useEffect, useState } from "react";

const Index = () => {
  const [images, setImages] = useState<any>(null);

  useEffect(() => {
    const fetchImages = async () => {
      const snap = await getDoc(doc(db, "siteImages", "home"));
      if (snap.exists()) {
        setImages(snap.data());
      }
    };
    fetchImages();
  }, []);

  if (!images) return null;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection image={images.heroBg} />
        <IntroSection
          image={images.introImage}
          hoverImage={images.introHoverImage}
        />
        <ServicesSection image={images.servicesImage} />
        <WorkSection images={images} />
        <JourneySection />
        <ReviewsSection bgImage={images.reviewsBg} />
        <ClientLogosSection />
        <InstagramSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import servicesImage from "@/assets/services-image.jpg";
import c1 from "@/assets/service/main.jpeg";
import brand from "@/assets/service/brand.jpeg";
import marketing from "@/assets/service/marketing.jpeg";
import production from "@/assets/service/production.jpeg";
import infl from "@/assets/service/infl.jpeg";
import creative from "@/assets/service/creative.jpeg";
import { Check } from "lucide-react";

interface ServicePageImages {
  mainImage?: string;
  inquireImage?: string;
  service1?: string;
  service2?: string;
  service3?: string;
  service4?: string;
  service5?: string;
}

const services = [
  {
    id: 1,
    title: "Branding",
    eyebrow: "Brand Identity",
    description:
      "We craft distinctive brand identities that capture your essence and resonate with your audience. From logo design to comprehensive brand guidelines, we build the foundation for your visual story.",
    items: [
      "Logo Design & Brand Identity",
      "Brand Strategy & Positioning",
      "Visual Language Development",
      "Brand Guidelines",
      "Packaging Design",
    ],
    imageKey: "service1" as const,
    fallback: brand,
  },
  {
    id: 2,
    title: "Social Media Marketing",
    eyebrow: "Digital Presence",
    description:
      "We create compelling social media strategies that build community and drive engagement. Our approach combines creativity with data-driven insights for maximum impact.",
    items: [
      "Content Strategy",
      "Community Management",
      "Platform Optimization",
      "Analytics & Reporting",
      "Paid Social Campaigns",
    ],
    imageKey: "service2" as const,
    fallback: marketing,
  },
  {
    id: 3,
    title: "Production",
    eyebrow: "Creative Content",
    description:
      "From concept to final cut, we produce stunning visual content that tells your brand story. Our production services span photography, videography, and motion graphics.",
    items: [
      "Photography & Styling",
      "Video Production",
      "Motion Graphics",
      "Post-Production",
      "Art Direction",
    ],
    imageKey: "service3" as const,
    fallback: production,
  },
  {
    id: 4,
    title: "Influencer Marketing",
    eyebrow: "Strategic Partnerships",
    description:
      "We connect your brand with the right voices. Our influencer partnerships are strategic, authentic, and designed to amplify your message to the right audience.",
    items: [
      "Influencer Identification",
      "Campaign Strategy",
      "Relationship Management",
      "Performance Tracking",
      "Content Collaboration",
    ],
    imageKey: "service4" as const,
    fallback: infl,
  },
  {
    id: 5,
    title: "Creative Design",
    eyebrow: "Visual Excellence",
    description:
      "Our design team brings ideas to life with pixel-perfect precision. From digital assets to print materials, we create visuals that captivate and convert.",
    items: [
      "UI/UX Design",
      "Marketing Collateral",
      "Presentation Design",
      "Digital Assets",
      "Print Design",
    ],
    imageKey: "service5" as const,
    fallback: creative,
  },
];

const Services = () => {
  const [serviceImages, setServiceImages] = useState<ServicePageImages>({});

  useEffect(() => {
    const fetchServiceImages = async () => {
      try {
        const docRef = doc(db, "siteImages", "service");
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          setServiceImages(snapshot.data() as ServicePageImages);
        }
      } catch (error) {
        console.error("Error fetching service images:", error);
      }
    };

    fetchServiceImages();
  }, []);

  const getImageUrl = (imageKey: keyof ServicePageImages, fallback: string): string => {
    return serviceImages[imageKey] || fallback;
  };

  const mainImage = getImageUrl("mainImage", c1);
  const ctaImage = getImageUrl("inquireImage", servicesImage);
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-bloom-cream">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4 block">
                  Our Services
                </span>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
                  Stressed about where and how to get started?
                </h1>
                <p className="text-2xl font-serif italic text-primary mb-8">
                  Consider it our problem now.
                </p>
                <p className="text-muted-foreground leading-relaxed max-w-lg">
                  From brand strategy to content creation, we handle every aspect of your
                  brand's growth journey. Our integrated approach ensures consistency
                  and impact across all touchpoints.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <img
                  src={mainImage}
                  alt="Our Services"
                  className="rounded-2xl shadow-strong w-full h-[400px] object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Individual Services */}
        {services.map((service, index) => (
          <section
            key={service.id}
            className={`py-20 md:py-28 ${index % 2 === 0 ? "bg-background" : "bg-bloom-cream"
              }`}
          >
            <div className="container mx-auto px-6">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
              >
                {/* Text Column */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={index % 2 === 1 ? "lg:order-2" : ""}
                >
                  <span className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4 block">
                    {service.eyebrow}
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <Check className="w-3 h-3 text-primary" />
                        </span>
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Icon/Image Column */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={`flex items-center justify-center ${index % 2 === 1 ? "lg:order-1" : ""
                    }`}
                >
                  <img
                    src={getImageUrl(service.imageKey, service.fallback)}
                    alt={service.title}
                    className="w-full h-full object-cover rounded-2xl shadow-strong"
                  />

                </motion.div>
              </div>
            </div>
          </section>
        ))}

        {/* CTA Section */}
        <section className="py-20 md:py-28 bg-[#624A41]">
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#E8E6D8] leading-tight mb-6">
          Have a project that needs a fresh perspective?
        </h2>
        <p className="text-[#E8E6D8]/80 leading-relaxed mb-8 max-w-lg">
          Let's collaborate and create something extraordinary together.
          We're always excited to hear about new projects and ideas.
        </p>
        <Link
          to="/contact"
          className="inline-block bg-[#E8E6D8] text-[#624A41] px-8 py-4 rounded-lg font-medium
                     hover:shadow-strong hover:-translate-y-1 transition-all duration-300"
        >
          Inquire Now
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="hidden lg:block"
      >
        <img
          src={ctaImage}
          alt="Let's Work Together"
          className="rounded-2xl shadow-strong w-full h-[400px] object-cover opacity-95"
        />
      </motion.div>
    </div>
  </div>
</section>

      </main>
      <Footer />
    </div>
  );
};

export default Services;

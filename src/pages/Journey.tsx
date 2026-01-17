import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState, useMemo } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import introImage from "@/assets/intro-image.jpg";
import introHover from "@/assets/intro-hover.jpg";
import servicesImage from "@/assets/services-image.jpg";
import { Heart, Target, Sparkles, Users } from "lucide-react";
import team1 from "@/assets/journey/team1.png";
import team2 from "@/assets/journey/team2.png";
import team3 from "@/assets/journey/team3.png";
import team4 from "@/assets/journey/team4.png";
import founder from "@/assets/journey/founder1.png";

interface JourneyPageImages {
  card1?: string;
  card2?: string;
  card3?: string;
  card4?: string;
  card5?: string;
  inquireImage?: string;
  introImage?: string;
}

const coreValues = [
  {
    icon: Heart,
    title: "Passion-Driven",
    description: "Every project is fueled by genuine love for creative excellence.",
  },
  {
    icon: Target,
    title: "Results-Focused",
    description: "We measure success by the impact we create for our clients.",
  },
  {
    icon: Sparkles,
    title: "Creative Excellence",
    description: "Pushing boundaries while maintaining refined aesthetic standards.",
  },
  {
    icon: Users,
    title: "Collaborative Spirit",
    description: "True partnerships built on trust, transparency, and shared vision.",
  },
];

// const timeline = [
//   {
//     year: "2020",
//     title: "The Beginning",
//     description: "Bloom Branding was founded with a vision to help brands tell their stories.",
//     image: team1,
//   },
//   {
//     year: "2021",
//     title: "Growing Together",
//     description: "Expanded our team and welcomed our first major brand partnerships.",
//     image: team2,
//   },
//   {
//     year: "2022",
//     title: "Studio Launch",
//     description: "Opened our dedicated creative studio space for production and collaboration.",
//     image: team3,
//   },
//   {
//     year: "2023",
//     title: "Full-Service Agency",
//     description: "Evolved into a comprehensive branding and digital experience agency.",
//     image: team4,
//   },
//   {
//     year: "2024",
//     title: "Blooming Forward",
//     description: "Continuing to grow, innovate, and help brands bloom across industries.",
//     image: introHover,
//   },
// ];

const Journey = () => {
  const [journeyImages, setJourneyImages] = useState<JourneyPageImages>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJourneyImages = async () => {
      try {
        const docRef = doc(db, "siteImages", "journey");
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          setJourneyImages(snapshot.data() as JourneyPageImages);
        }
      } catch (error) {
        console.error("Error fetching journey images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJourneyImages();
  }, []);

  const timelineData = useMemo(() => [
    {
      year: "2020",
      title: "The Beginning",
      description: "Bloom Branding was founded with a vision to help brands tell their stories.",
      image: journeyImages.card1 && journeyImages.card1.trim() ? journeyImages.card1 : team1,
    },
    {
      year: "2021",
      title: "Growing Together",
      description: "Expanded our team and welcomed our first major brand partnerships.",
      image: journeyImages.card2 && journeyImages.card2.trim() ? journeyImages.card2 : team2,
    },
    {
      year: "2022",
      title: "Studio Launch",
      description: "Opened our dedicated creative studio space for production and collaboration.",
      image: journeyImages.card3 && journeyImages.card3.trim() ? journeyImages.card3 : team3,
    },
    {
      year: "2023",
      title: "Full-Service Agency",
      description: "Evolved into a comprehensive branding and digital experience agency.",
      image: journeyImages.card4 && journeyImages.card4.trim() ? journeyImages.card4 : team4,
    },
    {
      year: "2024",
      title: "Blooming Forward",
      description: "Continuing to grow, innovate, and help brands bloom across industries.",
      image: journeyImages.card5 && journeyImages.card5.trim() ? journeyImages.card5 : introHover,
    },
  ], [journeyImages]);

  const heroImage = journeyImages.introImage && journeyImages.introImage.trim() ? journeyImages.introImage : introImage;
  const ctaImage = journeyImages.inquireImage && journeyImages.inquireImage.trim() ? journeyImages.inquireImage : servicesImage;
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
                  Our Journey
                </span>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
                  Hola! We Are
                  <br />
                  <span className="italic text-primary">Bloom Branding</span>
                </h1>
                <p className="text-muted-foreground leading-relaxed max-w-lg">
                  A creative branding studio that helps brands grow through strategic
                  storytelling, content creation, and high-impact digital experiences.
                  We focus on modern, bold, and growth-driven brand identities with a
                  strong emphasis on visual storytelling.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <img
                  src={founder}
                  // src={heroImage}
                  alt="Bloom Branding Team"
                  className="rounded-2xl shadow-strong w-full h-[600px] object-cover"
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring" }}
                  className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground px-6 py-4 rounded-xl shadow-medium"
                >
                  <span className="text-2xl font-serif font-medium">4+</span>
                  <span className="block text-xs uppercase tracking-wider opacity-90">
                    Years of Creativity
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4 block">
                What We Believe
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl">
                Our Core <span className="italic">Values</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card p-8 rounded-2xl card-lift text-center"
                >
                  <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 md:py-28 bg-bloom-cream">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4 block">
                How We Got Here
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl">
                Our <span className="italic">Story</span>
              </h2>
            </motion.div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden lg:block" />

              <div className="space-y-16 lg:space-y-0">
                {timelineData.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{
                      opacity: 0,
                      x: index % 2 === 0 ? -60 : 60,
                      y: 30,
                    }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                    className={`lg:grid lg:grid-cols-2 lg:gap-16 relative ${index % 2 === 0 ? "" : ""
                      }`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 top-8 w-4 h-4 -ml-2 rounded-full bg-primary hidden lg:block" />

                    {/* Content */}
                    <div
                      className={`${index % 2 === 0 ? "lg:text-right lg:pr-16" : "lg:col-start-2 lg:pl-16"
                        } mb-6 lg:-mb-20`}
                    >
                      <div className="bg-white p-6 rounded-2xl shadow-soft inline-block lg:max-w-md">
                        <span className="text-primary font-serif text-2xl font-medium mb-2 block">
                          {item.year}
                        </span>
                        <h3 className="font-serif text-xl mb-3">{item.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                          {item.description}
                        </p>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-80 md:h-100 object-cover rounded-xl"
                        />

                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
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
          We're always excited to meet new brands and hear their stories.
          Let's start a conversation.
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

export default Journey;

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import introImage from "@/assets/intro-image.jpg";
import servicesImage from "@/assets/services-image.jpg";

const works = [
  {
    id: 1,
    title: "Serene Skincare",
    category: "Brand Identity + Packaging",
    description:
      "Our art direction sought to capture the essence of their sophisticated dainty designs in an aesthetic way. 💍💎 Our services extend beyond the lens, offering a spectrum of digital marketing solutions 💫",
    image: work1,
  },
  {
    id: 2,
    title: "Life's A Beach",
    category: "Visual Identity + Lifestyle",
    description:
      "For Life's A Beach, we didn't design products for occasions. We designed them for moments — sun-drenched afternoons, salty hair, slow walks by the shore, and memories that stay long after the tide recedes. 🌴✨",
    image: work2,
  },
  {
    id: 3,
    title: "Binal Patel",
    category: "Fashion Branding",
    description:
      "For Binal Patel, we didn't focus on trends or seasons alone. We focused on emotion — the quiet confidence of a woman, the grace in her movement, and the stories woven into every silhouette. ✨",
    image: work3,
  },
  {
    id: 4,
    title: "Thyme & Whisk",
    category: "Cafe Branding + Content",
    description:
      "At Thyme & Whisk, we didn't just shape a menu. We shaped moments — slow mornings, unhurried conversations, the comfort of familiar flavors, and the joy of something thoughtfully made. 🍃☕",
    image: work4,
  },
  {
    id: 5,
    title: "Moire Rugs",
    category: "Home & Lifestyle",
    description:
      "For Moire Rugs, we didn't focus only on patterns and textures. We focused on the quiet luxury of everyday living — soft mornings, sunlit corners, and homes that tell stories through detail. ✨",
    image: introImage,
  },
  {
    id: 6,
    title: "Luna Studio",
    category: "Creative Agency",
    description:
      "Where possible, your logo should tell a story. A short, remarkable, to-the-point kind of story 🌻",
    image: servicesImage,
  },
];

const bloomValues = [
  {
    title: "Our Philosophy",
    paragraphs: [
      "We believe meaningful brands are built through clarity, intention, and care.",
      "By working closely with our clients, we create identities that feel authentic, refined, and designed to grow thoughtfully over time.",
    ],
    variant: "light",
  },
  {
    title: "What We Value",
    paragraphs: [
      "We value collaboration, honesty, and thoughtful design.",
      "Every project is approached with curiosity and care — ensuring the final outcome feels considered, purposeful, and true to the brand.",
    ],
    variant: "light",
  },
  {
    title: "How We Work",
    paragraphs: [
      "We take a collaborative and considered approach to every project.",
      "From understanding the brand's vision to refining the final details, our work is shaped through close partnership and thoughtful decision-making.",
    ],
    variant: "light",
  },
  {
    title: "A Thoughtful Approach",
    paragraphs: [
      "Our work is guided by intention, clarity, and quiet confidence.",
      "We focus on creating brand identities that feel refined, authentic, and built to last — shaped through collaboration and care.",
    ],
    variant: "soft",
  },
  {
    title: "Design, With Intention",
    paragraphs: [
      "Every brand we create is shaped through careful thinking, collaboration, and attention to detail.",
      "Resulting in identities that feel clear, confident, and meaningful.",
    ],
    variant: "soft",
  },
  {
    title: "The Bloom Way",
    paragraphs: [
      "We approach branding with clarity, care, and intention.",
      "By listening closely and designing thoughtfully, we create identities that reflect the essence of each brand and grow naturally over time.",
    ],
    variant: "dark",
  },
];

const Work = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-bloom-cream">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4 block"
              >
                Our Work
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-8"
              >
                A glimpse into our recent
                <br />
                <span className="italic text-primary">brand stories.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground leading-relaxed max-w-2xl"
              >
                Each project represents a unique collaboration, a shared vision,
                and a commitment to creating something meaningful. Here's a selection
                of the brands we've had the joy of working with.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Marquee */}
        <section className="py-8 bg-primary overflow-hidden">
          <div className="flex marquee-track">
            {[...Array(10)].map((_, i) => (
              <span
                key={i}
                className="flex-shrink-0 mx-8 text-primary-foreground/80 text-lg tracking-widest uppercase whitespace-nowrap"
              >
                Branding that you need — indeed ✦
              </span>
            ))}
          </div>
        </section>

        {/* Work Grid */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-6">
            <div className="space-y-24">
              {works.map((work, index) => (
                <motion.div
                  key={work.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                    index % 2 === 1 ? "" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="overflow-hidden rounded-2xl shadow-strong">
                      <img
                        src={work.image}
                        alt={work.title}
                        className="w-full h-[400px] lg:h-[500px] object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <span className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                      {work.category}
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl mb-6">
                      {work.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {work.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Bloom Values */}
        <section className="py-20 md:py-28 bg-bloom-cream">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4 block">
                Our Values
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl">
                The <span className="italic">Bloom</span> Way
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bloomValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-8 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-strong ${
                    value.variant === "dark"
                      ? "bg-primary text-primary-foreground"
                      : value.variant === "soft"
                      ? "bg-bloom-yellow/30"
                      : "bg-white"
                  }`}
                >
                  <h3 className="font-serif text-xl mb-4">{value.title}</h3>
                  {value.paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className={`text-sm leading-relaxed mb-2 ${
                        value.variant === "dark"
                          ? "text-primary-foreground/80"
                          : "text-muted-foreground"
                      }`}
                    >
                      {p}
                    </p>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28 bg-primary">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-6">
                Ready to tell your story?
              </h2>
              <p className="text-primary-foreground/80 max-w-lg mx-auto mb-8">
                Let's create something beautiful together.
              </p>
              <Link
                to="/contact"
                className="inline-block bg-white text-primary px-8 py-4 rounded-lg font-medium hover:shadow-strong hover:-translate-y-1 transition-all duration-300"
              >
                Start a Project
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Work;

import { useState } from "react";
import { motion } from "framer-motion";
import introImage from "@/assets/intro-image.jpg";
import introHover from "@/assets/intro-hover.jpg";

const IntroSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4 block">
              Helping Brands Bloom
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight mb-8">
              So you can get on
              <br />
              <span className="italic">with what you do best.</span>
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                At Bloom Branding, we believe every brand has a unique story waiting to be told. 
                Our role is to uncover that narrative and translate it into a visual language 
                that resonates deeply with your audience.
              </p>
              <p>
                From brand strategy to content creation, we handle the creative heavy-lifting 
                so you can focus on growing your business. Consider us your creative partners 
                in blooming the brand you've always envisioned.
              </p>
            </div>
          </motion.div>

          {/* Image Column with Hover Effect */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-strong aspect-[4/5]">
              {/* Default Image */}
              <img
                src={introImage}
                alt="Bloom Branding Team"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  isHovered ? "opacity-0" : "opacity-100"
                }`}
              />
              {/* Hover Image */}
              <img
                src={introHover}
                alt="Bloom Branding Team at Work"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, type: "spring" }}
              className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground px-6 py-4 rounded-xl shadow-medium"
            >
              <span className="text-2xl font-serif font-medium">4+</span>
              <span className="block text-xs uppercase tracking-wider opacity-90">
                Years of Excellence
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;

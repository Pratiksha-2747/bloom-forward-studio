import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import servicesImage from "@/assets/services-image.jpg";

interface ServicesSectionProps {
  image?: string;
}

const services = [
  "Brand Strategy",
  "Content Creation",
  "Production",
  "Social Media Branding",
  "Digital Experiences",
];

const ServicesSection = ({ image = servicesImage }: ServicesSectionProps) => {
  return (
    <section className="py-24 md:py-32 bg-bloom-cream">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-strong">
              <img
                src={image}
                alt="Our Services"
                className="w-full h-[500px] lg:h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bloom-chocolate/30 to-transparent" />
            </div>
          </motion.div>

          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <span className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4 block">
              What We Do
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight mb-12">
              Our <span className="italic">Services</span>
            </h2>

            <div className="space-y-6">
              {services.map((service, index) => (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
  to="/services"
  className="service-item text-2xl md:text-3xl lg:text-4xl text-foreground/80 
             hover:text-primary hover:italic 
             block py-2 border-b border-border/50 transition-all duration-300"
>
  {service}
</Link>

                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-12"
            >
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-4 transition-all duration-300"
              >
                Explore All Services
                <span className="text-xl">→</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

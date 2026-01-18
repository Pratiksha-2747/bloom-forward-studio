import { motion } from "framer-motion";

const clients = [
  { id: 1, name: "Serene Skincare" },
  { id: 2, name: "Cafe Bloom" },
  { id: 3, name: "Luna Studio" },
  { id: 4, name: "Amber Atelier" },
  { id: 5, name: "Moire Rugs" },
  { id: 6, name: "Life's A Beach" },
  { id: 7, name: "Binal Patel" },
  { id: 8, name: "Thyme & Whisk" },
];

const ClientLogosSection = () => {

  const duplicatedClients = [...clients, ...clients];

  return (
    <section className="py-24 md:py-32 bg-bloom-cream overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-medium mb-4 block">
            Trusted By
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">
            Brands We've Worked With
          </h2>
          <div className="w-2 h-2 bg-primary rounded-full mx-auto" />
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        <div className="flex marquee-track hover:pause">
          {duplicatedClients.map((client, index) => (
            <div
              key={`${client.id}-${index}`}
              className="flex-shrink-0 mx-4 px-8 py-6 bg-white rounded-2xl shadow-soft hover:shadow-medium hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <span className="font-serif text-lg md:text-xl text-foreground whitespace-nowrap">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogosSection;

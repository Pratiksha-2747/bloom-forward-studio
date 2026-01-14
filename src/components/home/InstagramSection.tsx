import { motion } from "framer-motion";
import { Instagram, ArrowUpRight } from "lucide-react";

const instaTiles = [
  { id: 1, bg: "bg-primary" },
  { id: 2, bg: "bg-bloom-yellow" },
  { id: 3, bg: "bg-bloom-chocolate" },
  { id: 4, bg: "bg-bloom-cream border border-border" },
  { id: 5, bg: "bg-primary/80" },
  { id: 6, bg: "bg-bloom-chocolate/80" },
];

const InstagramSection = () => {
  return (
    <section className="h-screen max-h-[900px] flex flex-col justify-center py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-6 h-full flex flex-col">
        {/* Header Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8"
        >
          <div>
            <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium mb-2 block">
              Follow Us
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl">
              Let's Connect on{" "}
              <span className="italic text-primary">Instagram</span>
            </h2>
          </div>

          <a
            href="https://www.instagram.com/bloom.branding_/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3 rounded-full hover:shadow-medium hover:-translate-y-1 transition-all duration-300"
          >
            <Instagram className="w-5 h-5" />
            <span className="font-medium">@bloom.branding_</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Instagram Grid */}
        <div className="flex-1 grid grid-cols-3 grid-rows-2 gap-4 md:gap-6">
          {instaTiles.map((tile, index) => (
            <motion.a
              key={tile.id}
              href="https://www.instagram.com/bloom.branding_/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`insta-tile ${tile.bg} flex items-center justify-center`}
            >
              {index === 2 && (
                <Instagram className="w-12 h-12 text-primary-foreground" />
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;

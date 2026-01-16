import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";

interface WorkSectionProps {
  images?: {
    work1: string;
    work2: string;
    work3: string;
    work4: string;
  };
}

const WorkSection = ({
  images = { work1, work2, work3, work4 },
}: WorkSectionProps) => {
  const works = [
    {
      id: 1,
      title: "Serene Skincare",
      category: "Brand Identity + Packaging",
      image: images.work1,
    },
    {
      id: 2,
      title: "Cafe Bloom",
      category: "Visual Identity + Social Media",
      image: images.work2,
    },
    {
      id: 3,
      title: "Luna Studio",
      category: "Website Design + Frontend",
      image: images.work3,
    },
    {
      id: 4,
      title: "Amber Atelier",
      category: "Content + Storytelling",
      image: images.work4,
    },
  ];
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4 block">
            Selected Work
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl">
            Our <span className="italic">Portfolio</span>
          </h2>
        </motion.div>

        {/* Work Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {works.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group"
            >
              <Link to="/work" className="block">
                <div className="relative overflow-hidden rounded-2xl card-lift">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-bloom-chocolate/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-xs uppercase tracking-widest text-white/80 mb-1 block">
                      {work.category}
                    </span>
                    <h3 className="font-serif text-2xl text-white">
                      {work.title}
                    </h3>
                  </div>
                </div>
                <div className="mt-4 group-hover:opacity-0 transition-opacity duration-300">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                    {work.category}
                  </span>
                  <h3 className="font-serif text-xl text-foreground">
                    {work.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link to="/work" className="btn-hero inline-block">
            View All Work
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkSection;

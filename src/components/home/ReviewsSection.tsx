import { motion } from "framer-motion";
import reviewsBg from "@/assets/reviews-bg.jpg";

interface ReviewsSectionProps {
  bgImage?: string;
}

const reviews = [
  {
    id: 1,
    text: "Bloom Branding transformed our vision into a stunning visual identity. Their attention to detail is unmatched.",
    name: "Sarah Mitchell",
    brand: "Serene Skincare",
    position: "top-20 left-[10%]",
  },
  {
    id: 2,
    text: "Working with Bloom was an absolute pleasure. They truly understood our brand essence.",
    name: "James Chen",
    brand: "Cafe Bloom",
    position: "top-32 right-[8%]",
  },
  {
    id: 3,
    text: "The team's creative approach helped us stand out in a crowded market. Highly recommended!",
    name: "Priya Sharma",
    brand: "Luna Studio",
    position: "bottom-24 left-[15%]",
  },
  {
    id: 4,
    text: "Professional, creative, and genuinely invested in our success. A true partner in growth.",
    name: "Michael Torres",
    brand: "Amber Atelier",
    position: "bottom-20 right-[12%]",
  },
];

const ReviewsSection = ({ bgImage = reviewsBg }: ReviewsSectionProps) => {
  return (
    <section className="relative min-h-[120vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-bloom-chocolate/50" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 py-32">
        {/* Sticky Center Text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white leading-relaxed max-w-4xl mx-auto">
            Some <span className="italic text-bloom-yellow">kind words</span>
            <br />
            from the brands we've had the
            <br />
            joy of working with!
          </h2>
        </motion.div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="review-card rounded-xl p-6 md:p-8"
            >
              <p className="text-white text-sm md:text-base leading-relaxed mb-4">
                "{review.text}"
              </p>
              <div>
                <span className="text-white font-medium block">
                  {review.name}
                </span>
                <span className="text-white/70 text-sm">{review.brand}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;

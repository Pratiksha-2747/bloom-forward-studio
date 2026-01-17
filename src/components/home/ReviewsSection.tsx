import { motion } from "framer-motion";
import reviewsBg from "@/assets/reviews-bg.jpg";

interface ReviewsSectionProps {
  bgImage?: string;
}

const reviews = [
  {
    id: 1,
    text: "The bloom branding team is really hardworking and efficient. I am associated with bloom since more than a year now and they have taken my brand's page from 20k followers to 50k + followers . Looking forward to touching 100k followers and many more effective collabs together.",
    name: "Mansi Nagdev",
    brand: "",
    position: "top-20 left-[10%]",
  },
  {
    id: 2,
    text: "I've been working with Bloom for past 4-5 months and my experience with them has been great! Both the founders are very creative and also the team is flexible managing shoot timings and dates and accommodating speclal requests needed bel I'd recommend you take that meeting.",
    name: "Nishant Shah",
    brand: "",
    position: "top-32 right-[8%]",
  },
  {
    id: 3,
    text: "I had an exceptional experience working with Bloom Branding. Their professionalism, tailored strategies, and excellent communication made them stand out. They tackled challenges creatively, delivered precise campaigns, and their dedication to results was evident throughout. I highly recommend Bloom Branding for their expertise and commitment to excellence.",
    name: "Harsh Kheni",
    brand: "",
    position: "bottom-24 left-[15%]",
  },
  {
    id: 4,
    text: "Great work done by these people! One stop for all the assistance needed for digital marketing related work. The employees and all the staff here provide all the guidance to the best of your satisfaction.",
    name: "Purva Shah",
    brand: "",
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

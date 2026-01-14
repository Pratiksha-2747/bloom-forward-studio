import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface StatProps {
  target: number;
  suffix: string;
  label: string;
}

const StatCounter = ({ target, suffix, label }: StatProps) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);
            setCount(current);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <div ref={ref} className="stat-circle">
      <span className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary-foreground font-medium">
        {count}
        {suffix}
      </span>
      <span className="text-xs md:text-sm text-primary-foreground/80 text-center mt-2 px-4 leading-tight uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
};

const JourneySection = () => {
  const stats = [
    { target: 4, suffix: "+", label: "Years of Experience" },
    { target: 75, suffix: "+", label: "Happy Clients" },
    { target: 100, suffix: "+", label: "Projects Completed" },
  ];

  return (
    <section className="py-24 md:py-32 bg-primary relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-10 left-10 w-40 h-40 rounded-full border border-primary-foreground/10" />
      <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full border border-primary-foreground/10" />
      <div className="absolute top-1/2 left-1/4 w-20 h-20 rounded-full border border-primary-foreground/5" />
      <div className="absolute bottom-1/3 right-1/3 w-32 h-32 rounded-full border border-primary-foreground/5" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-primary-foreground/70 font-medium mb-4 block">
            Our Journey
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary-foreground">
            What is Our{" "}
            <span className="italic text-bloom-yellow">Experience?</span>
          </h2>
        </motion.div>

        {/* Stats */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <StatCounter
                target={stat.target}
                suffix={stat.suffix}
                label={stat.label}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneySection;

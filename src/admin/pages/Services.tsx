import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Image, Home, Briefcase, Route } from "lucide-react";

const Services = () => {
  const items = [
    {
      label: "Home Page Images",
      path: "/bloom-admin/services/home",
      icon: Home,
      description: "Hero, intro, services, and other homepage images"
    },
    {
      label: "Our Work Images",
      path: "/bloom-admin/services/work",
      icon: Briefcase,
      description: "Portfolio showcase images"
    },
    {
      label: "Our Journey Images",
      path: "/bloom-admin/services/journey",
      icon: Route,
      description: "Journey section background images"
    },
    {
      label: "Services Page Images",
      path: "/bloom-admin/services/service",
      icon: Image,
      description: "Services page specific images"
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-serif text-foreground mb-2">
          Image Management
        </h1>
        <p className="text-lg text-muted-foreground">
          Choose which page images you want to edit.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl"
      >
        {items.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index + 0.3 }}
            whileHover={{ y: -4 }}
          >
            <Link to={item.path}>
              <div className="rounded-xl bg-card p-6 shadow-soft border border-border/50 hover:shadow-medium transition-all duration-300 group cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <item.icon className="w-6 h-6 text-bloom-blue group-hover:scale-110 transition-transform" />
                  <h2 className="text-xl font-serif font-medium">{item.label}</h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Services;

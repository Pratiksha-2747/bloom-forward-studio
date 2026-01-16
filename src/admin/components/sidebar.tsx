import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, Users, Briefcase, Instagram } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/bloom-admin", label: "Dashboard", icon: LayoutDashboard },
    { path: "/bloom-admin/leads", label: "Leads", icon: Users },
    { path: "/bloom-admin/services", label: "Services", icon: Briefcase },
    { path: "/bloom-admin/instagram", label: "Instagram", icon: Instagram },
  ];

  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="w-64 bg-card/80 backdrop-blur-md border-r border-border shadow-soft"
    >
      <div className="p-6">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm uppercase tracking-wider text-muted-foreground font-medium mb-6"
        >
          Navigation
        </motion.h2>
        <nav className="space-y-2">
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index + 0.4 }}
            >
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-foreground hover:bg-muted hover:shadow-soft"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>
    </motion.aside>
  );
};

export default Sidebar;

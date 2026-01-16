import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import bloomLogo from "@/assets/bloom-logo-text.jpeg";

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/bloom-admin/login");
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="bg-card/80 backdrop-blur-md border-b border-border shadow-soft"
    >
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={bloomLogo}
            alt="Bloom Branding"
            className="h-8 w-auto object-contain"
          />
          <div className="h-6 w-px bg-border"></div>
          <h1 className="text-xl font-serif text-foreground">
            Admin Panel
          </h1>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition shadow-soft"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </motion.button>
      </div>
    </motion.header>
  );
};

export default AdminHeader;

import React from "react";
import { motion } from "framer-motion";
import AdminHeader from "./AdminHeader";
import Sidebar from "./sidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bloom-cream via-background to-bloom-cream/50">
      <AdminHeader />
      <div className="flex">
        <Sidebar />
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="flex-1 p-8"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
};

export default AdminLayout;

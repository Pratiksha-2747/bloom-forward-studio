import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { motion } from "framer-motion";
import { Users, Briefcase, Instagram, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const [totalLeads, setTotalLeads] = useState<number>(0);
  const [latestLead, setLatestLead] = useState<{
    name: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      // Total leads count
      const snapshot = await getDocs(collection(db, "leads"));
      setTotalLeads(snapshot.size);

      // Latest lead
      const q = query(
        collection(db, "leads"),
        orderBy("createdAt", "desc"),
        limit(1)
      );
      const latestSnap = await getDocs(q);

      if (!latestSnap.empty) {
        const data = latestSnap.docs[0].data();
        setLatestLead({
          name: data.name,
          email: data.email,
        });
      }
    };

    fetchStats();
  }, []);

  const statsCards = [
    {
      title: "Total Leads",
      value: totalLeads,
      icon: Users,
      color: "text-bloom-blue",
    },
  ];

  const navCards = [
    {
      to: "/bloom-admin/leads",
      title: "Leads",
      description: "View and manage contact form submissions.",
      icon: Users,
      color: "text-bloom-blue",
    },
    {
      to: "/bloom-admin/services",
      title: "Services",
      description: "Edit images shown across the website.",
      icon: Briefcase,
      color: "text-bloom-yellow",
    },
    {
      to: "/bloom-admin/instagram",
      title: "Instagram",
      description: "Manage Instagram posts displayed on the homepage.",
      icon: Instagram,
      color: "text-bloom-chocolate",
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-serif text-foreground">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Welcome to the Bloom Branding admin panel.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2"
      >
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 * index + 0.3 }}
            className="rounded-xl bg-card p-6 shadow-soft border border-border/50"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm text-muted-foreground uppercase tracking-wide">
                  {stat.title}
                </h3>
                <p className="mt-2 text-3xl font-serif font-semibold">
                  {stat.value}
                </p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="rounded-xl bg-card p-6 shadow-soft border border-border/50"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground uppercase tracking-wide">
                Latest Lead
              </h3>
              {latestLead ? (
                <div className="mt-2">
                  <p className="font-medium text-foreground">{latestLead.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {latestLead.email}
                  </p>
                </div>
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">
                  No leads yet
                </p>
              )}
            </div>
            <TrendingUp className="w-8 h-8 text-bloom-yellow" />
          </div>
        </motion.div>
      </motion.div>

      {/* Navigation cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {navCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index + 0.6 }}
            whileHover={{ y: -4 }}
          >
            <Link to={card.to}>
              <div className="rounded-xl bg-card p-6 shadow-soft border border-border/50 hover:shadow-medium transition-all duration-300 cursor-pointer group">
                <div className="flex items-center gap-3 mb-3">
                  <card.icon className={`w-6 h-6 ${card.color} group-hover:scale-110 transition-transform`} />
                  <h2 className="text-xl font-serif font-medium">{card.title}</h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Admin Management Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-12 rounded-xl bg-card p-6 shadow-soft border border-border/50"
      >
        <h2 className="text-xl font-serif font-medium mb-4">Admin Management</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Firebase Admin System</h3>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                Admin access is now managed through Firebase Firestore. Authorized admins are stored in the <code className="bg-background px-1 py-0.5 rounded text-xs">'admins'</code> collection.
              </p>
              <p className="text-sm text-muted-foreground">
                Each admin document uses the email as the document ID with data: <code className="bg-background px-1 py-0.5 rounded text-xs">{"{isAdmin: true, role: 'admin'}"}</code>
              </p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>
              To add or remove admin access, manage documents in the Firestore <code className="bg-muted px-1 py-0.5 rounded text-xs">'admins'</code> collection
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Admin panel URL: <code className="bg-muted px-1 py-0.5 rounded text-xs">/bloom-admin</code>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;

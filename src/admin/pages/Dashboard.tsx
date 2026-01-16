import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";

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

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold text-foreground">
        Admin Dashboard
      </h1>

      <p className="mt-2 text-muted-foreground">
        Welcome to the Bloom Branding admin panel.
      </p>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-xl bg-card p-6 shadow-soft">
          <h3 className="text-sm text-muted-foreground">Total Leads</h3>
          <p className="mt-2 text-3xl font-semibold">{totalLeads}</p>
        </div>

        <div className="rounded-xl bg-card p-6 shadow-soft">
          <h3 className="text-sm text-muted-foreground">Latest Lead</h3>
          {latestLead ? (
            <div className="mt-2">
              <p className="font-medium">{latestLead.name}</p>
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
      </div>

      {/* Navigation cards */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Leads */}
        <Link to="/admin/leads">
          <div className="rounded-xl bg-card p-6 shadow-soft hover:shadow-md transition cursor-pointer">
            <h2 className="text-lg font-medium">Leads</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              View and manage contact form submissions.
            </p>
          </div>
        </Link>

        {/* Services */}
        <Link to="/admin/services">
          <div className="rounded-xl bg-card p-6 shadow-soft hover:shadow-md transition cursor-pointer">
            <h2 className="text-lg font-medium">Services</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Edit images shown across the website.
            </p>
          </div>
        </Link>

        {/* Instagram */}
        <Link to="/admin/instagram">
          <div className="rounded-xl bg-card p-6 shadow-soft hover:shadow-md transition cursor-pointer">
            <h2 className="text-lg font-medium">Instagram</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage Instagram posts displayed on the homepage.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;

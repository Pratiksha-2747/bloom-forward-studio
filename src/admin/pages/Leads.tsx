import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

type Lead = {
  id: string;
  name: string;
  email: string;
  services?: string[];
  message: string;
  contacted?: boolean;
};

const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");

  useEffect(() => {
    const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<Lead, "id">),
      }));

      setLeads(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this lead?")) return;
    await deleteDoc(doc(db, "leads", id));
  };

  const toggleContacted = async (id: string, current: boolean | undefined) => {
    await updateDoc(doc(db, "leads", id), {
      contacted: !current,
    });
  };

  if (loading) {
    return <p className="p-8">Loading leads...</p>;
  }

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase());

    const matchesService =
      !serviceFilter ||
      (lead.services && lead.services.includes(serviceFilter));

    return matchesSearch && matchesService;
  });

  const allServices = Array.from(
    new Set(leads.flatMap((l) => l.services || []))
  );

  return (
    <div className="p-8">
      <motion.div
        className="admin-leads"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-semibold text-foreground mb-6"
        >
          Leads
        </motion.h1>

        {/* Search & Filter */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex gap-4 mb-6"
        >
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground"
          />

          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border bg-background text-foreground"
          >
            <option value="">All Services</option>
            {allServices.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </motion.div>

        {filteredLeads.length === 0 && (
          <p className="text-muted-foreground italic">
            No leads match your search.
          </p>
        )}

        <AnimatePresence>
          {filteredLeads.map((lead) => (
            <motion.div
              key={lead.id}
              className="lead-card rounded-xl bg-card p-6 mb-4 shadow-soft"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">{lead.name}</h3>

                  <p className="text-sm text-muted-foreground">
                    <strong>Email:</strong> {lead.email}
                  </p>

                  {lead.services && (
                    <p className="text-sm text-muted-foreground">
                      <strong>Services:</strong> {lead.services.join(", ")}
                    </p>
                  )}

                  <p className="message text-foreground mt-2">{lead.message}</p>

                  {/* Status badge */}
                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                      lead.contacted
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {lead.contacted ? "Contacted" : "Not contacted"}
                  </span>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <button
                    onClick={() => toggleContacted(lead.id, lead.contacted)}
                    className="px-3 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition text-sm"
                  >
                    Mark as {lead.contacted ? "Not Contacted" : "Contacted"}
                  </button>

                  <button
                    onClick={() => handleDelete(lead.id)}
                    className="px-3 py-1 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90 transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Leads;

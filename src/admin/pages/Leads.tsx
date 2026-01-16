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
      >
        Leads
      </motion.h1>

      {/* Search & Filter */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}
      >
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "0.6rem",
            borderRadius: "8px",
            border: "1px solid #ddd",
            flex: 1,
          }}
        />

        <select
          value={serviceFilter}
          onChange={(e) => setServiceFilter(e.target.value)}
          style={{
            padding: "0.6rem",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
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
            className="lead-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <div>
              <h3>{lead.name}</h3>

              <p>
                <strong>Email:</strong> {lead.email}
              </p>

              {lead.services && (
                <p>
                  <strong>Services:</strong> {lead.services.join(", ")}
                </p>
              )}

              <p className="message">{lead.message}</p>

              {/* Status badge */}
              <span
                style={{
                  display: "inline-block",
                  marginTop: "0.5rem",
                  padding: "0.3rem 0.6rem",
                  borderRadius: "999px",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  background: lead.contacted ? "#e6f6ee" : "#fdecea",
                  color: lead.contacted ? "#1f7a4f" : "#a61b1b",
                }}
              >
                {lead.contacted ? "Contacted" : "Not contacted"}
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <button onClick={() => toggleContacted(lead.id, lead.contacted)}>
                Mark as {lead.contacted ? "Not Contacted" : "Contacted"}
              </button>

              <button onClick={() => handleDelete(lead.id)}>Delete</button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default Leads;

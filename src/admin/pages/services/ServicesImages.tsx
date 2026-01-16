import { useState, useEffect } from "react";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";

interface ServicePageImages {
  mainImage?: string;
  inquireImage?: string;
  service1?: string;
  service2?: string;
  service3?: string;
  service4?: string;
  service5?: string;
}

const ServicesImages = () => {
  const [images, setImages] = useState<ServicePageImages>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const fields: Array<{ key: keyof ServicePageImages; label: string }> = [
    { key: "mainImage", label: "Main Image" },
    { key: "service1", label: "Branding Service Image" },
    { key: "service2", label: "Social Media Marketing Image" },
    { key: "service3", label: "Production Service Image" },
    { key: "service4", label: "Influencer Marketing Image" },
    { key: "service5", label: "Creative Design Image" },
    { key: "inquireImage", label: "Inquire CTA Image" },
  ];

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const docRef = doc(db, "siteImages", "service");
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          setImages(snapshot.data() as ServicePageImages);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
        setMessage("Error loading images");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleInputChange = (key: keyof ServicePageImages, value: string) => {
    setImages((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const docRef = doc(db, "siteImages", "service");
      await setDoc(docRef, images, { merge: true });
      setMessage("✓ Changes saved successfully");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error saving images:", error);
      setMessage("✗ Error saving changes");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-serif text-foreground mb-2">
            Services Page Images
          </h1>
          <p className="text-lg text-muted-foreground">
            Loading image management...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-serif text-foreground mb-2">
          Services Page Images
        </h1>
        <p className="text-lg text-muted-foreground">
          Manage services page specific images.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-2xl"
      >
        <div className="rounded-xl bg-card p-6 shadow-soft border border-border/50">
            {fields.map(({ key, label }) => (
              <div key={key} className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  {label}
                </label>
                <input
                  type="text"
                  value={images[key] || ""}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary"
                  placeholder="Paste image URL here..."
                />
              </div>
            ))}

            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

              {message && (
                <span
                  className={`text-sm ${
                    message.includes("✓") ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {message}
                </span>
              )}
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ServicesImages;

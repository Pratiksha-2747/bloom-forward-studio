import { useState, useEffect } from "react";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";

interface HomePageImages {
  heroBg?: string;
  introImage?: string;
  introHoverImage?: string;
  servicesImage?: string;
  reviewsBg?: string;
  workImage1?: string;
  workImage2?: string;
  workImage3?: string;
  workImage4?: string;
}

const HomeImages = () => {
  const [images, setImages] = useState<HomePageImages>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const fields: Array<{ key: keyof HomePageImages; label: string }> = [
    { key: "heroBg", label: "Hero Background" },
    { key: "introImage", label: "Intro Image" },
    { key: "introHoverImage", label: "Intro Hover Image" },
    { key: "servicesImage", label: "Services Image" },
    { key: "reviewsBg", label: "Reviews Background" },
    { key: "workImage1", label: "Work Image 1" },
    { key: "workImage2", label: "Work Image 2" },
    { key: "workImage3", label: "Work Image 3" },
    { key: "workImage4", label: "Work Image 4" },
  ];

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const docRef = doc(db, "siteImages", "home");
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          setImages(snapshot.data() as HomePageImages);
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

  const handleInputChange = (key: keyof HomePageImages, value: string) => {
    setImages((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const docRef = doc(db, "siteImages", "home");
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
            Home Page Images
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
          Home Page Images
        </h1>
        <p className="text-lg text-muted-foreground">
          Manage hero, intro, services, and other homepage images.
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

export default HomeImages;

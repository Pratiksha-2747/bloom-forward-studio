import { useState, useEffect } from "react";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import AdminHeader from "../../components/AdminHeader";

interface JourneyPageImages {
  card1?: string;
  card2?: string;
  card3?: string;
  card4?: string;
  card5?: string;
  inquireImage?: string;
  introImage?: string;
}

const JourneyImages = () => {
  const [images, setImages] = useState<JourneyPageImages>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const fields: Array<{ key: keyof JourneyPageImages; label: string }> = [
    { key: "introImage", label: "Intro Image" },
    { key: "card1", label: "Card 1 (2020)" },
    { key: "card2", label: "Card 2 (2021)" },
    { key: "card3", label: "Card 3 (2022)" },
    { key: "card4", label: "Card 4 (2023)" },
    { key: "card5", label: "Card 5 (2024)" },
    { key: "inquireImage", label: "Inquire Image" },
  ];

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const docRef = doc(db, "siteImages", "journey");
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          setImages(snapshot.data() as JourneyPageImages);
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

  const handleInputChange = (key: keyof JourneyPageImages, value: string) => {
    setImages((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const docRef = doc(db, "siteImages", "journey");
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
      <div className="min-h-screen bg-background">
        <AdminHeader />
        <div className="p-8">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <div className="p-8">
        <h1 className="text-3xl font-semibold text-foreground mb-2">
          Journey Page Images
        </h1>
        <p className="text-muted-foreground mb-8">
          Update image URLs for the Journey page sections.
        </p>

        <div className="max-w-2xl">
          <div className="rounded-xl bg-card p-6 shadow-soft">
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
        </div>
      </div>
    </div>
  );
};

export default JourneyImages;

<<<<<<< HEAD
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const SERVICES = [
  { id: "service-1", label: "Service 1" },
  { id: "service-2", label: "Service 2" },
  { id: "service-3", label: "Service 3" },
  { id: "service-4", label: "Service 4" },
  { id: "service-5", label: "Service 5" },
  { id: "service-6", label: "Service 6" },
];

const Services = () => {
  const [images, setImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      const data: Record<string, string> = {};

      for (const service of SERVICES) {
        const snap = await getDoc(doc(db, "services", service.id));
        data[service.id] = snap.exists() ? snap.data().imageUrl || "" : "";
      }

      setImages(data);
      setLoading(false);
    };

    loadImages();
  }, []);

  const saveImageUrl = async (serviceId: string) => {
    await setDoc(
      doc(db, "services", serviceId),
      { imageUrl: images[serviceId] },
      { merge: true }
    );

    alert("Image updated");
  };

  if (loading) return <p className="p-8">Loading services...</p>;

  return (
    <div className="p-8">
      {/* INSTRUCTIONS (ONLY ADDITION) */}
      <div
        style={{
          background: "#fff7e6",
          border: "1px solid #f0d9a8",
          padding: "1rem",
          borderRadius: "10px",
          marginBottom: "2rem",
        }}
      >
        <h2 style={{ fontWeight: 600, marginBottom: "0.5rem" }}>
          📌 How to update service images
        </h2>

        <ol style={{ paddingLeft: "1.2rem", lineHeight: 1.6 }}>
          <li>
            Go to{" "}
            <a
              href="https://postimages.org/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#c94b4b", fontWeight: 500 }}
            >
              https://postimages.org/
            </a>
          </li>
          <li>Upload the image</li>
          <li>
            Copy the <strong>Direct Link</strong>
          </li>
          <li>
            Paste the link below and click <strong>Save Image</strong>
          </li>
        </ol>

        <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "#666" }}>
          ⚠️ The link must end with <code>.jpg</code>, <code>.png</code>, or{" "}
          <code>.webp</code>
        </p>
      </div>

      <h1 className="text-2xl font-semibold mb-6">Services Images</h1>

      {SERVICES.map((service) => (
        <div
          key={service.id}
          className="bg-card rounded-xl p-6 mb-6 shadow-soft"
        >
          <h2 className="text-lg font-medium mb-2">{service.label}</h2>

          <input
            type="text"
            placeholder="Paste image URL here"
            value={images[service.id] || ""}
            onChange={(e) =>
              setImages((prev) => ({
                ...prev,
                [service.id]: e.target.value,
              }))
            }
            className="w-full p-2 border rounded mb-3"
          />

          <button
            onClick={() => saveImageUrl(service.id)}
            className="px-4 py-2 bg-black text-white rounded"
          >
            Save Image
          </button>
        </div>
      ))}
=======
import AdminHeader from "../components/AdminHeader";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();

  const items = [
    { label: "Home Page Images", path: "/admin/services/home" },
    { label: "Our Work Images", path: "/admin/services/work" },
    { label: "Our Journey Images", path: "/admin/services/journey" },
    { label: "Services Page Images", path: "/admin/services/service" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <div className="p-8">
        <h1 className="text-3xl font-semibold text-foreground mb-2">
          Services
        </h1>
        <p className="text-muted-foreground mb-8">
          Choose which page images you want to edit.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
          {items.map((item) => (
            <div
              key={item.path}
              onClick={() => navigate(item.path)}
              className="cursor-pointer rounded-xl bg-card p-6 shadow-soft hover:shadow-lg transition"
            >
              <h2 className="text-lg font-medium">{item.label}</h2>
            </div>
          ))}
        </div>
      </div>
>>>>>>> 4be3222ebf7f98acff2afe4827859a5c4cb6af1c
    </div>
  );
};

export default Services;

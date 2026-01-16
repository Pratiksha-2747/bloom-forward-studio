import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { Instagram, Mail, MapPin } from "lucide-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const services = [
  "Branding",
  "Social Media Marketing",
  "Production",
  "Influencer Marketing",
  "Creative Design",
];

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    selectedServices: [] as string[],
    projectDetails: "",
  });

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(service)
        ? prev.selectedServices.filter((s) => s !== service)
        : [...prev.selectedServices, service],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("SUBMIT CLICKED", formData);

    try {
      await addDoc(collection(db, "leads"), {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        services: formData.selectedServices,
        message: formData.projectDetails,
        createdAt: serverTimestamp(),
      });

      console.log("LEAD SAVED SUCCESSFULLY");
      alert("Thank you for your inquiry! We'll get back to you soon.");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        selectedServices: [],
        projectDetails: "",
      });
    } catch (error) {
      console.error("ERROR SAVING LEAD:", error);
      alert("Error submitting form. Check console.");
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section className="pt-32 pb-12 bg-bloom-cream">
          <div className="container mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">
                ✨ Let's <span className="italic text-primary">Collaborate</span> ✨
              </h1>
              <p className="text-xl text-muted-foreground">
                Start your brand journey with us!
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}>
                <h2 className="font-serif text-4xl md:text-5xl mb-8">
                  Let's Begin <span className="italic text-primary">Something Beautiful</span>
                </h2>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      required
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      placeholder="First name"
                      className="input"
                    />
                    <input
                      required
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      placeholder="Last name"
                      className="input"
                    />
                  </div>

                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Email"
                    className="input"
                  />

                  <div className="flex flex-wrap gap-3">
                    {services.map((service) => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => handleServiceToggle(service)}
                        className={`px-4 py-2 rounded-full border ${
                          formData.selectedServices.includes(service)
                            ? "bg-primary text-white"
                            : ""
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>

                  <textarea
                    value={formData.projectDetails}
                    onChange={(e) =>
                      setFormData({ ...formData, projectDetails: e.target.value })
                    }
                    rows={5}
                    className="w-full p-3 border rounded"
                    placeholder="Project details"
                  />

                  <button type="submit" className="btn-hero">
                    LET'S BEGIN
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

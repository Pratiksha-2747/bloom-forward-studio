import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { Instagram, Mail, MapPin, Send, CheckCircle } from "lucide-react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "leads"), {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        services: formData.selectedServices,
        message: formData.projectDetails,
        createdAt: serverTimestamp(),
      });

      setIsSubmitted(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        selectedServices: [],
        projectDetails: "",
      });

      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("ERROR SAVING LEAD:", error);
      alert("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-4">
              Let's <span className="italic text-primary">Collaborate</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start your brand journey with us!
              <br />
              Let's create something beautiful together.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            {/* Contact Info Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mb-12 text-center"
            >
              <a
                href="mailto:hello@bloombranding.com"
                className="group flex items-center gap-3 hover:text-primary transition-colors duration-300 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">Email Us</h3>
                  <p className="text-sm text-muted-foreground">hello@bloombranding.com</p>
                </div>
              </a>

              <a
                href="https://www.instagram.com/bloom.branding_/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 hover:text-bloom-yellow transition-colors duration-300 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-bloom-yellow/10 group-hover:bg-bloom-yellow/20 flex items-center justify-center transition-colors">
                  <Instagram className="w-5 h-5 text-bloom-yellow" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground group-hover:text-bloom-yellow transition-colors">Follow Us</h3>
                  <p className="text-sm text-muted-foreground">@bloombrandingstudio</p>
                </div>
              </a>

              <a
                href="https://maps.app.goo.gl/XFnfimxrWXEhqkWE8"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 hover:text-bloom-blue transition-colors duration-300 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-bloom-blue/10 group-hover:bg-bloom-blue/20 flex items-center justify-center transition-colors">
                  <MapPin className="w-5 h-5 text-bloom-blue" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground group-hover:text-bloom-blue transition-colors">Location</h3>
                  <p className="text-sm text-muted-foreground">Bloom Branding Studio</p>
                </div>
              </a>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
              {/* Left Side Text */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col justify-center"
              >
                <h2 className="font-serif text-4xl md:text-5xl mb-6">
                  Let's Begin
                  <br />
                  <span className="italic text-primary">Something Beautiful</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Ready to transform your brand? Share your vision with us and let's create
                  something extraordinary together. Every great brand story starts with a conversation.
                </p>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="lg:col-span-1"
              >
                <div className="rounded-xl bg-card p-8 shadow-soft border border-border/50">
                  <h2 className="text-2xl font-serif text-foreground mb-6">
                    Start Your <span className="italic text-primary">Project</span>
                  </h2>

                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 flex items-center gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <p className="text-green-800 font-medium">
                        Thank you! We'll get back to you within 24 hours.
                      </p>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          First Name *
                        </label>
                        <input
                          required
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({ ...formData, firstName: e.target.value })
                          }
                          placeholder="Enter your first name"
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Last Name *
                        </label>
                        <input
                          required
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({ ...formData, lastName: e.target.value })
                          }
                          placeholder="Enter your last name"
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="Enter your email address"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">
                        Services Interested In
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {services.map((service) => (
                          <button
                            key={service}
                            type="button"
                            onClick={() => handleServiceToggle(service)}
                            className={`px-4 py-2 rounded-full border transition-all duration-200 ${
                              formData.selectedServices.includes(service)
                                ? "bg-primary text-white border-primary shadow-md"
                                : "bg-background text-foreground border-border hover:border-primary/50"
                            }`}
                          >
                            {service}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Project Details
                      </label>
                      <textarea
                        value={formData.projectDetails}
                        onChange={(e) =>
                          setFormData({ ...formData, projectDetails: e.target.value })
                        }
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                        placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-white font-semibold py-4 px-6 rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-soft"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

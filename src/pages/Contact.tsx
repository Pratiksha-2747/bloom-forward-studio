import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { Instagram, Mail, MapPin } from "lucide-react";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
    alert("Thank you for your inquiry! We'll get back to you soon.");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Header */}
        <section className="pt-32 pb-12 bg-bloom-cream">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">
                 Let's <span className="italic text-primary">Collaborate</span> 
              </h1>
              <p className="text-xl text-muted-foreground">
                Start your brand journey with us!
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-12 bg-bloom-cream">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center"
            >
              <div>
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Instagram className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                  Our Instagram
                </span>
                <a
                  href="https://www.instagram.com/bloom.branding_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground font-medium hover:text-primary transition-colors"
                >
                  @bloom.branding_
                </a>
              </div>
              <div>
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                  Visit Us
                </span>
                <span className="text-foreground font-medium">
                  Mumbai, India
                </span>
              </div>
              <div>
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                  Drop us a Mail
                </span>
                <a
                  href="mailto:hello.bloombranding@gmail.com"
                  className="text-foreground font-medium hover:text-primary transition-colors"
                >
                  hello.bloombranding@gmail.com
                </a>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center text-muted-foreground mt-12 max-w-xl mx-auto"
            >
              Tell us about your idea, your brand or your vision.
              <br />
              <span className="text-primary italic">We'd love to hear from you!</span>
            </motion.p>
          </div>
        </section>

        {/* Main Contact Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
              {/* Left Side - Message */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col justify-center"
              >
                <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-8">
                  Let's Begin
                  <br />
                  <span className="italic text-primary">Something Beautiful</span>
                </h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p>
                    Ready to watch your brand bloom? We create thoughtful spaces
                    where ideas grow with clarity and purpose.
                  </p>
                  <p>
                    Share a little about your vision, and we'll take it from there.
                    Whether you're starting fresh or ready for a refresh, we're here
                    to help you tell your story.
                  </p>
                </div>
              </motion.div>

              {/* Right Side - Form */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({ ...formData, firstName: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-3 block">
                      Services
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {services.map((service) => (
                        <button
                          key={service}
                          type="button"
                          onClick={() => handleServiceToggle(service)}
                          className={`px-4 py-2 rounded-full text-sm border transition-all duration-300 ${
                            formData.selectedServices.includes(service)
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-card border-border hover:border-primary"
                          }`}
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Tell us about your project
                    </label>
                    <textarea
                      value={formData.projectDetails}
                      onChange={(e) =>
                        setFormData({ ...formData, projectDetails: e.target.value })
                      }
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                      placeholder="Share your vision, goals, or any details that would help us understand your project better..."
                    />
                  </div>

                  <button type="submit" className="btn-hero w-full md:w-auto">
                    Let's Begin
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

import { Link } from "react-router-dom";
import { Instagram, Mail, Phone, Linkedin, Facebook } from "lucide-react";
import bloomLogoMark from "@/assets/bloom-logo_mini.jpeg";

const Footer = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Our Work", path: "/work" },
    { name: "Our Journey", path: "/journey" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-[#624A41] text-[#E8E6D8] py-16 border-t border-[#E8E6D8]/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <img
              src={bloomLogoMark}
              alt="Bloom Branding"
              className="h-28 w-28 object-contain mb-6 rounded-lg"
            />

            <p className="text-[#E8E6D8]/80 text-sm leading-relaxed mb-6 max-w-xs">

              A creative branding studio that helps brands grow through strategic 
              storytelling, content creation, and high-impact digital experiences.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/bloom.branding_/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#E8E6D8]/10 flex items-center justify-center
           transition-all duration-300 text-[#E8E6D8]
           hover:bg-[#E8E6D8] hover:text-[#624A41]"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello.bloombranding@gmail.com"
               className="w-10 h-10 rounded-full bg-[#E8E6D8]/10 flex items-center justify-center
           transition-all duration-300 text-[#E8E6D8]
           hover:bg-[#E8E6D8] hover:text-[#624A41]"
>
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://in.linkedin.com/company/bloombranding-digital-media-marketing-branding-agency"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#E8E6D8]/10 flex items-center justify-center
           transition-all duration-300 text-[#E8E6D8]
           hover:bg-[#E8E6D8] hover:text-[#624A41]"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/hello.bloombranding/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#E8E6D8]/10 flex items-center justify-center
           transition-all duration-300 text-[#E8E6D8]
           hover:bg-[#E8E6D8] hover:text-[#624A41]"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-6">Navigate</h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="footer-link text-[#E8E6D8]/70 hover:text-[#E8E6D8] transition-colors text-sm"

                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-lg font-medium mb-6">Get in Touch</h4>
            <div className="space-y-4">
              <a
                href="mailto:hello.bloombranding@gmail.com"
                className="flex items-center gap-3 text-[#E8E6D8]/80 hover:text-[#E8E6D8] transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                hello.bloombranding@gmail.com
              </a>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 text-[#E8E6D8]/80 hover:text-[#E8E6D8] transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                +91 98765 43210
              </a>
              <a
                href="https://www.instagram.com/bloom.branding_/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#E8E6D8]/80 hover:text-[#E8E6D8] transition-colors text-sm"
              >
                <Instagram className="w-4 h-4" />
                @bloom.branding_
              </a>
              <a
                href="https://in.linkedin.com/company/bloombranding-digital-media-marketing-branding-agency"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#E8E6D8]/80 hover:text-[#E8E6D8] transition-colors text-sm"
              >
                <Linkedin className="w-4 h-4" />
                Bloom Branding Studio
              </a>
              <a
                href="https://www.facebook.com/hello.bloombranding/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#E8E6D8]/80 hover:text-[#E8E6D8] transition-colors text-sm"
              >
                <Facebook className="w-4 h-4" />
                Bloom Branding Studio
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#E8E6D8]/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#E8E6D8]/70">
            © {new Date().getFullYear()} Bloom Branding. All rights reserved.
          </p>
          <p className="text-sm text-[#E8E6D8]/70">
            Crafted with ♥ for brands that bloom
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

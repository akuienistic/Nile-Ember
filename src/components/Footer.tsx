import { Home, Info, UtensilsCrossed, Image, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#home", icon: Home },
  { label: "About", href: "#about", icon: Info },
  { label: "Menu", href: "#menu", icon: UtensilsCrossed },
  { label: "Gallery", href: "#gallery", icon: Image },
  { label: "Contact", href: "#contact", icon: MapPin },
];

const socials = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "X (Twitter)" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const Footer = () => {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-nile-blue text-primary-foreground overflow-hidden">
      {/* Nile wave decoration - clean wave only */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-[0]">
        <svg className="relative block w-full h-[40px] md:h-[60px]" viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 L0,30 C240,55 480,5 720,30 C960,55 1200,5 1440,30 L1440,0 Z" fill="hsl(43,30%,96%)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-8 pt-20 md:pt-24 pb-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold text-gradient-gold mb-3">Nile Ember</h3>
            <p className="font-script text-lg text-gold mb-4">Restaurant & Cafe</p>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              An upscale dining destination at Aviation Plaza, Juba International Airport.
              Where the warmth of ember meets the flow of the Nile — savor exquisite flavors
              in a serene, modern ambiance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-bold text-gold mb-4">Quick Links</h4>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="flex items-center gap-2 text-primary-foreground/70 hover:text-gold transition-colors text-sm"
                >
                  <link.icon size={14} className="text-ember" />
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-display text-lg font-bold text-gold mb-4">Connect With Us</h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-primary-foreground/70 text-sm">
                <Phone size={14} className="text-ember" />
                +211 XX XXX XXXX
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/70 text-sm">
                <Mail size={14} className="text-ember" />
                info@nileember.com
              </div>
              <div className="flex items-start gap-2 text-primary-foreground/70 text-sm">
                <MapPin size={14} className="text-ember shrink-0 mt-0.5" />
                Aviation Plaza, Juba International Airport, South Sudan
              </div>
            </div>

            <h5 className="text-sm font-semibold text-primary-foreground/80 mb-3">Follow Us</h5>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-ember hover:glow-amber transition-all"
                >
                  <s.icon size={16} className="text-gold" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary-foreground/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/50">
          <p>© 2026 Nile Ember Restaurant & Cafe. All rights reserved.</p>
          <p>
            Designed & Built by{" "}
            <a
              href="https://www.linkedin.com/in/simon-akuien-atem-710895290/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline font-medium"
            >
              Simon Star Tech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

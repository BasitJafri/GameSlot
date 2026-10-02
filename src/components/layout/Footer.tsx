import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Linkedin, ExternalLink } from 'lucide-react';
import { CONTACT_INFO } from '../../config/constants';

const footerLinks = {
  Explore: [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Experience', to: '/experience' },
    { label: 'Gallery', to: '/gallery' },
  ],
  Support: [
    { label: 'FAQs', to: '/faq' },
    { label: 'Contact', to: '/contact' },
    { label: 'Book a Slot', to: '/book' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary-light border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
              <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center">
                <span className="text-accent font-black text-lg leading-none">G</span>
              </div>
              <span className="font-black text-xl tracking-wide">
                GAME <span className="text-accent">INN</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-xs">
              Islamabad's premier gaming destination. State-of-the-art setups, competitive arenas, and the ultimate gaming community.
            </p>
            <div className="space-y-2">
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="flex items-center gap-3 text-gray-400 hover:text-accent text-sm transition-colors"
              >
                <Phone size={14} />
                {CONTACT_INFO.phone}
              </a>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-3 text-gray-400 hover:text-accent text-sm transition-colors"
              >
                <Mail size={14} />
                {CONTACT_INFO.email}
              </a>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <MapPin size={14} />
                {CONTACT_INFO.location}
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">{group}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-gray-400 hover:text-accent text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Game Inn Islamabad. All rights reserved. — Demo Prototype
          </p>
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent/30 transition-all"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent/30 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent/30 transition-all"
              aria-label="External"
            >
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

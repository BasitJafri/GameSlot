import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Instagram, Linkedin, CheckCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { CONTACT_INFO } from '../../config/constants';

export function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-primary pt-16">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-accent text-sm font-semibold uppercase tracking-widest mb-4">Get In Touch</div>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">Contact Us</h1>
          <p className="text-gray-400 text-xl">
            We're here to help. Reach out through any channel.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            <div className="bg-surface border border-white/08 rounded-2xl p-6 text-center hover:border-accent/20 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 mx-auto mb-4 flex items-center justify-center group-hover:bg-accent/15">
                <Phone size={24} className="text-accent" />
              </div>
              <h3 className="font-bold text-white mb-2">Phone</h3>
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="text-gray-400 hover:text-accent text-sm transition-colors"
              >
                {CONTACT_INFO.phone}
              </a>
              <p className="text-gray-600 text-xs mt-1">Available daily</p>
            </div>
            <div className="bg-surface border border-white/08 rounded-2xl p-6 text-center hover:border-accent/20 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 mx-auto mb-4 flex items-center justify-center group-hover:bg-accent/15">
                <Mail size={24} className="text-accent" />
              </div>
              <h3 className="font-bold text-white mb-2">Email</h3>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="text-gray-400 hover:text-accent text-sm transition-colors"
              >
                {CONTACT_INFO.email}
              </a>
              <p className="text-gray-600 text-xs mt-1">Response within 24hrs</p>
            </div>
            <div className="bg-surface border border-white/08 rounded-2xl p-6 text-center hover:border-accent/20 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 mx-auto mb-4 flex items-center justify-center group-hover:bg-accent/15">
                <MapPin size={24} className="text-accent" />
              </div>
              <h3 className="font-bold text-white mb-2">Location</h3>
              <p className="text-gray-400 text-sm">{CONTACT_INFO.location}</p>
              <p className="text-gray-600 text-xs mt-1">Exact address on confirmation</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact form */}
            <div>
              <h2 className="text-2xl font-black text-white mb-6">Send a Message</h2>
              {submitted ? (
                <div className="bg-accent/10 border border-accent/30 rounded-2xl p-10 text-center">
                  <CheckCircle size={52} className="text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-400">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormState({ name: '', email: '', subject: '', message: '' }); }}
                    className="mt-6 text-accent text-sm hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-accent/50 focus:bg-white/[0.06] transition-all"
                        placeholder="Ahmed Khan"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-accent/50 focus:bg-white/[0.06] transition-all"
                        placeholder="ahmed@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                    <input
                      type="text"
                      required
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-accent/50 focus:bg-white/[0.06] transition-all"
                      placeholder="Booking inquiry"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-accent/50 focus:bg-white/[0.06] transition-all resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>
                  <Button type="submit" fullWidth loading={loading}>
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            {/* Info column */}
            <div className="space-y-6">
              {/* Hours */}
              <div className="bg-surface border border-white/08 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock size={20} className="text-accent" />
                  <h3 className="font-bold text-white">Operating Hours</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Monday – Sunday</span>
                    <span className="text-white font-medium">10:00 AM – 12:00 AM</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Public Holidays</span>
                    <span className="text-white font-medium">Open</span>
                  </div>
                  <p className="text-xs text-gray-500 pt-2 border-t border-white/08">
                    Hours are DEMO DATA — actual hours to be confirmed by client
                  </p>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-surface border border-white/08 rounded-2xl overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-surface to-primary flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={36} className="text-gray-600 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">Map Coming Soon</p>
                    <p className="text-gray-600 text-xs mt-1">Islamabad, Pakistan</p>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="bg-surface border border-white/08 rounded-2xl p-6">
                <h3 className="font-bold text-white mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/08 hover:border-accent/20 hover:text-accent text-gray-400 transition-all flex-1 justify-center"
                  >
                    <Instagram size={18} />
                    <span className="text-sm font-medium">Instagram</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/08 hover:border-accent/20 hover:text-accent text-gray-400 transition-all flex-1 justify-center"
                  >
                    <Linkedin size={18} />
                    <span className="text-sm font-medium">LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { FAQItem } from '../../types';
import { mockFAQs } from '../../data/mockData';

type Category = 'all' | FAQItem['category'];

const categories: { value: Category; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'booking', label: 'Booking' },
  { value: 'payments', label: 'Payments' },
  { value: 'equipment', label: 'Equipment' },
  { value: 'general', label: 'General' },
];

export function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = activeCategory === 'all'
    ? mockFAQs
    : mockFAQs.filter((f) => f.category === activeCategory);

  return (
    <div className="min-h-screen bg-primary pt-16">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-accent text-sm font-semibold uppercase tracking-widest mb-4">Support</div>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-400 text-xl">
            Everything you need to know about Game Inn.
          </p>
        </div>
      </section>

      {/* Category filters */}
      <section className="py-8 bg-primary-light border-y border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 flex-wrap justify-center">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={[
                  'px-5 py-2 rounded-xl text-sm font-semibold transition-all border',
                  activeCategory === cat.value
                    ? 'bg-accent/15 text-accent border-accent/30'
                    : 'text-gray-400 border-white/10 hover:border-accent/20 hover:text-white',
                ].join(' ')}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3">
            {filtered.map((faq) => (
              <div
                key={faq.id}
                className="bg-surface border border-white/08 rounded-2xl overflow-hidden transition-all duration-200 hover:border-white/12"
              >
                <button
                  className="w-full flex items-start justify-between p-5 text-left gap-4 hover:bg-white/[0.02] transition-colors"
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                >
                  <span className="font-semibold text-white leading-relaxed">{faq.question}</span>
                  <span className="flex-shrink-0 mt-0.5">
                    {openId === faq.id ? (
                      <ChevronUp size={18} className="text-accent" />
                    ) : (
                      <ChevronDown size={18} className="text-gray-500" />
                    )}
                  </span>
                </button>
                {openId === faq.id && (
                  <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/08 pt-4 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              <p>No questions in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Still have questions */}
      <section className="py-16 bg-primary-light">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-black text-white mb-4">Still have questions?</h2>
          <p className="text-gray-400 mb-6">
            Our team is ready to help. Reach out through our contact page.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent/10 border border-accent/20 text-accent hover:bg-accent/15 transition-all font-semibold"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}

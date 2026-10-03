import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Monitor, Gamepad2, Glasses, Trophy, ArrowRight, ChevronDown,
  Users, Cpu, Clock, Star, ChevronUp, Zap
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { TextEffect } from '../../components/core/TextEffect';
import { InView } from '../../components/core/InView';
import { AnimatedNumber } from '../../components/core/AnimatedNumber';
import { mockTestimonials, bookedBlocks } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { getBookingDates, formatDateShort } from '../../utils/helpers';

const HERO_PHRASES = [
  'Gaming Experience',
  'Esports Journey',
  'Next Level Session',
  'Competitive Edge',
];

const blurSlideVariants = {
  container: {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.035 } },
    exit:    { transition: { staggerChildren: 0.025, staggerDirection: 1 } },
  },
  item: {
    hidden:  { opacity: 0, filter: 'blur(10px) brightness(0%)', y: 0 },
    visible: {
      opacity: 1, y: 0, filter: 'blur(0px) brightness(100%)',
      transition: { duration: 0.4 },
    },
    exit: {
      opacity: 0, y: -30, filter: 'blur(10px) brightness(0%)',
      transition: { duration: 0.35 },
    },
  },
};

const experienceCards = [
  {
    icon: Monitor,
    title: 'High-Performance PC Gaming',
    desc: '20+ stations with top-tier specs, ultra-wide monitors, and pro peripherals.',
    color: 'accent',
  },
  {
    icon: Gamepad2,
    title: 'Console Zone',
    desc: 'PS5 and Xbox Series X setups with the latest titles and 4K displays.',
    color: 'purple',
  },
  {
    icon: Glasses,
    title: 'VR Experience',
    desc: 'Immersive virtual reality arena — gaming like never before.',
    color: 'accent',
  },
  {
    icon: Trophy,
    title: 'Esports Arena',
    desc: 'Competitive training, coaching sessions, and hosted tournaments.',
    color: 'purple',
  },
];

const faqs = [
  {
    q: 'How do I book a slot at Game Inn?',
    a: 'Create an account, select your preferred date and time slot, fill in your details, and pay the advance online. Easy!',
  },
  {
    q: 'What is the advance payment?',
    a: 'A PKR 500 advance secures your slot. The remaining balance is collected at the venue before your session begins.',
  },
  {
    q: 'Can I walk in without a booking?',
    a: 'Walk-ins are welcome on a first-come, first-served basis. However, pre-booking guarantees your preferred slot.',
  },
];

export function HomePage() {
  const { isAuthenticated, setRedirectAfterLogin } = useAuth();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const dates = getBookingDates();

  // ── Cycling hero phrase ──────────────────────────────────
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [trigger,   setTrigger]   = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setTrigger(false);
      setTimeout(() => {
        setPhraseIdx((i) => (i + 1) % HERO_PHRASES.length);
        setTrigger(true);
      }, 420);
    }, 3000);
    return () => clearInterval(id);
  }, []);
  // ─────────────────────────────────────────────────────────

  const handleBookNow = () => {
    if (isAuthenticated) {
      navigate('/book');
    } else {
      setRedirectAfterLogin('/book');
      navigate('/login');
    }
  };

  const todayDate = dates[0];
  const todayBookedBlocks = bookedBlocks[todayDate] ?? [];

  return (
    <div className="min-h-screen bg-primary">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">

        {/* ── Video background ──────────────────────────────── */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          {/* Fallback gradient if video fails to load */}
        </video>

        {/* Dark overlay — keeps text readable over the video */}
        <div className="absolute inset-0 bg-black/60" style={{ zIndex: 1 }} />

        {/* Subtle green tint at top for brand feel */}
        <div className="absolute inset-0 bg-hero-gradient" style={{ zIndex: 2 }} />

        {/* Grid texture overlay */}
        <div className="absolute inset-0 grid-bg opacity-20" style={{ zIndex: 2 }} />

        {/* Content */}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24" style={{ zIndex: 3 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-8 animate-fadeIn">
            <Zap size={14} />
            Islamabad's Premier Gaming Hub
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] mb-6 text-white">
            Level Up Your
            <br />
            <span className="inline-flex justify-center w-full min-h-[1.1em]">
              <TextEffect
                per="char"
                trigger={trigger}
                slotVariants={blurSlideVariants}
                className="gradient-text-light"
              >
                {HERO_PHRASES[phraseIdx]}
              </TextEffect>
            </span>
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fadeIn">
            State-of-the-art gaming stations, competitive esports arenas, and an elite community — all in the heart of Islamabad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn">
            <Button size="lg" onClick={handleBookNow}>
              Book Your Slot
              <ArrowRight size={20} />
            </Button>
            <Button size="lg" variant="ghost" onClick={() => navigate('/experience')}>
              Explore Experience
            </Button>
          </div>
          {/* Scroll indicator */}
          <div className="mt-20 flex flex-col items-center gap-2 text-gray-400 animate-float">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ChevronDown size={18} />
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-primary-light border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {([
              { label: 'Gamers Served',   num: 500,  suffix: '+', icon: Users },
              { label: 'Gaming Stations', num: 50,   suffix: '+', icon: Cpu },
              { label: 'Support',         num: null,  text: '24/7', icon: Clock },
              { label: 'Established',     num: 2023,  suffix: '',  icon: Star },
            ] as const).map((stat) => (
              <InView key={stat.label} className="text-center">
                <stat.icon size={24} className="text-accent mx-auto mb-2" />
                <div className="text-3xl font-black text-white mb-1">
                  {'num' in stat && stat.num !== null ? (
                    <><AnimatedNumber value={stat.num} />{stat.suffix}</>
                  ) : (
                    stat.text
                  )}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </InView>
            ))}
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <InView delay={0.05}>
            <div>
              <div className="text-accent text-sm font-semibold uppercase tracking-widest mb-4">About Game Inn</div>
              <h2 className="text-4xl font-black text-white mb-6 leading-tight">
                Pakistan's Most Serious<br />Gaming Destination
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                Founded in 2023, Game Inn was built for gamers, by gamers. We operate at the intersection of competitive gaming and premium entertainment — delivering an experience that rivals international esports venues.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                From cutting-edge hardware to curated gaming environments, every detail at Game Inn is engineered to maximize your performance and enjoyment.
              </p>
              <Button variant="outline" onClick={() => navigate('/about')}>
                Our Story <ArrowRight size={16} />
              </Button>
            </div>
            </InView>
            <InView delay={0.15}>
            <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-surface to-secondary/10 border border-white/08 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <Monitor size={64} className="text-accent/40 mx-auto mb-4" />
                  <p className="text-gray-500 text-sm">Gaming Venue Photo</p>
                </div>
              </div>
              {/* Corner accent */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-accent rounded-tl-xl" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-accent rounded-br-xl" />
            </div>
            </InView>
          </div>
        </div>
      </section>

      {/* Experience cards */}
      <section className="py-24 bg-primary-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InView className="text-center mb-14">
            <div className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">What We Offer</div>
            <h2 className="text-4xl font-black text-white">The Gaming Experience</h2>
          </InView>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {experienceCards.map((card, i) => (
              <InView key={card.title} delay={i * 0.08}>
              <Card hover className="text-center group h-full">
                <div
                  className={[
                    'w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center',
                    card.color === 'accent'
                      ? 'bg-accent/10 border border-accent/20 group-hover:bg-accent/15'
                      : 'bg-secondary/10 border border-secondary/20 group-hover:bg-secondary/15',
                  ].join(' ')}
                >
                  <card.icon
                    size={26}
                    className={card.color === 'accent' ? 'text-accent' : 'text-secondary-light'}
                  />
                </div>
                <h3 className="font-bold text-white mb-3 text-base">{card.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
              </Card>
              </InView>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InView className="text-center mb-14">
            <div className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Simple Process</div>
            <h2 className="text-4xl font-black text-white">How It Works</h2>
          </InView>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
            {[
              { step: '01', icon: Monitor, title: 'Browse & Select', desc: 'Choose your date and preferred gaming session from available slots.' },
              { step: '02', icon: Clock, title: 'Book & Pay Advance', desc: 'Confirm your details and pay a small advance to secure your slot.' },
              { step: '03', icon: Trophy, title: 'Arrive & Play', desc: 'Show up, pay the remaining balance, and dominate your session.' },
            ].map((item, i) => (
              <InView key={item.step} delay={i * 0.1}>
              <div className="text-center relative">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 mx-auto mb-5 flex items-center justify-center">
                  <item.icon size={28} className="text-accent" />
                </div>
                <div className="text-accent text-4xl font-black mb-2 opacity-30">{item.step}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
              </InView>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Slots */}
      <section className="py-24 bg-primary-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
            <div>
              <div className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">Flexible Booking</div>
              <h2 className="text-3xl font-black text-white">Play on Your Schedule</h2>
              <p className="text-gray-400 text-sm mt-1">
                Open daily {formatDateShort(todayDate)} · Pick any start time · Choose your duration
              </p>
            </div>
            <Button variant="outline" onClick={handleBookNow}>
              Book a Session <ArrowRight size={16} />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Morning Session',   time: '10:00 AM – 2:00 PM', icon: <Zap size={20} className="text-accent" />, note: 'Ideal for a focused 1–4h grind' },
              { label: 'Afternoon Session', time: '2:00 PM – 6:00 PM',  icon: <Clock size={20} className="text-accent" />, note: 'Prime hours, book early' },
              { label: 'Evening Session',   time: '6:00 PM – 12:00 AM', icon: <Star size={20} className="text-accent" />, note: 'Most popular time slot' },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-surface border border-white/08 rounded-2xl p-5 hover:border-accent/30 transition-all group cursor-pointer"
                onClick={handleBookNow}
              >
                <div className="mb-3">{s.icon}</div>
                <div className="text-base font-bold text-white mb-0.5">{s.label}</div>
                <div className="text-sm text-accent font-semibold mb-2">{s.time}</div>
                <div className="text-xs text-gray-500">{s.note}</div>
                <div className="mt-3 text-xs text-accent font-semibold group-hover:underline">
                  Book now → from PKR 1,000/hr
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 justify-center text-sm text-gray-400">
            <span className="flex items-center gap-1.5 bg-white/[0.03] border border-white/08 rounded-full px-4 py-1.5">
              <Clock size={13} className="text-accent" /> Min 1 hour
            </span>
            <span className="flex items-center gap-1.5 bg-white/[0.03] border border-white/08 rounded-full px-4 py-1.5">
              <Zap size={13} className="text-accent" /> 30-min increments
            </span>
            <span className="flex items-center gap-1.5 bg-white/[0.03] border border-white/08 rounded-full px-4 py-1.5">
              <Users size={13} className="text-accent" /> {todayBookedBlocks.length} sessions booked today
            </span>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InView className="text-center mb-14">
            <div className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Community</div>
            <h2 className="text-4xl font-black text-white">What Gamers Say</h2>
          </InView>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockTestimonials.map((t, i) => (
              <InView key={t.id} delay={i * 0.1}>
              <Card className="flex flex-col gap-4 h-full">
                <div className="flex text-accent gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed flex-1">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-white/08">
                  <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.location}</p>
                </div>
              </div>
            </Card>
            </InView>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="py-24 bg-primary-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
            <div>
              <div className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">Gallery</div>
              <h2 className="text-3xl font-black text-white">Inside Game Inn</h2>
            </div>
            <Button variant="ghost" onClick={() => navigate('/gallery')}>
              View Full Gallery <ArrowRight size={16} />
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { icon: Monitor, label: 'PC Gaming' },
              { icon: Gamepad2, label: 'Consoles' },
              { icon: Glasses, label: 'VR Zone' },
              { icon: Trophy, label: 'Esports' },
              { icon: Users, label: 'Community' },
              { icon: Zap, label: 'Events' },
            ].map((item) => (
              <div
                key={item.label}
                className="aspect-video rounded-xl bg-gradient-to-br from-surface to-primary-light border border-white/08 flex flex-col items-center justify-center gap-2 hover:border-accent/20 transition-all group cursor-pointer"
                onClick={() => navigate('/gallery')}
              >
                <item.icon size={28} className="text-gray-600 group-hover:text-accent transition-colors" />
                <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ preview */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Got Questions?</div>
            <h2 className="text-4xl font-black text-white">Common Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-surface border border-white/08 rounded-2xl overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-white pr-4">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp size={18} className="text-accent flex-shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/08 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="ghost" onClick={() => navigate('/faq')}>
              View All FAQs <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-br from-accent/10 via-surface to-secondary/10 border border-accent/20 p-12 sm:p-20 text-center overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-accent/5 rounded-full blur-[80px]" />
            <InView className="relative z-10">
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-5">
                Ready to <span className="gradient-text">Game?</span>
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                Book your slot at Game Inn today and experience Islamabad's finest gaming destination.
              </p>
              <Button size="lg" onClick={handleBookNow}>
                Book Your Slot Now
                <ArrowRight size={20} />
              </Button>
            </InView>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import { Monitor, Gamepad2, Glasses, Trophy, Video, Lock, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

const experiences = [
  {
    icon: Monitor,
    title: 'High-Performance PC Gaming',
    badge: '20+ Stations',
    desc: 'Experience gaming at its absolute peak. Our PC stations are equipped with high-end processors, powerful dedicated GPUs, ultra-high-refresh-rate monitors, and competition-grade peripherals. Whether you\'re grinding ranked, exploring open worlds, or competing in tournaments — the setup delivers.',
    highlights: ['Ultra-wide & 144Hz+ displays', 'Top-tier peripherals', 'Multiple game libraries', 'Tournament-ready setups'],
    color: 'accent',
  },
  {
    icon: Gamepad2,
    title: 'Console Gaming Zone',
    badge: 'PS5 & Xbox Series X',
    desc: 'Dedicated console stations featuring the latest PlayStation 5 and Xbox Series X setups. Play on large 4K screens with surround sound, the latest game releases, and everything that makes console gaming special.',
    highlights: ['PS5 & Xbox Series X', '4K + HDR displays', 'Latest game library', 'Co-op & multiplayer'],
    color: 'purple',
  },
  {
    icon: Glasses,
    title: 'VR Gaming Experience',
    badge: 'Fully Immersive',
    desc: 'Step into another world entirely. Our VR arena offers the most immersive gaming experiences available — from heart-pounding action to mind-bending simulations. It\'s something you have to experience to believe.',
    highlights: ['Premium VR headsets', 'Motion tracking arena', 'Multiplayer VR sessions', 'Onboarding for first-timers'],
    color: 'accent',
  },
  {
    icon: Trophy,
    title: 'Esports Training & Tournaments',
    badge: 'Competitive Arena',
    desc: 'Whether you want to sharpen your skills or compete for glory, our esports arena is purpose-built for competition. Structured training, coaching sessions, and regularly hosted tournaments across popular titles.',
    highlights: ['Professional coaching', 'Ranked practice sessions', 'Tournament hosting', 'Prize pools (seasonal)'],
    color: 'purple',
  },
  {
    icon: Lock,
    title: 'Private Gaming Rooms',
    badge: 'Exclusive Booking',
    desc: 'Book a private gaming room for a fully exclusive experience — perfect for groups, corporate events, birthday parties, or anyone who wants their own dedicated setup without distractions.',
    highlights: ['Full room privacy', 'Custom setup options', 'Group & event packages', 'Dedicated service'],
    color: 'accent',
  },
  {
    icon: Video,
    title: 'Content Creation Studio',
    badge: 'Stream & Create',
    desc: 'Professional content creation facilities for streamers, YouTubers, and content creators. High-speed internet, capture equipment, lighting, and the technical setup to produce professional-grade gaming content.',
    highlights: ['Capture cards & streaming rigs', 'Green screen studio', 'High-speed internet', 'Multi-platform streaming'],
    color: 'purple',
  },
];

export function ExperiencePage() {
  const navigate = useNavigate();
  const { isAuthenticated, setRedirectAfterLogin } = useAuth();

  const handleBook = () => {
    if (isAuthenticated) navigate('/book');
    else { setRedirectAfterLogin('/book'); navigate('/login'); }
  };

  return (
    <div className="min-h-screen bg-primary pt-16">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-accent text-sm font-semibold uppercase tracking-widest mb-4">What We Offer</div>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">The Full Experience</h1>
          <p className="text-gray-400 text-xl leading-relaxed">
            Six premium gaming environments, one destination. Discover what Game Inn has built for you.
          </p>
        </div>
      </section>

      {/* Experience Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <div
                key={exp.title}
                className={[
                  'grid grid-cols-1 lg:grid-cols-2 gap-10 items-center',
                  i % 2 === 1 ? 'lg:flex-row-reverse' : '',
                ].join(' ')}
              >
                {i % 2 === 1 ? (
                  <>
                    <div className="order-1 lg:order-2">
                      <ExperienceCard exp={exp} onBook={handleBook} />
                    </div>
                    <div className="order-2 lg:order-1">
                      <ExperienceVisual exp={exp} />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <ExperienceCard exp={exp} onBook={handleBook} />
                    </div>
                    <div>
                      <ExperienceVisual exp={exp} />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-light">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-white mb-5">Ready to Play?</h2>
          <p className="text-gray-400 mb-8">
            All experiences are bookable through our online system. Secure your slot in minutes.
          </p>
          <Button size="lg" onClick={handleBook}>
            Book Your Session <ArrowRight size={20} />
          </Button>
        </div>
      </section>
    </div>
  );
}

function ExperienceCard({ exp, onBook }: { exp: typeof experiences[0]; onBook: () => void }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div
          className={[
            'w-12 h-12 rounded-xl flex items-center justify-center',
            exp.color === 'accent'
              ? 'bg-accent/10 border border-accent/20'
              : 'bg-secondary/10 border border-secondary/20',
          ].join(' ')}
        >
          <exp.icon size={22} className={exp.color === 'accent' ? 'text-accent' : 'text-secondary-light'} />
        </div>
        <span
          className={[
            'text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border',
            exp.color === 'accent'
              ? 'text-accent bg-accent/10 border-accent/20'
              : 'text-secondary-light bg-secondary/10 border-secondary/20',
          ].join(' ')}
        >
          {exp.badge}
        </span>
      </div>
      <h2 className="text-3xl font-black text-white mb-4">{exp.title}</h2>
      <p className="text-gray-400 leading-relaxed mb-6">{exp.desc}</p>
      <ul className="space-y-2 mb-8">
        {exp.highlights.map((h) => (
          <li key={h} className="flex items-center gap-3 text-gray-300 text-sm">
            <div
              className={[
                'w-1.5 h-1.5 rounded-full flex-shrink-0',
                exp.color === 'accent' ? 'bg-accent' : 'bg-secondary-light',
              ].join(' ')}
            />
            {h}
          </li>
        ))}
      </ul>
      <Button variant="outline" size="sm" onClick={onBook}>
        Book This Experience <ArrowRight size={14} />
      </Button>
    </div>
  );
}

function ExperienceVisual({ exp }: { exp: typeof experiences[0] }) {
  return (
    <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden">
      <div
        className={[
          'absolute inset-0 flex flex-col items-center justify-center border border-white/08 rounded-2xl',
          exp.color === 'accent'
            ? 'bg-gradient-to-br from-accent/5 via-surface to-primary'
            : 'bg-gradient-to-br from-secondary/5 via-surface to-primary',
        ].join(' ')}
      >
        <exp.icon
          size={72}
          className={[
            'opacity-20 mb-3',
            exp.color === 'accent' ? 'text-accent' : 'text-secondary-light',
          ].join(' ')}
        />
        <p className="text-gray-500 text-sm">{exp.title} Photo</p>
      </div>
      {/* Corner accents */}
      <div
        className={[
          'absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 rounded-tl-lg',
          exp.color === 'accent' ? 'border-accent/50' : 'border-secondary/50',
        ].join(' ')}
      />
      <div
        className={[
          'absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 rounded-br-lg',
          exp.color === 'accent' ? 'border-accent/50' : 'border-secondary/50',
        ].join(' ')}
      />
    </div>
  );
}

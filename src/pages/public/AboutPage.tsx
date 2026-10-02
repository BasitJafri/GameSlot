import { Users, Target, Lightbulb, Heart, MapPin } from 'lucide-react';
import { Card } from '../../components/ui/Card';

const values = [
  { icon: Users, title: 'Community', desc: 'Building a passionate gaming community in Islamabad.' },
  { icon: Target, title: 'Competition', desc: 'Fueling competitive spirit with world-class setups.' },
  { icon: Lightbulb, title: 'Innovation', desc: 'Constantly upgrading our technology and experience.' },
  { icon: Heart, title: 'Inclusivity', desc: 'A space for every gamer, regardless of skill level.' },
];

const team = [
  { name: 'Founder', role: 'CEO & Visionary', initials: 'GI' },
  { name: 'Operations', role: 'Head of Experience', initials: 'OP' },
  { name: 'Tech Lead', role: 'Gaming Infrastructure', initials: 'TL' },
];

export function AboutPage() {
  return (
    <div className="min-h-screen bg-primary pt-16">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-accent text-sm font-semibold uppercase tracking-widest mb-4">Our Story</div>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">About Game Inn</h1>
          <p className="text-gray-400 text-xl leading-relaxed">
            From a passion for gaming to Islamabad's premier esports destination.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Our Story',
                content:
                  'Game Inn was founded in 2023 with a single mission: create a gaming space in Islamabad that rivals the world\'s best. We saw a gap — gamers in Pakistan deserved premium hardware, competitive environments, and a community they could call home. So we built it.',
              },
              {
                title: 'Our Mission',
                content:
                  'To provide every gamer in Pakistan access to world-class gaming infrastructure, foster a competitive esports culture, and create a space where passion for gaming is celebrated and developed at every level.',
              },
              {
                title: 'Our Vision',
                content:
                  'To be the leading esports hub in Pakistan — a venue that produces champions, nurtures talent, and brings the global gaming community\'s standards to our nation. Game Inn is just the beginning.',
              },
            ].map((item) => (
              <Card key={item.title} className="border-l-2 border-l-accent/40">
                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.content}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-primary-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">What Drives Us</div>
            <h2 className="text-4xl font-black text-white">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <Card key={v.title} hover className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 mx-auto mb-4 flex items-center justify-center">
                  <v.icon size={26} className="text-accent" />
                </div>
                <h3 className="font-bold text-white mb-2">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">The People</div>
            <h2 className="text-4xl font-black text-white">Meet the Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {team.map((member) => (
              <Card key={member.name} hover className="text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent/20 to-secondary/20 border border-accent/20 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-accent font-black text-xl">{member.initials}</span>
                </div>
                <h3 className="font-bold text-white mb-1">{member.name}</h3>
                <p className="text-gray-400 text-sm">{member.role}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 bg-primary-light">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 mx-auto mb-6 flex items-center justify-center">
            <MapPin size={26} className="text-accent" />
          </div>
          <h2 className="text-3xl font-black text-white mb-4">Find Us in Islamabad</h2>
          <p className="text-gray-400 mb-3">
            Game Inn is centrally located in Islamabad, making it accessible from all major sectors.
          </p>
          <p className="text-gray-500 text-sm">
            Exact address and directions will be provided in your booking confirmation.
          </p>
        </div>
      </section>
    </div>
  );
}

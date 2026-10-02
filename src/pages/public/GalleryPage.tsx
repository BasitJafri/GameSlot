import { useState } from 'react';
import { Monitor, Gamepad2, Glasses, Trophy, Building2, Cpu, Video, Users, Zap, Award } from 'lucide-react';
import type { GalleryItem } from '../../types';
import { mockGallery } from '../../data/mockData';

const iconMap: Record<string, React.ElementType> = {
  monitor: Monitor,
  'gamepad-2': Gamepad2,
  glasses: Glasses,
  trophy: Trophy,
  sofa: Building2,
  cpu: Cpu,
  award: Award,
  building: Building2,
  zap: Zap,
  video: Video,
  users: Users,
};

type FilterCategory = 'all' | GalleryItem['category'];

const filters: { value: FilterCategory; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'pc', label: 'PC Gaming' },
  { value: 'console', label: 'Console' },
  { value: 'vr', label: 'VR' },
  { value: 'events', label: 'Events' },
  { value: 'venue', label: 'Venue' },
];

const categoryGradients: Record<GalleryItem['category'], string> = {
  pc: 'from-accent/10 via-surface to-primary',
  console: 'from-secondary/10 via-surface to-primary',
  vr: 'from-blue-500/10 via-surface to-primary',
  events: 'from-yellow-500/10 via-surface to-primary',
  venue: 'from-pink-500/10 via-surface to-primary',
};

const categoryColors: Record<GalleryItem['category'], string> = {
  pc: 'text-accent',
  console: 'text-secondary-light',
  vr: 'text-blue-400',
  events: 'text-yellow-400',
  venue: 'text-pink-400',
};

export function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const filtered = activeFilter === 'all'
    ? mockGallery
    : mockGallery.filter((item) => item.category === activeFilter);

  return (
    <div className="min-h-screen bg-primary pt-16">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-accent text-sm font-semibold uppercase tracking-widest mb-4">Gallery</div>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">Inside Game Inn</h1>
          <p className="text-gray-400 text-xl">A visual tour of our gaming spaces and events.</p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-30 bg-primary/90 backdrop-blur-md border-b border-white/[0.06] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={[
                  'flex-shrink-0 px-5 py-2 rounded-xl text-sm font-semibold transition-all border',
                  activeFilter === f.value
                    ? 'bg-accent/15 text-accent border-accent/30 shadow-glow-green-sm'
                    : 'text-gray-400 border-white/10 hover:border-accent/20 hover:text-white bg-transparent',
                ].join(' ')}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((item) => {
              const IconComp = iconMap[item.icon] || Monitor;
              return (
                <div
                  key={item.id}
                  className={[
                    'aspect-square rounded-2xl overflow-hidden border border-white/08 flex flex-col items-center justify-center gap-3',
                    'bg-gradient-to-br',
                    categoryGradients[item.category],
                    'hover:border-white/15 hover:scale-[1.02] transition-all duration-300 cursor-pointer group',
                  ].join(' ')}
                >
                  <IconComp
                    size={36}
                    className={[
                      categoryColors[item.category],
                      'opacity-50 group-hover:opacity-100 transition-opacity duration-300',
                    ].join(' ')}
                  />
                  <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors text-center px-3 font-medium">
                    {item.label}
                  </span>
                  <span
                    className={[
                      'text-xs px-2 py-0.5 rounded-full border opacity-0 group-hover:opacity-100 transition-opacity',
                      'bg-white/05 text-gray-400 border-white/10',
                    ].join(' ')}
                  >
                    {item.category.toUpperCase()}
                  </span>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              <Monitor size={48} className="mx-auto mb-4 opacity-30" />
              <p>No images in this category yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

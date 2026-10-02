type BadgeVariant = 'green' | 'red' | 'yellow' | 'purple' | 'gray' | 'blue';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
}

const variantClasses: Record<BadgeVariant, string> = {
  green: 'bg-accent/15 text-accent border-accent/30',
  red: 'bg-red-500/15 text-red-400 border-red-500/30',
  yellow: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  purple: 'bg-secondary/15 text-secondary-light border-secondary/30',
  gray: 'bg-white/5 text-gray-400 border-white/10',
  blue: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
};

export function Badge({ children, variant = 'gray', size = 'sm' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full border font-medium',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        variantClasses[variant],
      ].join(' ')}
    >
      {children}
    </span>
  );
}

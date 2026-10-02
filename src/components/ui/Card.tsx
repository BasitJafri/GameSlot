import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: 'green' | 'purple' | 'none';
  onClick?: () => void;
}

export function Card({ children, className = '', hover = false, glow = 'none', onClick }: CardProps) {
  const glowClass = glow === 'green'
    ? 'border-accent/30 shadow-glow-green-sm'
    : glow === 'purple'
    ? 'border-secondary/30 shadow-glow-purple'
    : '';

  return (
    <div
      className={[
        'bg-surface rounded-2xl border border-white/[0.06] p-6',
        hover ? 'hover:-translate-y-1 hover:border-white/10 cursor-pointer' : '',
        glow !== 'none' ? glowClass : '',
        'transition-all duration-300',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

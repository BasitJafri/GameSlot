import React from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-accent text-black font-bold hover:bg-accent-dim active:scale-[0.98] shadow-glow-green-sm hover:shadow-glow-green',
  secondary:
    'bg-secondary text-white font-semibold hover:bg-secondary-light active:scale-[0.98] shadow-glow-purple hover:shadow-glow-purple',
  ghost:
    'bg-transparent text-gray-300 hover:bg-white/5 hover:text-white border border-white/10',
  danger:
    'bg-red-600 text-white font-semibold hover:bg-red-500 active:scale-[0.98]',
  outline:
    'bg-transparent text-accent border border-accent hover:bg-accent/10 font-semibold',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-xl',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        'inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer select-none',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        (disabled || loading) ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'green' | 'white';
}

export function LoadingSpinner({ size = 'md', color = 'green' }: LoadingSpinnerProps) {
  const sizeClasses = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };
  const colorClass = color === 'green' ? 'border-accent border-t-transparent' : 'border-white border-t-transparent';

  return (
    <div
      className={[
        sizeClasses[size],
        'rounded-full border-2 animate-spin',
        colorClass,
      ].join(' ')}
    />
  );
}

export function PageLoader() {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    </div>
  );
}

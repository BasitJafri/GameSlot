import { useRef } from 'react';
import { motion, useInView, type Variant, type Transition } from 'framer-motion';

interface InViewProps {
  children: React.ReactNode;
  variants?: { hidden: Variant; visible: Variant };
  transition?: Transition;
  className?: string;
  once?: boolean;
  delay?: number;
}

const defaultVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const defaultTransition: Transition = {
  duration: 0.55,
  ease: [0.21, 0.47, 0.32, 0.98],
};

export function InView({
  children,
  variants = defaultVariants,
  transition,
  className,
  once = true,
  delay = 0,
}: InViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ ...defaultTransition, ...transition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

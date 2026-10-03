/**
 * TextEffect — animated text with per-char or per-word stagger.
 * Supports enter + exit animations via framer-motion AnimatePresence.
 */

import { motion, AnimatePresence, type Variants } from 'framer-motion';

type Per = 'char' | 'word' | 'line';

interface SlotVariants {
  container?: Variants;
  item?: Variants;
}

interface TextEffectProps {
  children: string;
  per?: Per;
  /** Toggle to false, then true to re-run the animation */
  trigger?: boolean;
  /** Custom enter/exit variants for container and each segment */
  slotVariants?: SlotVariants;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  segmentClassName?: string;
}

const defaultContainerVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
  exit:    { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
};

const defaultItemVariants: Variants = {
  hidden:  { opacity: 0, y: 10, filter: 'blur(4px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.35, ease: 'easeOut' },
  },
  exit: {
    opacity: 0, y: -20, filter: 'blur(8px)',
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

function splitText(text: string, per: Per): string[] {
  if (per === 'char')  return text.split('');
  if (per === 'word')  return text.split(/(\s+)/);
  return text.split('\n');
}

export function TextEffect({
  children,
  per = 'word',
  trigger = true,
  slotVariants,
  className = '',
  segmentClassName = '',
}: TextEffectProps) {
  const containerVariants = slotVariants?.container ?? defaultContainerVariants;
  const itemVariants      = slotVariants?.item      ?? defaultItemVariants;
  const segments          = splitText(children, per);

  return (
    <AnimatePresence mode="wait">
      {trigger && (
        <motion.span
          key={children}
          className={`inline-flex flex-wrap ${className}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {segments.map((seg, i) => (
            <motion.span
              key={i}
              variants={itemVariants}
              className={segmentClassName}
              style={{ display: 'inline-block', whiteSpace: 'pre' }}
            >
              {seg === ' ' ? '\u00A0' : seg}
            </motion.span>
          ))}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

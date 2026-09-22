import { motion } from 'framer-motion';

// A thin rule that "draws" itself in from the left when scrolled into view — the
// editorial line-reveal reused across section headers and year dividers. Sizing
// and colour come from `className` (e.g. "h-px w-12 bg-blue-500").
export const DrawLine = ({ className = '', delay = 0 }) => (
  <motion.span
    aria-hidden
    className={`block origin-left ${className}`}
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
  />
);

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

/**
 * Cursor editorial desktop via useMotionValue + useSpring (zero useState para posição).
 */
export function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const smoothX = useSpring(cursorX, { stiffness: 420, damping: 32, mass: 0.4 });
  const smoothY = useSpring(cursorY, { stiffness: 420, damping: 32, mass: 0.4 });

  useEffect(() => {
    if (shouldReduceMotion) return undefined;

    const mediaQuery = window.matchMedia('(pointer: fine) and (min-width: 1024px)');
    const syncAvailability = () => setEnabled(mediaQuery.matches);
    syncAvailability();

    mediaQuery.addEventListener('change', syncAvailability);
    return () => mediaQuery.removeEventListener('change', syncAvailability);
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!enabled) return undefined;

    const handleMove = (event) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      if (!visible) setVisible(true);

      const target = event.target;
      if (target instanceof Element) {
        const cursorEl = target.closest('[data-cursor]');
        const nextLabel = cursorEl?.getAttribute('data-cursor') || '';
        setLabel((prev) => (prev === nextLabel ? prev : nextLabel));
      }
    };

    const handleLeave = () => {
      setVisible(false);
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [enabled, cursorX, cursorY, visible]);

  if (!enabled || shouldReduceMotion || !visible) return null;

  const isExpanded = Boolean(label);

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      className="pointer-events-none fixed top-0 left-0 z-50 hidden lg:flex items-center justify-center"
    >
      <motion.div
        animate={{
          scale: isExpanded ? 1 : 0.42,
          opacity: isExpanded ? 1 : 0.72,
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="flex h-16 w-16 items-center justify-center rounded-full border border-caramelo-400/70 bg-espresso-950/75 backdrop-blur-md text-[11px] font-medium uppercase tracking-[0.2em] text-tinta-100 shadow-lg"
      >
        {label ? <span>{label}</span> : null}
      </motion.div>
    </motion.div>
  );
}

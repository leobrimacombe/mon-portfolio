import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mobile full-screen menu links.
const MENU_LINKS = [
  { label: 'A PROPOS', href: '#about' },
  { label: 'MES TRAVAUX', href: '#work' },
];

// Desktop corner-menu links (revealed on hover / focus).
const NAV_LINKS = [
  { label: 'A PROPOS', href: '#about' },
  { label: 'MON TRAVAIL', href: '#work' },
  { label: 'CONTACT', href: '#contact' },
];

// Border-less frosted backdrop: blur + tint that fade out radially (mask) so there's
// no hard edge. Lives BEHIND content so text stays crisp.
const softBlur = (position, shape = 'circle') => ({
  backdropFilter: 'blur(9px)',
  WebkitBackdropFilter: 'blur(9px)',
  background: `radial-gradient(${shape} at ${position}, rgba(0,0,0,0.45), transparent 72%)`,
  WebkitMaskImage: `radial-gradient(${shape} at ${position}, #000 40%, transparent 80%)`,
  maskImage: `radial-gradient(${shape} at ${position}, #000 40%, transparent 80%)`,
});

// Fixed top navigation. The name (top-left) is hidden over the hero — already shown
// big in 3D — and fades in once scrolled, sitting on a soft border-less blur (the
// blur is a layer behind the text, so the text itself stays sharp). The desktop menu
// is a frosted quarter-circle in the top-right corner whose icon is replaced by the
// links on hover/focus, with a small close delay so it doesn't snap shut. Mobile keeps
// the full-screen overlay.
export const Nav = ({ isMenuOpen, setMenuOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape closes the full-screen mobile menu when it's open.
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMenuOpen, setMenuOpen]);

  const reveal = () => {
    clearTimeout(closeTimer.current);
    setRevealed(true);
  };
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setRevealed(false), 220);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full px-6 py-6 flex justify-between items-start z-50 text-white">
          {/* Name — frosted pill (no border) so it stays legible over any content that
              scrolls behind. Fades in on scroll; clicking scrolls back to the top. */}
          <button
            type="button"
            onClick={() => {
              const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
              window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
            }}
            aria-label="Retourner en haut"
            className={`hidden md:inline-block font-sync font-bold text-sm md:text-lg cursor-pointer px-4 py-2 rounded-full bg-black/40 backdrop-blur-md text-white shadow-lg shadow-black/20 transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 ${
              scrolled ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-3 pointer-events-none'
            }`}
          >
            Léo Brimacombe
          </button>

          {/* Mobile: full-screen menu toggle */}
          <button onClick={() => setMenuOpen(!isMenuOpen)} className="md:hidden ml-auto pointer-events-auto z-50 font-mono text-xs border border-white/50 px-4 py-2 rounded-full backdrop-blur-md bg-black/20 text-white">
              {isMenuOpen ? 'FERMER' : 'MENU +'}
          </button>
      </nav>

      {/* Desktop: frosted quarter-circle menu anchored in the top-right corner. */}
      <div className="hidden md:block fixed top-0 right-0 z-50 w-48 h-48 pointer-events-none">
        {/* Decorative quarter circle: blur + tint fading from the corner, no edge. */}
        <div aria-hidden className="absolute inset-0" style={softBlur('top right', 'circle')} />

        {/* Interactive icon → links. Padding + a close delay give a forgiving hover zone. */}
        <div
          className="absolute top-2 right-3 pointer-events-auto p-3"
          onMouseEnter={reveal}
          onMouseLeave={scheduleClose}
          onFocus={reveal}
          onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) scheduleClose(); }}
        >
          <div className="relative flex items-center justify-end h-10">
            <button
              type="button"
              aria-label="Menu"
              aria-expanded={revealed}
              className={`flex items-center justify-center w-10 h-10 text-white cursor-pointer transition-opacity duration-200 ${revealed ? 'opacity-0' : 'opacity-100'}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M4 8h16" />
                <path d="M4 16h16" />
              </svg>
            </button>

            {/* Links replace the icon: a left→right row anchored to the right. */}
            <AnimatePresence>
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute inset-y-0 right-0 flex items-center gap-6 whitespace-nowrap drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                >
                  {NAV_LINKS.map((l) => (
                    <a key={l.href} href={l.href} className="nav-link font-mono text-xs uppercase text-white hover:text-blue-400 transition-colors cursor-pointer">
                      {l.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
          {isMenuOpen && (
              <motion.div
                  initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed inset-0 z-40 bg-black flex flex-col justify-center items-center gap-8 pointer-events-auto md:hidden"
              >
                  <motion.div className="flex flex-col gap-8 text-center" initial="closed" animate="open" variants={{ open: { transition: { staggerChildren: 0.1 } } }}>
                      {MENU_LINKS.map((item) => (
                          <motion.a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} variants={{ closed: { opacity: 0, y: 20 }, open: { opacity: 1, y: 0 } }} className="text-4xl font-sync font-black text-white hover:text-blue-600 transition-colors">
                              {item.label}
                          </motion.a>
                      ))}
                  </motion.div>
                  <motion.a href="#contact" onClick={() => setMenuOpen(false)} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="mt-8 px-8 py-4 bg-blue-600 text-white font-bold font-mono rounded-full uppercase tracking-widest hover:bg-white hover:text-blue-600 transition-all">
                      Contact
                  </motion.a>
              </motion.div>
          )}
      </AnimatePresence>
    </>
  );
};

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { PROJECTS_DATA } from '../data/projects';
import { useProjectFilter } from '../hooks/useProjectFilter';
import { ProjectCard } from './ProjectCard';
import { SectionLabel } from './SectionLabel';
import { DrawLine } from './DrawLine';

// On a fine pointer (desktop) the cursor-following preview mounts and acts as the
// shared-layout source for the modal open animation; on touch it never mounts (the
// row keeps the layoutId instead — see ProjectCard).
const FINE_POINTER = typeof window !== 'undefined' && window.matchMedia?.('(pointer: fine)').matches;

// "Work" section: owns the search state (via useProjectFilter) and renders the
// matching projects grouped by year, newest first. `onSelectProject` bubbles a
// click up to the app so it can open the modal. On desktop, hovering a row reveals
// a thumbnail of the project that trails the cursor (see `preview` below).
export const Work = ({ onSelectProject }) => {
  const { searchQuery, setSearchQuery, filteredProjects, sortedYears } = useProjectFilter();

  // Cursor-following preview: which image to show, a random tilt picked per hover so
  // it's never the same twice, plus spring-smoothed pointer position.
  const [preview, setPreview] = useState(null);
  const [tilt, setTilt] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 350, damping: 30, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 350, damping: 30, mass: 0.5 });
  // Keep the preview hidden until the pointer has really moved, so it never flashes at
  // (0,0) when a row scrolls under a still cursor on first load.
  const [pointerReady, setPointerReady] = useState(false);

  const handleMove = (e) => {
    if (!pointerReady) {
      setPointerReady(true);
      springX.jump(e.clientX); // align the spring so the preview doesn't slide in from the corner
      springY.jump(e.clientY);
    }
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  // Picks a fresh random rotation whenever a new image starts showing. Stores the
  // project id alongside the src so the thumbnail can carry the shared `layoutId`.
  const handleHover = (project) => {
    const src = project?.images?.[0];
    if (!src) { setPreview(null); return; }
    setTilt(Math.random() * 16 - 8); // -8°..+8°
    setPreview({ id: project.id, src });
  };

  // Open the modal, passing the preview's current tilt so the panel unfolds from that
  // orientation and straightens out (desktop). 0 when there is no preview.
  const handleSelect = (project) => onSelectProject(project, preview ? tilt : 0);

  // Warm the browser cache for each project's first image (the hover thumbnail) while
  // the browser is idle, so the preview appears instantly instead of cold-fetching.
  useEffect(() => {
    const preload = () => {
      for (const p of PROJECTS_DATA) {
        const src = p.images?.[0];
        if (src) { const img = new Image(); img.src = src; }
      }
    };
    const ric = window.requestIdleCallback;
    const id = ric ? ric(preload) : setTimeout(preload, 1200);
    return () => { if (ric) window.cancelIdleCallback?.(id); else clearTimeout(id); };
  }, []);

  return (
    <section
      id="work"
      onMouseMove={handleMove}
      className="py-20 md:py-24 px-6 max-w-7xl mx-auto border-b border-white/10"
    >
      {/* Floating thumbnail that trails the cursor over the project list (desktop only).
          Portaled to <body> with a z above the grain/vignette overlays (z-50/z-40) so it
          isn't trapped under them by <main>'s z-10 stacking context. */}
      {FINE_POINTER && createPortal(
        <AnimatePresence>
          {pointerReady && preview && (
            <motion.div
              className="fixed top-0 left-0 z-[55] w-64 h-40 -mt-20 -ml-32 rounded-lg overflow-hidden border border-white/15 shadow-2xl shadow-black/60 pointer-events-none"
              style={{ x: springX, y: springY }}
              initial={{ opacity: 0, scale: 0.85, rotate: tilt }}
              animate={{ opacity: 1, scale: 1, rotate: tilt }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <img src={preview.src} alt="" className="w-full h-full object-cover" />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}


        {/* Header: title on the left, search input on the right */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <SectionLabel className="mb-4 md:mb-0">mes travaux</SectionLabel>

            <div className="relative w-full md:w-64 group">
                <input
                    type="text"
                    placeholder="RECHERCHER UN PROJET..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 py-2 pr-8 text-white font-mono text-xs focus:outline-none focus:border-blue-500 transition-colors uppercase placeholder:text-gray-700"
                />

                {searchQuery ? (
                    // Clear button (shown while there is a query)
                    <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-white hover:text-blue-500 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                ) : (
                    // Search icon (shown while the field is empty)
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>
                )}
            </div>
        </div>

        {/* One block per (filtered) year, newest first */}
        {sortedYears.length > 0 ? (
            sortedYears.map((year) => (
                <div key={year} className="mb-16 last:mb-0">
                    <div className="flex items-center gap-4 mb-8 opacity-50">
                        <DrawLine className="h-px w-8 bg-blue-500" />
                        <h3 className="text-xl font-mono font-bold text-white">{year}</h3>
                        <DrawLine className="h-px w-full bg-white/10" />
                    </div>

                    <div className="flex flex-col gap-2">
                        {filteredProjects.filter((p) => p.year === year).map((p, i) => (
                            <ProjectCard key={p.id} project={p} index={i} onSelect={handleSelect} onHover={handleHover} />
                        ))}
                    </div>
                </div>
            ))
        ) : (
            <div className="text-center py-20 text-gray-500 font-mono text-sm">
                AUCUN PROJET TROUVÉ POUR "{searchQuery}"
            </div>
        )}
    </section>
  );
};

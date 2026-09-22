import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPETENCY_LABELS } from '../data/competencies';

// Reflective case-study fields, in display order. Each renders only when present,
// so a project can be a plain card or a full case study with no layout change.
const CASE_STUDY_FIELDS = [
  { key: 'context', label: 'Contexte' },
  { key: 'role', label: 'Mon rôle' },
  { key: 'solution', label: 'Solution' },
  { key: 'result', label: 'Résultats' },
  { key: 'learnings', label: "Ce que j'ai appris" },
];

// One labelled case-study block (e.g. "Contexte"). `text` keeps line breaks.
const CaseStudySection = ({ label, text }) => (
  <div>
    <h3 className="text-[10px] md:text-xs font-bold text-blue-500 tracking-[0.3em] uppercase mb-2">{label}</h3>
    <p className="text-gray-300 text-sm md:text-base whitespace-pre-line leading-relaxed">{text}</p>
  </div>
);

// Full-screen project detail modal: an animated image carousel on one side, the
// project text on the other, plus a click-to-zoom lightbox over everything. The shared
// layoutId morphs it from (and back to) the clicked row. `openTilt` adds a small
// rotate-in flourish.
export const ProjectModal = ({ project, openTilt = 0, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setLightboxOpen] = useState(false);
  const images = project.images || [];
  const closeBtnRef = useRef(null);
  const dialogRef = useRef(null);

  // Keyboard handling: Escape closes (lightbox first, then the modal), and Tab is
  // trapped so focus cycles within the dialog instead of leaking to the page behind.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (isLightboxOpen) setLightboxOpen(false);
        else onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const root = dialogRef.current;
      if (!root) return;
      const focusables = root.querySelectorAll(
        'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (!root.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isLightboxOpen, onClose]);

  // Move focus into the dialog on open and restore it to the trigger on close.
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    closeBtnRef.current?.focus();
    return () => previouslyFocused?.focus?.();
  }, []);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/95" />

        <motion.div
          ref={dialogRef}
          layoutId={`project-${project.id}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`project-title-${project.id}`}
          initial={{ rotate: openTilt }}
          animate={{ rotate: 0 }}
          // Fixed-duration morph so the open feels the same regardless of how far the
          // clicked row is from the centred modal.
          transition={{
            layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            rotate: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          }}
          className="bg-[#0a0a0a] border border-white/10 w-full max-w-5xl h-[85vh] md:h-[80vh] rounded-2xl overflow-hidden flex flex-col md:flex-row relative shadow-2xl z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <button ref={closeBtnRef} onClick={onClose} aria-label="Fermer" className="absolute top-4 right-4 z-50 bg-white text-black w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-lg md:text-xl hover:scale-110 transition cursor-pointer">✕</button>

          <div className="w-full h-[40%] md:w-1/2 md:h-full relative bg-gray-900 overflow-hidden group">
              {images.length > 0 ? (
                <>
                  <AnimatePresence mode='wait'>
                    <motion.img
                        key={currentImageIndex}
                        src={images[currentImageIndex]}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full object-cover cursor-zoom-in hover:opacity-100 transition-opacity"
                        alt={`${project.title} - vue ${currentImageIndex + 1}`}
                        onClick={() => setLightboxOpen(true)}
                    />
                  </AnimatePresence>

                  {images.length > 1 && (
                    <>
                        <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-white hover:text-black text-white w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100">←</button>
                        <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-white hover:text-black text-white w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100">→</button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full text-xs font-mono text-white backdrop-blur-md">
                            {currentImageIndex + 1} / {images.length}
                        </div>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center p-8 text-center text-gray-600 font-mono text-xs">
                  Aperçu indisponible
                </div>
              )}
          </div>

          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col text-white overflow-y-auto">
            {/* my-auto centres the panel when content is short, but lets it scroll from
                the top (no clipping) once a long case study overflows. */}
            <div className="my-auto w-full">
             <motion.h2 id={`project-title-${project.id}`} layout="position" className="text-2xl md:text-4xl font-black mb-4 font-sync">{project.title}</motion.h2>
             <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 mb-6 md:mb-8 text-sm md:text-base whitespace-pre-line leading-relaxed">{project.description}</motion.p>

             {CASE_STUDY_FIELDS.some(({ key }) => project[key]) && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="flex flex-col gap-5 mb-8 border-t border-white/10 pt-6">
                    {CASE_STUDY_FIELDS.map(({ key, label }) =>
                        project[key] ? <CaseStudySection key={key} label={label} text={project[key]} /> : null
                    )}
                </motion.div>
             )}

             <div className="flex flex-wrap gap-2 mb-8">
                {project.tags && project.tags.map((tag, i) => (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + (i * 0.05) }}
                        className="px-3 py-1 border border-white/20 rounded-full text-[10px] md:text-xs font-mono text-gray-300 hover:bg-white hover:text-black transition-colors duration-300 cursor-default"
                    >
                        {tag}
                    </motion.span>
                ))}
             </div>

             {project.competencies?.length > 0 && (
                <div className="mb-8 border-t border-white/10 pt-6">
                    <h3 className="text-[10px] md:text-xs font-bold text-blue-500 tracking-[0.3em] uppercase mb-3">Compétences prouvées</h3>
                    <ul className="flex flex-col gap-2">
                        {project.competencies.map((code) => (
                            <li key={code} className="flex gap-2 items-baseline text-sm">
                                <span className="font-mono text-[10px] text-blue-400 shrink-0">{code}</span>
                                <span className="text-gray-300 leading-snug">{COMPETENCY_LABELS[code] ?? ''}</span>
                            </li>
                        ))}
                    </ul>
                </div>
             )}

             <div className="flex flex-wrap gap-4">
                {project.link && (
                <motion.a
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 bg-white text-black font-bold uppercase w-max text-sm md:text-base hover:bg-blue-500 hover:text-white transition rounded cursor-pointer flex items-center gap-2"
                >
                    Voir le projet
                    {/* "Opens in a new tab" indicator */}
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M15 3h6v6" />
                        <path d="M10 14 21 3" />
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    </svg>
                </motion.a>
                )}

                {project.gitLink && (
                    <motion.a
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        href={project.gitLink}
                        target="_blank"
                        rel="noreferrer"
                        className="px-6 py-3 border border-white/30 text-white font-bold uppercase w-max text-sm md:text-base hover:bg-white hover:text-black transition rounded cursor-pointer flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                        Voir le Code
                    </motion.a>
                )}
             </div>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isLightboxOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[10000] bg-black/95 flex items-center justify-center cursor-zoom-out" onClick={() => setLightboxOpen(false)}>

                {images.length > 1 && (
                    <button
                        className="absolute left-0 top-0 h-full w-[20%] z-50 flex items-center justify-start pl-8 opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer group"
                        onClick={(e) => { e.stopPropagation(); prevImage(e); }}
                    >
                        <div className="bg-black/50 p-4 rounded-full backdrop-blur-md group-hover:scale-110 transition-transform">
                             <span className="text-white text-3xl font-bold">←</span>
                        </div>
                    </button>
                )}

                {images.length > 1 && (
                    <button
                        className="absolute right-0 top-0 h-full w-[20%] z-50 flex items-center justify-end pr-8 opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer group"
                        onClick={(e) => { e.stopPropagation(); nextImage(e); }}
                    >
                        <div className="bg-black/50 p-4 rounded-full backdrop-blur-md group-hover:scale-110 transition-transform">
                             <span className="text-white text-3xl font-bold">→</span>
                        </div>
                    </button>
                )}

                <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    src={images[currentImageIndex]}
                    alt={`${project.title} — vue ${currentImageIndex + 1}`}
                    className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl pointer-events-none"
                />

                <div className="absolute bottom-10 text-white font-mono text-sm bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">
                    {currentImageIndex + 1} / {images.length} • Cliquer n'importe où pour fermer
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

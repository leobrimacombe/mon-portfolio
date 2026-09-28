import { PROFILE } from '../data/profile';

// Same button styles as the project modal's actions.
const PRIMARY = 'px-5 md:px-6 py-3 bg-white text-black font-bold uppercase text-sm md:text-base hover:bg-blue-500 hover:text-white transition rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500';
const SECONDARY = 'px-5 md:px-6 py-3 border border-white/30 text-white font-bold uppercase text-sm md:text-base hover:bg-white hover:text-black transition rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500';

// Opening screen. The 3D (or static) title shows through the empty top; the band at
// the bottom says what Léo does and where to go next. The h1 is real text because the
// big title only exists in WebGL, so screen readers and search engines get the name
// from the hidden part of the heading. This section is also the skip link's target.
// The band sits above the content layer's upward shadow (z-30 vs z-20) and keeps its
// bottom clear of the fixed 3D toggle.
export const Hero = () => (
  <section id="main-content" tabIndex={-1} className="h-[100svh] w-full flex flex-col justify-end focus:outline-none">
    <div className="relative z-30 pointer-events-auto max-w-7xl mx-auto w-full px-6 pb-20 md:pb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
      <div className="max-w-xl">
        <h1 className="text-lg md:text-2xl font-bold text-white leading-snug">
          <span className="sr-only">Léo Brimacombe, </span>
          Développeur web full-stack, étudiant en BUT MMI.
        </h1>
        {PROFILE.availability && (
          <p className="mt-2 text-base md:text-lg text-gray-300">{PROFILE.availability}</p>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <a href="#work" className={PRIMARY}>Voir mes projets</a>
        {PROFILE.cv ? (
          <a href={PROFILE.cv} target="_blank" rel="noreferrer" className={SECONDARY}>Mon CV (PDF)</a>
        ) : (
          <a href="#contact" className={SECONDARY}>Me contacter</a>
        )}
      </div>
    </div>
  </section>
);

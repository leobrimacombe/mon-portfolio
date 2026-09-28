import { lazy, Suspense, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { StaticTitle } from './components/StaticTitle';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { About } from './components/About';
import { Work } from './components/Work';
import { Contact } from './components/Contact';
import { ProjectModal } from './components/ProjectModal';
import { Perf3DToggle } from './components/Perf3DToggle';
import { useBodyScrollLock } from './hooks/useBodyScrollLock';
import { use3D } from './hooks/use3D';

// The 3D hero (three.js + R3F + drei) is most of the JavaScript, and phones start with
// it off: load it only when it is actually rendered.
const Scene3D = lazy(() => import('./three/Scene3D').then((m) => ({ default: m.Scene3D })));

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [openTilt, setOpenTilt] = useState(0);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { supported: supports3D, enabled: enable3D, toggle: toggle3D, autoDisable: autoDisable3D } = use3D();

  // Open a project, remembering the tilt of the preview it was launched from (desktop)
  // so the modal can unfold from that orientation.
  const handleSelectProject = (project, tilt = 0) => {
    setOpenTilt(tilt);
    setSelectedProject(project);
  };

  // Lock body scroll while a modal or the mobile menu is open.
  useBodyScrollLock(Boolean(selectedProject) || isMenuOpen);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">

      {/* Skip link: first focusable element, hidden until focused via keyboard. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded focus:font-mono focus:text-sm focus:font-bold focus:pointer-events-auto"
      >
        Aller au contenu
      </a>

      {/* 1. Fixed background layer — real 3D scene, or a static title in perf mode. If
          the 3D throws (asset or shader error), the boundary swaps in the static title
          instead of taking the whole page down. */}
      {enable3D ? (
        <ErrorBoundary fallback={<StaticTitle />} onError={autoDisable3D}>
          <Suspense fallback={null}>
            <Scene3D onPerfDecline={autoDisable3D} paused={Boolean(selectedProject)} />
          </Suspense>
        </ErrorBoundary>
      ) : (
        <StaticTitle />
      )}

      {/* 2. Content layer */}
      <main className="relative z-10 w-full flex flex-col min-h-screen pointer-events-none">
        <Nav isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
        <Hero />

        <div className="bg-[#050505] w-full relative z-20 overflow-hidden shadow-[0_-50px_100px_rgba(5,5,5,1)] pointer-events-auto">
          <Marquee />
          <About />
          <Work onSelectProject={handleSelectProject} />
          <Contact />
        </div>
      </main>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} openTilt={openTilt} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      {/* Film-grain overlay sitting above everything */}
      <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-50 opacity-[0.05]" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')"}}></div>

      {/* Performance toggle: turn the 3D hero off on weaker machines (hidden when the
          browser has no WebGL, since the 3D can't run there anyway). */}
      {supports3D && <Perf3DToggle enabled={enable3D} onToggle={toggle3D} />}
    </div>
  );
}

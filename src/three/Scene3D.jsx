import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, PerformanceMonitor } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';
import { SplitWord } from './SplitWord';

// The two hero words. They gently float and parallax with scroll — unless the user
// asked for reduced motion, in which case the group is frozen at its rest pose.
function HeroText({ reduced }) {
  const groupRef = useRef();
  const { viewport } = useThree();
  const targetWidth = 12;
  const scaleFactor = viewport.width < targetWidth ? viewport.width / targetWidth : 1;

  useFrame(({ clock }) => {
    if (reduced || !groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.x = Math.cos(t / 4) / 10;
    groupRef.current.rotation.y = Math.sin(t / 4) / 10;
    groupRef.current.position.z = Math.sin(t / 1.5) / 5;
    const scrollY = window.scrollY;
    groupRef.current.position.y = (scrollY * 0.005);
  });

  return (
    <group ref={groupRef} scale={scaleFactor}>
      <SplitWord text="PORTFOLIO" position={[0, 0.6, 0]} fontSize={1} color="white" isNeon={false} reduced={reduced} />
      <SplitWord text="LEO BRIMACOMBE" position={[0, -0.8, 0]} fontSize={0.9} color="rgb(0, 76, 241)" isNeon={true} reduced={reduced} />
    </group>
  );
}

// Fixed, full-viewport 3D background layer sitting behind the page content.
// Pointer events are enabled on the canvas so the letters can react to the cursor.
// Honours prefers-reduced-motion: freezes the animation and lowers the pixel ratio.
export function Scene3D({ onPerfDecline, paused }) {
  const reduced = useReducedMotion();
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
      {/* Pause rendering while a modal is open (the scene is hidden behind the backdrop
          anyway) to free the GPU. */}
      <Canvas frameloop={paused ? 'never' : 'always'} dpr={reduced ? 1 : [1, 2]} camera={{ position: [0, 0, 7], fov: 50 }} style={{ pointerEvents: 'auto' }}>
        {/* Watch the real framerate; if it stays below the lower bound, signal the
            app to fall back to the static title (performance mode). */}
        <PerformanceMonitor bounds={() => [40, 100]} onDecline={() => onPerfDecline?.()} />
        <ambientLight intensity={2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={5} />
        <pointLight position={[-10, -10, -10]} intensity={5} color="#4f46e5" />
        <Environment preset="city" />
        <HeroText reduced={reduced} />
      </Canvas>
    </div>
  );
}

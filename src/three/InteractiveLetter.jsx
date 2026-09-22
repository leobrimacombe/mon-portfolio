import { useState, useEffect, useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// drei's <Text> is a flat plane, so real depth is faked by stacking several copies
// of the glyph along Z (an extruded "relief"), darkened toward the back. On hover
// the inner group's Z scale collapses to ~0 so the whole stack folds onto a single
// plane — the letter "s'écrase" into 2D — while easing toward the camera.
const LAYERS = 5;          // stacked copies per letter; tuned down from 8 — at the hero's
                           // gentle ±6° float the extra layers aren't visible but cost meshes

const DEPTH = 0.35;        // total extrusion depth at rest
const BACK_DARKEN = 0.75;  // how much the rearmost layer is darkened (0..1)
const HOVER_LIFT = 0.5;    // forward travel toward the camera on hover
const HOVER_GROW = 0.15;   // extra uniform scale on hover

export const InteractiveLetter = ({ char, position, fontSize, baseColor, isNeon, reduced = false }) => {
  const groupRef = useRef();
  const stackRef = useRef();
  const { viewport } = useThree();
  const [loaded, setLoaded] = useState(false);
  const worldPos = useMemo(() => new THREE.Vector3(), []);
  const maxDistSq = 2.25;
  const restingZ = position[2];

  // Entrance parameters, randomized once on mount (lazy state init keeps render pure).
  const [animation] = useState(() => ({
    startZ: 0 - Math.random() * 20,
    speed: 8 + Math.random() * 5,
    delay: Math.random() * 0.2,
  }));

  // Pre-computed per-layer Z offset and shaded colour (front bright → back dark).
  const layers = useMemo(() => {
    const base = new THREE.Color(baseColor);
    return Array.from({ length: LAYERS }, (_, i) => {
      const t = LAYERS === 1 ? 0 : i / (LAYERS - 1); // 0 = front, 1 = back
      return { z: -t * DEPTH, color: base.clone().multiplyScalar(1 - t * BACK_DARKEN) };
    });
  }, [baseColor]);

  useEffect(() => {
    if (!groupRef.current) return;
    if (reduced) {
      // Reduced motion: skip the fly-in, sit static at full relief.
      groupRef.current.position.z = restingZ;
      groupRef.current.scale.setScalar(1);
    } else {
      groupRef.current.position.z = animation.startZ;
      groupRef.current.scale.setScalar(0);
    }
  }, [animation.startZ, reduced, restingZ]);

  useFrame((state, delta) => {
    if (reduced) return; // static: no entrance, animation or pointer reaction
    if (!groupRef.current || !stackRef.current) return;
    if (!loaded) {
      groupRef.current.position.z = animation.startZ;
      groupRef.current.scale.setScalar(0);
      return;
    }

    // Pointer proximity → influence in [0, 1] (0 once outside the reaction radius).
    const mouseX = (state.pointer.x * viewport.width) / 2;
    const mouseY = (state.pointer.y * viewport.height) / 2;
    groupRef.current.getWorldPosition(worldPos);
    const dx = mouseX - worldPos.x;
    const dy = mouseY - worldPos.y;
    const distSq = dx * dx + dy * dy;
    const influence = distSq > maxDistSq ? 0 : Math.max(0, 1 - Math.sqrt(distSq) / 1.5);

    // Uniform scale: eases 0 → 1 on entrance, then grows a touch on hover.
    const targetScale = 1 + influence * HOVER_GROW;
    groupRef.current.scale.setScalar(THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, animation.speed, delta));

    // Ease toward the camera on hover instead of receding.
    const targetZ = restingZ + influence * HOVER_LIFT;
    groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, targetZ, animation.speed, delta);

    // Collapse the depth on hover so the relief folds flat ("s'écrase").
    const targetDepth = 1 - influence * 0.96;
    stackRef.current.scale.z = THREE.MathUtils.damp(stackRef.current.scale.z, targetDepth, animation.speed, delta);
  });

  return (
    <group ref={groupRef} position={position}>
      <group ref={stackRef}>
        {layers.map((layer, i) => (
          <Text
            key={i}
            font="/Michroma-Regular.ttf"
            fontSize={fontSize}
            position={[0, 0, layer.z]}
            anchorX="center"
            anchorY="middle"
            sdfGlyphSize={64}
            onSync={i === 0 ? () => setLoaded(true) : undefined}
          >
            {char}
            {isNeon ? (
              <meshStandardMaterial color="black" emissive={layer.color} emissiveIntensity={2} toneMapped={false} />
            ) : (
              <meshStandardMaterial color={layer.color} metalness={0.5} roughness={0.4} toneMapped={false} />
            )}
          </Text>
        ))}
      </group>
    </group>
  );
};

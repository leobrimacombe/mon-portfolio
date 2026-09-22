import { useEffect, useState } from 'react';

const KEY = 'pf6:enable3d';       // 'on' | 'off'
const LOCK = 'pf6:enable3d:user'; // '1' once the user has chosen manually

// First-visit guess: only the genuinely weak get 3D off by default; everything else
// starts on and lets the runtime FPS monitor decide. Real GPU power can't be read
// reliably, so this stays conservative on purpose.
function heuristicDefault() {
  if (typeof window === 'undefined') return true;
  // Touch devices: default to the static title. The 3D only pays off with a cursor,
  // and the WebGL scene is the main source of jank on phones (incl. the brief freeze
  // when a modal closes and the render loop resumes).
  if (window.matchMedia?.('(pointer: coarse)').matches) return false;
  const mem = navigator.deviceMemory;          // GB (Chrome); undefined elsewhere
  const cores = navigator.hardwareConcurrency; // logical cores; undefined on some
  if (mem && mem <= 2) return false;
  if (cores && cores <= 2) return false;
  return true;
}

/**
 * Persisted on/off state for the 3D hero, with automatic performance fallback.
 *
 * - `enabled`     — whether to render the 3D scene.
 * - `toggle`      — flip it from the UI; marks the choice as user-made (locked).
 * - `autoDisable` — called by the runtime FPS monitor; drops to the static title,
 *                   but never overrides an explicit user choice (avoids a fight).
 *
 * @returns {{ enabled: boolean, toggle: () => void, autoDisable: () => void }}
 */
export function use3D() {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === 'undefined') return true;
    const saved = window.localStorage.getItem(KEY);
    if (saved === 'on') return true;
    if (saved === 'off') return false;
    return heuristicDefault();
  });

  const [userLocked, setUserLocked] = useState(
    () => typeof window !== 'undefined' && window.localStorage.getItem(LOCK) === '1'
  );

  useEffect(() => {
    window.localStorage.setItem(KEY, enabled ? 'on' : 'off');
  }, [enabled]);

  const toggle = () => {
    setUserLocked(true);
    window.localStorage.setItem(LOCK, '1');
    setEnabled((v) => !v);
  };

  const autoDisable = () => {
    if (!userLocked) setEnabled(false);
  };

  return { enabled, toggle, autoDisable };
}

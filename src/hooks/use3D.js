import { useState } from 'react';

const KEY = 'pf6:enable3d';       // 'on' | 'off'
const LOCK = 'pf6:enable3d:user'; // '1' once the visitor has chosen manually

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

// Whether the browser can create a WebGL context at all. Without one the hero would
// stay blank: R3F creates its renderer asynchronously, where no error boundary can
// catch the failure, so this has to be checked up front.
function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    gl?.getExtension('WEBGL_lose_context')?.loseContext(); // release the probe context
    return Boolean(gl);
  } catch {
    return false;
  }
}

// The visitor's saved choice ('on' | 'off'), or null. Storage access can throw
// (cookies / site data blocked), and older builds also saved automatic fallbacks
// under KEY, so only a value marked as user-made is trusted.
function readChoice() {
  try {
    if (window.localStorage.getItem(LOCK) !== '1') return null;
    const saved = window.localStorage.getItem(KEY);
    return saved === 'on' || saved === 'off' ? saved : null;
  } catch {
    return null;
  }
}

function saveChoice(choice) {
  try {
    window.localStorage.setItem(KEY, choice);
    window.localStorage.setItem(LOCK, '1');
  } catch {
    // Storage unavailable: the choice still applies for this visit.
  }
}

/**
 * On/off state for the 3D hero.
 *
 * - `supported`   — false when WebGL is unavailable; the 3D then stays off.
 * - `enabled`     — whether to render the 3D scene.
 * - `toggle`      — flip it from the UI; the choice is saved and wins from then on.
 * - `autoDisable` — called by the runtime FPS monitor (or a crash): drops to the
 *                   static title for this visit only, and never overrides a choice
 *                   the visitor made by hand.
 *
 * @returns {{ supported: boolean, enabled: boolean, toggle: () => void, autoDisable: () => void }}
 */
export function use3D() {
  const [supported] = useState(hasWebGL);
  const [defaultOn] = useState(heuristicDefault);
  const [choice, setChoice] = useState(readChoice);
  const [autoOff, setAutoOff] = useState(false);

  const enabled = supported && (choice ? choice === 'on' : defaultOn && !autoOff);

  const toggle = () => {
    const next = enabled ? 'off' : 'on';
    setChoice(next);
    saveChoice(next);
  };

  const autoDisable = () => setAutoOff(true);

  return { supported, enabled, toggle, autoDisable };
}

// Small fixed toggle to turn the 3D hero on/off (performance mode). Sits bottom-right,
// above the page but below modals. The dot shows the current state.
export const Perf3DToggle = ({ enabled, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    aria-pressed={enabled}
    title={enabled ? 'Désactiver la 3D (mode performance)' : 'Activer la 3D'}
    className="fixed bottom-5 right-5 z-50 pointer-events-auto flex items-center gap-2 font-mono text-[10px] md:text-xs uppercase tracking-wider border border-white/20 rounded-full px-4 py-2 backdrop-blur-md bg-black/40 text-white hover:border-blue-500 hover:text-blue-400 transition-colors"
  >
    <span
      aria-hidden
      className={`inline-block w-2 h-2 rounded-full ${enabled ? 'bg-blue-500' : 'border border-white/60'}`}
    />
    3D
  </button>
);
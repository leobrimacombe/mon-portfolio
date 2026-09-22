import { DrawLine } from './DrawLine';

// Standard section eyebrow: a wide-tracked uppercase label with an accent rule
// that draws in beneath it on scroll. `accent`/`line` let the Contact footer (on a
// blue background) swap the default blue for a darker shade.
export const SectionLabel = ({ children, accent = 'text-blue-500', line = 'bg-blue-500', className = '' }) => (
  <div className={className}>
    <h2 className={`text-xs font-bold tracking-[0.5em] uppercase ${accent}`}>{children}</h2>
    <DrawLine className={`h-px w-12 mt-3 ${line}`} />
  </div>
);

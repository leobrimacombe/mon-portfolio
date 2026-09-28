import { motion } from 'framer-motion';
import { SCOPE_LABELS } from '../data/projects';

// One project row in the Work list. The title is a real <button> (reachable with the
// keyboard and announced by screen readers) whose ::after stretches over the whole
// row, so the full row stays clickable. It sits in an h4 under the year's h3.
// `index` drives the scroll-in stagger; the shared layoutId makes the row morph into
// the modal and back. `onHover` feeds the parent's cursor-following thumbnail
// (decorative only, no layout role). The chip shows the scope, since the year is
// already the group heading.
export const ProjectCard = ({ project, index, onSelect, onHover }) => (
  <motion.div
    layoutId={`project-${project.id}`}
    onMouseEnter={() => onHover?.(project)}
    onMouseLeave={() => onHover?.(null)}
    className="group relative border-t border-white/10 py-8 md:py-12 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-white/5 focus-within:bg-white/5 px-2 md:px-4 transition-colors w-full gap-4 md:gap-0"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
  >
    <motion.h4 layout="position" className="text-2xl md:text-5xl font-bold text-gray-500 group-hover:text-white group-focus-within:text-white transition-colors font-sync uppercase">
      <button
        type="button"
        onClick={() => onSelect(project)}
        className="text-left uppercase cursor-pointer focus:outline-none after:absolute after:inset-0 focus-visible:after:outline focus-visible:after:outline-1 focus-visible:after:outline-blue-500"
      >
        {project.title}
      </button>
    </motion.h4>
    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
        <span className="text-gray-400 font-mono text-xs">{project.category}</span>
        {SCOPE_LABELS[project.scope] && (
          <span className="text-gray-400 font-mono text-xs border border-white/10 px-3 py-1 rounded-full whitespace-nowrap">{SCOPE_LABELS[project.scope]}</span>
        )}
    </div>
  </motion.div>
);

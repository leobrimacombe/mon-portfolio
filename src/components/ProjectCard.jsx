import { motion } from 'framer-motion';

// One clickable project row in the Work list. `index` drives the scroll-in stagger;
// clicking calls `onSelect` so the parent opens the modal — the shared layoutId makes
// the row morph into the modal and back, consistently. `onHover` feeds the parent's
// cursor-following thumbnail (decorative only, no layout role).
export const ProjectCard = ({ project, index, onSelect, onHover }) => (
  <motion.div
    layoutId={`project-${project.id}`}
    onClick={() => onSelect(project)}
    onMouseEnter={() => onHover?.(project)}
    onMouseLeave={() => onHover?.(null)}
    className="group border-t border-white/10 py-8 md:py-12 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer hover:bg-white/5 px-2 md:px-4 transition-colors w-full gap-4 md:gap-0"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
  >
    <div className="flex items-baseline pointer-events-none">
        <motion.h3 layout="position" className="text-2xl md:text-5xl font-bold text-gray-500 group-hover:text-white transition-colors font-sync uppercase">
            {project.title}
        </motion.h3>
    </div>
    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
        <span className="text-gray-500 font-mono text-[10px] md:text-xs">{project.category}</span>
        <span className="text-gray-600 font-mono text-[10px] md:text-xs border border-white/10 px-3 py-1 rounded-full pointer-events-none">{project.year}</span>
    </div>
  </motion.div>
);

import { motion } from 'framer-motion';
import {
  SiHtml5, SiCss, SiJavascript, SiReact, SiTailwindcss, SiNextdotjs,
  SiLaravel, SiSymfony, SiThreedotjs, SiFigma,
} from 'react-icons/si';
import { DiPhotoshop } from 'react-icons/di';
import { SectionLabel } from './SectionLabel';

// Tech stack chips: brand logo + name, with a hover/focus popover that adds a one-line
// description. `color` is the brand colour (white for marks that are black by default,
// so they read on the dark background). Descriptions are in French (visible content).
const SKILLS = [
  { name: 'HTML', Icon: SiHtml5, color: '#E34F26', desc: 'Structure sémantique des pages web.' },
  { name: 'CSS', Icon: SiCss, color: '#1572B6', desc: 'Mise en forme, layouts et responsive.' },
  { name: 'JS', Icon: SiJavascript, color: '#F7DF1E', desc: 'Le langage du web, côté interactif.' },
  { name: 'React', Icon: SiReact, color: '#61DAFB', desc: 'Interfaces dynamiques à base de composants.' },
  { name: 'Tailwind', Icon: SiTailwindcss, color: '#06B6D4', desc: 'CSS utilitaire pour styler vite et proprement.' },
  { name: 'Next.js', Icon: SiNextdotjs, color: '#FFFFFF', desc: 'Framework React full-stack (SSR, routing).' },
  { name: 'Laravel', Icon: SiLaravel, color: '#FF2D20', desc: 'Framework PHP pour back-ends robustes.' },
  { name: 'Symfony', Icon: SiSymfony, color: '#FFFFFF', desc: 'Framework PHP modulaire et structuré.' },
  { name: 'Three.js', Icon: SiThreedotjs, color: '#FFFFFF', desc: '3D et WebGL dans le navigateur.' },
  { name: 'Figma', Icon: SiFigma, color: '#F24E1E', desc: "Maquettage et design d'interfaces." },
  { name: 'Photoshop', Icon: DiPhotoshop, color: '#31A8FF', desc: 'Retouche et création graphique.' },
];

// "About" section: headline, intro paragraph and a row of animated skill chips.
export const About = () => (
  <section id="about" className="py-20 md:py-32 px-6 max-w-7xl mx-auto border-b border-white/10">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        <div>
            <SectionLabel className="mb-8">A Propos</SectionLabel>
            <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl md:text-5xl font-bold font-sync leading-tight text-white">
                DÉVELOPPEUR <span className="text-blue-600">FRONT-END</span> & CRÉATIF
            </motion.h3>
        </div>
        <div className="flex flex-col justify-end">
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-gray-400 text-base md:text-lg mb-8 leading-relaxed">
            Développeur web full-stack en formation (BUT MMI), je suis un véritable touche-à-tout. Capable de déployer des back-ends complexes sous Laravel ou de coder des expériences immersives en React, je suis toujours à la recherche de nouveaux défis techniques pour repousser mes limites.
            </motion.p>
            <ul className="flex flex-wrap gap-2 md:gap-3">
                {SKILLS.map(({ name, Icon, color, desc }, index) => (
                    <li key={name} className="group relative">
                        <motion.div
                            aria-label={`${name} — ${desc}`}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.25 + index * 0.05, type: 'spring', stiffness: 300, damping: 18 }}
                            whileHover={{ y: -5, scale: 1.06 }}
                            style={{ '--brand': color }}
                            className="flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-white/15 bg-white/[0.03] text-xs md:text-sm font-mono text-gray-200 cursor-default transition-[border-color,box-shadow,background-color] duration-300 hover:bg-white/[0.06] hover:[border-color:var(--brand)] hover:[box-shadow:0_10px_30px_-12px_var(--brand)]"
                        >
                            <Icon aria-hidden className="text-base md:text-lg shrink-0 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" style={{ color }} />
                            {name}
                        </motion.div>

                        {/* Popover: name + description, revealed on hover or keyboard focus. */}
                        <div aria-hidden className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-44 -translate-x-1/2 translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                            <div className="rounded-lg border border-white/10 bg-[#0a0a0a] px-3 py-2 text-center shadow-xl shadow-black/50">
                                <p className="flex items-center justify-center gap-1.5 font-mono text-xs font-bold uppercase text-white">
                                    <Icon aria-hidden style={{ color }} />
                                    {name}
                                </p>
                                <p className="mt-1 text-[11px] leading-snug text-gray-400">{desc}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  </section>
);

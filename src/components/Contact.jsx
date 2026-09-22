import { motion } from 'framer-motion';
import { SectionLabel } from './SectionLabel';

// Contact footer: headline, email/phone CTAs and social links.
export const Contact = () => (
  <footer id="contact" className="py-20 md:py-32 px-6 bg-blue-600 text-white min-h-[50vh] md:min-h-[70vh] flex flex-col justify-between">
    <div className="max-w-7xl mx-auto w-full">
        <SectionLabel accent="text-blue-900" line="bg-blue-900" className="mb-8 md:mb-12">Contact</SectionLabel>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-3xl md:text-6xl font-black font-sync mb-8 leading-tight">VOUS CHERCHEZ UN DEV ?<br /><span className="text-blue-950">ENVOYEZ MOI UN MAIL.</span></h3>
        </motion.div>
    </div>
    <div className="max-w-7xl mx-auto w-full flex flex-col gap-6 md:gap-8 my-8 md:my-12">
      <motion.a href="mailto:leo.brimacombe@free.fr" className="cursor-pointer whitespace-nowrap text-[clamp(1.2rem,5vw,4.5rem)] font-black font-sync hover:text-blue-950 transition-colors duration-300 leading-none" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} whileHover={{ x: 20 }}>leo.brimacombe@free.fr</motion.a>
        <motion.a href="tel:+33768785238" className="cursor-pointer text-xl md:text-3xl font-mono border border-white/30 rounded-full px-6 py-3 md:px-8 md:py-4 w-max hover:bg-white hover:text-blue-600 transition-all duration-300" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>+33 7 68 78 52 38</motion.a>
    </div>
    <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-end border-t border-white/20 pt-8 gap-6 md:gap-4">
        <div className="font-mono text-xs opacity-70">© 2026 LÉO BRIMACOMBE.<br/>TOUS DROITS RÉSERVÉS.</div>
        <div className="flex flex-wrap gap-4 md:gap-6 font-mono text-xs md:text-sm font-bold">
            <a href="https://www.linkedin.com/in/l%C3%A9o-brimacombe-23a6112a3/" target="_blank" rel="noreferrer" className="cursor-pointer hover:text-blue-950 transition-colors">LINKEDIN</a>
            <a href="https://github.com/leobrimacombe" target="_blank" rel="noreferrer" className="cursor-pointer hover:text-blue-950 transition-colors">GITHUB</a>
            <a href="https://gitlab.unistra.fr/lbrimacombe" target="_blank" rel="noreferrer" className="cursor-pointer hover:text-blue-950 transition-colors">GITLAB</a>
        </div>
    </div>
  </footer>
);

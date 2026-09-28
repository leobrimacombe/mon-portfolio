import { motion } from 'framer-motion';
import { SectionLabel } from './SectionLabel';
import { PROFILE } from '../data/profile';

// Footer links underline on hover instead of turning dark blue, which would drop
// below readable contrast on the blue background.
const FOOTER_LINK = 'cursor-pointer underline-offset-4 decoration-2 hover:underline';

// Contact footer: headline, email/phone CTAs and social links. On the blue background
// text is either white or the site's near-black, the two colours that stay readable.
export const Contact = () => (
  <footer id="contact" className="py-20 md:py-32 px-6 bg-blue-600 text-white min-h-[50vh] md:min-h-[70vh] flex flex-col justify-between">
    <div className="max-w-7xl mx-auto w-full">
        <SectionLabel accent="text-white" line="bg-white" className="mb-8 md:mb-12">Contact</SectionLabel>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-3xl md:text-6xl font-black font-sync mb-8 leading-tight">VOUS CHERCHEZ UN DEV ?<br /><span className="text-[#050505]">ENVOYEZ-MOI UN MAIL.</span></h3>
        </motion.div>
    </div>
    <div className="max-w-7xl mx-auto w-full flex flex-col gap-6 md:gap-8 my-8 md:my-12">
      <motion.a href="mailto:leo.brimacombe@free.fr" className="cursor-pointer whitespace-nowrap text-[clamp(1.2rem,5vw,4.5rem)] font-black font-sync hover:text-[#050505] transition-colors duration-300 leading-none" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} whileHover={{ x: 20 }}>leo.brimacombe@free.fr</motion.a>
        <motion.a href="tel:+33768785238" className="cursor-pointer text-xl md:text-3xl font-mono border border-white/30 rounded-full px-6 py-3 md:px-8 md:py-4 w-max hover:bg-white hover:text-blue-600 transition-all duration-300" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>+33 7 68 78 52 38</motion.a>
    </div>
    <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-end border-t border-white/20 pt-8 gap-6 md:gap-4">
        <div className="font-mono text-xs">© 2026 LÉO BRIMACOMBE.<br/>TOUS DROITS RÉSERVÉS.</div>
        <div className="flex flex-wrap gap-4 md:gap-6 font-mono text-sm font-bold">
            {PROFILE.cv && (
              <a href={PROFILE.cv} target="_blank" rel="noreferrer" className={FOOTER_LINK}>CV (PDF)</a>
            )}
            <a href="https://www.linkedin.com/in/l%C3%A9o-brimacombe-23a6112a3/" target="_blank" rel="noreferrer" className={FOOTER_LINK}>LINKEDIN</a>
            <a href="https://github.com/leobrimacombe" target="_blank" rel="noreferrer" className={FOOTER_LINK}>GITHUB</a>
            <a href="https://gitlab.unistra.fr/lbrimacombe" target="_blank" rel="noreferrer" className={FOOTER_LINK}>GITLAB</a>
        </div>
    </div>
  </footer>
);

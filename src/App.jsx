import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Environment, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// --- DONNÉES ---
const PROJECTS_DATA = [
  { 
    id: 1, 
    title: "ESPRITS CONSCIENTS", 
    category: "Création Site Web", 
    year: "2025", 
    description: "Création complète et design du site vitrine esprits-conscients.fr.\nIdentité visuelle et intégration web.", 
    image: "/images/logo esprit conscients.webp", 
    link: "https://esprits-conscients.fr/esprits-conscients/" 
  },
  { 
    id: 2, 
    title: "LES 3 P'TITS COCHONS", 
    category: "Refonte / Mise à jour", 
    year: "2025", 
    description: "Modernisation technique, optimisation et mise à jour du contenu pour cette institution.", 
    image: "/images/logo l3pc.webp", 
    link: "https://les3ptiscochons.fr/" 
  },
  { 
    id: 3, 
    title: "BEABA BIÈRE", 
    category: "Maintenance Web", 
    year: "2025", 
    description: "Mise à jour structurelle et maintenance du site e-commerce spécialisé.", 
    image: "/images/logo beaba.webp", 
    link: "https://beaba-biere.fr/" 
  },
  { 
    id: 4, 
    title: "APPLI DE GESTION DE PROJET", 
    category: "App Laravel / React", 
    year: "2025", 
    description: "Développement d'une application de gestion de projet style Trello.\nFonctionnalités Drag & Drop, colonnes dynamiques et persistance des données.\n(Site inaccessible car nécessitant une connection vpn)", 
    image: "/images/image sae501.png", 
    link: "https://sae501.brimacombe.etu.mmi-unistra.fr/" 
  }
];

const MARQUEE_TEXT = "REACT • JS • DESIGN • INTERACTION • LARAVEL • SYMFONY • HTML • CSS • NEXT.JS • UX/UI • ";

// --- COMPOSANT : LETTRE INDIVIDUELLE INTELLIGENTE ---
const InteractiveLetter = ({ char, position, fontSize, baseColor, isNeon }) => {
  const meshRef = useRef();
  const materialRef = useRef();
  const { viewport } = useThree();
  
  // Vecteur pour stocker la position mondiale de la lettre
  const worldPos = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      // 1. Où est la souris en 3D ?
      const mouseX = (state.pointer.x * viewport.width) / 2;
      const mouseY = (state.pointer.y * viewport.height) / 2;

      // 2. Où est cette lettre précise dans le monde ?
      meshRef.current.getWorldPosition(worldPos);

      // 3. Calcul de la distance entre la souris et la lettre
      const dx = mouseX - worldPos.x;
      const dy = mouseY - worldPos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // 4. Seuil d'activation (Rayon d'action de 1.5 unités)
      // Plus la souris est proche, plus "influence" est grand (de 0 à 1)
      const maxDist = 1.5;
      const influence = Math.max(0, 1 - distance / maxDist);

      // 5. APPLICATION DES EFFETS BASÉS SUR LA PROXIMITÉ
      
      // A. Déformation (Distortion)
      // On vise 0.5 de distortion max quand la souris est dessus
      materialRef.current.distort = THREE.MathUtils.lerp(materialRef.current.distort, influence * 0.6, 0.1);
      
      // B. Vitesse de l'eau (Speed)
      // Ça s'agite plus vite quand on est proche
      materialRef.current.speed = THREE.MathUtils.lerp(materialRef.current.speed, influence * 5, 0.1);

      // C. Couleur (Glow)
      // Si c'est Neon, on booste l'intensité. Sinon on passe du blanc au bleu.
      if (isNeon) {
         materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(2, 2 + influence * 5, 0.1);
      } else {
         // Changement subtil de couleur pour le texte blanc (vers le gris/bleuté)
         const targetColor = influence > 0.2 ? new THREE.Color("#a5b4fc") : new THREE.Color("white");
         materialRef.current.color.lerp(targetColor, 0.1);
      }

      // D. Petit mouvement de recul (Repulsion Z)
      // La lettre recule légèrement quand on la touche
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, position[2] - influence * 0.5, 0.1);
    }
  });

  return (
    <Text
      ref={meshRef}
      font="/Michroma-Regular.ttf"
      fontSize={fontSize}
      position={position}
      anchorX="center"
      anchorY="middle"
    >
      {char}
      <MeshDistortMaterial
        ref={materialRef}
        color={baseColor}
        speed={0} // Au repos, ça ne bouge pas
        distort={0} // Au repos, pas de déformation
        toneMapped={false}
        emissive={isNeon ? baseColor : "black"}
        emissiveIntensity={isNeon ? 2 : 0}
      />
    </Text>
  );
};

// --- CONTENEUR DE MOTS (KERNING CORRIGÉ) ---
const SplitWord = ({ text, position, fontSize, color, isNeon = false }) => {
  
  // 1. On définit la largeur spécifique pour les lettres "fines" de Michroma
  // Michroma est une police large, donc le défaut est grand (0.9), 
  // mais on réduit drastiquement pour I, L, T, F, etc.
  const getCharWidth = (char) => {
    const widthMap = {
      'I': 0.3,
      'i': 0.3,
      'L': 0.7,
      'l': 0.6,
      'T': 0.8,
      'F': 0.8,
      ' ': 0.3, // Espace
      'M': 1.2, // M un peu plus large
      'W': 1.1  // W un peu plus large
    };
    // Si la lettre n'est pas dans la liste, on utilise 0.95 par défaut
    return (widthMap[char] ?? 0.95) * fontSize;
  };

  // 2. On pré-calcule la position de chaque lettre
  let currentX = 0;
  const letters = text.split('').map((char) => {
    const width = getCharWidth(char);
    // La position de la lettre est le point actuel + la moitié de sa largeur (pour centrer)
    const pos = currentX + (width / 2);
    // On avance le curseur pour la prochaine lettre
    currentX += width;
    
    return { char, pos, width };
  });

  const totalWidth = currentX;
  // On centre le tout par rapport à la position demandée
  const startX = position[0] - (totalWidth / 2);

  return (
    <group position={[0, position[1], position[2]]}>
      {letters.map((item, i) => (
        <InteractiveLetter
          key={i}
          char={item.char}
          // On place la lettre à sa position précise calculée
          position={[startX + item.pos, 0, 0]}
          fontSize={fontSize}
          baseColor={color}
          isNeon={isNeon}
        />
      ))}
    </group>
  );
};

// --- SCÈNE 3D ---
function HeroText() {
  const groupRef = useRef();
  const { viewport } = useThree();

  // Responsive Scale
  const targetWidth = 12; 
  const scaleFactor = viewport.width < targetWidth ? viewport.width / targetWidth : 1;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.cos(t / 4) / 10;
      groupRef.current.rotation.y = Math.sin(t / 4) / 10;
      groupRef.current.position.z = Math.sin(t / 1.5) / 5;
      const scrollY = window.scrollY;
      groupRef.current.position.y = (scrollY * 0.005);
    }
  });

  return (
    <group ref={groupRef} scale={scaleFactor}>
      {/* On utilise SplitWord au lieu de Text direct */}
      
      <SplitWord 
        text="PORTFOLIO" 
        position={[0, 0.6, 0]} 
        fontSize={1} 
        color="white" 
        isNeon={false} 
      />
      
      <SplitWord 
        text="LEO BRIMACOMBE" 
        position={[0, -0.8, 0]} 
        fontSize={1} // Un peu plus petit car le nom est long
        color="rgb(37 99 235 / var(--tw-bg-opacity, 1))" 
        isNeon={true} 
      />
    </group>
  );
}

// --- MODALE ---
const ProjectModal = ({ project, onClose }) => {
  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
      style={{ pointerEvents: 'auto' }}
      onClick={onClose}
    >
      <div 
        className="bg-[#0a0a0a] border border-white/10 w-full max-w-5xl h-[85vh] md:h-[80vh] rounded-2xl overflow-hidden flex flex-col md:flex-row relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-50 bg-white text-black w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-lg md:text-xl hover:scale-110 transition cursor-pointer"
        >
          ✕
        </button>
        <div className="w-full h-[40%] md:w-1/2 md:h-full relative bg-gray-900">
            <img src={project.image} className="w-full h-full object-cover opacity-80" alt={project.title} />
        </div>
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center text-white overflow-y-auto">
           <h2 className="text-2xl md:text-4xl font-black mb-4 font-sync">{project.title}</h2>
           <p className="text-gray-400 mb-6 md:mb-8 text-sm md:text-base whitespace-pre-line leading-relaxed">{project.description}</p>
           <a href={project.link} target="_blank" rel="noreferrer" className="px-6 py-3 bg-white text-black font-bold uppercase w-max text-sm md:text-base hover:bg-blue-500 hover:text-white transition rounded cursor-pointer">
             Voir le projet
           </a>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.body.style.overflowX = 'hidden';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject]);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      
      {/* 1. LAYER 3D */}
      <div 
        style={{ 
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', 
          zIndex: 0, pointerEvents: 'none'
        }}
      >
        {/* PointerEvents 'auto' essentiel pour détecter la souris */}
        <Canvas camera={{ position: [0, 0, 7], fov: 50 }} style={{ pointerEvents: 'auto' }}>
            <ambientLight intensity={2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={5} />
            <pointLight position={[-10, -10, -10]} intensity={5} color="#4f46e5" />
            <Environment preset="city" />
            <HeroText />
        </Canvas>
      </div>

      {/* 2. LAYER CONTENU */}
      <main className="relative z-10 w-full flex flex-col min-h-screen pointer-events-none">
        
        <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-40 mix-blend-difference text-white">
            <span className="font-sync font-bold text-sm md:text-lg pointer-events-auto cursor-pointer">Léo Brimacombe</span>
            <div className="flex gap-6 font-mono text-xs hidden md:flex pointer-events-auto">
                <a href="#about" className="hover:text-blue-400 cursor-pointer transition-colors">A PROPOS</a>
                <a href="#work" className="hover:text-blue-400 cursor-pointer transition-colors">MON TRAVAIL</a>
                <a href="#contact" className="hover:text-blue-400 cursor-pointer transition-colors">CONTACT</a>
            </div>
        </nav>

        <section className="h-screen w-full flex flex-col justify-end p-8 pb-32">
             <div className="text-center text-xs font-mono text-gray-500 animate-pulse">( DESCENDEZ )</div>
        </section>

        <div className="bg-[#050505] w-full relative z-20 shadow-[0_-50px_100px_rgba(5,5,5,1)] pointer-events-auto">
            
            <div className="bg-blue-600 text-black py-2 overflow-hidden w-full">
                <div className="flex animate-marquee whitespace-nowrap">
                    <span className="text-2xl md:text-4xl font-black font-sync mx-4">
                        {MARQUEE_TEXT.repeat(6)}
                    </span>
                    <span className="text-2xl md:text-4xl font-black font-sync mx-4">
                        {MARQUEE_TEXT.repeat(6)}
                    </span>
                </div>
            </div>

            <section id="about" className="py-20 md:py-32 px-6 max-w-7xl mx-auto border-b border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                    <div>
                        <h2 className="text-xs font-bold text-blue-500 tracking-[0.5em] mb-8 uppercase">A Propos</h2>
                        <motion.h3 
                            initial={{ opacity: 0, y: 20 }} 
                            whileInView={{ opacity: 1, y: 0 }} 
                            viewport={{ once: true }} 
                            className="text-2xl md:text-5xl font-bold font-sync leading-tight text-white"
                        >
                            JE CRÉE DES <span className="text-blue-600">EXPÉRIENCES</span> NUMÉRIQUES IMMERSIVES.
                        </motion.h3>
                    </div>

                    <div className="flex flex-col justify-end">
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }} 
                            whileInView={{ opacity: 1, y: 0 }} 
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-400 text-base md:text-lg mb-8 leading-relaxed"
                        >
                            Développeur créatif passionné par l'intersection entre le design et la technologie. 
                            Mon objectif est de transformer une simple navigation en une véritable exploration visuelle, 
                            en utilisant les dernières technologies du web moderne.
                        </motion.p>
                        
                        <div className="flex flex-wrap gap-2 md:gap-3">
                            {["React", "JS", "Tailwind", "Next.js", "Laravel", "Symfony"].map((skill, index) => (
                                <motion.span 
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }} 
                                    whileInView={{ opacity: 1, scale: 1 }} 
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + (index * 0.1) }}
                                    className="px-3 py-1 md:px-4 md:py-2 border border-white/20 rounded-full text-[10px] md:text-xs font-mono text-gray-300 hover:bg-white hover:text-black transition-colors duration-300 cursor-default"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id="work" className="py-20 md:py-24 px-6 max-w-7xl mx-auto border-b border-white/10">
                <h2 className="text-xs font-bold text-blue-500 tracking-[0.5em] mb-12 uppercase">mes travaux</h2>
                <div className="flex flex-col gap-2">
                    {PROJECTS_DATA.map((p, i) => (
                      <motion.div 
                        key={p.id}
                        onClick={() => setSelectedProject(p)} 
                        className="group border-t border-white/10 py-8 md:py-12 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer hover:bg-white/5 px-2 md:px-4 transition-all w-full gap-4 md:gap-0"
                        initial={{ opacity: 0, y: 20 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        viewport={{ once: true }} 
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="flex items-baseline gap-4 md:gap-6 pointer-events-none">
                            <span className="font-mono text-gray-600 text-xs">0{p.id}</span>
                            <h3 className="text-2xl md:text-5xl font-bold text-gray-500 group-hover:text-white transition-colors font-sync uppercase">{p.title}</h3>
                        </div>
                        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
                            <span className="text-gray-500 font-mono text-[10px] md:text-xs">{p.category}</span>
                            <span className="text-gray-600 font-mono text-[10px] md:text-xs border border-white/10 px-3 py-1 rounded-full pointer-events-none">{p.year}</span>
                        </div>
                      </motion.div>
                    ))}
                </div>
            </section>

            <footer id="contact" className="py-20 md:py-32 px-6 bg-blue-600 text-white min-h-[50vh] md:min-h-[70vh] flex flex-col justify-between">
                
                <div className="max-w-7xl mx-auto w-full">
                    <h2 className="text-xs font-bold text-blue-900 tracking-[0.5em] mb-8 md:mb-12 uppercase">Contact</h2>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-3xl md:text-6xl font-black font-sync mb-8 leading-tight">
                            UN PROJET EN TÊTE ?<br />
                            <span className="text-blue-950">TRAVAILLONS ENSEMBLE.</span>
                        </h3>
                    </motion.div>
                </div>

                <div className="max-w-7xl mx-auto w-full flex flex-col gap-6 md:gap-8 my-8 md:my-12">
                    <motion.a 
                        href="mailto:leo.brimacombe@free.fr" 
                        className="text-[9vw] md:text-[3vw] font-black font-sync hover:text-blue-950 transition-colors duration-300 break-all leading-none"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ x: 20 }}
                    >
                        leo.brimacombe@free.fr
                    </motion.a>

                    <motion.a 
                        href="tel:+33768785238"
                        className="text-xl md:text-3xl font-mono border border-white/30 rounded-full px-6 py-3 md:px-8 md:py-4 w-max hover:bg-white hover:text-blue-600 transition-all duration-300"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        +33 7 68 78 52 38
                    </motion.a>
                </div>

                <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-end border-t border-white/20 pt-8 gap-6 md:gap-4">
                    <div className="font-mono text-xs opacity-70">
                        © 2026 LÉO BRIMACOMBE.<br/>TOUS DROITS RÉSERVÉS.
                    </div>
                    <div className="flex flex-wrap gap-4 md:gap-6 font-mono text-xs md:text-sm font-bold">
                        <a href="https://www.linkedin.com/in/l%C3%A9o-brimacombe-23a6112a3/" target="_blank" rel="noreferrer" className="hover:text-blue-950 transition-colors">LINKEDIN</a>
                        <a href="https://github.com/leobrimacombe" target="_blank" rel="noreferrer" className="hover:text-blue-950 transition-colors">GITHUB</a>
                        <a href="https://gitlab.unistra.fr/lbrimacombe" target="_blank" rel="noreferrer" className="hover:text-blue-950 transition-colors">GITLAB</a>
                    </div>
                </div>
            </footer>
        </div>
      </main>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
      
      <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-50 opacity-[0.05]" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')"}}></div>
    </div>
  );
}
// Project catalogue rendered by the Work section and the project modal.
// Visible copy is in French (the site language); keys/comments stay in English.

/**
 * @typedef {Object} Project
 * @property {number}   id            Unique id (also the React key and shared layoutId).
 * @property {string}   title         Project name (shown uppercase in the UI).
 * @property {string}   category      Short kind/stack label shown in the list.
 * @property {string}   year          Release year as a string ("2025"); used for grouping.
 * @property {string}   description   Short summary shown at the top of the modal.
 * @property {string[]} tags          Tech / skill chips.
 * @property {string[]} images        Image paths for the carousel + lightbox.
 * @property {string}   link          Live or repo URL ("Voir le projet").
 * @property {string}   [gitLink]     Optional source URL ("Voir le Code").
 * @property {'iut' | 'pro'} [scope]  Grouping in the Work section: 'iut' for BUT MMI
 *                                     (SAE) projects, 'pro' for client / personal work.
 * @property {string[]} [competencies] AC codes this project proves (see data/competencies.js),
 *                                     shown as "Compétences prouvées" in the modal.
 *
 * Optional reflective case-study fields. Each is rendered as its own section in the
 * modal only when present (see ProjectModal), so projects can grow from a simple
 * card into a full case study without any layout change.
 * @property {string}   [context]     The brief / problem / constraints.
 * @property {string}   [role]        Your specific role and responsibilities.
 * @property {string}   [solution]    Approach and key technical / design decisions.
 * @property {string}   [result]      Outcome, metrics, what shipped.
 * @property {string}   [learnings]   Takeaways / what you would do differently.
 */

/** @type {Project[]} */
export const PROJECTS_DATA = [
  // --- REAL PROJECTS -------------------------------------------------------------
  {
    id: 10,
    scope: 'pro',
    competencies: ['AC34.01', 'AC34.02', 'AC34.03', 'AC34.05', 'AC35.01', 'AC35.03'],
    title: "BOOKAPP",
    category: "App Next.js / Supabase",
    year: "2026",
    description: "Un carnet de lecture numérique « pour les puristes » : un Index de recherche de livres, « L'Étui » (collection privée pour annoter et classer ses lectures) et « Le Club » (mur communautaire pour partager ses notes), avec des recommandations suggérées par IA (Google Gemini).",
    tags: ["Next.js", "React", "TypeScript", "Tailwind", "Supabase", "Gemini (IA)"],
    images: ["/images/bookapp-1.png", "/images/bookapp-2.png", "/images/bookapp-3.png", "/images/bookapp-4.png", "/images/bookapp-5.png"],
    link: "https://bibliotheque-livres.vercel.app/",
    gitLink: "https://github.com/leobrimacombe/biblioth-que-livres",
    context: "Projet personnel mené de bout en bout. L'idée : un carnet de lecture numérique soigné « pour les puristes », réunissant en un seul endroit la recherche de livres, le suivi annotable de ses lectures et la découverte de nouveaux titres — là où les apps existantes sont souvent soit trop sociales, soit trop limitées.",
    role: "Conception et développement en autonomie complète (solo) : direction produit, UI/UX et identité de marque, front-end, back-end et base de données, intégration de l'IA, puis déploiement et mise en ligne.",
    solution: "Application fullstack Next.js (App Router) + TypeScript, avec Supabase pour la base PostgreSQL et l'authentification. Intégration de l'API Google Gemini pour générer des recommandations de lecture personnalisées. Direction artistique « édition numérique » assumée (marque BookApp, logo « B. », ton éditorial). Déploiement continu sur Vercel.",
    result: "Application en ligne et fonctionnelle : Index de recherche de livres, « L'Étui » (collection privée pour annoter, noter et classer ses lectures), « Le Club » (mur communautaire de partage) et recommandations suggérées par IA.",
    learnings: "Piloter seul un produit complet m'a appris à arbitrer en continu entre l'ambition et un périmètre réaliste. Techniquement : intégrer un LLM (Gemini) de façon utile et maîtrisée, gérer l'authentification et les données utilisateurs avec Supabase (sécurité, vie privée). Côté produit : poser une identité de marque et un ton cohérents pour donner une vraie personnalité au projet.",
  },
  {
    id: 9,
    scope: 'pro',
    title: "GESTIONNAIRE BOBINES IMPRESSIONS 3D",
    category: "App Next.js / TypeScript",
    year: "2026",
    description: "Une application web Fullstack permettant aux passionnés d'impression 3D de gérer leur stock de bobines, suivre leur consommation en temps réel et analyser les coûts d'impression.",
    tags: ["Next.js", "Tailwind", "TypeScript", "Recharts", "Lucide React", "Supabase", "PostgreSQL"],
    images: ["/images/bobines-1.png", "/images/bobines-2.png", "/images/bobines-3.png"],
    link: "https://bobines.vercel.app/",
    gitLink: "https://github.com/leobrimacombe/bobines"
  },
  {
    id: 8,
    scope: 'iut',
    competencies: ['AC34.02', 'AC34.05'],
    title: "SITE DE GESTION ELECTRIQUE",
    category: "App Laravel / Grafana",
    year: "2026",
    description: "Développement d'une application web Laravel intégrant des tableaux de bord Grafana.\nGestion, requêtage et visualisation de données temporelles via InfluxDB et le langage Flux.",
    tags: ["Laravel", "Tailwind", "JS", "Grafana", "InfluxDB", "Flux"],
    images: ["/images/grafana1.png", "/images/grafana-dashboard.png", "/images/grafana-coutss.png", "/images/grafana-prod.png", "/images/grafana-carte.png"],
    link: "https://sae501-grafana.brimacombe.etu.mmi-unistra.fr/",
    gitLink: "https://gitlab.unistra.fr/lbrimacombe/sae501-grafana"
  },
  {
    id: 1,
    scope: 'pro',
    title: "ESPRITS CONSCIENTS",
    category: "Création Site Web",
    year: "2025",
    description: "Création complète et design du site vitrine esprits-conscients.fr.\nIdentité visuelle et intégration web.",
    tags: ["WordPress", "CSS Grids", "JavaScript", "Figma", "SEO"],
    images: ["/images/logo esprit conscients.webp"],
    link: "https://esprits-conscients.fr/esprits-conscients/",
  },
  {
    id: 2,
    scope: 'pro',
    title: "LES 3 P'TITS COCHONS",
    category: "Refonte / Mise à jour",
    year: "2025",
    description: "Modernisation technique, optimisation et mise à jour du contenu pour cette institution.",
    tags: ["HTML5", "SASS", "JS Vanilla", "Optimisation", "Accessibilité"],
    images: ["/images/logo l3pc.webp"],
    link: "https://les3ptiscochons.fr/",
  },
  {
    id: 3,
    scope: 'pro',
    title: "BEABA BIÈRE",
    category: "Maintenance Web",
    year: "2025",
    description: "Mise à jour structurelle et maintenance du site e-commerce spécialisé.",
    tags: ["PrestaShop", "PHP", "Smarty", "MySQL", "E-commerce"],
    images: ["/images/logo beaba.webp"],
    link: "https://beaba-biere.fr/",
  },
  {
    id: 4,
    scope: 'iut',
    competencies: ['AC34.01', 'AC34.02', 'AC34.05'],
    title: "APPLI DE GESTION DE PROJET",
    category: "App Laravel / React",
    year: "2025",
    description: "Développement d'une application de gestion de projet style Trello.\nFonctionnalités Drag & Drop, colonnes dynamiques et persistance des données.\n(Site inaccessible car nécessitant une connection vpn)",
    tags: ["Laravel", "Tailwind", "PHP", "MySQL", "JS", "CSS"],
    images: ["/images/image sae501.png", "/images/login sae501.png"],
    link: "https://sae501.brimacombe.etu.mmi-unistra.fr/",
    gitLink: "https://gitlab.unistra.fr/lbrimacombe/sae501"
  },
  {
    id: 5,
    scope: 'iut',
    competencies: ['AC34.02', 'AC34.03'],
    title: "JEU DE CARTE",
    category: "Jeu JS",
    year: "2025",
    description: "Développement d'un jeu de cartes permettant d'apprendre les cycle de l'eau.",
    tags: ["PHP", "Symfony", "SQL", "JS"],
    images: ["/images/decripteau1.png", "/images/decripteau2.png"],
    link: "https://sae401-decrypteau.brimacombe.etu.mmi-unistra.fr/",
    gitLink: "https://gitlab.unistra.fr/sae401-justine-hannauer-nikita-kuznetsov-leo-brimacombe-romain-lapouge/sae401-justine-hannauer-nikita-kuznetsov-leo-brimacombe-romain-lapouge"
  },
  {
    id: 6,
    scope: 'iut',
    competencies: ['AC34.03'],
    title: "JEU UNITY",
    category: "Jeu Unity",
    year: "2025",
    description: "Développement d'un jeu de parcours basé sur la physique sur le moteur de jeu Unity.",
    tags: ["Unity", "C#", "Game Design", "Blender"],
    images: ["/images/person_runner1.png"],
    link: "https://gitlab.unistra.fr/lbrimacombe/sae402",
    gitLink: "https://gitlab.unistra.fr/lbrimacombe/sae402"
  },
  {
    id: 7,
    scope: 'iut',
    competencies: ['AC34.03'],
    title: "SITE SUR LE CLIMAT",
    category: "Site interactif",
    year: "2025",
    description: "Développement d'un site en JavaScript permettant de dénoncer les impacts environnementaux de l'aviation et de les comparer aux différents moyens de locomotion.",
    tags: ["HTML", "CSS", "JS", "Infographies", "Figma"],
    images: ["/images/avions.png"],
    link: "https://fricks.etu.mmi-unistra.fr/SAE303-site-groupe6/",
    gitLink: "https://github.com/leobrimacombe/SAE-303"
  }
];

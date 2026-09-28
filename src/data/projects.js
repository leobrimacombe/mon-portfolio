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
 * @property {string}   [link]        Live demo URL ("Voir le projet"); omit when there is
 *                                     only the repository.
 * @property {boolean}  [vpnOnly]     True when `link` only answers on the IUT network (VPN):
 *                                     the modal then shows it as a secondary link with a
 *                                     note, instead of a main button that would time out.
 * @property {string}   [gitLink]     Optional source URL ("Voir le code").
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

/** Visible labels for `Project.scope` (Work filter + list rows). */
export const SCOPE_LABELS = {
  pro: 'Pro & perso',
  iut: 'IUT',
};

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
    description: "Un carnet de lecture numérique pour les puristes. On cherche des livres dans l'Index, on range, note et annote ses lectures dans L'Étui, et on partage ses notes sur Le Club, le mur communautaire. L'appli propose aussi des recommandations de lecture générées avec Google Gemini.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind", "Supabase", "Gemini (IA)"],
    images: ["/images/bookapp-1.webp", "/images/bookapp-2.webp", "/images/bookapp-3.webp", "/images/bookapp-4.webp", "/images/bookapp-5.webp"],
    link: "https://bibliotheque-livres.vercel.app/",
    gitLink: "https://github.com/leobrimacombe/biblioth-que-livres",
    context: "Projet personnel. L'idée était de réunir au même endroit la recherche de livres, le suivi annoté de ses lectures et la découverte de nouveaux titres. Les applis existantes sont souvent trop sociales, ou au contraire trop limitées.",
    role: "J'ai mené le projet seul, de l'idée à la mise en ligne. J'ai conçu le produit, l'interface et l'identité de marque, développé le front-end, le back-end et la base de données, intégré Gemini, puis déployé l'application.",
    solution: "Une application full-stack en Next.js (App Router) et TypeScript, avec Supabase pour la base PostgreSQL et l'authentification. Les recommandations personnalisées passent par l'API Google Gemini. Le design suit une direction « édition numérique », avec la marque BookApp, le logo « B. » et un ton éditorial. L'application est déployée en continu sur Vercel.",
    result: "BookApp est en ligne, et ses quatre parties (Index, Étui, Club et recommandations) sont utilisables.",
    learnings: "Porter seul un produit complet m'a obligé à arbitrer sans cesse entre l'ambition et ce qui était réaliste. Techniquement, je sais maintenant intégrer un LLM (Gemini) là où il est utile, et gérer l'authentification et les données des utilisateurs avec Supabase en pensant à la sécurité et à la vie privée. Enfin, j'ai appris à définir une identité de marque et un ton, puis à les garder cohérents sur tout le projet.",
  },
  {
    id: 9,
    scope: 'pro',
    // Same stack as BookApp (Next.js + Supabase, deployed on Vercel); to be confirmed.
    competencies: ['AC34.01', 'AC34.02', 'AC34.05'],
    title: "GESTIONNAIRE BOBINES IMPRESSIONS 3D",
    category: "App Next.js / TypeScript",
    year: "2026",
    description: "Une application web Fullstack permettant aux passionnés d'impression 3D de gérer leur stock de bobines, suivre leur consommation en temps réel et analyser les coûts d'impression.",
    tags: ["Next.js", "Tailwind", "TypeScript", "Recharts", "Lucide React", "Supabase", "PostgreSQL"],
    images: ["/images/bobines-1.webp", "/images/bobines-2.webp", "/images/bobines-3.webp"],
    link: "https://bobines.vercel.app/",
    gitLink: "https://github.com/leobrimacombe/bobines",
    // [À COMPLÉTER : étude de cas (context, role, solution, result, learnings), comme BookApp.]
  },
  {
    id: 8,
    scope: 'iut',
    competencies: ['AC34.02', 'AC34.05'],
    title: "SITE DE GESTION ÉLECTRIQUE",
    category: "App Laravel / Grafana",
    year: "2026",
    description: "Développement d'une application web Laravel intégrant des tableaux de bord Grafana.\nGestion, requêtage et visualisation de données temporelles via InfluxDB et le langage Flux.",
    tags: ["Laravel", "Tailwind", "JS", "Grafana", "InfluxDB", "Flux"],
    images: ["/images/grafana-1.webp", "/images/grafana-dashboard.webp", "/images/grafana-couts.webp", "/images/grafana-prod.webp", "/images/grafana-carte.webp"],
    link: "https://sae501-grafana.brimacombe.etu.mmi-unistra.fr/",
    vpnOnly: true,
    gitLink: "https://gitlab.unistra.fr/lbrimacombe/sae501-grafana",
    // [À COMPLÉTER : étude de cas (context, role, solution, result, learnings), comme BookApp.]
  },
  {
    id: 1,
    scope: 'pro',
    title: "ESPRITS CONSCIENTS",
    category: "Création Site Web",
    year: "2025",
    description: "Création complète et design du site vitrine esprits-conscients.fr.\nIdentité visuelle et intégration web.",
    tags: ["WordPress", "CSS Grids", "JavaScript", "Figma", "SEO"],
    // [À COMPLÉTER : captures du site livré, en plus du logo.]
    images: ["/images/logo-esprits-conscients.webp"],
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
    // [À COMPLÉTER : captures avant / après la refonte, et si possible des mesures
    //  (scores Lighthouse avant / après) : c'est une preuve directe pour AC35.02.]
    images: ["/images/logo-l3pc.webp"],
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
    // [À COMPLÉTER : captures du site. Le lien renvoyait une erreur HTTPS côté serveur
    //  (sept. 2026) : vérifier avec le client que le site est toujours en ligne.]
    images: ["/images/logo-beaba.webp"],
    link: "https://beaba-biere.fr/",
  },
  {
    id: 4,
    scope: 'iut',
    competencies: ['AC34.01', 'AC34.02', 'AC34.05'],
    title: "APPLI DE GESTION DE PROJET",
    category: "App Laravel / React",
    year: "2025",
    description: "Développement d'une application de gestion de projet style Trello.\nFonctionnalités Drag & Drop, colonnes dynamiques et persistance des données.",
    tags: ["Laravel", "Tailwind", "PHP", "MySQL", "JS", "CSS"],
    images: ["/images/gestion-projet-1.webp", "/images/gestion-projet-login.webp"],
    link: "https://sae501.brimacombe.etu.mmi-unistra.fr/",
    vpnOnly: true,
    gitLink: "https://gitlab.unistra.fr/lbrimacombe/sae501"
  },
  {
    id: 5,
    scope: 'iut',
    competencies: ['AC34.02', 'AC34.03'],
    title: "JEU DE CARTES",
    category: "Jeu JS",
    year: "2025",
    description: "Développement d'un jeu de cartes permettant d'apprendre le cycle de l'eau.",
    tags: ["PHP", "Symfony", "SQL", "JS"],
    images: ["/images/decrypteau-1.webp", "/images/decrypteau-2.webp"],
    link: "https://sae401-decrypteau.brimacombe.etu.mmi-unistra.fr/",
    vpnOnly: true,
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
    // [À COMPLÉTER : une build WebGL jouable (itch.io…) ou une vidéo de gameplay, à mettre
    //  dans `link` ; pour l'instant seul le dépôt est disponible.]
    images: ["/images/unity-runner.webp"],
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
    images: ["/images/climat-avions.webp"],
    link: "https://fricks.etu.mmi-unistra.fr/SAE303-site-groupe6/",
    vpnOnly: true,
    gitLink: "https://github.com/leobrimacombe/SAE-303"
  }
];

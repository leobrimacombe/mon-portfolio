# Portfolio PF6 — contexte projet (lu automatiquement par Claude)

Portfolio de Léo Brimacombe (BUT MMI), refondu pour une évaluation notée sur les
compétences « Développer » et « Entreprendre » niveau 3. Site **en français** ;
**code et commentaires en anglais**.

## Stack
React 19 + Vite + Tailwind + Three.js / React Three Fiber + Framer Motion. Déploiement Vercel.

## Architecture
- `src/App.jsx` — composition de la page uniquement.
- `src/main.jsx` — point d'entrée (`MotionConfig reducedMotion="user"` + `<Analytics/>`).
- `src/data/` — `projects.js` (+ `@typedef Project`, étude de cas, `scope` iut/pro, `competencies` AC), `competencies.js` (libellés des AC du référentiel).
- `src/hooks/` — `useProjectFilter` (recherche + tri par année), `useBodyScrollLock`, `use3D` (toggle 3D persistant).
- `src/three/` — `Scene3D` (+ `PerformanceMonitor` → fallback auto), `SplitWord`, `InteractiveLetter` (hero 3D).
- `src/components/` — Nav, Hero, Marquee, About, Work, ProjectCard,
  ProjectModal (étude de cas + « Compétences prouvées »), Contact, Perf3DToggle,
  StaticTitle (fallback 2D).

## Conventions (IMPORTANT)
- Code/commentaires en **anglais**, contenu visible en **français**.
- Contenu à rédiger = `[À COMPLÉTER : ...]`. **N'inventer AUCUN fait** (projets, dates,
  missions de stage, résultats).
- **Git géré par l'utilisateur** : ne JAMAIS commit / stage / push / créer de branche.
  Faire les changements, montrer les diffs (`git diff` lecture seule), laisser l'utilisateur committer.
- Ne rien casser : `npm run build` et `npm run lint` doivent rester **verts** après chaque étape.

## Commandes
`npm run dev` · `npm run build` · `npm run preview` · `npm run lint`

## État actuel (refonte PF6 réalisée)
Refactor complet (App 614 → ~50 lignes en composition), SEO + Open Graph, support
`prefers-reduced-motion`, modèle d'étude de cas dans la modale projet, mapping des
compétences (AC du référentiel) fondues dans les projets (champ `competencies`, affiché
« Compétences prouvées » dans la modale ; Entreprendre rattaché au stage Dalim), entrées
projet brouillon (stage Dalim + projets récents), projets séparés IUT vs pro/perso
(champ `scope`), mode perf (toggle + auto-fallback FPS).
Blog et curseur custom : retirés (l'utilisateur n'en voulait pas).

## À finir (TODO)
- [ ] Remplir tous les `[À COMPLÉTER]` : projets brouillon (stage Dalim + récents).
- [ ] Vérifier / ajuster le mapping `competencies` proposé par projet (`data/projects.js`).
- [ ] Ajouter `public/og-image.png` (1200×630) pour l'aperçu des liens partagés.
- [ ] Hero 3D — relief des lettres : direction en cours dans `src/three/InteractiveLetter.jsx`.
  Approche actuelle = empilement de calques (faux relief qui s'écrase au survol).
  Alternative discutée = `<Text3D>` (géométrie extrudée réelle), nécessiterait de
  convertir la police `Michroma-Regular.ttf` en `.json` (typeface). Décision à trancher.
- [ ] Polish modale projet : `justify-center` peut rogner le haut des longues études
  de cas — option : passer le panneau de droite en `my-auto`.

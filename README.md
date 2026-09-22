# Portfolio - Léo Brimacombe

Portfolio personnel — React 19 + Vite + Tailwind, avec une scène 3D interactive
(Three.js / React Three Fiber) et des animations Framer Motion.

- **Lien en ligne :** [leo-brimacombe.vercel.app](https://leo-brimacombe.vercel.app)
- **Version :** 8.0
- **Dernière mise à jour :** Février 2026

## Stack
- React 19 / Vite
- Tailwind CSS
- Three.js / React Three Fiber (scène 3D du héros)
- Framer Motion (animations + prise en charge de `prefers-reduced-motion`)
- Déploiement : Vercel (+ Vercel Analytics)

## Architecture

L'application est découpée en composants ; `App.jsx` ne fait que composer la page.

```
src/
├─ App.jsx                 # composition de la page
├─ main.jsx                # point d'entrée (MotionConfig + Analytics)
├─ index.css               # styles globaux, polices, marquee
├─ data/
│  ├─ projects.js          # données projets (+ @typedef, champs étude de cas)
│  └─ posts.js             # articles de blog
├─ hooks/
│  ├─ useProjectFilter.js  # recherche + tri des projets par année
│  └─ useBodyScrollLock.js # verrou de scroll (modales / menu)
├─ three/                  # scène 3D
│  ├─ Scene3D.jsx
│  ├─ InteractiveLetter.jsx
│  └─ SplitWord.jsx
└─ components/             # sections & UI
   ├─ Nav, Hero, Marquee, About, Competencies
   ├─ Work, ProjectCard, ProjectModal
   ├─ Blog, PostCard, PostModal
   └─ Contact
```

## Scripts
- `npm run dev` — serveur de développement
- `npm run build` — build de production
- `npm run preview` — prévisualise le build de production
- `npm run lint` — ESLint

## Accessibilité — `prefers-reduced-motion`

Si l'utilisateur a activé « réduire les animations » dans son système :
- toutes les animations Framer Motion sont neutralisées (`<MotionConfig reducedMotion="user">`) ;
- la scène 3D est figée (pas de flottement, pas d'entrée des lettres, pas de réaction
  à la souris) et son pixel ratio est abaissé ;
- le bandeau défilant (marquee) et le pulse sont arrêtés (CSS).

## Ajouter du contenu
- **Un projet** : ajoute un objet dans `src/data/projects.js` (voir le `@typedef Project`).
  Les champs `context`, `role`, `solution`, `result`, `learnings` sont optionnels et
  s'affichent comme une étude de cas dans la modale s'ils sont présents.
- **Un article** : ajoute un objet dans `src/data/posts.js` (voir le `@typedef Post`).

## Conventions
- Code et commentaires en **anglais** ; contenu visible en **français**.
- Les contenus restant à rédiger sont marqués `[À COMPLÉTER : ...]` dans le code.

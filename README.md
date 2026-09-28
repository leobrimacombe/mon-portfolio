# Portfolio - Léo Brimacombe

Portfolio personnel en React 19, Vite et Tailwind, avec une scène 3D interactive
(Three.js / React Three Fiber) et des animations Framer Motion.

- **Lien en ligne :** [leo-brimacombe.vercel.app](https://leo-brimacombe.vercel.app)
- **Version :** 8.0
- **Dernière mise à jour :** Septembre 2026

## Stack
- React 19 / Vite
- Tailwind CSS
- Three.js / React Three Fiber (scène 3D du héros, chargée à la demande)
- Framer Motion (animations + prise en charge de `prefers-reduced-motion`)
- Déploiement : Vercel (+ Vercel Analytics)

## Architecture

L'application est découpée en composants ; `App.jsx` ne fait que composer la page.

```
src/
├─ App.jsx                 # composition de la page (+ chargement différé de la 3D)
├─ main.jsx                # point d'entrée (MotionConfig + Analytics)
├─ index.css               # styles globaux, marquee
├─ data/
│  ├─ profile.js           # disponibilité et CV (affichés seulement s'ils sont renseignés)
│  ├─ projects.js          # données projets (+ @typedef, étude de cas, scope, compétences)
│  └─ competencies.js      # libellés des AC du référentiel
├─ lib/
│  └─ projectFilter.js     # recherche (sans accents) + filtre IUT / pro, fonctions pures
├─ hooks/
│  ├─ useProjectFilter.js  # état de la recherche et du filtre
│  ├─ useBodyScrollLock.js # verrou de scroll (modales / menu)
│  └─ use3D.js             # 3D activée ou non (WebGL, choix du visiteur, repli FPS)
├─ three/                  # scène 3D
│  ├─ Scene3D.jsx
│  ├─ InteractiveLetter.jsx
│  └─ SplitWord.jsx
└─ components/             # sections & UI
   ├─ Nav, Hero, Marquee, About
   ├─ Work, ProjectCard, ProjectModal
   ├─ Contact, Perf3DToggle, StaticTitle
   └─ ErrorBoundary        # affiche le titre statique si la 3D plante
public/
├─ images/                 # captures des projets (WebP)
├─ env/city-256.hdr        # éclairage de la scène 3D, hébergé localement
└─ og-image.png, robots.txt, sitemap.xml
```

## Scripts
- `npm run dev` : serveur de développement
- `npm run build` : build de production
- `npm run preview` : prévisualise le build de production
- `npm run lint` : ESLint
- `npm test` : tests (lanceur intégré de Node, aucune dépendance)

## Qualité

- **Tests** (`npm test`) : logique de recherche / filtre (casse, accents, portée) et
  intégrité du catalogue (identifiants uniques, champs requis, codes AC existants,
  images présentes dans `public/`).
- **Performance** : la scène 3D (three.js, ~290 Ko gzip) est un fichier séparé, chargé
  uniquement quand la 3D est affichée ; sur téléphone, où elle est désactivée par défaut,
  seul le bundle principal (~120 Ko gzip) est téléchargé. Captures en WebP.
- **Robustesse** : sans WebGL, la 3D ne démarre pas ; si elle plante (fichier bloqué,
  erreur de shader), un `ErrorBoundary` affiche le titre statique au lieu d'une page vide.
  Le repli automatique (FPS trop bas) ne vaut que pour la visite en cours ; seul le choix
  manuel du visiteur est mémorisé.

## Accessibilité
- Lien d'évitement vers le contenu, `h1` réel (le titre 3D n'existe qu'en WebGL),
  hiérarchie de titres sans saut.
- Projets ouvrables au clavier ; modale et lightbox avec piège de focus, `Échap` pour
  fermer, `←` / `→` pour changer d'image, retour du focus à l'élément d'origine.
- Contrastes conformes WCAG AA (y compris sur le fond bleu du contact).
- `prefers-reduced-motion` : animations Framer Motion neutralisées
  (`<MotionConfig reducedMotion="user">`), scène 3D figée, marquee arrêté.

## Ajouter du contenu
- **Disponibilité / CV** : renseigner `availability` et `cv` dans `src/data/profile.js`
  (le PDF va dans `public/`). Les liens apparaissent alors dans l'accueil, le menu et le
  pied de page.
- **Un projet** : ajouter un objet dans `src/data/projects.js` (voir le `@typedef Project`).
  `scope` (`'iut'` ou `'pro'`) alimente le filtre ; `vpnOnly: true` signale une démo
  accessible seulement via le VPN de l'IUT. Les champs `context`, `role`, `solution`,
  `result`, `learnings` sont optionnels et s'affichent comme une étude de cas.
  Lancer `npm test` ensuite : il vérifie les codes AC et les chemins d'images.

## Conventions
- Code et commentaires en **anglais** ; contenu visible en **français**.
- Les contenus restant à rédiger sont marqués `[À COMPLÉTER : ...]` dans le code.

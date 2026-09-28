# Portfolio PF6 — contexte projet (lu automatiquement par Claude)

Portfolio de Léo Brimacombe (BUT MMI), refondu pour une évaluation notée sur les
compétences « Développer » et « Entreprendre » niveau 3. Site **en français** ;
**code et commentaires en anglais**.

## Stack
React 19 + Vite + Tailwind + Three.js / React Three Fiber + Framer Motion. Déploiement Vercel.

## Architecture
- `src/App.jsx` — composition de la page ; `Scene3D` chargée en `React.lazy` dans un
  `ErrorBoundary` (repli : `StaticTitle`).
- `src/main.jsx` — point d'entrée (`MotionConfig reducedMotion="user"` + `<Analytics/>`).
- `src/data/` — `profile.js` (disponibilité + CV, masqués tant qu'ils valent `null`),
  `projects.js` (+ `@typedef Project`, étude de cas, `scope` iut/pro, `vpnOnly`,
  `competencies` AC, `SCOPE_LABELS`), `competencies.js` (libellés des AC du référentiel).
- `src/lib/projectFilter.js` — recherche (insensible aux accents) + filtre par `scope`, pur.
- `src/hooks/` — `useProjectFilter`, `useBodyScrollLock`, `use3D` (test WebGL, seul le
  choix manuel est persisté, repli FPS limité à la visite, `localStorage` protégé).
- `src/three/` — `Scene3D` (+ `PerformanceMonitor` → fallback auto ; HDR local
  `public/env/city-256.hdr`), `SplitWord`, `InteractiveLetter` (hero 3D).
- `src/components/` — Nav, Hero (h1 + CTA), Marquee (décoratif, `aria-hidden`), About,
  Work (recherche + filtre IUT / Pro & perso), ProjectCard (bouton étiré sur la ligne),
  ProjectModal (étude de cas, « Compétences prouvées », note VPN, lightbox accessible),
  Contact, Perf3DToggle, StaticTitle, ErrorBoundary.
- Tests : `src/**/*.test.js` (lanceur `node --test`, aucune dépendance).

## Conventions (IMPORTANT)
- Code/commentaires en **anglais**, contenu visible en **français**.
- Contenu à rédiger = `[À COMPLÉTER : ...]`. **N'inventer AUCUN fait** (projets, dates,
  missions de stage, résultats).
- **Git géré par l'utilisateur** : ne JAMAIS commit / stage / push / créer de branche.
  Faire les changements, montrer les diffs (`git diff` lecture seule), laisser l'utilisateur committer.
- Ne rien casser : `npm run build`, `npm run lint` et `npm test` doivent rester **verts**
  après chaque étape.
- Éviter les tics « AI slop » (cf. impeccable.style/slop) : pas de halos flous, de badges
  au-dessus des titres, de textes < 12 px, de rebonds au survol, de répétitions d'info.

## Commandes
`npm run dev` · `npm run build` · `npm run preview` · `npm run lint` · `npm test`

## État actuel
Refonte PF6 + passe qualité (sept. 2026) : hero avec h1 et CTA, 3D chargée à la demande
et protégée (WebGL, ErrorBoundary, HDR local), projets accessibles au clavier, filtre
IUT / Pro & perso, démos VPN signalées, contrastes AA, images en WebP, og-image, robots
et sitemap, tests. Blog et curseur custom : retirés (l'utilisateur n'en voulait pas).
Halos bleus et vignettage : retirés (effets décoratifs « slop »).

## À finir (TODO)
- [ ] `src/data/profile.js` : renseigner `availability` et `cv` (+ déposer le PDF dans `public/`).
- [ ] Études de cas à rédiger : Bobines, Site de gestion électrique, au moins un projet client.
- [ ] Projets clients : captures (avant / après pour Les 3 P'tits Cochons, avec mesures si possible).
- [ ] Vérifier le mapping `competencies` (Bobines ajouté : AC34.01 / 02 / 05, à confirmer).
- [ ] AC sans preuve : AC34.04, AC35.02, AC35.04 ; « Entreprendre » ne repose que sur
      BookApp. Le stage Dalim n'est pas (encore) dans `projects.js`.
- [ ] Beaba Bière : le site renvoyait une erreur HTTPS côté serveur (sept. 2026), vérifier avec le client.
- [ ] Jeu Unity : build WebGL jouable ou vidéo (pour l'instant, seul le dépôt).
- [ ] Hero 3D — relief des lettres : direction en cours dans `src/three/InteractiveLetter.jsx`.
  Approche actuelle = empilement de calques (faux relief qui s'écrase au survol).
  Alternative discutée = `<Text3D>` (géométrie extrudée réelle), nécessiterait de
  convertir la police `Michroma-Regular.ttf` en `.json` (typeface). Décision à trancher.

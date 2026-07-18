# Renoqo

> **Estimate. Compare. Build. — Estimez. Comparez. Réalisez.**

Renoqo est une plateforme internationale d’estimation du coût des travaux, de comparaison de prix et de mise en relation avec des professionnels. Ce dépôt contient son MVP frontend Next.js, initialement adapté au marché marocain.

## Démarrage

```bash
npm install
npm run dev
```

L’application est ensuite disponible sur `http://localhost:3000`. Définissez `NEXT_PUBLIC_SITE_URL` pour produire les URL SEO absolues de l’environnement cible.

## Validation

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run validate:performance
```

Le dernier script analyse les chunks JavaScript initiaux du build, les compresse en gzip et impose un budget maximal de **260 000 octets**.

## Architecture

- `src/app` : App Router, métadonnées et routes publiques ;
- `src/components/layout` : header responsive, navigation mobile et footer ;
- `src/components/home` : sections autonomes de la page d’accueil ;
- `src/components/ui` : primitives visuelles réutilisables ;
- `src/data` : données temporaires de services, villes, guides et FAQ ;
- `src/lib/estimate.ts` : moteur provisoire d’estimation typé ;
- `tests` : tests unitaires de la logique métier ;
- `scripts/check-performance.mjs` : contrôle du budget JavaScript.

Le calculateur multiplie un tarif indicatif au m² par la surface, puis applique des coefficients de ville et de finition. Une marge basse/haute produit une fourchette arrondie à 100 MAD. Ces coefficients et tous les prix sont des **données de démonstration**, clairement non contractuelles, destinées à être remplacées par un référentiel administrable.

## Prochaines étapes

- connecter prix, villes, catégories et guides à un CMS ou une base de données ;
- implémenter la demande de devis, l’authentification et la protection anti-abus ;
- définir le processus réel de vérification des professionnels ;
- compléter les pages légales avec des informations validées ;
- ajouter l’internationalisation et les marchés par pays selon la stratégie de [docs/homepage.md](docs/homepage.md).

Voir [docs/homepage.md](docs/homepage.md) pour la documentation fonctionnelle détaillée et [SECURITY.md](SECURITY.md) pour le signalement de vulnérabilités.

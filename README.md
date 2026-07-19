# Renoqo

Documentation fonctionnelle : [demande de devis](docs/quote-request.md) et [contrat API futur](docs/quote-request-api.md).

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

- `src/app` : App Router, métadonnées et routes publiques (un arbre par langue) ;
- `src/i18n` : locales, dictionnaires typés et génération des chemins localisés ;
- `src/components/layout` : header responsive, navigation mobile, sélecteur de langue et footer ;
- `src/components/home` : sections autonomes de la page d’accueil ;
- `src/components/pages` : implémentations de pages partagées entre les langues ;
- `src/components/ui` : primitives visuelles réutilisables ;
- `src/components/professional` : formulaire d’inscription professionnelle multiétape ;
- `src/data` : données temporaires (services, villes, guides, prix) et registre des routes ;
- `src/lib/estimate.ts` : moteur provisoire d’estimation typé ;
- `src/lib/professional-registration` : constantes métier, validation, brouillon et soumission ;
- `src/lib/metadata.ts` : canonical, hreflang, Open Graph et Twitter par langue ;
- `tests` : tests unitaires de la logique métier et de l’internationalisation ;
- `scripts/check-performance.mjs` : contrôle du budget JavaScript.

Le calculateur multiplie un tarif indicatif au m² par la surface, puis applique des coefficients de ville et de finition. Une marge basse/haute produit une fourchette arrondie à 100 MAD. La logique repose sur des identifiants et non sur les libellés traduits : les deux langues produisent exactement les mêmes chiffres, seul le formatage des nombres diffère (la monnaie reste MAD). Ces coefficients et tous les prix sont des **données de démonstration**, clairement non contractuelles, destinées à être remplacées par un référentiel administrable.

## Langues et routes

Le français est la langue par défaut et reste servi à la racine ; l’anglais est servi sous `/en`. Les slugs sont communs aux deux langues, donc aucune URL française n’a changé.

| Français | Anglais |
| --- | --- |
| `/` | `/en/` |
| `/calculateurs/` | `/en/calculateurs/` |
| `/prix/` | `/en/prix/` |
| `/guides/` | `/en/guides/` |
| `/services/renovation/` | `/en/services/renovation/` |
| `/villes/casablanca/` | `/en/villes/casablanca/` |
| `/pour-les-professionnels/` | `/en/pour-les-professionnels/` |

Le sélecteur de langue du header propose **Français**, **English** et **العربية — bientôt** (désactivé, sans traduction inventée). Chaque option est un vrai lien vers la page équivalente : le changement de langue conserve la page courante, change réellement l’URL, fonctionne sans JavaScript et retombe sur l’accueil si aucune contrepartie n’existe. La préférence est mémorisée dans `localStorage` (`renoqo_locale`) sans redirection automatique.

Voir [docs/internationalization.md](docs/internationalization.md) pour ajouter une traduction, une page ou une nouvelle langue.

## Inscription professionnelle

La page `/pour-les-professionnels/` présente l’offre Renoqo aux artisans et entreprises et recueille une **demande d’inscription** en six étapes (responsable, activité, métiers, zones, présentation, préférences) suivies d’un récapitulatif modifiable. Elle ne crée ni compte ni profil visible : chaque dossier est examiné.

Le brouillon est enregistré dans `localStorage` sans jamais y écrire les fichiers ni les identifiants administratifs (ICE, RC, identifiant fiscal, CNSS).

La soumission utilise un endpoint configurable :

```bash
NEXT_PUBLIC_PROFESSIONAL_REGISTRATION_ENDPOINT=https://api.renoqo.com/v1/professional-applications
```

Tant qu’il n’est pas configuré, le formulaire indique clairement que le service est indisponible, conserve le brouillon et permet de réessayer — il n’affiche jamais un faux succès et ne génère jamais de numéro de demande côté navigateur.

Voir [docs/professional-registration.md](docs/professional-registration.md) et [docs/professional-registration-api.md](docs/professional-registration-api.md).

## Prochaines étapes

- connecter prix, villes, catégories et guides à un CMS ou une base de données ;
- déployer l’API d’inscription professionnelle (Worker, D1, R2 privé, Turnstile) ;
- implémenter la demande de devis, l’authentification et la protection anti-abus ;
- définir le processus réel de vérification des professionnels ;
- compléter les pages légales avec des informations validées ;
- traduire l’arabe et activer le RTL selon [docs/internationalization.md](docs/internationalization.md) ;
- ouvrir les marchés par pays selon la stratégie de [docs/homepage.md](docs/homepage.md).

Voir [docs/homepage.md](docs/homepage.md) pour la documentation fonctionnelle détaillée, [docs/internationalization.md](docs/internationalization.md) pour l’internationalisation, [docs/professional-registration.md](docs/professional-registration.md) pour l’inscription professionnelle et [SECURITY.md](SECURITY.md) pour le signalement de vulnérabilités.

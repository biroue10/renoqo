# Page d’accueil Renoqo

## Structure et parcours

La page conduit l’utilisateur de la compréhension du service vers une première action : hero avec estimateur, marqueurs de confiance, fonctionnement, services populaires, calculateurs, prix indicatifs, villes, espace professionnel, engagements, guides, FAQ et appel à l’action. Le header fixe conserve les principales entrées et devient un menu accessible sur petit écran.

Les pages `/services/[service]`, `/villes/[ville]` et `/guides/[article]` disposent de contenus préparatoires distincts. `/calculateurs` et `/prix` servent de points d’entrée indexables. Les autres destinations du header et du footer retournent une page propre, sans lien cassé, en attendant leurs fonctionnalités.

## Composants

Les sections sont des composants serveur, sauf les trois interactions nécessaires : `MobileNavigation`, `QuickEstimateForm` et `FAQSection`. Les primitives `Container`, `Button`, `SectionHeading`, `Icon` et `ListingPage` assurent la cohérence. Les SVG sont intégrés sous forme de tracés légers ; aucune bibliothèque d’icônes ou image distante n’est chargée.

## Estimateur provisoire

`src/lib/estimate.ts` contient les tarifs de base, coefficients de finition et coefficients de ville. Le calcul est :

```text
base = tarif du projet × surface × coefficient de finition × coefficient de ville
fourchette = base × 0,88 à base × 1,18
```

Les bornes sont arrondies à 100 MAD. La saisie impose un projet, une ville, une finition et une surface comprise entre 1 et 10 000 m². Le résultat est annoncé par une région `aria-live` et reste explicitement indicatif. Aucune donnée n’est conservée ni envoyée.

## Données temporaires et backend

Les modules de `src/data` jouent le rôle de référentiel temporaire. Ils devront être alimentés par un CMS ou une API avec versionnage des prix, dates de validité, zones géographiques et sources internes. Le futur backend devra aussi gérer demandes de devis, consentement, limitation de débit, anti-spam, profils, sponsorisation explicitement signalée et états de vérification.

## Localisation et SEO international

Le MVP reste à la racine en français pour éviter une migration prématurée. Lors de l’ouverture multi-pays, la stratégie recommandée est :

1. introduire des segments pays stables (`/ma/`, `/fr/`, `/ci/`) ;
2. définir langue, devise, unités et référentiel de prix par marché ;
3. migrer la racine vers un sélecteur ou une redirection géographique non bloquante ;
4. ajouter des alternates `hreflang` réciproques et une URL `x-default` ;
5. conserver des contenus locaux utiles plutôt que dupliquer des pages par ville.

Les métadonnées utilisent `NEXT_PUBLIC_SITE_URL` comme base configurable. La FAQ visible alimente un JSON-LD `FAQPage`, accompagné de `Organization` et `WebSite`, sans avis ni notation fictive.

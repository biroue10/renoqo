# Guides SEO Renoqo

## Articles et intentions

| Sujet | URL française | Mot-clé principal FR | URL anglaise | Mot-clé principal EN |
| --- | --- | --- | --- | --- |
| Préparer un budget mesurable avant consultation | `/guides/budget-renovation-maroc/` | `budget rénovation Maroc` | `/en/guides/renovation-budget-morocco/` | `renovation budget Morocco` |
| Comparer le contenu réel de plusieurs offres | `/guides/comparer-devis-travaux-maroc/` | `comparer devis travaux Maroc` | `/en/guides/compare-contractor-quotes-morocco/` | `compare contractor quotes Morocco` |
| Expliquer les causes d’écart entre chantiers | `/guides/facteurs-prix-travaux-maroc/` | `prix travaux Maroc` | `/en/guides/factors-affecting-project-costs-morocco/` | `home improvement costs Morocco` |

Les mots-clés secondaires sont déclarés dans chaque fichier de contenu. Ils couvrent les variantes appartement/maison, estimation, coût au m², devis détaillé, matériaux, main-d’œuvre et facteurs de coût. Ils servent le sens des sections et ne font l’objet d’aucune densité imposée. Chaque article répond à une intention différente pour limiter la cannibalisation.

## Architecture

Les types stricts sont dans `src/content/guides/types.ts`. Les fichiers `src/content/guides/fr/` et `src/content/guides/en/` contiennent les six objets éditoriaux. `src/data/guides.ts` est le registre bilingue et relie chaque paire par une clé stable et un `counterpartSlug`.

Les routes dynamiques statiques `src/app/(fr)/guides/[slug]/page.tsx` et `src/app/(en)/en/guides/[slug]/page.tsx` génèrent uniquement les slugs enregistrés (`dynamicParams = false`). Le composant serveur `GuideArticlePage` produit le breadcrumb, les dates, le temps de lecture, le sommaire, les sections, les tableaux accessibles, la checklist, la FAQ, la méthodologie, les liens associés et les CTA. Aucun moteur Markdown ni composant client n’est ajouté.

## Sources, chiffres et mises à jour

Ces guides ne présentent aucun prix moyen ni chiffre de marché. Les tableaux financiers utilisent seulement des catégories qualitatives. Les scénarios sont explicitement fictifs, pédagogiques et non contractuels. Aucune entreprise, citation, certification, statistique ou règle n’est inventée.

Lorsqu’une future version nécessite un prix ou une règle actuelle :

1. privilégier une source officielle marocaine ou la source primaire compétente ;
2. enregistrer le titre, l’URL, l’organisme et la date de consultation ;
3. distinguer clairement donnée observée, estimation Renoqo et exemple ;
4. indiquer la date de mise à jour, le caractère indicatif et les facteurs de variation ;
5. relier la méthodologie de calcul et faire relire les affirmations réglementaires sensibles ;
6. mettre à jour `modifiedAt`, le contenu visible, les tests et le sitemap ensemble.

Les articles recommandent une validation auprès de professionnels. L’article sur les devis précise qu’il ne constitue pas un conseil juridique et renvoie aux sources officielles actuelles lorsque la question contractuelle est déterminante.

## Maillage, métadonnées et données structurées

Chaque article relie `/calculateurs/`, `/prix/`, `/demander-un-devis/`, les services rénovation, construction, peinture, plomberie et électricité, ainsi que `/pour-les-professionnels/`. Les équivalents anglais sont produits par `LocaleLink`. Les trois guides sont reliés entre eux par des ancres descriptives.

`buildGuideMetadata` génère un title et une description uniques, canonical avec slash final, alternates `fr-MA`, `en-MA`, `x-default`, Open Graph Article, Twitter Card et `robots: index, follow`. `GuideArticlePage` émet un `Article` et un `BreadcrumbList` JSON-LD correspondant au contenu visible, avec Renoqo comme publisher. Aucun avis, note, offre, produit ou HowTo n’est déclaré.

## Ajouter un futur guide

1. Ajouter une clé à `GuideKey` et créer un fichier complet dans chaque locale.
2. Déclarer les deux objets dans `guideArticles` et la carte dans `guides`.
3. Relier des `relatedKeys` pertinents et ajouter des liens contextuels descriptifs.
4. Utiliser un mot-clé principal inédit et vérifier l’intention distincte.
5. Définir des slugs localisés et réciproques, des dates ISO et un temps de lecture fondé sur la longueur réelle.
6. Ajouter au moins un tableau avec caption/en-têtes, une checklist, un scénario identifié, des conseils, un avertissement et une FAQ.
7. Lancer lint, typecheck, tests, build et validation de performance ; inspecter les fichiers générés, canonicals, hreflang et JSON-LD.

Le sitemap importe le registre et ajoute automatiquement chaque article, avec ses alternates. Le sélecteur de langue retrouve la paire par clé et change également le slug.

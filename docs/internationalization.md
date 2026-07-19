# Internationalisation

Renoqo est un site **exporté statiquement** (`output: "export"`). L’internationalisation repose donc
uniquement sur des dictionnaires TypeScript et sur l’arborescence de routes : aucun middleware,
aucune redirection serveur, aucune bibliothèque i18n externe.

## Langues

| Locale | Statut | Préfixe d’URL | `lang` HTML | `hreflang` |
| --- | --- | --- | --- | --- |
| `fr` | langue par défaut | aucun | `fr` | `fr-MA` |
| `en` | disponible | `/en` | `en` | `en-MA` |
| `ar` | annoncée, non traduite | — | — | — |

Le français reste la langue principale : il est servi à la racine, il est le `x-default` des
alternates, et aucune URL française existante n’a changé.

L’arabe apparaît dans le sélecteur sous la forme `العربية — bientôt`, en `aria-disabled="true"`,
sans lien et sans traduction inventée.

## Structure des URL

Les slugs sont **partagés** entre les langues : seule la langue du contenu change. Cela préserve le
SEO français existant et garantit qu’une page a toujours une contrepartie exacte.

```
https://renoqo.com/services/renovation/      → français
https://renoqo.com/en/services/renovation/   → anglais
```

## Fichiers

```
src/i18n/
├── config.ts            # Locale, LOCALES, DEFAULT_LOCALE, tags BCP 47, clé localStorage
├── types.ts             # Dictionary = typeof fr (le français est la forme de référence)
├── get-dictionary.ts    # getDictionary(locale) — usage serveur uniquement
├── locale-path.ts       # localizedPath / stripLocale / switchLocalePath / localizedUrl
└── dictionaries/
    ├── fr.ts            # référence
    └── en.ts            # typé `: Dictionary` → une clé manquante casse le typecheck

src/data/routes.ts       # registre unique des chemins (routing + switcher + sitemap)
src/lib/metadata.ts      # buildMetadata / alternatesFor / absoluteUrl
src/components/ui/LocaleLink.tsx        # <Link> qui préfixe automatiquement
src/components/layout/LanguageSwitcher.tsx
src/components/layout/SiteLayout.tsx    # chrome partagé, porte l’attribut lang
```

### Arborescence App Router

Deux **root layouts** via des route groups, ce qui permet d’émettre le bon `<html lang>` dans le HTML
exporté plutôt que de le corriger en JavaScript après chargement :

```
src/app/
├── (fr)/layout.tsx          → <html lang="fr">, routes à la racine
│   ├── page.tsx  calculateurs/  prix/  guides/  [...slug]/
├── (en)/en/layout.tsx       → <html lang="en">, routes sous /en
│   ├── page.tsx  calculateurs/  prix/  guides/  [...slug]/
├── not-found.tsx            # 404 bilingue (l’export ne produit qu’un seul 404.html)
├── sitemap.ts               # généré depuis src/data/routes.ts
└── robots.txt
```

Chaque page est rendue par un composant partagé (`src/components/pages/`) auquel on passe la locale,
il n’y a donc pas de duplication de logique entre les deux arbres.

## Règles de développement

1. **Aucun texte d’interface en dur dans un composant.** Tout passe par le dictionnaire.
2. **Ne jamais concaténer `/en` à la main.** Utiliser `LocaleLink` ou `localizedPath(locale, path)`.
3. **Les identifiants restent en français** (slugs, ids, clés) ; seuls les libellés sont traduits.
   Le moteur de calcul travaille sur des `id`, jamais sur du texte affiché.
4. **Les composants serveur reçoivent `locale` + `d` (le dictionnaire).** Les composants client
   (`LanguageSwitcher`, `MobileNavigation`, `FAQSection`, `QuickEstimateForm`) reçoivent uniquement
   les libellés dont ils ont besoin, en props : une seule langue arrive donc dans le navigateur.

## Ajouter une traduction

1. Ajouter la clé dans `src/i18n/dictionaries/fr.ts`.
2. Le typecheck échoue immédiatement pour `en.ts` : ajouter la traduction.
3. `tests/dictionaries.test.ts` compare récursivement les clés des deux locales et échoue si une
   traduction manque ou si une chaîne est vide.

## Ajouter une page

1. Ajouter le chemin (sans préfixe de langue) dans `src/data/routes.ts`.
   - `CATCH_ALL_PATHS` suffit pour une page de contenu générique ;
   - `DEDICATED_PATHS` si la page a son propre fichier de route.
2. Ajouter son titre traduit dans `staticPages` (fr et en).
3. Pour une route dédiée, créer le fichier dans `(fr)/` **et** dans `(en)/en/`, en réutilisant le même
   composant de page et en changeant uniquement `const locale`.

Le sitemap, `generateStaticParams()` et le repli du sélecteur de langue se mettent à jour
automatiquement à partir du registre.

## Ajouter l’arabe plus tard

1. Ajouter `"ar"` à `LOCALES` et le retirer de `PLANNED_LOCALES` dans `config.ts`.
2. Renseigner `LOCALE_TAGS.ar = "ar-MA"` et `OG_LOCALES.ar = "ar_MA"`.
3. Créer `dictionaries/ar.ts` typé `: Dictionary` (le typecheck liste les clés manquantes).
4. Créer `src/app/(ar)/ar/` en copiant `(en)/en/` et en changeant `const locale`.
5. Prévoir le RTL : `dir="rtl"` dans `SiteLayout` quand la locale est arabe, plus les ajustements CSS
   logiques (`margin-inline`, `padding-inline`…).

Sitemap, hreflang, switcher et repli suivront automatiquement.

## Métadonnées et SEO

`buildMetadata(locale, path, { title, description })` produit pour chaque page :

- un `title` et une `description` traduits ;
- une `canonical` absolue avec slash final (cohérente avec `trailingSlash: true`) ;
- le cluster `hreflang` complet : `fr-MA`, `en-MA` et `x-default` (français) ;
- Open Graph (`og:locale` = `fr_MA` / `en_MA`) et Twitter Card traduits.

Les données JSON-LD de la page d’accueil (`Organization`, `WebSite`, `FAQPage`) portent
`inLanguage: "fr-MA"` ou `"en-MA"`, une URL correspondant à la langue et des questions traduites.
Aucune note ni aucun avis fictif n’est ajouté.

## Sitemap

`src/app/sitemap.ts` génère `sitemap.xml` depuis `SITEMAP_PATHS`, en émettant chaque chemin dans les
deux langues avec ses `xhtml:link` alternates. `export const dynamic = "force-static"` est requis
sous `output: "export"`.

Sont exclus : `/connexion` (aucun contenu indexable) et les pages de guides encore vides.

## Sélecteur de langue

- L’**URL est la source de vérité**. Chaque entrée est un vrai lien vers la page équivalente, donc le
  changement de langue fonctionne sans JavaScript et reste crawlable.
- `localStorage` (`renoqo_locale`) mémorise seulement la préférence ; aucune redirection automatique
  n’est effectuée, ce qui évite toute boucle.
- Accessibilité : `aria-expanded` sur le déclencheur, `aria-current="true"` sur la langue active,
  `aria-disabled="true"` sur l’arabe, fermeture par `Escape` avec retour du focus, fermeture au clic
  extérieur, focus visible hérité du `:focus-visible` global.
- Si l’URL courante n’a pas de contrepartie, `switchLocalePath` renvoie vers l’accueil de la langue
  demandée plutôt que vers un lien mort.

## Tests

| Fichier | Couverture |
| --- | --- |
| `tests/locale-path.test.ts` | génération des chemins, aller-retour fr↔en, ancres, repli accueil |
| `tests/dictionaries.test.ts` | parité récursive des clés fr/en, chaînes non vides, absence de copie française côté anglais |
| `tests/language-switcher.test.tsx` | liens, `aria-current`, arabe désactivé, `Escape`, `localStorage` |
| `tests/quick-estimate-form.test.tsx` | libellés, options, messages de validation, résultats identiques dans les deux langues |
| `tests/localized-links.test.tsx` | tous les liens internes anglais restent sous `/en`, cohérence du registre de routes |
| `tests/estimate.test.ts` | moteur de calcul, formatage MAD par locale |

## Contraintes de l’export statique

- Pas de middleware, pas de Server Actions, pas d’API Routes nécessaires au rendu.
- Toutes les routes des deux langues sont générées au build (`generateStaticParams`,
  `dynamicParams = false`).
- Un seul `404.html` est produit pour tout le site : la page 404 s’adresse donc au lecteur dans les
  deux langues.
- Toute route de métadonnées (comme `sitemap.ts`) doit déclarer `export const dynamic = "force-static"`.

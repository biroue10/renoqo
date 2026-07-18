# Renoqo

> **Estimate. Compare. Build.**

Renoqo est une plateforme internationale d'estimation du coût des travaux de rénovation,
de découverte de professionnels du bâtiment et de demande de devis.

## Vision

Renoqo est conçu dès le départ comme un produit **international** : architecture multi-pays,
multi-devises et multi-langues. Le **marché initial est le Maroc**, qui sert de terrain de
validation avant l'ouverture progressive à d'autres pays.

## Fonctionnalités prévues

- **Estimation du prix des travaux** — fourchettes de coûts par type de chantier, basées sur des
  référentiels locaux.
- **Calculateurs** — surfaces, quantités de matériaux, budgets par poste.
- **Comparaison des professionnels** — profils, spécialités, zones d'intervention, avis.
- **Demandes de devis** — mise en relation entre particuliers et professionnels qualifiés.
- **Gestion multi-pays** — devises, langues, unités et référentiels de prix propres à chaque marché.

## Statut

🚧 **Développement initial.** Le dépôt contient pour l'instant la structure de base ; aucune
application n'est encore implémentée.

## Structure du dépôt

```
renoqo/
├── .github/
│   ├── ISSUE_TEMPLATE/   # modèles d'issues
│   └── workflows/        # pipelines CI/CD
├── docs/                 # documentation technique et produit
├── scripts/              # scripts utilitaires et d'automatisation
├── src/                  # code source de l'application
├── tests/                # tests automatisés
├── .editorconfig         # conventions d'édition
├── .env.example          # variables d'environnement (valeurs fictives)
├── .gitignore
├── README.md
└── SECURITY.md           # politique de sécurité
```

## Prérequis

- Git
- Un environnement Linux, macOS ou Windows (WSL recommandé)
- Les dépendances applicatives seront précisées lors du choix de la stack

## Installation

_À compléter._ Cette section documentera la procédure d'installation dès que la stack technique
sera arrêtée.

## Développement

_À compléter._ Cette section documentera le lancement en local, les conventions de code et la
procédure de test.

## Contribution

- Travailler sur une branche dédiée créée depuis `develop`, jamais directement sur `main`.
- Utiliser des messages de commit au format [Conventional Commits](https://www.conventionalcommits.org/)
  (`feat:`, `fix:`, `chore:`, `docs:`…).
- Ouvrir une Pull Request vers `develop` et attendre une revue avant fusion.
- Garder l'arbre propre : pas de fichiers générés, pas de dépendances commitées.

## Sécurité

> ⚠️ **Aucun secret ne doit être ajouté au dépôt.** Les tokens, mots de passe, clés d'API et clés
> privées se configurent exclusivement via des variables d'environnement locales ou les secrets du
> gestionnaire de CI. `.env.example` ne contient que des valeurs fictives.

Pour signaler une vulnérabilité, voir [SECURITY.md](SECURITY.md).

---

**Renoqo — Estimate. Compare. Build.**

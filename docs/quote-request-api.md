# Contrat futur de l’API de demande de devis

## Architecture cible

- Cloudflare Worker : terminaison HTTPS, validation, Turnstile, limitation de fréquence et orchestration.
- D1 : demandes, versions, statuts, consentements horodatés et références de fichiers.
- R2 privé : pièces jointes, sans URL publique permanente.
- Service email : accusés de réception et notifications transactionnelles.
- Moteur de notification : candidats filtrés par métier et zone.
- Journal d’audit séparé : événements de sécurité et changements de statut.

Aucune ressource ni aucun identifiant Cloudflare n’est créé par le frontend actuel.

## Requête

`POST /api/quote-requests`, ou l’URL absolue configurée dans `NEXT_PUBLIC_QUOTE_REQUEST_ENDPOINT`.

Contenu `multipart/form-data` :

- `request` : JSON conforme à `QuotePayload`, incluant locale, date client, honeypot et éventuellement token Turnstile ;
- `documents` : zéro à dix fichiers.

Le Worker doit ignorer les identifiants ou statuts proposés par le client. Il génère son propre identifiant opaque.

## Réponses

Succès réel :

```json
{ "requestId": "server-issued-id", "status": "submitted" }
```

Erreurs recommandées : `400` requête incorrecte, `403` origine/Turnstile, `409` doublon, `413` taille excessive, `422` validation métier, `429` fréquence et `500` erreur interne. Une erreur de validation peut inclure un objet `fieldErrors`, sans réafficher de donnée sensible.

Statuts autorisés : `draft`, `submitted`, `under_review`, `matched`, `shared_with_professionals`, `quotes_received`, `closed`, `cancelled`, `rejected`, `duplicate`.

## Validation et sécurité serveur

Le Worker doit valider et normaliser chaque propriété, plafonner la taille avant parsing, vérifier `Origin`, contrôler Turnstile côté serveur, limiter IP/session et rechercher un doublon avec une empreinte réduite. Les textes sont stockés comme données, jamais interprétés comme HTML ou commande.

Pour chaque fichier : contrôler signature binaire, MIME, extension, taille unitaire et totale ; renommer avec un identifiant serveur ; analyser avant mise à disposition ; stocker dans R2 privé ; fournir seulement des URL temporaires aux rôles autorisés. Les fichiers suspects passent en quarantaine.

## Rétention, suppression et partage

Définir avant production une durée par statut, un processus d’effacement utilisateur, la purge coordonnée D1/R2, la durée des journaux et le traitement des sauvegardes. Ne partager que les champs nécessaires au professionnel sélectionné. L’adresse complète ne doit être transmise qu’aux professionnels autorisés lorsqu’une visite ou l’exécution l’exige.

Les consentements obligatoires doivent être enregistrés avec version des documents, date serveur et preuve technique proportionnée. Le marketing reste indépendant et révocable.

## Notifications et audit

Journaliser création, validation, échec Turnstile, limitation, doublon, changement de statut, accès aux fichiers, partage et suppression. Ne jamais journaliser les fichiers, descriptions complètes, tokens ou secrets. Les emails ne doivent annoncer une soumission que lorsque D1 a confirmé l’écriture.

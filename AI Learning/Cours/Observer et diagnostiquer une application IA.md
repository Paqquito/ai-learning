# Observer et diagnostiquer une application IA

## Ce que tu sauras faire

Distinguer métriques, journaux et traces, puis rechercher la cause d'un incident sans tout attribuer au modèle. Prérequis : [[Comprendre une API de modèle]], [[Appeler des outils avec un modèle]] et [[Déployer une IA avec des données confidentielles]].

## Observer le système, pas seulement sa réponse

Une métrique résume une mesure dans le temps : nombre d'erreurs, durée, requêtes en cours. Un journal décrit un événement : échec de validation, refus d'accès, fin d'un appel. Une trace relie les opérations d'une requête à travers les composants. Les spans d'une trace représentent des opérations avec un début, une fin et des attributs.

OpenTelemetry fournit des conventions et mécanismes pour instrumenter, collecter et exporter ces signaux. Ce n'est pas à lui seul le stockage, l'interface de consultation ou une garantie de confidentialité. Le lieu d'export et les données envoyées doivent être définis.

## Suivre une requête documentaire

Une trace peut comporter des opérations « authentifier », « rechercher », « générer », « valider » et « restituer ». Conserver un identifiant de corrélation permet de rapprocher les événements. Le texte brut de la demande n'est pas nécessaire pour calculer sa durée ou retrouver le composant en erreur.

Dans un système agentique, ajouter les appels d'outils et leurs statuts permet de repérer une boucle ou une reprise répétée. Enregistrer la version du modèle, du prompt et des outils aide à comparer deux comportements. Éviter les secrets et le contenu documentaire dans les attributs par défaut ; prévoir une procédure encadrée si un diagnostic exige des données plus détaillées.

## Ne pas additionner des temps qui se chevauchent

Supposons une authentification de 100 ms, deux recherches parallèles de 800 et 1 200 ms, une génération de 1 500 ms et une validation de 200 ms. Si la génération attend les deux recherches, le chemin séquentiel critique vaut environ 3 000 ms : 100 + 1 200 + 1 500 + 200, hors surcoûts. Additionner tous les spans donnerait 3 800 ms et compterait deux fois une partie de l'attente.

Cet exemple montre pourquoi une durée globale et les durées des composants sont complémentaires. Une file d'attente avant la génération peut expliquer une lenteur alors que le calcul du modèle lui-même n'a pas changé.

## Quatre familles d'indicateurs

- Disponibilité : requêtes réussies, refus et erreurs techniques distingués.
- Performance : délai complet, premier token si streaming, percentiles et concurrence.
- Qualité métier : corrections humaines, sorties invalides, sources manquantes, actions erronées.
- Ressources : mémoire, temps de calcul, consommation d'API et coût par résultat utile.

Un système répondant rapidement HTTP 200 peut produire des réponses médiocres. À l'inverse, un refus d'accès correct ne doit pas être interprété automatiquement comme une panne. Les définitions doivent être explicites avant d'utiliser les compteurs pour décider.

## Exercice : isoler une régression

Après une mise à jour, la latence double. Les traces montrent que la génération reste à 1,5 seconde, mais que la recherche passe de 0,4 à 2 secondes. Proposer trois vérifications et une mesure de repli. Ne pas changer le modèle sans autre indice.

> [!answer]- Repères de correction
> Vérifier la version de l'index et sa taille, les filtres ou requêtes ajoutés, ainsi que la charge et les ressources du service de recherche. Examiner aussi le réseau selon les traces. Comparer à la version précédente sur le même jeu de requêtes et prévoir son rétablissement si approprié. Mesurer la qualité autant que la latence avant de réduire arbitrairement le nombre de passages.

## Sources et portée

Sources consultées le 12 novembre 2026. Les durées et le diagnostic sont des exemples originaux ; aucune télémétrie n'est ajoutée à cette application pédagogique.

- [OpenTelemetry — Signaux](https://opentelemetry.io/docs/concepts/signals/)
- [OpenTelemetry — Traces et spans](https://opentelemetry.io/docs/concepts/signals/traces/)

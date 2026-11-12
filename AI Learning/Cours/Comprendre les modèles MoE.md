# Comprendre les modèles MoE

## Ce que tu sauras faire

Distinguer paramètres totaux, paramètres actifs et besoins matériels, sans confondre experts internes et agents. Prérequis : [[Comprendre le Transformer et son attention]] et [[Estimer la mémoire et comprendre la quantification]].

## Répartir certains calculs entre experts

Dans un Transformer MoE, Mixture of Experts, certains réseaux denses sont remplacés par plusieurs sous-réseaux, appelés experts. Un routeur choisit les experts utilisés pour un token et combine leurs sorties. Il reste des composants partagés, notamment selon l'architecture l'attention et les embeddings.

Le mot « expert » ne garantit pas une spécialité métier lisible. Il s'agit d'une partie du réseau apprise. Un expert n'est pas un agent autonome avec ses outils, son historique et son objectif. Ajouter un serveur MCP ne revient donc pas à ajouter un expert MoE.

Dans une architecture à routage parcimonieux, un petit nombre d'experts est activé pour chaque token. Cela permet d'accroître la capacité totale sans exécuter tous les paramètres à chaque position. L'entraînement doit notamment éviter que le routeur concentre presque tout le travail sur quelques experts.

## Un calcul fictif pour éviter une erreur fréquente

Imaginons 2 milliards de paramètres partagés et huit experts de 1 milliard chacun, avec deux experts actifs par token. Le total est 10 milliards. Le calcul mobilise, dans cette simplification, 4 milliards de paramètres par token : les 2 milliards partagés plus deux experts. Cela ne signifie pas qu'un seul ensemble fixe de 4 milliards suffit pour toutes les requêtes.

À 4 bits idéaux par paramètre, stocker les 10 milliards demanderait environ 5 Go décimaux pour les poids seuls. Charger seulement 2 Go sous prétexte que 4 milliards sont actifs serait un calcul incomplet. Les experts sélectionnés changent avec les tokens ; les poids nécessaires doivent rester accessibles en mémoire, sur d'autres appareils ou via un mécanisme de transfert.

## La vitesse dépend du système

Le routage, la répartition de charge et les échanges entre appareils peuvent limiter les gains. Si les experts sont répartis sur plusieurs GPU, l'interconnexion compte. Si certains poids sont déplacés depuis une mémoire plus lente, le coût des transferts peut dominer. Un nombre de paramètres actifs plus petit ne donne pas directement un débit en tokens par seconde.

Pour lire une fiche de modèle, relever paramètres totaux et actifs, nombre d'experts, experts sélectionnés par token, format des poids et moteur compatible. Pour un service accessible uniquement par API, demander les limites et mesurer la qualité et la latence observables ; inutile de prétendre déduire son architecture physique à partir du nom.

## Exemple de décision

Pour classer des demandes, comparer un petit modèle dense et un MoE sur les mêmes données. Le MoE peut être meilleur, moins bon ou simplement plus coûteux à exploiter dans ce contexte. La décision relève de [[Choisir un modèle par la mesure]], pas d'un classement automatique des familles d'architectures.

## Exercice : démêler trois affirmations

Examiner ces propositions : « chaque expert est un spécialiste métier certifié » ; « deux experts actifs impliquent que seuls deux experts doivent être stockés » ; « l'infrastructure doit rendre accessibles les experts susceptibles d'être sélectionnés ». Justifier chaque réponse.

> [!answer]- Repères de correction
> Les deux premières affirmations sont fausses en général. Le routage appris n'apporte ni certification métier ni choix permanent de deux experts. La troisième exprime la contrainte utile, avec différentes stratégies possibles de mémoire et de répartition. Il faut aussi compter les composants partagés et les caches.

## Sources et portée

Sources consultées le 12 novembre 2026. L'exemple numérique ne correspond à aucun modèle commercial.

- [Hugging Face — Mixture of Experts Explained](https://huggingface.co/blog/moe)
- [Hugging Face — MoE dans Transformers](https://huggingface.co/blog/moe-transformers)

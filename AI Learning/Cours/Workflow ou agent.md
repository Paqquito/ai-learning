# Workflow ou agent

Dans cette base, un **workflow** suit un enchaînement prévu par le logiciel. Un **agent** peut choisir dynamiquement des étapes ou des outils pour atteindre un objectif, dans des limites imposées par l'application. Ces termes varient selon les produits.

## Deux solutions au même besoin

Pour orienter une demande : lire le texte, proposer une catégorie, contrôler la réponse, puis demander une validation. Le chemin est connu : c'est un workflow, même si un modèle intervient.

Pour enquêter sur un incident : choisir les journaux pertinents, formuler une hypothèse, consulter une autre source et s'arrêter lorsque les éléments suffisent. Le chemin peut demander une sélection dynamique d'actions.

## Exercice de choix

Avant d'ajouter de l'autonomie, écris les décisions que le logiciel peut prendre avec des règles explicites. Pour les décisions restantes, précise les informations manquantes, les actions autorisées et une limite de temps ou d'étapes.

L'autonomie ajoute des cas à tester. Une boucle agentique doit prévoir ses conditions d'arrêt et ses échecs. [[Le rôle du harness]] traite cette organisation ; [[Évaluer une intégration]] permet de comparer les résultats.

## Source

[Building effective agents — Anthropic](https://www.anthropic.com/engineering/building-effective-agents), 19 décembre 2024, consulté le 12 novembre 2026. Distinction architecturale ; les outils cités dans l'article ne constituent pas une recommandation actuelle.

# Workflow ou agent

Dans cette base, un **workflow** suit un enchaînement prévu par le logiciel. Un **agent** peut choisir dynamiquement des étapes ou des outils pour atteindre un objectif, dans des limites imposées par l'application. Ces termes varient selon les produits.

## Deux solutions au même besoin

| Question | Workflow | Agent |
| --- | --- | --- |
| Qui définit le chemin ? | Le logiciel à l'avance | Le modèle choisit certaines étapes |
| Exemple | Classer, vérifier, faire valider | Explorer plusieurs sources selon les résultats |
| Contrôle essentiel | Chaque transition et ses erreurs | Outils autorisés, budget et arrêt |
| À justifier | Les étapes du processus | La valeur ajoutée de l'autonomie |

Pour orienter une demande : lire le texte, proposer une catégorie, contrôler la réponse, puis demander une validation. Le chemin est connu : c'est un workflow, même si un modèle intervient.

Pour enquêter sur un incident : choisir les journaux pertinents, formuler une hypothèse, consulter une autre source et s'arrêter lorsque les éléments suffisent. Le chemin peut demander une sélection dynamique d'actions.

## Exercice de choix

Avant d'ajouter de l'autonomie, écris les décisions que le logiciel peut prendre avec des règles explicites. Pour les décisions restantes, précise les informations manquantes, les actions autorisées et une limite de temps ou d'étapes.

L'autonomie ajoute des cas à tester. Une boucle agentique doit prévoir ses conditions d'arrêt et ses échecs. [[Le rôle du harness]] traite cette organisation ; [[Évaluer une intégration]] permet de comparer les résultats.

> [!answer]- Repères de correction
> **Pour le tri support**, un workflow suffit : vérifier les champs, demander une catégorie, valider le format, envoyer les ambiguïtés à un humain, puis créer un ticket après approbation. La liste des catégories et les règles d'arrêt sont définies par le logiciel.
>
> **Pour une enquête**, un agent peut être utile si la source à consulter dépend des résultats précédents. Autorise seulement la lecture de journaux et de documentation filtrés par les droits de l'utilisateur.
>
> **Limites pédagogiques possibles** : cinq appels d'outils ou deux minutes, arrêt si la question est résolue, et transmission à un humain si les preuves manquent ou si un outil échoue. Ces nombres doivent être validés selon le besoin réel.
>
> **Critère de réussite** : expliquer quelle décision exige de l'autonomie. Ajouter un agent au seul motif qu'un LLM est utilisé n'est pas une justification.

## Source

[Building effective agents — Anthropic](https://www.anthropic.com/engineering/building-effective-agents), 19 décembre 2024, consulté le 12 novembre 2026. Distinction architecturale ; les outils cités dans l'article ne constituent pas une recommandation actuelle.

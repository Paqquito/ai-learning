# Comprendre un LLM

Un grand modèle de langage apprend des régularités dans des données. Pour un modèle génératif autorégressif, l'inférence consiste à produire des tokens successifs à partir du contexte disponible. Un token peut être un morceau de mot, un signe ou une autre unité issue de la tokenisation.

## Trois distinctions utiles

- **Entraînement** : ajuster les paramètres du modèle.
- **Inférence** : utiliser ses paramètres pour produire une sortie.
- **Contexte** : contenu fourni à cette génération ; il ne constitue pas à lui seul un réentraînement.

Une sortie plausible peut être fausse. Une syntaxe JSON valide ne garantit ni la bonne catégorie ni l'exactitude d'un fait. La validation doit donc porter sur le format et sur le résultat métier.

## Expérience

Pour classer des demandes, écris une instruction contenant la tâche, les catégories autorisées et deux exemples. Fais varier les formulations sur les mêmes demandes de test. Note les changements, sans considérer une seule bonne réponse comme une preuve de fiabilité.

Voir [[Évaluer une intégration]] et [[Du modèle au système]].

## Source

[Text generation — Hugging Face Transformers](https://huggingface.co/docs/transformers/llm_tutorial), consulté le 12 novembre 2026. Introduction conceptuelle ; aucune API de version particulière n'est requise pour cet exercice.

# Évaluer une intégration

Une démonstration réussie ne suffit pas. Commence par définir la tâche, les entrées acceptées et les erreurs importantes. Compare ensuite la solution à une référence simple : règles ou processus manuel.

## Construire le test

Conserve des exemples représentatifs pour régler la solution et un autre ensemble pour l'évaluer. Inclue des formulations ambiguës, des données manquantes et des catégories rares. Ne règle pas ton prompt sur le test final.

## Mesurer plusieurs choses

- **Qualité métier** : catégorie correcte, champ exact, information inventée.
- **Validité technique** : format accepté, réponse dans les délais.
- **Exploitation** : coût, latence, reprises et taux de validation humaine.

Pour une classification déséquilibrée, un bon taux global peut masquer l'échec sur une catégorie rare. Regarde la matrice de confusion, la précision et le rappel par classe. Définis les seuils avec le besoin métier, sans transformer un chiffre pédagogique en norme universelle.

## Expérience originale

Dans le TP, compare tes règles et les sorties d'un modèle sur les mêmes demandes. Range les erreurs par cause : ambiguïté, consigne, données absentes ou limite du modèle. Propose une modification et teste-la sur de nouveaux exemples.

Voir [[Comprendre un LLM]] et [[Workflow ou agent]].

## Source

[Metrics and scoring — scikit-learn](https://scikit-learn.org/stable/modules/model_evaluation.html), consulté le 12 novembre 2026. Référence pour les métriques ; le protocole métier proposé ici est pédagogique.

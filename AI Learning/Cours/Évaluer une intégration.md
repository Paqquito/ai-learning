# Évaluer une intégration

Une démonstration réussie ne suffit pas. Commence par définir la tâche, les entrées acceptées et les erreurs importantes. Compare ensuite la solution à une référence simple : règles ou processus manuel.

## Construire le test

Conserve des exemples représentatifs pour régler la solution et un autre ensemble pour l'évaluer. Inclue des formulations ambiguës, des données manquantes et des catégories rares. Ne règle pas ton prompt sur le test final.

## Mesurer plusieurs choses

| Dimension | Exemple de mesure | Question à résoudre |
| --- | --- | --- |
| Métier | Erreurs par catégorie | La tâche est-elle bien réalisée ? |
| Technique | Sorties invalides et timeouts | Le système respecte-t-il son contrat ? |
| Exploitation | Latence et temps humain | Le gain reste-t-il utile en conditions réelles ? |

- **Qualité métier** : catégorie correcte, champ exact, information inventée.
- **Validité technique** : format accepté, réponse dans les délais.
- **Exploitation** : coût, latence, reprises et taux de validation humaine.

Pour une classification déséquilibrée, un bon taux global peut masquer l'échec sur une catégorie rare. Regarde la matrice de confusion, la précision et le rappel par classe. Définis les seuils avec le besoin métier, sans transformer un chiffre pédagogique en norme universelle.

## Expérience originale

Dans le TP, compare tes règles et les sorties d'un modèle sur les mêmes demandes. Range les erreurs par cause : ambiguïté, consigne, données absentes ou limite du modèle. Propose une modification et teste-la sur de nouveaux exemples.

Voir [[Comprendre un LLM]] et [[Workflow ou agent]].

> [!answer]- Repères de correction
> **Protocole** : figer les catégories et leurs références, séparer les données de mise au point du test final, puis exécuter règles et modèle sur exactement le même test.
>
> **Exemple fictif de résultat**, non mesuré : sur 20 demandes, les règles en classent correctement 14 et le modèle 17. Les exactitudes sont 14 / 20 = 70 % et 17 / 20 = 85 %. Le modèle peut pourtant rater les deux incidents critiques : le meilleur taux global ne suffit donc pas.
>
> **Analyse** : une demande multi-sujet relève de l'ambiguïté ; une catégorie omise du prompt relève de la consigne ; une référence de facture absente relève des données. Une mauvaise réponse malgré les informations utiles peut révéler une limite du modèle.
>
> **Modification testable** : ajouter une catégorie à clarifier et une règle de transfert humain. Mettre au point ce changement sur le jeu de développement, puis mesurer sur de nouvelles demandes tenues à part, en séparant qualité, taux d'abstention, latence et charge humaine.
>
> **Autoévaluation** : ta comparaison doit conserver les échecs, pas seulement les exemples réussis. Les six demandes du laboratoire constituent un test de fonctionnement, pas une preuve statistique.

## Source

[Metrics and scoring — scikit-learn](https://scikit-learn.org/stable/modules/model_evaluation.html), consulté le 12 novembre 2026. Référence pour les métriques ; le protocole métier proposé ici est pédagogique.

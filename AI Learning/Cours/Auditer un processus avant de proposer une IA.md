# Auditer un processus avant de proposer une IA

## Ce que tu sauras faire

Transformer une demande vague en problème mesurable et proposer un premier périmètre d'expérimentation. Prérequis : [[Workflow ou agent]] et [[Choisir un modèle par la mesure]].

## Commencer par le résultat attendu

« Nous voulons des agents » nomme une solution possible. « Réduire le délai de préparation d'une réponse sans accroître les erreurs » décrit un besoin. L'audit commence par les entrées, les décisions, les responsables et les sorties du processus actuel.

Observer un dossier normal, un dossier incomplet et un cas d'exception. Pour chacun, relever les outils consultés, les attentes entre équipes, les ressaisies et les critères de validation. Une tâche peut sembler longue alors que l'essentiel du délai vient d'une attente humaine ou d'un système inaccessible.

## Une grille d'entretien utilisable

- Quel événement déclenche le processus, et qu'est-ce qui marque sa fin ?
- Quelles informations sont disponibles au moment de la décision ?
- Qui décide et qui corrige une erreur ?
- Quels cas peuvent être décrits par une règle déterministe ?
- Quels volumes, pointes et exceptions observe-t-on réellement ?
- Où les données peuvent-elles circuler, et quelles opérations sont autorisées ?
- Quelle référence mesurée permettra de juger l'amélioration ?

Demander des exemples autorisés ou synthétiques, pas une exportation indiscriminée des dossiers. La connaissance métier reste nécessaire pour interpréter les exceptions et les erreurs.

## Comparer plusieurs interventions

Une amélioration de formulaire peut réduire les dossiers incomplets. Une règle peut orienter des catégories simples. Une recherche documentaire peut aider à retrouver les procédures. Un modèle peut proposer une classification ou un brouillon ; un agent peut choisir des actions dans un périmètre borné lorsque cette autonomie est utile.

Choisir la solution à partir du problème et d'une référence simple évite de mesurer uniquement la qualité d'une démonstration. Ce principe rejoint [[Choisir un modèle par la mesure]]. La recommandation doit aussi inclure maintenance, supervision et retour au fonctionnement manuel.

## Exemple chiffré fictif : temps réellement libéré

Une équipe traite 120 demandes par jour, à 90 secondes de travail actif par demande : 180 minutes. Le prototype ramène la vérification et les corrections à 40 secondes par demande, soit 80 minutes, mais demande 20 minutes quotidiennes de suivi. Le gain net estimé est donc 80 minutes par jour, et non les 180 minutes initiales.

Ce calcul ne transforme pas automatiquement du temps libéré en économie financière. Il faut observer comment l'équipe l'utilise, le coût d'exploitation, la qualité et la variabilité des volumes. Le délai de bout en bout peut rester élevé si les dossiers attendent toujours une approbation pendant deux jours.

## Définir un pilote concret

Écrire une fiche courte : besoin, périmètre inclus et exclu, jeu de cas, solution de référence, solution candidate, critères d'acceptation, responsable, durée de mesure et procédure de retour arrière. Les seuils sont des décisions métier prises avant l'évaluation, pas des nombres choisis pour rendre le résultat favorable.

Le premier pilote peut proposer une réponse sans l'envoyer. On mesure alors les modifications humaines et le temps de validation. L'autonomie supplémentaire vient seulement si les contraintes et les résultats la justifient.

## Exercice : l'attente dominante

Un service annonce « 48 heures pour répondre », dont quatre minutes de rédaction et 47 heures d'attente de validation. Il demande un modèle qui rédige deux fois plus vite. Formuler le gain possible et deux questions d'audit prioritaires.

> [!answer]- Repères de correction
> Diviser la rédaction par deux économise deux minutes de travail, pas 24 heures de délai. Examiner pourquoi la validation attend et quelles informations manquent pour la traiter. L'IA peut rester utile, mais la cible et la mesure doivent distinguer temps actif, file d'attente et qualité. Il faut aussi expliquer les 56 minutes restantes dans le processus annoncé plutôt que les ignorer.

## Sources et portée

Source consultée le 12 novembre 2026. La grille, les chiffres et le pilote sont des propositions pédagogiques originales ; ils ne décrivent aucun client réel.

- [Google — Cadrer un problème de machine learning](https://developers.google.com/machine-learning/problem-framing/problem)

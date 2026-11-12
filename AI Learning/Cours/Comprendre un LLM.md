# Comprendre un LLM

Un grand modèle de langage apprend des régularités dans des données. Pour un modèle génératif autorégressif, l'inférence consiste à produire des tokens successifs à partir du contexte disponible. Un token peut être un morceau de mot, un signe ou une autre unité issue de la tokenisation.

> [!abstract] À retenir
> Le contexte guide la génération en cours ; l'entraînement modifie les poids. Une réponse plausible reste à vérifier.

## Trois distinctions utiles

- **Entraînement** : ajuster les paramètres du modèle.
- **Inférence** : utiliser ses paramètres pour produire une sortie.
- **Contexte** : contenu fourni à cette génération ; il ne constitue pas à lui seul un réentraînement.

Une sortie plausible peut être fausse. Une syntaxe JSON valide ne garantit ni la bonne catégorie ni l'exactitude d'un fait. La validation doit donc porter sur le format et sur le résultat métier.

## Expérience

Pour classer des demandes, écris une instruction contenant la tâche, les catégories autorisées et deux exemples. Fais varier les formulations sur les mêmes demandes de test. Note les changements, sans considérer une seule bonne réponse comme une preuve de fiabilité.

Voir [[Évaluer une intégration]] et [[Du modèle au système]].

> [!answer]- Repères de correction
> **Consigne possible** : « Classe la demande dans facturation, accès, incident ou à clarifier. Retourne uniquement un objet avec la clé categorie. Si plusieurs sujets sont présents ou si les informations manquent, utilise à clarifier. »
>
> **Deux exemples de démonstration** : « Je souhaite une copie de ma facture » → facturation ; « Mon mot de passe est oublié » → accès. Ces exemples ne font pas partie du test final.
>
> **Test distinct** : « Le service affiche une erreur 500 » → incident ; « J'ai besoin d'aide » → à clarifier ; « Ma facture est fausse et mon compte est bloqué » → à clarifier selon la convention retenue.
>
> Compare deux formulations en conservant modèle, paramètres et demandes identiques. Note pour chaque réponse sa validité JSON, la catégorie et la durée. Une variation de prompt peut changer la sortie sans changer les poids : c'est de l'inférence, pas de l'entraînement.
>
> **Limite** : les catégories ci-dessus sont des références pédagogiques ; aucun résultat d'un modèle n'est prétendu mesuré ici. Un succès sur trois demandes ne valide pas une mise en production.

## Source

[Text generation — Hugging Face Transformers](https://huggingface.co/docs/transformers/llm_tutorial), consulté le 12 novembre 2026. Introduction conceptuelle ; aucune API de version particulière n'est requise pour cet exercice.

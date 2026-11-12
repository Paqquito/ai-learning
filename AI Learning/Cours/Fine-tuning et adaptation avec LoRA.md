# Fine-tuning et adaptation avec LoRA

## Ce que tu sauras faire

Choisir entre contexte, recherche documentaire et adaptation des paramètres, puis expliquer ce que LoRA économise. Prérequis : [[Apprentissage gradients et surapprentissage]] et [[Estimer la mémoire et comprendre la quantification]].

## Quatre interventions différentes

Un prompt définit la tâche et donne des exemples au moment de l'inférence. Le RAG ajoute des informations retrouvées dans des sources. Le fine-tuning poursuit l'entraînement d'un modèle existant sur des données choisies. Le préentraînement apprend une base plus générale, souvent avec beaucoup plus de données et de calcul.

Ces approches peuvent se combiner. Si une procédure change chaque semaine, un accès à la source actuelle peut être préférable à l'espoir que les poids mémorisent la bonne version. Si le problème est un comportement répétitif et bien défini, une adaptation peut être à évaluer après une référence par prompt. Voir [[Embeddings et RAG documentaire]].

## LoRA réduit les paramètres entraînés

> [!formula] Adaptation de faible rang — écriture simplifiée
> W adaptée = W base + BA

Pour W de forme (d, k), B a la forme (d, r) et A la forme (r, k). Le rang *r* est choisi petit devant les grandes dimensions. Le facteur d'échelle n'est pas représenté ici.

| Paramètres entraînés pour une matrice | Formule | Exemple : d = k = 4 096, r = 8 |
| --- | --- | --- |
| Matrice entière | d × k | 16 777 216 |
| Adaptateurs A et B | r × k + d × r | 65 536 |

Dans une adaptation complète, les poids sélectionnés du modèle sont directement mis à jour. LoRA garde les poids de base gelés et apprend, pour certaines matrices, une correction de faible rang. Une écriture simplifiée est W adaptée = W base + B × A, avec un facteur d'échelle omis ici pour la lisibilité.

Pour une matrice carrée 4 096 × 4 096, une mise à jour complète concerne 16 777 216 valeurs. Avec un rang 8, A et B représentent ensemble 8 × 4 096 + 4 096 × 8 = 65 536 valeurs. Le calcul illustre un module seulement : les autres matrices, biais et éventuels modules entraînables dépendent de la configuration.

Moins de paramètres entraînés réduit notamment les gradients et états d'optimiseur associés. Il reste néanmoins les poids de base, les activations et les espaces de travail. Le budget d'inférence ne suffit donc pas à prévoir le budget d'entraînement.

QLoRA associe une base quantifiée gelée à des adaptateurs entraînables selon une méthode spécifique. Ce n'est pas simplement « n'importe quel fichier 4 bits avec LoRA ». Moteur, format, modules et paramètres doivent être compatibles. Aucun de ces noms ne garantit qu'un modèle donné s'entraîne confortablement sur 12 Go de VRAM.

## Les données déterminent ce qui est appris

Un exemple supervisé peut associer une consigne, une entrée et une sortie attendue. Il faut examiner exactitude, cohérence, droits d'utilisation, diversité et séparation des ensembles. Des exemples contradictoires enseignent un comportement contradictoire. Les données synthétiques doivent elles aussi être contrôlées ; leur quantité ne prouve pas leur qualité.

Conserver un jeu de test indépendant, tester les tâches ciblées et les capacités à préserver, puis versionner base, tokenizer, adaptateur et données. Un adaptateur n'est pas un modèle autonome : sa compatibilité avec la base est essentielle. Le retour arrière doit être possible si l'adaptation améliore une tâche mais dégrade les autres.

## Exercice : trois besoins à orienter

Choisir une première hypothèse pour : retrouver une politique mise à jour hier ; produire un format stable d'extraction ; réduire les erreurs récurrentes d'un modèle sur des exemples métier validés. Indiquer une mesure avant de lancer un entraînement.

> [!answer]- Repères de correction
> Pour l'information récente, tester une recherche vers la source actuelle. Pour le format, essayer les mécanismes de sortie structurée disponibles et une validation logicielle. Pour les erreurs récurrentes, comparer un prompt amélioré puis éventuellement un fine-tuning sur des données séparées du test. Ce sont des hypothèses à évaluer, pas des règles exclusives : les mécanismes peuvent se combiner.

## Sources et portée

Sources consultées le 12 novembre 2026. Exemple de calcul original ; aucune exécution d'entraînement n'est effectuée par cette fiche.

- [Hu et al. — LoRA](https://arxiv.org/abs/2106.09685)
- [Dettmers et al. — QLoRA](https://arxiv.org/abs/2305.14314)
- [Hugging Face PEFT — Configuration LoRA](https://huggingface.co/docs/peft/en/developer_guides/lora)

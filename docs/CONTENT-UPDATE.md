# Extension des cours — 12 novembre 2026

Huit cours ajoutent les fondations pratiques suivantes au parcours existant : HTTP et API, CPU/GPU/RAM/VRAM, budget mémoire et quantification, boucle d'outils, embeddings et RAG, graphes métier, confidentialité et comparaison mesurée des modèles.

Chaque cours contient des objectifs, un exemple, un exercice avec repères de correction repliables et des sources primaires consultées. Trois illustrations SVG accessibles expliquent la mémoire, la boucle d'outils et les deux circuits du RAG. Les liens internes alimentent aussi le graphe de l'application.

Le catalogue passe de 6 à 14 cours et le QCM de 6 à 14 questions. Le parcours place les prérequis avant les notions qui en dépendent. Les études et chiffres fictifs sont identifiés comme tels ; aucune performance n'est attribuée aux machines personnelles ou aux systèmes d'une entreprise.

Les résultats de l'ancien quiz restent conservés avec leur total de 6. Le meilleur score affiché concerne uniquement le quiz actuel ; l'historique garde les deux formats. Les corrections d'exercices utilisent les callouts repliables Obsidian `> [!answer]- Repères de correction`, rendus en éléments HTML `details` fermés dans le site.

## Vérification

`npm run check` contrôle le parcours, les liens, les réponses, la compatibilité des sauvegardes et le rendu des corrections, puis compile le site. Les fichiers SVG ajoutés figurent dans la liste explicite des ressources publiées.

Les huit tests passent et le build produit 14 cours et 14 questions. Vérification dans Chrome sur la prévisualisation compilée : navigation depuis le graphe vers le RAG, illustration du circuit documentaire, ouverture du corrigé et absence d'erreurs dans la console inspectée. Les libellés des cours dans le graphe ont été abrégés et placés de part et d'autre des nœuds pour éviter leur chevauchement ; les titres complets restent accessibles et figurent dans le panneau de détail.

Un serveur Node déjà lancé conserve les modules de génération qu'il a chargés : le redémarrer après les modifications de `scripts/content.mjs` et `scripts/build.mjs` pour utiliser le nouveau rendu des corrections. La prévisualisation vérifiée a été compilée avec le moteur actualisé.

## Publication

Les sources sont dans le dépôt local. Après commit et push vers la branche de production reliée à Vercel, vérifier le déploiement et les compteurs : 14 cours, 14 questions. La génération locale de `dist` ne publie pas elle-même le site.

## Suite pédagogique

Transformer le cas synthétique existant en laboratoire reproductible sur une API autorisée ; compléter ensuite plugins/skills, architectures de modèles (Transformer, MoE, JEPA), réseaux et conteneurs, puis audit des processus et adaptation de modèles. Les 16 domaines restent une cartographie à enrichir, pas une encyclopédie déjà complète.

# Fondations des modèles et du métier — 12 novembre 2026

## Contenus ajoutés

Dix cours complètent les 14 cours existants : vecteurs/matrices/similarité ; apprentissage/gradients/surapprentissage ; Transformers ; MoE ; JEPA ; fine-tuning/LoRA ; Docker ; outils/MCP/skills/plugins ; audit de processus ; observabilité.

Chaque cours contient des objectifs, des prérequis, des exemples, un exercice corrigé sous un volet repliable et des sources primaires datées. Trois SVG accessibles décrivent un bloc Transformer, les branches I-JEPA et la boucle d'apprentissage. Les exemples mathématiques, coûts et durées sont explicitement pédagogiques.

Les cours sont intégrés au catalogue, à l'accueil Obsidian et au parcours. Dix questions à trois propositions complètent le QCM : chaque option a une explication et renvoie vers son cours. Les scores historiques sur 6 et 14 questions sont conservés avec leur dénominateur ; seuls les scores sur 24 entrent dans le meilleur résultat du quiz actuel.

## Graphe

Au-delà de 18 cours, les titres des fiches apparaissent au survol, au focus clavier ou à la sélection afin d'éviter le chevauchement. Les domaines restent nommés, les titres complets restent dans les noms accessibles et les infobulles, et la liste sous le graphe permet d'ouvrir toutes les fiches.

## Vérification et publication

Exécuter `npm run check` pour valider contenu, prérequis, corrections, sauvegardes et compilation. Le build doit afficher 24 cours, 16 domaines et 24 questions. La publication nécessite le commit et le push de ces sources ; générer `dist` localement ne publie rien.

Résultat de cette livraison : huit tests réussis et compilation conforme. Dans Chrome, recherche JEPA, lecture du cours et de son illustration, puis sélection de sa fiche dans le graphe au clavier vérifiées. Aucune erreur n'apparaît dans les journaux de console inspectés. La vérification utilise la prévisualisation compilée ; le serveur de développement doit être redémarré s'il conserve d'anciens modules de génération.

Il n'y a ni installation de plugin, ni lancement d'entraînement, ni connexion à une API de modèle dans cette livraison. Les notions décrivent des mécanismes et des exercices à réaliser sur données synthétiques.

# Projet et décisions — 12 novembre 2026

## Objectif

Former progressivement un développeur aux compétences Applied AI, Harness, Infrastructure et Forward Deployed Engineering. Priorité : intégrer, auditer, adapter. Parcours par acquis, sans rythme hebdomadaire imposé. Profil : pratique Linux/Docker et programmation assistée, mathématiques à l'aise, réseau à renforcer.

## Environnements déclarés

- PC Linux : RTX 4070 12 Go, RAM 32 Go.
- Serveur Xeon : environ 200 Go de RAM ; GPU et autorisations non établis.
- Services de modèles par API : gpt-oss 120b, Mistral et autres, versions et interfaces à confirmer ; administration du serveur non disponible.

Aucune connexion à ces environnements n'est créée par cette application.

## Périmètre V0.1

Navigation, recherche, 16 domaines, six fiches introductives reliées, un schéma SVG, un quiz de six questions avec explications, un cas synthétique avec réponse libre et corrigé masqué, un jeu de demandes et TP, progression locale exportable/importable. Le graphe distingue domaines et fiches, permet zoom et déplacement, et dispose d'une navigation en liste accessible.

## Direction visuelle

Hypothèse en l'absence de maquette fournie : bibliothèque d'ingénierie lisible, fond ivoire, vert profond et accents terre cuite ; navigation persistante, hiérarchie éditoriale et peu d'effets. L'action principale est de reprendre un cours. Le graphe est un outil d'exploration ; les parcours restent lisibles sans lui. Sur téléphone, navigation compacte et une colonne. États requis : recherche vide, erreur de chargement, quiz incomplet, réponse correcte/incorrecte, stockage indisponible, import invalide, page inconnue.

## Choix techniques

Application statique sans dépendances tierces pour cette première tranche. Le serveur de développement utilise Node. La génération rend le Markdown contrôlé du coffre et ne publie que les notes référencées dans le catalogue, pas tous les fichiers présents dans le coffre. Catalogue et questions restent distincts de la présentation. Les contenus sont fiables seulement à la mesure des sources et de leurs limites ; aucun comparatif matériel mesuré n'est prétendu.

GitHub est le futur référentiel distant, Vercel la cible prévue. Obsidian reste facultatif. Ne pas créer un second contenu concurrent. Aucun compte, backend, chatbot, exécution arbitraire de code ni suivi distant n'est inclus.

## Suite

1. Vérifier l'expérience sur les appareils de l'utilisateur et connecter son dépôt privé.
2. Protéger puis publier sur Vercel.
3. Ajouter les fiches réseau/API, CPU/GPU/RAM/VRAM, mesure de latence et coûts.
4. Ajouter un laboratoire reproductible d'appel à une API choisie et accessible.
5. Étendre aux workflows, RAG, graphes de données, agents, MCP, plugins et skills.
6. Ajouter évaluations de projets, audit métier puis adaptation de modèles.

Un tuteur intégré, un éditeur web, la synchronisation des résultats et le mode hors ligne seront décidés après usage. Ils ne sont pas nécessaires à la consultation des premiers contenus.

## Vérification de la première livraison

Les six tests Node passent : cohérence des liens et prérequis, correction du QCM, rejet des réponses incomplètes, transfert de progression, rejet des imports invalides, échappement HTML et présence du schéma accessible. La compilation statique réussit. La prévisualisation visuelle n'a pas pu être effectuée : l'environnement de vérification refuse l'accès au socket local et le navigateur intégré expire en essayant de joindre le serveur. L'affichage mobile, le clavier et les interactions complètes restent à vérifier dans un navigateur accessible. Aucun déploiement GitHub ou Vercel n'a été réalisé.

Le dépôt Git local a été initialisé, mais les permissions sur `.git` ont empêché l'indexation et le commit (`index.lock` refusé). Les fichiers de travail sont conservés. La première validation Git est à réaliser depuis un terminal personnel autorisé ; aucune élévation de privilèges n'a été tentée.

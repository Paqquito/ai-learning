# Docker images conteneurs et services IA

## Ce que tu sauras faire

Lire une architecture conteneurisée et expliquer image, conteneur, volume, réseau et port publié. Prérequis : [[Comprendre une API de modèle]] et [[CPU GPU RAM et VRAM]].

## Une image n'est pas un processus en cours

Une image décrit un environnement logiciel et ses fichiers. Un conteneur en est une instance exécutée avec une configuration : commande, limites, montages, réseau et variables d'environnement. Construire une image et démarrer un conteneur sont donc deux opérations différentes.

Un conteneur Linux partage le noyau de l'hôte qui l'exécute, contrairement à une machine virtuelle dotée de son propre noyau. Sur un poste utilisant une autre plateforme, un moteur peut s'appuyer sur une machine virtuelle pour exécuter les conteneurs Linux. L'isolation dépend de la configuration et n'est pas une garantie absolue contre tout programme hostile.

Dans une application IA, on peut séparer backend, index et service de modèle. Cela permet de mettre à jour et redémarrer les composants indépendamment. Le service de modèle peut aussi rester une API gérée ailleurs : conteneuriser ton backend ne t'oblige pas à déplacer l'inférence.

## Où vont les données ?

Le système de fichiers inscriptible d'un conteneur est lié à ce conteneur. Un volume sert à conserver des données au-delà de sa suppression. Un bind mount rend accessible un chemin de l'hôte ; un accès en écriture peut donc modifier les fichiers du poste.

Pour un index documentaire, préciser ce qui est persistant, ce qui peut être reconstruit, et comment restaurer une sauvegarde. Un volume est un emplacement de données, pas une stratégie de sauvegarde. Un secret placé dans l'image peut être exposé à toute personne qui reçoit cette image ; il doit être fourni par un mécanisme adapté à l'environnement.

## Ports : interne et publié

Un service écoute sur un port dans son environnement réseau. Publier ce port crée un accès via l'hôte. Une association telle que `127.0.0.1:8080:8000` signifie : port 8080 de la boucle locale de l'hôte vers port 8000 du conteneur. Une publication sans adresse locale explicite peut rendre le service accessible sur d'autres interfaces selon la configuration.

Dans un réseau de services, `localhost` à l'intérieur d'un conteneur désigne normalement ce conteneur, pas le conteneur voisin. Les services doivent utiliser le nom ou l'adresse appropriés. L'absence de publication d'un port n'interdit pas, à elle seule, les connexions sortantes du conteneur.

## GPU et exploitation

Docker ne crée pas de mémoire GPU et ne remplace pas le pilote de l'hôte. L'accès au GPU nécessite les pilotes et l'intégration d'exécution adaptés. Les versions, l'architecture matérielle et les permissions doivent être compatibles. Voir [[Estimer la mémoire et comprendre la quantification]].

Pour rendre un déploiement reproductible, enregistrer les versions ou identifiants d'images, les paramètres, les volumes et les dépendances. Un tag pouvant être remplacé, un digest permet d'identifier précisément un contenu d'image. Prévoir contrôles de santé, délais de démarrage et comportement si une dépendance n'est pas prête.

## Exercice : relire un plan

Une architecture fictive comporte un backend, un index et une API de modèle distante autorisée. L'index n'a pas de volume, le backend cherche l'index sur `localhost`, et le port de l'index est publié sur toutes les interfaces. Identifier trois points à corriger ou justifier.

> [!answer]- Repères de correction
> Prévoir la persistance ou une reconstruction explicite de l'index ; utiliser l'adresse du service d'index dans le réseau approprié ; retirer l'exposition externe inutile ou la restreindre et l'authentifier selon le besoin. Vérifier aussi la destination et les données transmises à l'API distante. Aucun conteneur n'a besoin d'être lancé pour résoudre cet exercice.

## Sources et portée

Sources consultées le 12 novembre 2026. Les paramètres sont des exemples à lire, pas une configuration prête à déployer.

- [Docker — Définition d'un conteneur](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/)
- [Docker — Volumes](https://docs.docker.com/engine/storage/volumes/)
- [Docker — Publication de ports](https://docs.docker.com/engine/network/port-publishing/)

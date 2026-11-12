# Distinguer outils MCP skills et plugins

## Ce que tu sauras faire

Nommer les pièces d'une extension d'agent, comprendre ce qu'elles apportent et examiner leur périmètre d'accès. Prérequis : [[Situer MCP]] et [[Appeler des outils avec un modèle]].

## Quatre niveaux à séparer

Un **outil** est une capacité exécutable, par exemple lire un ticket ou calculer une somme. Une description indique quand l'utiliser et avec quels arguments ; une implémentation effectue l'opération.

**MCP** organise les échanges entre applications clientes et serveurs exposant des capacités. Il sert à connecter, mais ne remplace pas les droits métier ni la politique d'approbation. Une application peut également utiliser des outils sans MCP.

Un **skill**, au sens du format Agent Skills, est un dossier d'instructions et de ressources. Il contient un fichier SKILL.md avec des métadonnées et une procédure ; il peut inclure scripts, références et modèles de documents. L'agent charge les éléments utiles selon les mécanismes de son application.

Un **plugin** est une unité d'extension dont le sens dépend du produit. Dans Claude Code, il peut regrouper skills, agents, hooks, serveurs MCP et autres composants. Ce regroupement facilite la distribution ; il n'est pas un standard universel identique dans toutes les applications desktop.

## Exemple : préparer une analyse de tickets

L'outil `lire_ticket` récupère des données. Un serveur MCP peut l'exposer à plusieurs clients. Un skill peut expliquer comment vérifier le périmètre, classer les erreurs et rédiger une synthèse. Un plugin peut emballer ces éléments pour une application compatible. Le harness orchestre toujours l'ensemble et applique les contrôles.

Un hook est une action associée à un événement du cycle de l'application, selon le produit. Puisqu'il peut déclencher du code, il doit être examiné comme un comportement exécutable, pas comme une simple documentation.

## Une instruction n'ajoute pas une permission

Un skill décrivant l'accès à un dossier ne donne pas au processus le droit de le lire. Inversement, un script fourni avec un skill peut utiliser les permissions dont dispose déjà le processus. Il faut examiner les fichiers, les destinations réseau, les dépendances et les actions réellement disponibles.

Une bonne procédure précise les conditions d'usage, les entrées attendues, les étapes, les erreurs et le résultat vérifiable. Elle reste versionnée avec ses exemples. Les noms de fichiers et les formats exacts doivent suivre la documentation de l'application ciblée, plutôt que supposer une portabilité automatique.

## Décrire une extension avant de l'installer

Pour une extension fictive, rédiger une fiche : application compatible, auteur et version, outils exposés, données lues, destinations, opérations d'écriture, code exécuté et méthode de désactivation. Puis tester une tâche nominale et une demande hors périmètre sur des données synthétiques.

Cette revue n'exige pas d'installer de nouveaux composants dans l'atlas. Elle prépare le travail réel d'intégration : les mots « plugin » ou « skill » ne suffisent pas à décrire la confiance et les accès accordés. Relier cette fiche à [[Déployer une IA avec des données confidentielles]].

## Exercice : attribuer les responsabilités

Un utilisateur veut « un plugin qui résume les tickets internes ». Identifier où se trouvent la récupération des données, la procédure de résumé, l'emballage et le contrôle des autorisations. Dire si MCP est toujours obligatoire.

> [!answer]- Repères de correction
> La récupération est une capacité d'outil ; la méthode de résumé peut être décrite dans un skill ; le plugin distribue les composants selon le produit ; l'application et les services contrôlent les droits. MCP est une option de connexion, pas une obligation générale. Il faut encore définir les données autorisées et la validation de la synthèse.

## Sources et portée

Sources consultées le 12 novembre 2026. La terminologie produit évolue ; ce cours ne promet pas une compatibilité automatique entre Claude Code, les autres applications Claude et ChatGPT.

- [Agent Skills — Format et fonctionnement](https://agentskills.io/home)
- [Claude Code — Présentation des plugins](https://code.claude.com/docs/en/plugins)

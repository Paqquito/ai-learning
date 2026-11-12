# Situer MCP

MCP, Model Context Protocol, organise les échanges entre une application hôte et des serveurs exposant notamment des outils, ressources et modèles de prompts. Un client MCP, géré par l'hôte, communique avec un serveur. MCP ne remplace ni le modèle ni les décisions de l'application.

> [!abstract] Quatre rôles à distinguer
> L'hôte orchestre ; son client communique ; le serveur MCP expose des capacités ; le service métier réalise la recherche ou l'action. Le modèle d'inférence est un autre composant.

## Exemple

Un serveur expose un outil de recherche dans une documentation. L'application découvre sa description, peut l'appeler avec des arguments, puis exploite le résultat. C'est l'environnement applicatif qui contrôle l'exécution ; le protocole seul ne garantit pas les permissions métier.

## Est-ce obligatoire ?

Non. Une intégration peut appeler directement une API ou une fonction. MCP devient intéressant lorsque l'on veut une interface commune entre des outils et plusieurs applications compatibles. Cela ne prouve pas qu'une tâche nécessite un agent.

## Exercice

Place sur ton schéma l'hôte, le client, le serveur MCP et le service documentaire. Annote les identités utilisées et les données transmises. Vérifie que tu ne confonds pas serveur MCP et serveur d'inférence.

Voir [[Le rôle du harness]] et [[Du modèle au système]].

> [!answer]- Repères de correction
> **Hôte** : l'application de l'utilisateur. Elle gère la conversation, les permissions et la décision d'exécuter un outil. **Client MCP** : le composant de l'hôte qui échange avec le serveur MCP.
>
> **Serveur MCP** : l'adaptateur qui expose la recherche documentaire. **Service documentaire** : le stockage et le moteur de recherche interrogés par cet adaptateur. Le serveur d'inférence est un autre service : il génère les réponses du modèle.
>
> **Flux aller** : l'hôte transmet au serveur MCP une requête de recherche et un contexte d'autorisation contrôlé. Le serveur interroge les documents que l'utilisateur a le droit de consulter.
>
> **Flux retour** : passages autorisés et références remontent à l'hôte, qui choisit quoi joindre au contexte du modèle. Les secrets d'accès restent côté logiciel ; ils ne sont pas insérés dans le prompt.
>
> **Point à vérifier** : si le service utilise un compte technique étendu, l'application doit toujours appliquer les droits de l'utilisateur. MCP ne résout pas cette autorisation métier à lui seul.

## Source

[Architecture officielle MCP](https://modelcontextprotocol.io/docs/learn/architecture), consultée le 12 novembre 2026. Les versions du protocole et des SDK doivent être fixées au moment d'un TP d'implémentation.

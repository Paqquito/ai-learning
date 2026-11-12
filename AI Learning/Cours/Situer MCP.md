# Situer MCP

MCP, Model Context Protocol, organise les échanges entre une application hôte et des serveurs exposant notamment des outils, ressources et modèles de prompts. Un client MCP, géré par l'hôte, communique avec un serveur. MCP ne remplace ni le modèle ni les décisions de l'application.

## Exemple

Un serveur expose un outil de recherche dans une documentation. L'application découvre sa description, peut l'appeler avec des arguments, puis exploite le résultat. C'est l'environnement applicatif qui contrôle l'exécution ; le protocole seul ne garantit pas les permissions métier.

## Est-ce obligatoire ?

Non. Une intégration peut appeler directement une API ou une fonction. MCP devient intéressant lorsque l'on veut une interface commune entre des outils et plusieurs applications compatibles. Cela ne prouve pas qu'une tâche nécessite un agent.

## Exercice

Place sur ton schéma l'hôte, le client, le serveur MCP et le service documentaire. Annote les identités utilisées et les données transmises. Vérifie que tu ne confonds pas serveur MCP et serveur d'inférence.

Voir [[Le rôle du harness]] et [[Du modèle au système]].

## Source

[Architecture officielle MCP](https://modelcontextprotocol.io/docs/learn/architecture), consultée le 12 novembre 2026. Les versions du protocole et des SDK doivent être fixées au moment d'un TP d'implémentation.

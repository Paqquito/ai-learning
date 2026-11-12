# Le rôle du harness

Nous utilisons **harness** pour désigner l'environnement logiciel qui fait fonctionner un agent : préparation du contexte, appels au modèle, dispatch des outils, résultats, limites d'exécution et traces. Il n'existe pas un périmètre universel identique dans tous les produits.

## Responsabilités à dessiner

- Fournir les instructions et le contexte utiles à chaque étape.
- Vérifier les arguments avant d'appeler un outil.
- Appliquer les autorisations et demander une validation si nécessaire.
- Gérer les erreurs, les budgets et l'arrêt de la boucle.
- Garder des traces utiles sans y recopier inutilement des données sensibles.

## Exercice original

Un agent propose de créer deux fois le même ticket après une panne réseau. À quel endroit ajouterais-tu un identifiant de demande, une vérification de doublon et une reprise contrôlée ? La responsabilité relève du logiciel d'intégration, pas d'une simple consigne au modèle.

Dans le cas pédagogique, commence avec un workflow déterministe. Introduis une boucle uniquement si les tests montrent que des décisions dynamiques sont nécessaires.

Voir [[Workflow ou agent]], [[Situer MCP]] et [[Évaluer une intégration]].

## Repère documentaire

[Architecture MCP](https://modelcontextprotocol.io/docs/learn/architecture), consultée le 12 novembre 2026, décrit les rôles de l'application hôte et de ses connexions. La liste ci-dessus est notre grille de conception, pas une définition normative de MCP.

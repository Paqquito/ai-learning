# Le rôle du harness

Nous utilisons **harness** pour désigner l'environnement logiciel qui fait fonctionner un agent : préparation du contexte, appels au modèle, dispatch des outils, résultats, limites d'exécution et traces. Il n'existe pas un périmètre universel identique dans tous les produits.

> [!warning] Une instruction ne remplace pas un contrôle
> « Ne crée pas de doublon » dans un prompt n'est pas une garantie. Les droits, la validation des arguments et l'idempotence doivent être appliqués par le logiciel.

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

> [!answer]- Repères de correction
> **Avant le premier appel**, le service d'intégration crée et conserve un identifiant stable de demande. Chaque tentative pour cette même création réutilise la même clé d'idempotence.
>
> **Au moment de créer**, le service de tickets doit garantir l'unicité de façon atomique, par exemple avec une contrainte unique ou une API idempotente. Un simple « rechercher puis créer » peut encore produire un doublon si deux requêtes arrivent ensemble.
>
> **Après une panne réseau**, le harness classe le résultat comme incertain : le ticket a pu être créé malgré l'absence de réponse. Il vérifie l'état avec la clé, puis reprend la même opération si nécessaire, avec un nombre de tentatives borné.
>
> **Test attendu** : simuler une création réussie suivie d'une réponse perdue ; après la reprise, un seul ticket existe. Une consigne « ne crée pas de doublon » au modèle ne garantit pas ce résultat.

## Repère documentaire

[Architecture MCP](https://modelcontextprotocol.io/docs/learn/architecture), consultée le 12 novembre 2026, décrit les rôles de l'application hôte et de ses connexions. La liste ci-dessus est notre grille de conception, pas une définition normative de MCP.

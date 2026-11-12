# Quand utiliser un graphe de données

## Ce que tu sauras faire

Distinguer le graphe de navigation de cet atlas, un graphe de connaissances métier et une stratégie de recherche GraphRAG. Prérequis : [[Embeddings et RAG documentaire]].

## Relier des choses avec un sens précis

Un graphe comprend des nœuds et des relations. Dans cet atlas, les nœuds sont des cours et des domaines ; les liens aident à naviguer entre les notions. Ce dessin ne constitue pas à lui seul un moteur de raisonnement utilisé par un modèle.

Dans un graphe métier, on peut représenter un composant, un produit et un fournisseur avec des relations typées : « contient », « fourni par », « remplace ». Les relations peuvent porter une date de validité, une source et un niveau de vérification. Un lien sans provenance risque de donner une apparence de certitude à une hypothèse.

Exemple fictif : la machine M utilise le module X ; X utilise le composant C ; C provient du fournisseur F. La question « quelles machines dépendent de F ? » nécessite de suivre plusieurs relations. Une recherche par similarité de texte ne garantit pas ce parcours ; une requête de graphe peut l'exprimer directement.

## Faut-il une base de graphes ?

Pas nécessairement. Pour une petite nomenclature stable, des tables et des jointures SQL peuvent suffire. Le choix dépend des requêtes, des volumes, des mises à jour et des compétences d'exploitation. Dessiner un graphe conceptuel est utile même si le stockage final reste relationnel.

Un graphe devient intéressant quand les relations elles-mêmes sont centrales : dépendances, propagation d'impact, liens entre incidents, actifs et équipes. Pour retrouver simplement une procédure à partir d'une question, commencer par comparer la recherche classique et le RAG documentaire.

## Le terme GraphRAG recouvre plusieurs approches

Au sens général, il s'agit d'utiliser des relations de graphe pour enrichir la recherche et le contexte d'un modèle. On peut interroger un graphe métier existant, puis demander au modèle d'expliquer les résultats avec leurs preuves.

Le projet Microsoft GraphRAG est une implémentation particulière. Il peut extraire entités et relations depuis des textes et créer des résumés de communautés. Sa recherche locale combine entités et passages ; sa recherche globale exploite des rapports pour des questions portant sur l'ensemble du corpus. Cette indexation et ces recherches peuvent être coûteuses. « GraphRAG » ne signifie donc pas simplement afficher les documents dans un réseau.

## Les erreurs à anticiper

Deux noms peuvent désigner une même organisation ; deux personnes différentes peuvent partager le même nom. Une extraction peut inventer une relation ou oublier une négation. Les relations peuvent aussi être périmées. Mesurer la qualité de l'extraction et conserver les sources reste nécessaire avant d'évaluer la réponse finale.

Les droits d'accès s'appliquent aux informations reliées et aux résumés dérivés. Un résumé global peut révéler un fait issu d'un document interdit. Masquer seulement le lien vers ce document ne suffit pas. Voir [[Déployer une IA avec des données confidentielles]].

## Exercice : impact d'un fournisseur

Créer deux machines M1 et M2, deux modules X et Y, un composant C et un fournisseur F. M1 utilise X ; M2 utilise Y ; seul X utilise C ; C vient de F. Écrire la réponse à « qui dépend de F ? » et la chaîne qui la justifie. Ajouter ensuite une relation datée indiquant que Y utilisait C l'an dernier.

> [!answer]- Repères de correction
> M1 est concernée dans l'état actuel décrit. M2 dépend du périmètre temporel demandé. Chaque réponse doit expliciter la date de référence. Un modèle qui répond « toutes les machines » à cause de mots similaires n'a pas respecté les relations.

## Sources et portée

Source consultée le 12 novembre 2026. Le cas industriel est entièrement fictif ; les choix SQL ou graphe sont des critères de conception à éprouver sur les requêtes réelles.

- [Microsoft GraphRAG — Présentation des modes de recherche](https://microsoft.github.io/graphrag/query/overview/)

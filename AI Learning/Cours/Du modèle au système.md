# Du modèle au système

Un système d'IA utile répond à un besoin mesurable. Le modèle en est un composant : il faut aussi préparer ses entrées, interpréter ses sorties et organiser les actions autorisées.

## Un exemple concret

Une équipe reçoit des demandes de support. L'application transmet un message à un modèle pour proposer une catégorie. Le logiciel vérifie ensuite que la catégorie appartient à la liste prévue. Un opérateur valide la proposition avant la création d'un ticket.

![Circuit d'une demande : validation des entrées, appel au modèle, contrôle de la réponse et approbation avant création du ticket.](../Assets/circuit.svg)

Le schéma représente une architecture pédagogique, pas une installation existante. La flèche vers le modèle transporte le texte utile et les instructions ; le retour contient une proposition. Le modèle n'obtient pas automatiquement un accès au logiciel de tickets.

## Questions à poser avant de coder

- Quelle entrée reçoit-on et quel résultat attend-on ?
- Qui peut consulter les données, et où passent-elles ?
- Comment détecter une réponse invalide ou une panne ?
- Une erreur est-elle réversible ? Qui valide une action ?
- Quelle mesure dira que le système améliore le travail ?

## Passer à l'action

Dessine ce circuit avec quatre annotations : donnée échangée, responsable, contrôle et comportement en cas d'échec. Vérifie que chaque action sur un système externe a un responsable explicite.

La suite : [[Comprendre un LLM]], [[Workflow ou agent]] et [[Évaluer une intégration]].

> [!answer]- Repères de correction
> **Entrée → application** : le message de support est reçu par le service d'intégration. Celui-ci contrôle taille, champs obligatoires et droit d'accès ; une entrée invalide est rejetée avant tout appel.
>
> **Application → modèle** : seuls le texte utile et les catégories autorisées sont transmis, sous l'identité de service autorisée. En cas de timeout, la demande reste en attente ; aucun ticket n'est créé par défaut.
>
> **Modèle → application** : le modèle renvoie une proposition. Le logiciel vérifie le schéma, la catégorie et les cas ambigus. Une sortie invalide rejoint la file humaine.
>
> **Application → opérateur → outil de tickets** : l'opérateur valide ; le connecteur crée le ticket avec une clé d'idempotence. Si le résultat de création est incertain, il recherche la demande existante avant de réessayer.
>
> **Autoévaluation** : ton dessin doit distinguer proposition, validation et action. Un appel au modèle ne donne pas à celui-ci un accès implicite au système de tickets.

## Sources et portée

Architecture et exercice originaux à but pédagogique. Pour distinguer orchestration prédéfinie et autonomie, voir [Building effective agents — Anthropic](https://www.anthropic.com/engineering/building-effective-agents), consulté le 12 novembre 2026. Les exemples de bibliothèques de cet article de 2024 peuvent avoir évolué.

# Déployer une IA avec des données confidentielles

## Ce que tu sauras faire

Tracer les données au-delà du seul modèle, repérer les services susceptibles de recevoir du contenu et proposer un périmètre de déploiement. Prérequis : [[Comprendre une API de modèle]], [[Appeler des outils avec un modèle]] et [[Embeddings et RAG documentaire]].

## « Local » doit désigner un périmètre

Une application installée sur un ordinateur peut appeler un modèle distant. Un modèle hébergé dans l'entreprise peut être entouré d'un outil d'analyse externe qui reçoit les prompts. Il faut donc définir la frontière autorisée : poste, réseau interne, environnement hébergé dédié ou service externe approuvé. L'étiquette « local » ne remplace pas ce travail.

Pour chaque composant, noter l'entrée, la sortie, le lieu d'exécution, la persistance, les identités autorisées et les éventuelles sorties réseau. Inclure le navigateur, le backend, l'authentification, le modèle d'embedding, l'index, le générateur, les outils, les journaux, les sauvegardes et la supervision.

## Architecture pédagogique sous contrainte interne

Supposons que les données d'une entreprise fictive doivent rester dans son réseau autorisé. Le navigateur appelle un backend interne. Celui-ci contrôle l'identité et les droits, cherche des passages dans un index interne, appelle un service d'inférence autorisé, puis restitue une réponse. Les traces restent dans le même périmètre et évitent de recopier les messages complets par défaut.

Cette description n'est ni un constat sur l'architecture de DS, ni une validation de ses règles. Dans un projet réel, les responsables concernés doivent préciser les services approuvés et le sens exact de « rien ne sort ». Le site pédagogique personnel ne sert pas à déposer des documents d'entreprise.

## Trois protections différentes

- **Authentifier** : déterminer qui agit, avec une identité vérifiée.
- **Autoriser** : contrôler ce que cette identité peut lire et modifier, pour chaque opération.
- **Isoler** : limiter les ressources et destinations auxquelles un composant peut accéder.

Une clé donnant accès au modèle ne donne pas automatiquement accès aux dossiers clients. De même, TLS protège les échanges en transit mais n'empêche pas le destinataire autorisé de conserver leur contenu. Il faut examiner les journaux et les durées de conservation indépendamment du chiffrement.

## Les documents peuvent contenir des instructions hostiles

Un texte récupéré peut demander au modèle d'ignorer sa mission, de révéler d'autres passages ou d'utiliser un outil. C'est une forme d'injection indirecte. Le RAG ou le fine-tuning ne l'éliminent pas à eux seuls.

Le système doit séparer instructions de l'application et contenu documentaire, limiter les outils, contrôler les droits côté serveur et restreindre les destinations réseau. Ces mesures réduisent le risque sans promettre qu'un prompt suffit à rendre tout comportement sûr. Une validation humaine doit présenter l'action et ses conséquences avant une écriture importante.

## Exercice : trouver la fuite dans le circuit

Une application fictive utilise un modèle interne et un index interne, mais envoie les prompts à un service externe de diagnostic. On lui ajoute un connecteur qui transmet les extraits à une API publique d'embeddings. Identifier les deux sorties et proposer une variante respectant la contrainte de l'exercice.

> [!answer]- Repères de correction
> le diagnostic et les embeddings transportent du contenu hors du périmètre. Pour cet exercice, utiliser des services internes approuvés ou supprimer ces transferts ; réduire les traces aux métadonnées nécessaires. Vérifier également les erreurs, sauvegardes et connecteurs. Anonymiser approximativement ne démontre pas, à soi seul, que les données sont devenues non confidentielles.

Critère de réussite : pour chaque flèche du circuit, tu sais expliquer qui reçoit quoi et pourquoi. Relier ce travail à [[Quand utiliser un graphe de données]] : les résumés et les relations dérivées portent eux aussi de l'information.

## Sources et portée

Sources consultées le 12 novembre 2026. Ce cours porte sur la conception technique, pas sur une qualification juridique ni sur une politique interne réelle.

- [OWASP — Injection de prompt](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)
- [MDN — Protection du transport par TLS](https://developer.mozilla.org/en-US/docs/Web/Security/Practical_implementation_guides/TLS)
- [Microsoft — RAG, droits d'accès et gouvernance](https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview)

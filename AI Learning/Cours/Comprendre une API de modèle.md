# Comprendre une API de modèle

## Ce que tu sauras faire

Décrire le trajet d'une requête, distinguer une panne de connexion d'une erreur de génération et préciser ce qu'il faut demander au responsable d'un service de modèles. Prérequis : [[Du modèle au système]] et [[Comprendre un LLM]].

## Un service, pas un accès à la machine

Une API est un contrat d'échange entre logiciels. Une application cliente envoie une requête à une adresse ; un serveur répond selon un format convenu. Avoir accès à une API d'inférence ne donne ni un terminal sur le serveur, ni la possibilité de remplacer le modèle. Tu peux construire un harness autour d'un service dont tu ne gères pas l'hébergement.

Une URL comme `https://modele.example:443/classifier` comprend un protocole, un nom de serveur, un port et un chemin. Cet exemple est fictif. DNS permet de résoudre un nom en adresse réseau. Le routage et les règles réseau déterminent ensuite si le service est joignable. TLS protège le transport HTTPS ; il ne décide pas si tu as le droit de consulter un dossier métier.

## Lire une requête et sa réponse

Une requête HTTP contient une méthode, un chemin, des en-têtes et éventuellement un corps. Pour demander une classification, le corps peut être du JSON. Les noms des champs dépendent du fournisseur : un format dit « compatible » doit être vérifié sur les fonctions utilisées.

```json
{
  "texte": "Je ne peux plus accéder à mon espace",
  "categories": ["acces", "facturation", "incident", "a_clarifier"]
}
```

Ce contrat pédagogique n'est la syntaxe d'aucun fournisseur. Une réponse contenant `{"categorie":"acces"}` reste une proposition à contrôler. Un HTTP 200 indique que l'échange a réussi selon le serveur, pas que la décision métier est correcte.

- 400 : la requête est mal formée ou invalide ; vérifier le contrat avant de réessayer.
- 401 : l'authentification est absente ou invalide ; vérifier les identifiants sans les afficher dans les journaux.
- 403 : l'accès est refusé ; ne pas confondre authentification et autorisation.
- 429 : une limite de requêtes est atteinte ; respecter les indications du service et borner les reprises.
- 5xx : erreur côté serveur ou intermédiaire ; décider si une nouvelle tentative est appropriée.

## Les frontières à prévoir

Un timeout signifie que le client a cessé d'attendre. Il ne prouve pas que le serveur n'a rien effectué. Pour une action comme créer un ticket, utiliser une clé d'idempotence si le service la prend en charge, ou une vérification métier avant reprise. Fixer un délai total et un nombre maximal de tentatives évite une boucle sans fin. Voir [[Appeler des outils avec un modèle]].

Le streaming livre une réponse par morceaux : il améliore la perception d'attente, mais ne rend pas un JSON partiel exploitable comme décision finale. Conserver une validation à la fin du flux.

## Exercice : diagnostiquer sans changer de modèle

Sur papier, classer quatre incidents : nom DNS introuvable ; HTTP 401 ; réponse 200 avec catégorie inconnue ; timeout lors de la création du ticket. Pour chacun, écrire le composant à inspecter et une action de repli. Ne faire aucun appel à un service réel.

> [!answer]- Repères de correction
> vérifier DNS et réseau pour le premier ; authentification pour le second ; validation applicative pour le troisième ; état du ticket et mécanisme de déduplication pour le dernier. Remplacer le modèle ne résout pas les trois premiers problèmes de transport, d'accès ou de contrat.

## À demander au fournisseur interne

Adresse et documentation de l'API, modèles autorisés, authentification, limites de contexte et de débit, délais, streaming, formats structurés, appels d'outils, conservation des journaux et interlocuteur en cas de panne. Ces réponses préparent [[Choisir un modèle par la mesure]].

## Sources et portée

Sources consultées le 12 novembre 2026. Les exemples et l'exercice sont originaux ; aucun endpoint d'entreprise n'est utilisé.

- [MDN — Vue d'ensemble de HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview)
- [MDN — Codes de réponse HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)
- [MDN — TLS](https://developer.mozilla.org/en-US/docs/Web/Security/Practical_implementation_guides/TLS)

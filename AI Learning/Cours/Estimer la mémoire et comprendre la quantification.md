# Estimer la mémoire et comprendre la quantification

## Ce que tu sauras faire

Calculer un premier ordre de grandeur des poids, identifier la mémoire manquante dans ce calcul et préparer un test réaliste. Prérequis : [[Comprendre un LLM]] et [[CPU GPU RAM et VRAM]].

## Les poids ne sont qu'une partie du budget

> [!formula] Poids bruts — stockage uniforme idéal
> Mémoire (octets) = paramètres × bits par paramètre / 8

> [!warning] Le budget complet est plus grand
> Poids + cache KV + activations et espace de travail + réservations du moteur + autres usages de la carte. Vérifier le pic à la charge visée, pas seulement au chargement.

Un paramètre est une valeur numérique apprise. Pour un stockage uniforme idéal, la mémoire brute des poids vaut : nombre de paramètres multiplié par bits par paramètre, divisé par huit. Pour un modèle fictif de 8 milliards de paramètres :

- 16 bits : 16 milliards d'octets, soit 16 Go décimaux, environ 14,9 Gio.
- 8 bits : 8 Go décimaux, environ 7,45 Gio.
- 4 bits : 4 Go décimaux, environ 3,73 Gio.

Un Go décimal vaut un milliard d'octets ; un Gio vaut 2 puissance 30 octets. L'exemple ignore les métadonnées de quantification et les parties conservées dans une autre précision. Il ne prédit donc pas la taille exacte d'un fichier, encore moins la mémoire totale au fonctionnement.

Il faut ajouter les caches, les activations temporaires, les espaces de travail du moteur et ses réservations, ainsi que les autres usages de la carte. « Quatre Go de poids » ne veut pas dire « quatre Go de VRAM suffisent ».

## Quantifier : représenter autrement les nombres

La quantification réduit la précision de certaines valeurs. Elle peut diminuer la mémoire et parfois accélérer l'exécution, selon le matériel et les opérations disponibles. Elle peut aussi modifier la qualité. La méthode, les données de calibration éventuelles, les couches concernées et le support du moteur comptent autant que l'étiquette « 4 bits ».

Quantifier les poids et quantifier le cache sont deux décisions différentes. Une version quantifiée doit repasser les tests métier : catégories rares, sorties structurées et appels d'outils peuvent être affectés même si une conversation de démonstration reste fluide.

## Pourquoi le contexte consomme de la mémoire

Dans de nombreux Transformers autoregressifs, le cache KV conserve des clés et valeurs d'attention déjà calculées. Il évite de refaire une partie du travail pendant la génération. Ce n'est ni une base documentaire ni une mémoire persistante de l'utilisateur.

Pour une architecture à attention complète classique, un cache non compressé peut être approximé par :

```text
octets KV ≈ 2 × couches × têtes KV × dimension par tête
             × tokens conservés × séquences simultanées × octets par valeur
```

Le facteur deux correspond aux clés et aux valeurs. Les têtes KV ne sont pas toujours aussi nombreuses que les têtes de requêtes. Fenêtres glissantes, partage de préfixes, compression et autres architectures modifient cette estimation ; vérifier la configuration réelle du modèle.

Exemple fictif : 32 couches, 8 têtes KV, dimension 128, 4 096 tokens, une séquence et 2 octets par valeur donnent 536 870 912 octets, soit 0,5 Gio. Quatre séquences indépendantes identiques donnent environ 2 Gio, hors surcoûts. Allonger les entrées peut donc faire échouer un modèle qui fonctionnait avec un prompt court.

## Explorer dans le navigateur

:::lab memory

## Exercice : préparer le budget

Un modèle fictif de 8 milliards de paramètres en 4 bits est envisagé sur une carte de 12 Go. Écrire ce qui est connu, ce qui reste à mesurer et deux conditions pouvant augmenter la mémoire. Ne conclure ni « impossible » ni « garanti » avec le seul nombre de paramètres.

> [!answer]- Repères de correction
> poids bruts autour de 4 Go décimaux ; cache, moteur et marge inconnus ; longueur du contexte et concurrence à tester. Mesurer la mémoire au chargement puis à charge représentative. Garder le même modèle et le même prompt pour comparer deux formats, puis contrôler la qualité. Voir [[Choisir un modèle par la mesure]].

## Sources et portée

Sources consultées le 12 novembre 2026. Les chiffres sont des calculs pédagogiques, pas des benchmarks ni une recommandation de modèle.

- [Hugging Face — Quantification](https://huggingface.co/docs/transformers/en/quantization/overview)
- [Hugging Face — Stratégies de cache KV](https://huggingface.co/docs/transformers/en/kv_cache)
- [NVIDIA — Optimisation de l'inférence](https://developer.nvidia.com/blog/mastering-llm-techniques-inference-optimization/)

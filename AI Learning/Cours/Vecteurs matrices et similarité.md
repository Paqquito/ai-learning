# Vecteurs matrices et similarité

## Ce que tu sauras faire

Lire les dimensions d'un calcul de réseau neuronal et calculer une similarité simple. Ce cours prépare [[Comprendre le Transformer et son attention]] et approfondit [[Embeddings et RAG documentaire]]. Il ne demande pas de maîtriser un logiciel de calcul.

## Des nombres organisés

Un scalaire est une valeur, par exemple 3. Un vecteur est une liste ordonnée de valeurs, par exemple (2, 1, 0). Une matrice est un tableau à deux axes. Un tenseur généralise cette organisation à plusieurs axes. Le sens de chaque axe doit être précisé : lot de requêtes, positions de tokens, dimensions de représentation, etc.

Un lot de deux séquences de cinq tokens représentés par quatre valeurs chacun peut avoir une forme (2, 5, 4). Il contient 40 valeurs. Un axe n'est pas une propriété mystérieuse : c'est une façon de ranger les nombres. Dans un embedding appris, chaque coordonnée n'est généralement pas une catégorie lisible comme « politique » ou « mécanique ».

## Le produit matriciel transforme une représentation

Pour une matrice X de forme (n, d) et une matrice W de forme (d, m), le produit XW a la forme (n, m). Les dimensions intérieures doivent être compatibles. Ce produit n'est pas la multiplication case par case : chaque sortie combine plusieurs entrées pondérées.

Prenons une ligne X = (2, 1) et une matrice W dont les lignes sont (1, 3) et (4, 0). Le résultat est (6, 6) : 2 × 1 + 1 × 4 pour la première valeur, puis 2 × 3 + 1 × 0 pour la seconde. L'exemple est arbitraire, mais le mécanisme est celui d'une transformation linéaire. Un biais ajoute ensuite une valeur à chaque sortie ; une fonction non linéaire permet au réseau de représenter davantage qu'une succession de transformations linéaires.

## Comparer des directions

Le produit scalaire additionne les produits des coordonnées correspondantes. La norme euclidienne est la racine carrée de la somme des carrés. Pour deux vecteurs non nuls, la similarité cosinus divise le produit scalaire par le produit des normes.

Pour u = (1, 0) et v = (2, 0), le cosinus vaut 1 : même direction, longueurs différentes. Pour u et w = (0, 1), il vaut 0. Un score 1 ne prouve pas que deux textes sont identiques ou vrais ; la signification dépend de la représentation apprise. Pour un vecteur nul, la formule est indéfinie : une implémentation doit choisir un comportement explicite.

## Pourquoi cela aide à intégrer

Si un index contient des vecteurs de 768 valeurs et que la nouvelle API renvoie 1 024 valeurs, la comparaison prévue ne fonctionne plus telle quelle. Même deux modèles de dimension identique peuvent utiliser des espaces incompatibles. Il faut conserver le modèle d'embedding, sa version et la préparation du texte avec l'index.

## Exercice : calcul et diagnostic

Calculer le produit scalaire et le cosinus de (1, 1) et (1, -1). Donner ensuite la forme du produit d'une matrice (10, 4) par une matrice (4, 3). Enfin, expliquer pourquoi tronquer arbitrairement un vecteur à la dimension de l'ancien index n'est pas une migration validée.

> [!answer]- Repères de correction
> Le produit scalaire vaut 0, donc le cosinus vaut 0 ; les normes sont toutes deux racine de 2. La forme du produit matriciel est (10, 3). Tronquer change la représentation et ne démontre aucune compatibilité sémantique : il faut vérifier le modèle, réindexer si nécessaire et comparer la recherche sur un jeu de référence.

## Sources et portée

Sources consultées le 12 novembre 2026. Calculs et situations d'intégration originaux ; les dimensions sont pédagogiques.

- [NumPy — Produit matriciel](https://numpy.org/doc/stable/reference/generated/numpy.matmul.html)
- [scikit-learn — Similarité cosinus](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.pairwise.cosine_similarity.html)

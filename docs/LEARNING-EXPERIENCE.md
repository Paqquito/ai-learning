# Présentation et programme — 12 novembre 2026

## Objectif de la révision

Rendre les cours repérables et visuels, rendre les corrections systématiques et remplacer la disposition du graphe sur deux cercles fixes. Le programme contient 193 intitulés : 24 introductions disponibles et 169 cours à rédiger, ainsi que 12 études de cas dont une disponible. L'inventaire évolue ; il ne constitue pas une promesse d'exhaustivité définitive.

## Références et choix

- La fiche OpenStax « Matrices and Matrix Operations » sépare objectifs, notions, exemples résolus et exercices : https://openstax.org/books/algebra-and-trigonometry-2e/pages/11-5-matrices-and-matrix-operations. Reprendre cette structure pédagogique, avec nos propres textes et calculs.
- Le graphe Obsidian relie les notes et utilise des forces centrale, de répulsion et de lien : https://obsidian.md/help/Plugins/Graph+view. Notre vue représente seulement les fiches publiées du catalogue ; les notes d'accueil et les liens vers des fichiers absents ne sont pas importés.
- Le W3C explique les difficultés de lecture dues à la justification : https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation. Alignement à gauche par défaut, justification facultative sur grand écran, largeur de texte contenue.

## Contrat d'une fiche

Objectifs observables ; explications par sections ; représentation utile (schéma de flux, tableau comparatif, géométrie ou exemple calculé) ; exercice ; correction masquée expliquant le raisonnement et les limites ; sources datées. Éviter les images décoratives, les murs de texte et les résultats expérimentaux inventés.

Le nouveau cadre s'applique aux 24 cours : titres numérotés, fil d'Ariane, sommaire avec liens partageables, précédent/suivant et accès à la pratique. La fiche vecteurs est entièrement remaniée ; plusieurs fiches de fondations et de calcul ont des tableaux et encadrés supplémentaires. La réécriture visuelle approfondie de toutes les autres fiches reste un travail éditorial progressif.

## Source des données

- `AI Learning/catalog.json` : cours publiés et ordre existant conservé.
- `AI Learning/roadmap.json` : futurs cours par domaine et cas à construire.
- `node scripts/programme.mjs` : régénère `AI Learning/Programme.md` pour Obsidian à partir de ces deux fichiers.
- La vue Programme assemble ces mêmes données sans faire passer un intitulé prévu pour une fiche disponible.

## Syntaxe prise en charge

Le Markdown reste volontairement limité et le HTML brut échappé. Ajouts : italique, tableaux simples à séparateurs verticaux, encadrés Obsidian `abstract`, `tip`, `warning`, `example`, `formula` et corrections `answer`. Les formules utilisent du texte mathématique Unicode, centré et mis en évidence ; ce n'est pas un moteur LaTeX. Les schémas précis sont des SVG avec titre, description et texte alternatif.

Chaque section d'exercice (`Exercice`, `Expérience`, `Passer à l'action`) doit contenir un encadré `> [!answer]-`. La compilation échoue en son absence. Ce contrôle vérifie la présence, pas la qualité pédagogique : la relecture du raisonnement reste nécessaire.

## Graphe et accessibilité

Les liens internes sont dédupliqués en relations non orientées. Les tailles des nœuds reflètent leur nombre de connexions. Une simulation déterministe calcule les positions, puis s'arrête. Les titres abrégés restent visibles, les titres complets sont accessibles dans les détails et les noms accessibles. Sélection au clavier, filtre avec voisins directs, déplacement des nœuds, zoom et vue en liste. Les cours prévus restent dans le programme.

## Vérifications

Tests de contenu, corrections, rendu échappé, progression historique, navigation, catalogue et graphe. Contrôle visuel dans Chrome sur la prévisualisation locale. Aucune mesure de performance d'un modèle et aucune publication distante ne sont effectuées par cette révision.

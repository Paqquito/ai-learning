# Présentation et programme — 12 novembre 2026

## Objectif de la révision

Rendre les cours repérables et visuels, rendre les corrections systématiques et remplacer la disposition du graphe sur deux cercles fixes. Le programme contient 193 intitulés : 34 introductions disponibles et 159 cours à rédiger, ainsi que 12 études de cas dont une disponible. L'inventaire évolue ; il ne constitue pas une promesse d'exhaustivité définitive.

## Références et choix

- La fiche OpenStax « Matrices and Matrix Operations » sépare objectifs, notions, exemples résolus et exercices : https://openstax.org/books/algebra-and-trigonometry-2e/pages/11-5-matrices-and-matrix-operations. Reprendre cette structure pédagogique, avec nos propres textes et calculs.
- Le graphe Obsidian relie les notes et utilise des forces centrale, de répulsion et de lien : https://obsidian.md/help/Plugins/Graph+view. Notre vue représente seulement les fiches publiées du catalogue ; les notes d'accueil et les liens vers des fichiers absents ne sont pas importés.
- Le W3C explique les difficultés de lecture dues à la justification : https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation. À la demande explicite de l’utilisateur, tous les paragraphes de lecture sont désormais justifiés, y compris sur mobile, dans les encadrés et dans les corrections. La largeur reste contenue et la césure automatique activée ; les formules restent centrées.

## Contrat d'une fiche

Objectifs observables ; explications par sections ; représentation utile (schéma de flux, tableau comparatif, géométrie ou exemple calculé) ; exercice ; correction masquée expliquant le raisonnement et les limites ; sources datées. Éviter les images décoratives, les murs de texte et les résultats expérimentaux inventés.

Le nouveau cadre s'applique aux 34 cours : titres numérotés, fil d'Ariane, sommaire avec liens partageables, précédent/suivant et accès à la pratique. La fiche vecteurs est entièrement remaniée ; plusieurs fiches de fondations et de calcul ont des tableaux et encadrés supplémentaires. La réécriture visuelle approfondie de toutes les autres fiches reste un travail éditorial progressif.

## Source des données

- `AI Learning/catalog.json` : cours publiés et ordre existant conservé.
- `AI Learning/roadmap.json` : futurs cours par domaine et cas à construire.
- `node scripts/programme.mjs` : régénère `AI Learning/Programme.md` pour Obsidian à partir de ces deux fichiers.
- La vue Programme assemble ces mêmes données sans faire passer un intitulé prévu pour une fiche disponible.

## Syntaxe prise en charge

Le Markdown reste volontairement limité et le HTML brut échappé. Ajouts : italique, tableaux simples à séparateurs verticaux, encadrés Obsidian `abstract`, `tip`, `warning`, `example`, `formula` et corrections `answer`. Les anciennes formules simples utilisent du texte mathématique Unicode centré. Les fiches enrichies emploient désormais des formules structurées en MathML (voir ci-dessous). Les schémas précis sont des SVG avec titre, description et texte alternatif.

Chaque section d'exercice (`Exercice`, `Expérience`, `Passer à l'action`) doit contenir un encadré `> [!answer]-`. La compilation échoue en son absence. Ce contrôle vérifie la présence, pas la qualité pédagogique : la relecture du raisonnement reste nécessaire.

## Graphe et accessibilité

Les liens internes sont dédupliqués en relations non orientées. Les tailles des nœuds reflètent leur nombre de connexions. Une simulation déterministe calcule les positions, puis s'arrête. Les titres abrégés restent visibles, les titres complets sont accessibles dans les détails et les noms accessibles. Sélection au clavier, filtre avec voisins directs, déplacement des nœuds, zoom et vue en liste. Les cours prévus restent dans le programme.

## Vérifications

Tests de contenu, corrections, rendu échappé, progression historique, navigation, catalogue et graphe. Contrôle visuel dans Chrome sur la prévisualisation locale. Aucune mesure de performance d'un modèle et aucune publication distante ne sont effectuées par cette révision.

## Lot intégration fiable

Six fiches supplémentaires : réseau, HTTP/TLS, authentification, contrat d’outil, files et reprises, contexte. Sept SVG originaux décrivent les flux et les contrôles, avec titres et descriptions accessibles. Les encadrés portent un libellé explicite et une couleur stable : essentiel vert, exemple bleu, vigilance orange, méthode violet. Le programme conserve ses 193 cours inventoriés en faisant passer six intitulés de prévus à disponibles. Le quiz passe à 30 questions ; les résultats historiques sur 24 questions restent importables.

## Interface web enrichie — 12 novembre 2026

Le support web prime sur la compatibilité Obsidian. Les sources restent des fichiers éditoriaux, avec des extensions limitées `:::formula <identifiant>` et `:::lab <identifiant>` validées à la compilation. Aucun HTML brut des cours n’est exécuté.

- Trois fiches de référence : LLM (notion), vecteurs (calcul), confidentialité (architecture). Question de départ, repères de restitution, exemple résolu, exercice guidé et exercice autonome.
- Quatre nouvelles fiches : découpage, recherche hybride, métriques et injection. 34 cours disponibles, 159 prévus, 193 au total.
- MathML natif pour fractions, matrices, sommes et indices. Le téléchargement npm de KaTeX/highlight.js a échoué (DNS). Aucun paquet ajouté ni recours à un CDN ; la CSP reste inchangée. MathML est documenté par MDN : https://developer.mozilla.org/en-US/docs/Web/MathML.
- Coloration lexicale légère des extraits JSON/Python/JavaScript/Bash, sans analyse sémantique. Texte échappé, bouton de copie, aucune exécution.
- Schémas SVG dans une boîte de dialogue native avec agrandissement supplémentaire, fermeture Échap et restauration du focus.
- Texte standard 18 px, modes compact et confort ; justification par défaut, alignement gauche facultatif ; mode lecture et sommaire repliable sur mobile. Préférences locales.
- Simulations sans modèle : directions et cosinus, budget théorique des poids en GiB, appel d’outil autorisé/refusé. Hypothèses et limites visibles.
- Chaque fiche dispose d’un brouillon de restitution et d’une question issue du QCM, avec explications. Le carnet propose une révision à J+1 après erreur et J+7 après réussite : heuristique pédagogique, pas algorithme de maîtrise ni notification. Les anciens exports v1 restent acceptés ; notes et révisions sont ajoutées avec validation.

### Fondements pédagogiques

Signalisation, segmentation et proximité texte/schéma : Mayer, https://onlinelibrary.wiley.com/doi/10.1111/jcal.12197. Exemples résolus alternés avec problèmes : https://ies.ed.gov/ncee/wwc/PracticeGuide/1. Restitution et espacement : https://www.edresearch.edu.au/guides-resources/practice-guides/spacing-and-retrieval-practice-guide-full-publication. Présentation personnalisable : https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation. Sources consultées le 12 novembre 2026. Ces principes guident le design ; aucune amélioration de rétention n’a été mesurée sur notre application.

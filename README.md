# AI Learning · Atlas

Une base de connaissances et un laboratoire d'apprentissage pour intégrer, auditer puis adapter des systèmes d'IA.

## Démarrer

Prérequis : Node.js 22 ou ultérieur. Aucune dépendance à installer.

```sh
npm run dev
```

Ouvrir http://127.0.0.1:4173. Le serveur reste limité à cette machine. Il reconstruit le contenu à chaque rechargement de la page. `npm test` vérifie les contenus, la correction et le stockage ; `npm run build` génère `dist/`.

## Organisation

- `AI Learning/` : coffre Obsidian existant, notes sources, illustrations, catalogue, quiz et cas.
- `web/` : application statique responsive, sans API IA ni connexion à des services internes.
- `scripts/` : compilation et serveur local ; aucune publication automatique depuis le poste.
- `tests/` : tests Node.
- `docs/` : cadrage, décisions et prochaines étapes.

Les notes Markdown sont la source unique des cours. `catalog.json` définit leurs identifiants stables, leur domaine et leurs prérequis. Les liens `[[Titre]]` alimentent le graphe. Le compilateur accepte titres, paragraphes, listes à puces, liens, images, gras, code inline et blocs de code. Il échappe le HTML brut. Il prend aussi en charge les tableaux simples, l’italique et les encadrés Obsidian (dont formules et corrigés repliables). Les schémas exacts sont en SVG ; Mermaid et LaTeX ne sont pas interprétés.

Les 16 domaines sont cartographiés, mais seuls les premiers cours sont rédigés : l'interface distingue disponibilité du contenu et progression personnelle. Un quiz réussi ou une lecture terminée n'est pas une certification.

## Progression

Stockage local au navigateur, attaché à l'origine du site. Aucun compte et aucune synchronisation automatique entre appareils. Exporter le JSON depuis « Progression », puis l'importer sur l'autre appareil. L'import remplace les résultats locaux après confirmation. Effacer les données du navigateur peut effacer la progression. Les réponses du quiz sont embarquées : corrigé masqué pédagogiquement, pas dispositif d'examen sécurisé.

## GitHub et Vercel

Dépôt existant : https://github.com/Paqquito/ai-learning.git. Site : https://ai-learning-woad.vercel.app. Build Vercel : `npm run build` ; sortie : `dist`. Les changements locaux doivent être commités puis poussés depuis un terminal autorisé pour mettre à jour le site. Le dossier `.git` est en lecture seule pour l’assistant dans cet environnement.

La protection du déploiement est distincte de la confidentialité du dépôt. Aucun appel de modèle ni transfert vers un service d’entreprise n’est effectué par l’application.

## Téléphone et Obsidian

L'application web est adaptée au téléphone ; elle sera accessible à distance après publication. Elle n'est pas encore installable/hors ligne. Obsidian mobile peut ouvrir le coffre et son graphe après mise en place d'une synchronisation indépendante. Les quiz interactifs et la progression sont propres à l'application web.

## Validation de cette version

Exécuter `npm run check`. Les limites et décisions sont décrites dans `docs/PROJECT.md`. Les ressources externes des cours ont été consultées le 12 novembre 2026 ; les sources restent visibles dans chaque fiche.

## Programme et présentation des cours

Le catalogue complet est dans `AI Learning/Programme.md` et dans la page Programme de l’application. Il distingue les 40 cours disponibles et les 153 cours à rédiger. Régénérer le fichier Obsidian avec `node scripts/programme.mjs` après une modification de `catalog.json` ou `roadmap.json`.

Le graphe relie les fiches disponibles par leurs liens internes. Chaque fiche propose un sommaire, un repère dans le parcours et un exercice corrigé. Les choix éditoriaux et les limites sont détaillés dans `docs/LEARNING-EXPERIENCE.md`. Après une modification des scripts du compilateur, redémarrer le serveur local pour charger leur nouvelle version.

## Lecture et pratique dans le navigateur

Le Web est le support principal : schémas agrandissables, réglages de lecture, formules MathML natives, trois modules pédagogiques interactifs et questions corrigées par fiche. Les réglages, brouillons et révisions restent locaux au navigateur. L’export de progression inclut les brouillons et le carnet ; il ne synchronise pas automatiquement les appareils.

Les simulations calculent des exemples déterministes, sans appeler de modèle. Le calcul mémoire ne concerne que les poids théoriques et une réserve hypothétique, pas un dimensionnement complet.

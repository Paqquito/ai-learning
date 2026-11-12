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

Les notes Markdown sont la source unique des cours. `catalog.json` définit leurs identifiants stables, leur domaine et leurs prérequis. Les liens `[[Titre]]` alimentent le graphe. Le compilateur accepte titres, paragraphes, listes à puces, liens, images, gras, code inline et blocs de code. Il échappe le HTML brut ; Markdown complet, tableaux et Mermaid ne sont pas encore implémentés. Les schémas exacts sont en SVG.

Les 16 domaines sont cartographiés, mais seuls les premiers cours sont rédigés : l'interface distingue disponibilité du contenu et progression personnelle. Un quiz réussi ou une lecture terminée n'est pas une certification.

## Progression

Stockage local au navigateur, attaché à l'origine du site. Aucun compte et aucune synchronisation automatique entre appareils. Exporter le JSON depuis « Progression », puis l'importer sur l'autre appareil. L'import remplace les résultats locaux après confirmation. Effacer les données du navigateur peut effacer la progression. Les réponses du quiz sont embarquées : corrigé masqué pédagogiquement, pas dispositif d'examen sécurisé.

## GitHub et Vercel

Le dépôt Git local est initialisé sur `main`, mais aucun commit n'a pu être créé : l'environnement de l'assistant interdit l'écriture de `.git/index.lock`. Les fichiers du projet sont bien présents. Créer un dépôt GitHub **privé et vide**, sans README ni gitignore, puis connecter son URL depuis ce dossier. Aucune URL distante n'est supposée. Vérifier les fichiers avant le premier push ; ne pas y placer de données d'entreprise ni de clés.

Depuis un terminal personnel disposant des droits sur ce dossier, créer le premier commit :

```sh
git add .
git commit -m "feat: initialize AI learning atlas"
```

Ajouter ensuite l'URL exacte du dépôt comme remote `origin`, puis pousser la branche `main`. Le serveur local de vérification a été arrêté ; relancer `npm run dev` pour consulter l'application.

Importer ensuite le dépôt dans Vercel. Racine : ce dossier ; build : `npm run build` ; sortie : `dist`. Configurer une protection couvrant production et prévisualisations **avant de partager l'URL** : un dépôt privé ne protège pas le site. La configuration fournie ne crée pas d'authentification. Aucun déploiement n'a été effectué à ce stade.

## Téléphone et Obsidian

L'application web est adaptée au téléphone ; elle sera accessible à distance après publication. Elle n'est pas encore installable/hors ligne. Obsidian mobile peut ouvrir le coffre et son graphe après mise en place d'une synchronisation indépendante. Les quiz interactifs et la progression sont propres à l'application web.

## Validation de cette version

Exécuter `npm run check`. Les limites et décisions sont décrites dans `docs/PROJECT.md`. Les ressources externes des cours ont été consultées le 12 novembre 2026 ; les sources restent visibles dans chaque fiche.

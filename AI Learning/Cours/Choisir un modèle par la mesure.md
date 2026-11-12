# Choisir un modèle par la mesure

## Ce que tu sauras faire

Construire une comparaison qui débouche sur une décision d'intégration et d'infrastructure. Prérequis : [[Évaluer une intégration]], [[Estimer la mémoire et comprendre la quantification]] et [[Déployer une IA avec des données confidentielles]].

## Décrire la tâche avant la taille du modèle

« Analyser des mails » recouvre des besoins très différents : détecter une langue, classer un objet, extraire des montants, résoudre une réclamation ou rapprocher plusieurs pièces jointes. Longueur, ambiguïté, langues, coût d'erreur et autonomie attendue changent la difficulté. Un petit modèle peut suffire à une tâche étroite ; ce n'est pas une règle universelle pour les mails.

Écrire le contrat attendu : entrée, sortie, critères de refus, droits, délai cible, volume de pointe et intervention humaine. Fixer les seuils métier avec le responsable du processus avant de regarder les résultats. Sinon, on risque de déplacer les critères pour favoriser le modèle testé.

## Préparer une comparaison équitable

Conserver un jeu de développement pour ajuster prompts et paramètres, et un jeu de test séparé pour l'évaluation finale. Inclure cas fréquents, rares, ambigus et hors périmètre. Ne pas utiliser les corrections du test pour améliorer le système puis présenter le même test comme une mesure indépendante.

Comparer une référence simple, par exemple des règles, à deux configurations de modèle. Fixer ou enregistrer versions, quantification, prompt, outils, données, paramètres de génération et conditions de charge. Un seul essai ne mesure pas la variabilité ; répéter les cas sensibles et noter les échecs intermittents.

## Mesurer deux familles de résultats

Pour le service, distinguer temps jusqu'au premier token, délai de réponse complète, débit et erreurs. Examiner les percentiles : un p95 de latence signifie qu'environ 95 % des observations sont inférieures ou égales à cette valeur, selon la méthode de calcul. Tester un utilisateur puis une concurrence représentative ; les files d'attente changent l'expérience.

Pour le métier, mesurer les erreurs par catégorie, les sorties invalides, les abstentions, les actions incorrectes et le temps humain nécessaire à la validation. Une réponse rapide mais fausse n'est pas une amélioration. Le coût pertinent peut être le coût total par dossier accepté, incluant exploitation et vérification, et pas seulement le prix des tokens.

## Exemple chiffré fictif

Sur un lot de 100 demandes, une référence par règles classe correctement 80 demandes. La configuration A en classe 92, avec 2 confusions jugées critiques ; B en classe 90, sans confusion critique observée mais avec davantage de demandes envoyées à un humain. Aucun résultat n'est un benchmark réel.

Choisir A sur le seul total serait prématuré. Il faut définir si les abstentions sont comptées comme des erreurs, examiner les catégories, mesurer le travail humain et élargir le test. Zéro erreur critique observée sur un petit échantillon ne prouve pas un risque nul.

## Exercice : décider avec tes ressources

Pour une classification fictive, comparer trois emplacements : une machine GPU de 12 Go, un serveur CPU avec beaucoup de RAM et une API autorisée dont tu ne gères pas le matériel. Écrire pour chacun les mesures possibles et les inconnues. Ne pas inventer les performances.

> [!answer]- Repères de correction
> en local, relever mémoire et latence avec une charge définie ; sur CPU, mesurer le débit plutôt que l'inférer de la RAM ; sur API, mesurer latence, quotas et taux d'erreur, demander la politique de données. Pour les trois, utiliser les mêmes critères métier. Un résultat comparable nécessite de signaler les différences de modèles et de conditions.

## Livrable attendu pour un client

Une recommandation conditionnelle : besoin, configurations testées, résultats, limites, coût estimé avec hypothèses, risques et prochaine validation. Elle doit permettre de refaire la mesure. Rapprocher ce livrable de [[CPU GPU RAM et VRAM]] et de [[Appeler des outils avec un modèle]] avant de proposer davantage d'autonomie.

## Sources et portée

Sources consultées le 12 novembre 2026. Le protocole et les exemples métier sont originaux ; les outils de charge ne remplacent pas l'évaluation fonctionnelle.

- [vLLM — Mesures d'un service d'inférence](https://docs.vllm.ai/en/latest/cli/bench/serve/)
- [NVIDIA — Préremplissage, génération et optimisation](https://developer.nvidia.com/blog/mastering-llm-techniques-inference-optimization/)

# Diagnostic des animations et du score mobile — 23 octobre 2026

**Les mesures ne montrent pas d'amélioration reproductible en désactivant les apparitions au défilement.** La variabilité est trop forte pour attribuer la baisse à 86 aux animations, ou pour prétendre que leur activation accélère le site. Le réglage d'origine est restauré : animations actives, thème en brouillon, aucun commit.

## Rapport fourni par le candidat

Le [rapport à 86](https://pagespeed.web.dev/analysis/https-7den3zgw47juxmn5-85280489700-shopifypreview-com-products-serum-precieux-regenerant/dazx8ya1ng?form_factor=mobile), daté du 23 octobre à 19 h 28 dans l'interface, donne FCP 2,266 s, LCP 3,601 s, TBT 48 ms, CLS 0 et Speed Index 4,143 s. Les valeurs exactes viennent du lien de calcul Lighthouse ; l'interface les arrondit. Le faible TBT et le CLS nul ne pointent pas vers un blocage JavaScript ou un déplacement de mise en page comme cause principale de ce score.

L'image principale du sérum est l'élément LCP ; elle conserve `loading="eager"` et `fetchpriority="high"`. Le diagnostic indique 320 ms d'économie potentielle sur les ressources bloquant le rendu. La décomposition LCP présente 210 ms de réponse serveur, 650 ms de délai avant chargement, 60 ms de chargement et 1 100 ms de délai de rendu. Ces durées du diagnostic ne sont pas additionnées à la valeur LCP simulée de 3,601 s.

## Comparaison du réglage Shopify

Six audits mobiles Google PageSpeed Insights / Lighthouse 13.5.0, lancés successivement, trois par état. L'ordre réel est ON1, OFF1, OFF2, OFF3, ON2, ON3. Le seul réglage modifié est `knr_scroll_reveals`. Aucun changement de code, d'image, de contenu ou de protection de la boutique ; carrousel de réassurance à 4 secondes dans les deux états. Le module JavaScript partagé reste chargé dans les deux cas : il s'agit du comportement réel de l'interrupteur Shopify, pas d'une suppression du fichier.

Même URL visiteur, chemin produit, vue `knr-serum` et `pb=0` ; un paramètre de diagnostic unique `knr_motion_ab` évite de réutiliser exactement la même URL d'audit. Cela ne garantit pas des caches, serveurs ou conditions Google identiques. Les aperçus des rapports correspondent à la fiche produit. L'absence puis la présence du contrôleur sont vérifiées séparément dans le DOM de l'aperçu authentifié.

| Essai | Performance | FCP | LCP | TBT | CLS | Speed Index | Rapport |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| on-1 | 90 | 1.982 s | 3.301 s | 41 ms | 0 | 2.552 s | [Google](https://pagespeed.web.dev/analysis/https-7den3zgw47juxmn5-85280489700-shopifypreview-com-products-serum-precieux-regenerant/e238gsvu75?form_factor=mobile) |
| off-1 | 75 | 2.299 s | 3.451 s | 535 ms | 0 | 2.668 s | [Google](https://pagespeed.web.dev/analysis/https-7den3zgw47juxmn5-85280489700-shopifypreview-com-products-serum-precieux-regenerant/rp2ud2k6gq?form_factor=mobile) |
| off-2 | 57 | 3.669 s | 6.033 s | 387 ms | 0 | 5.576 s | [Google](https://pagespeed.web.dev/analysis/https-7den3zgw47juxmn5-85280489700-shopifypreview-com-products-serum-precieux-regenerant/vwf9vr0j6q?form_factor=mobile) |
| off-3 | 94 | 2.003 s | 2.456 s | 166 ms | 0 | 2.425 s | [Google](https://pagespeed.web.dev/analysis/https-7den3zgw47juxmn5-85280489700-shopifypreview-com-products-serum-precieux-regenerant/a9wcthcw2l?form_factor=mobile) |
| on-2 | 90 | 2.198 s | 3.301 s | 27 ms | 0 | 2.656 s | [Google](https://pagespeed.web.dev/analysis/https-7den3zgw47juxmn5-85280489700-shopifypreview-com-products-serum-precieux-regenerant/30igf0969v?form_factor=mobile) |
| on-3 | 88 | 2.197 s | 3.451 s | 93 ms | 0 | 2.396 s | [Google](https://pagespeed.web.dev/analysis/https-7den3zgw47juxmn5-85280489700-shopifypreview-com-products-serum-precieux-regenerant/epvxgbacr6?form_factor=mobile) |

| Médiane de 3 essais | Performance | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: |
| Activées | 90 | 3.301 s | 41 ms | 0 |
| Désactivées | 75 | 3.451 s | 387 ms | 0 |

Tous les résultats, y compris les essais lents, sont conservés. Ces petits groupes non randomisés ne permettent pas d'isoler un faible effet causal. Leur différence de médiane ne doit pas être vendue comme un gain apporté par les animations. Google recommande de répéter les mesures, car les conditions de serveur, réseau, navigateur et contenu peuvent faire varier les résultats : [documentation Lighthouse sur la variabilité](https://github.com/GoogleChrome/lighthouse/blob/main/docs/variability.md), [calcul du score](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring).

Dans OFF1, le diagnostic des tâches longues attribue notamment 423 ms au gestionnaire de pixels Shopify et 134 + 112 ms à Trekkie. Le module KNR apparaît aussi avec une tâche de 71 ms, malgré la désactivation du contrôleur d'apparition. Cette observation explique une partie de la charge de cet essai ; elle ne prouve pas l'origine de chaque ralentissement ni celle du rapport à 86.

## Vérification de l'implémentation et décision

Le hero et les informations d'achat sont exclus des 15 cibles éditoriales. Le contenu est visible sans JavaScript et avant toute animation. Les apparitions utilisent `IntersectionObserver`, se jouent une fois et animent seulement opacité et translation, avec 400 ms sur ordinateur et 360 ms sur mobile. Le mouvement réduit les désactive. Le test de chargement Lighthouse ne mesure pas toute la fluidité du défilement ; aucun résultat FPS ou iPhone réel n'est revendiqué ici.

Décision : conserver l'effet demandé. Le délai d'affichage du hero et les ressources qui bloquent le rendu restent les pistes pertinentes pour une éventuelle optimisation du chargement, à valider sans altérer Figma ni les composants Shopify. Aucun retrait de script natif ou changement visuel spéculatif n'a été effectué.

La configuration d'origine a été remise à l'identique, puis la présence des 15 cibles, l'absence de zoom sur le hero et l'intervalle de 4 secondes ont été vérifiés. Le retour CLI confirme le rôle `unpublished`. Les sources n'ont aucun commit.

## Preuves

- [Résultats structurés](final-validation/motion-performance/results.json) et [médianes](final-validation/motion-performance/summary.json).
- [Rapport fourni, diagnostic développé](final-validation/motion-performance/user-86-report.txt).
- [Tâches longues OFF1](final-validation/motion-performance/off-1-long-tasks.txt).
- [État désactivé](final-validation/motion-performance/verify-off-1.json) et [état restauré](final-validation/motion-performance/verify-restored-on.json).
- Les fichiers `on-1.txt` à `on-3.txt` et `off-1.txt` à `off-3.txt` conservent les relevés de l'interface ; il ne s'agit pas d'un export JSON natif de Lighthouse. Les liens Google peuvent être actualisés, les relevés locaux datés font foi pour cette recette.

Les mesures précédentes 88 mobile / 98 ordinateur restent l'historique de la passe avant carrousel et retrait du zoom du hero ; aucun nouvel audit ordinateur n'est revendiqué dans cette comparaison mobile.

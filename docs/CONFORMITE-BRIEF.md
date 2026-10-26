# Contrôle de conformité au brief KNR

> **État actualisé au 26 octobre, après revue :** thème KNR publié, modèle attribué, URL permanente et accès visiteur vérifiés. Livraison en un seul commit initial. Voir [LIVRAISON.md](LIVRAISON.md). Les états de brouillon ci-dessous sont l’historique daté des vérifications ; ils ne décrivent plus l’état de livraison.

Relecture intégrale le **23 octobre 2026**, avec état de livraison actualisé le **26 octobre** du [document d’origine](https://app.notion.com/p/knr/Int-gration-d-une-page-produit-sur-Shopify-35eb2ed6fcd38046b4bee480f0a779e7?v=356b2ed6fcd380b7b8f7000c9a4700b2), puis contrôle des sources, des preuves de validation et des états Shopify/GitHub. Ce document distingue les obligations de l’exercice des vérifications supplémentaires de notre plan.

**L’implémentation technique et les sources de contenu attendues sont en place. La livraison reste incomplète : le dépôt public attend son unique commit, la revue du candidat et le contrôle final du lien restent ouverts. Une identité visuelle absolue n’est pas revendiquée, notamment pour les arbitrages de contenu documentés.**

## Exigences techniques

| Exigence du brief | État et preuve |
| --- | --- |
| Development Store Shopify | Vérifié dans le Dev Dashboard : Maison Celestine - KNR Test, type **Dev**, plan **Basic**, organisation **Mosaixel**. |
| Thème Shopify par défaut, sans thème tiers | Horizon **4.3.0**, installé lors de la création. Version contrôlée par l’assembleur ; notice de licence conservée. |
| Shopify CLI pour le développement local | CLI utilisée pour récupérer, contrôler, prévisualiser et déployer le thème. Commandes reproductibles dans le README. |
| Liquid et template produit dédié KNR | `theme/templates/product.knr-serum.liquid`. Le suffixe est `knr-serum` ; le préfixe de type `product.` reste nécessaire au nommage Shopify. |
| Sections Liquid séparées préfixées KNR | Douze fichiers : annonce, en-tête, produit, ingrédients, utilisation, résultats/témoignages, FAQ, avis, actualités, newsletter, réassurance et pied de page. |
| CSS natif/SCSS sans framework | CSS natif, règles propres aux classes KNR et au layout `.knr-page`. Aucun framework CSS ajouté. |
| JavaScript natif sans jQuery/React/framework ajouté | Module natif, API navigateur et contrats natifs d’Horizon. Le composant de base et les événements panier proviennent du thème Shopify conservé. |
| JavaScript non bloquant | Script `type="module"`, dont l’exécution est différée par le navigateur. |
| Inter | WOFF2 locaux 400/700 et licence OFL fournie. |
| Produit test : titre, description, deux volumes, quatre images | Ressources Shopify présentes ; quatre images observées dans la galerie. 15 mL à 75 € et 150 mL à 150 €, prix barrés 85 €/170 €. |

Les sections statiques conservent leurs réglages et blocs éditables. Leur ordre est fixé par le template Liquid ; cette limite est expliquée dans le README.

## Contenus dynamiques

| Contenu demandé | Source effective / vérification |
| --- | --- |
| Nom, description, prix, prix barré, images | Objets Shopify produit/variante/médias ; métachamps facultatifs pour compléter les détails. |
| Variantes et changement de prix | Liens de variantes et données Liquid ; prix, prix barré, prix unitaire, média, disponibilité et URL synchronisés et testés. |
| Badge panier | `cart.item_count`, puis réponses Ajax confirmées et événements panier Horizon. |
| Fil d’Ariane collection + produit | Collection courante, réglage de collection ou première collection produit ; titre/URL Shopify et `product.title`. |
| FAQ | Blocs question/réponse ; changement dans l’éditeur enregistré, observé puis restauré. |
| Réassurance | Blocs éditables pour titres et textes ; disponibilité reliée à la variante. |
| Navigation en-tête/pied de page | Menus Shopify et destinations natives ; liens configurés et contrôlés. |
| Actualités | Blog choisi, articles, images, tags, extraits et URLs Shopify. Titres courts facultatifs et recadrage réglables par article dans la section. |
| Avant/après et utilisation | Images, textes et blocs de section ; remplacement/restauration d’image et rechargement de section vérifiés. |
| Autres éléments | Annonce, ingrédients, newsletter, logos et pied de page via réglages ; recommandations via références produit ; avis/témoignages via métaobjets ; interface via locales. |

Les données de démonstration dans `data/` et `content/` initialisent des ressources éditables. Elles ne remplacent pas les objets Shopify dans le rendu. Les icônes, classes et proportions restent du code de présentation ; logos et image de certification disposent d’un remplacement dans l’éditeur.

### Corrections issues de cette relecture

- Les étoiles décoratives des résumés et témoignages étaient fixées à cinq. Elles lisent maintenant la note correspondante, arrondie à l’étoile la plus proche ; la valeur numérique exacte reste disponible. Une note absente ne devient pas artificiellement cinq étoiles.
- Le recadrage d’une actualité dépendait du mot `engagement` dans son URL. Une case à cocher sur le bloc lié à l’article le contrôle désormais. Le recadrage actuel est conservé.
- Le texte alternatif du logo de repli provient du nom de la boutique ; le libellé Pinterest est dans les traductions.
- La remise se prépare pour le **formulaire reçu par e-mail**, avec l’adresse de candidature initiale.

## Fidélité visuelle et comportement

La page complète, de l’annonce au pied de page, a fait l’objet d’une comparaison section par section aux frames desktop 1440 px et mobile 390 px. La [galerie comparative](audit-visuel/index.html) et l’[audit visuel](AUDIT-VISUEL.md) consignent les mesures et corrections. Les contrôles à 320, 375, 390, 768, 1024, 1440 et 1920 px ne montrent pas de débordement horizontal du document.

**Réserve à conserver :** prix incohérents mobile, calcul du prix unitaire, textes abrégés/anglais, avis fictifs et liens sociaux sans destination ont fait l’objet d’arbitrages convenus avec le candidat. Cela produit des différences de texte, de retours à la ligne et parfois de hauteur. Le [journal des corrections](CORRECTIONS-MAQUETTE.md) les expose ; le recruteur/client ne les a pas encore validées. Le critère de fidélité au pixel reste soumis à leur appréciation et ne doit pas être présenté comme une identité exacte entre toutes les captures.

Les parcours panier, galerie, variantes, menus, comparaison, accordéons, avis et newsletter ont des résultats documentés dans [VALIDATION.md](VALIDATION.md). Aucun audit global WCAG AA, score Lighthouse ou test Safari/iOS réussi n’est annoncé sans preuve.

## Livraison et soumission

| Obligation du brief | État au 26 octobre 2026 |
| --- | --- |
| GitHub public contenant le code | Dépôt `dragnoir/knr-maison-celestine` confirmé **PUBLIC**, mais **vide**. Sources locales prêtes pour revue ; exigence de livraison non terminée. |
| Un seul commit pour les modifications | Aucun commit créé. Un seul commit prévu après revue ; contrôler le total après le push. |
| Lien produit sur le Development Store | Prévisualisation du thème **189290447076** disponible ; elle ouvre le produit avec `view=knr-serum`. Thème confirmé non publié. |
| Store accessible, mot de passe KNRDEV | Mot de passe testé lors de la recette ; protection active observée dans l’aperçu. Refaire le parcours dans une session visiteur avec le lien final. |
| Formulaire reçu par e-mail | Champs et notes préparés dans [REMISE.md](REMISE.md). Aucun formulaire soumis. |
| Adresse de la candidature initiale | À respecter lors de la saisie du formulaire par le candidat. |
| Cinq jours calendaires après réception | Réception confirmée par le candidat : 22 octobre 2026 à 14:55, heure de Tunis. Échéance calculée : 27 octobre 2026 à 14:55 ; soumission prévue le 27 au matin. |
| Notes techniques éventuelles | README français, architecture, contenus, corrections et résultats de validation disponibles. |
| Usage de l’IA | Autorisé/encouragé par le brief ; la compréhension reste évaluée. La documentation explique les choix mais ne certifie pas la capacité du candidat à les présenter. |

Le brief demande le dépôt contenant le code du candidat, sans exiger explicitement la redistribution publique intégrale du thème de base. Le dépôt publiera le code spécifique et son assembleur ; le thème complet est fourni séparément en raison de la notice Horizon. Cette distinction doit rester visible dans les notes, voir [LICENCES.md](LICENCES.md).

## Étapes de notre plan distinctes du brief

Après revue : publication du thème, attribution du modèle, vérification de l’URL durable sans paramètres, commit unique et contrôle de l’accès public au code. Le brief accepte une URL de prévisualisation : la publication n’est pas une obligation supplémentaire à lui attribuer.

Compléments encore ouverts : Lighthouse sur l’URL finale et Safari/iOS. La réception effective d’un contact et la confirmation serveur sont désormais vérifiées. Les audits axe ont été exécutés ; leurs résultats, les limites de contraste de la maquette et les essais de contenus sont dans [RECETTE-COMPLEMENTAIRE.md](RECETTE-COMPLEMENTAIRE.md). Le candidat a confirmé la conservation des couleurs Figma : aucune modification de direction artistique n'est attendue dans cet exercice. Les anciennes mesures mobiles ne remplacent pas Lighthouse ; un [audit Google PageSpeed](PERFORMANCE-PAGESPEED.md) a depuis été réalisé sur le brouillon, avec des médianes de 88 mobile / 98 ordinateur après animations et survols.

Les corrections de cette relecture passent Theme Check (**0 erreur, 2 avertissements Horizon inchangés**), la syntaxe JavaScript et le formatage des sources. Elles sont intégrées à la prévisualisation, sans publication ni commit.

## Dernière revue avant remise

La [revue du 26 octobre](REVUE-AVANT-SOUMISSION.md) termine la comparaison des nouvelles captures desktop/mobile. Aucun nouveau défaut de thème nécessitant une correction identifié. La recette des 25–26 octobre couvre les variantes, le panier, les erreurs Ajax, les contrôles clavier, les formulaires sans nouvel envoi et les sept largeurs sans débordement. Le thème est toujours non publié, le dépôt public est vide et l’historique local compte zéro commit. Les archives et les notes sont préparées pour approbation, pas déjà soumises.

La dernière vidéo dure 3 min 28 s en seize séquences. Six nouveaux audits PageSpeed ont été terminés le 26 octobre : médianes 81 mobile / 98 ordinateur, avec une plage mobile 68–90. Le LCP mobile reste un point ouvert ; aucun résultat n’est écarté ni attribué sans preuve aux animations. Les mesures anciennes gardent leur date et leurs limites. Le vrai test Safari/iOS et l’accès visiteur au lien final restent ouverts.

## Complément international du 26 octobre

La capture iPhone du candidat a confirmé un défaut non résolu par les précédents contrôles France : le parcours international affichait une région de repli sans achat autorisé. La configuration livrée utilise maintenant les marchés France/États-Unis et un marché international de recette, avec un profil d’expédition standard et une zone liée au stock. Les ajouts serveur et la restauration des paniers ont été retestés ; le candidat confirme les deux tailles et le panier sur iPhone 16 Pro. [Configuration et preuves](DISPONIBILITE-INTERNATIONALE.md).

Le code ne force aucune disponibilité et le stock suivi reste à 100 par variante. Les six mesures PageSpeed du matin précèdent ce correctif administratif ; la revue Safari exhaustive reste ouverte, distincte du contrôle ciblé confirmé sur l’appareil du candidat. Thème toujours non publié, zéro commit.

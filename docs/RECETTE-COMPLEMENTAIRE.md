# Recette complémentaire — 23 octobre 2026

Thème KNR de revue `189290447076`, non publié. Aucune modification du thème Horizon publié, aucun commit, aucune candidature soumise.

## Cas limites sur des données Shopify réelles

Un duplicata **non répertorié** du produit principal a été créé pour la recette, puis **archivé** à la fin. Le produit principal conserve ses deux variantes disponibles et ses tarifs prévus.

| Essai | Observation et correction |
| --- | --- |
| Titre de 104 caractères et description riche longue | Retours à la ligne et hauteur intrinsèque du panneau conservés. Contrôle aux sept largeurs 320, 375, 390, 768, 1024, 1440 et 1920 px sans débordement horizontal. |
| 15 mL à 79 €, sans prix comparatif, stock zéro | Prix marchand repris, ancien prix masqué, 526,67 €/100 mL calculés, bouton indisponible. Données limitées au duplicata. |
| Première variante épuisée, seconde disponible | L’entrée sans paramètre sélectionne la première variante disponible. Retour arrière et média initial corrigés pour suivre le même choix. |
| Avis, témoignages et références complémentaires vidés | Pas de moyenne inventée, message sans avis, filtres inutiles masqués ; témoignages et produits complémentaires absents. Suppression du repli prérempli qui empêchait de vider les produits complémentaires. |
| Menu avec libellé long | Modification via Shopify, affichage vérifié à 768 px sans collision entre logo, navigation et actions. Libellé « Produits » restauré et contrôlé. |
| Extrait d’article | Modification de l’extrait « 97 % naturel certifié » via Shopify, changement observé sur la carte Actualités, texte original restauré et contrôlé. |
| Ordre de blocs FAQ | Deux premiers blocs inversés dans la configuration de section via CLI, ordre rendu vérifié ; configuration originale restaurée. Les changements de titre/image avaient aussi été testés dans l’éditeur Shopify. |
| Image de proportions différentes | Image paysage 2816 × 1536 placée temporairement dans une carte d’usage carrée. Recadrage `cover`, proportions de la case et absence de débordement vérifiés à 1440 px ; image d’origine restaurée. |

Le chevauchement du panneau desktop est intentionnel : la section suivante réserve l’espace nécessaire. Sur les petites largeurs, le panneau revient dans le flux. Les essais vérifient la tenue du contenu, pas une hauteur figée indépendante des textes du marchand.

Preuves : [mesures des sept largeurs](final-validation/stress-layout.json), [capture mobile du produit de recette](final-validation/stress-mobile.png), [retour arrière](final-validation/variant-back-fixed.json), [menu](final-validation/menu-edit.json), [article](final-validation/article-edit.json), [blocs et image](final-validation/block-image-stress.json).

## Formulaire de contact : réception confirmée

Le message de test `KNR-RECETTE-20261023` a été reçu dans la boîte du marchand. Le candidat a fourni la capture de la notification Shopify : produit concerné, type `question`, nom de recette et corps du message sont présents. Aucune demande commerciale réelle ni publication d’avis.

La page affiche aussi la confirmation native : « Merci, votre message a été envoyé pour modération. Il n’est pas publié automatiquement. » Voir la [capture de succès](final-validation/contact-success.png) et le [relevé](final-validation/contact-dialog-check.json). La capture de la boîte mail personnelle n’est pas incluse dans le dépôt public.

Un dialogue modal peut masquer une vérification injectée par Shopify à l’extérieur du dialogue. À la soumission valide, le composant conserve donc le formulaire visible dans un dialogue non modal, laissant la vérification accessible. Les champs requis sont validés avant cette transition ; Échap et le bouton de fermeture restent gérés. La protection Shopify demeure active et ses bibliothèques internes ne sont pas appelées directement. [Documentation Shopify CAPTCHA](https://shopify.dev/docs/storefronts/themes/trust-security/captcha).

## Accessibilité automatisée

axe-core **4.14.0**, tags `wcag2a`, `wcag2aa`, `wcag21aa` et `best-practice`, exécuté sur le DOM réel de la prévisualisation. Les rôles de bannière/pied de page, régions, groupes de variantes et notes d’avis ont été corrigés. Après correction, les règles en violation sont :

| Capture d’audit | `color-contrast` | `frame-title` |
| --- | ---: | ---: |
| Desktop, haut de page | 10 éléments | 1 iframe de barre d’aperçu Shopify |
| Desktop, avis | 10 éléments | 1 iframe de barre d’aperçu Shopify |
| Mobile, avis | 6 éléments | 1 iframe de barre d’aperçu Shopify |

Ces chiffres comptent des éléments, pas des règles distinctes. Les entrées « incomplete » des rapports exigent une revue humaine ; elles ne sont pas des résultats réussis. Les contenus d’iframes externes ne sont pas un audit complet de leurs interfaces.

Les teintes secondaires de Figma sont conservées conformément à la décision du candidat du 23 octobre 2026 : respecter la direction artistique fournie pour cet exercice d'intégration. Sur blanc, les couples observés comprennent `#b5a282` (2,48:1), `#e2d3bb` (1,47:1) et `#ccc` (1,60:1), sous le seuil 4,5:1 du texte normal. Les libellés sur photographie demandent un examen du fond réel ; une déduction automatique de fond blanc ne suffit pas. Une conformité globale WCAG AA n’est **pas** revendiquée. Ces limites de contraste sont signalées au client dans les notes de remise ; elles ne constituent plus un arbitrage en attente ni une modification prévue pour cet exercice.

Rapports bruts : [desktop](final-validation/axe-desktop-after.json), [desktop avis](final-validation/axe-desktop-reviews.json), [mobile avis](final-validation/axe-mobile-reviews.json). Les contrôles manuels de clavier, focus, dialogues et mouvement réduit sont décrits dans [VALIDATION.md](VALIDATION.md).

## Performance et Safari : historique et mise à jour

- **Lighthouse : résultat désormais disponible via [Google PageSpeed](PERFORMANCE-PAGESPEED.md), médianes 88 mobile / 98 ordinateur après animations et survols.** Historique des tentatives locales : Le lancement automatisé est bloqué par une commande CDP non prise en charge (`Target.getTargetInfo`). Le candidat a également essayé l’interface Chrome ; il a signalé un blocage de plus de dix minutes. Aucun score n’a été extrapolé. Les anciennes mesures FMP/DCL restent des mesures distinctes, sans valeur de substitution à LCP/INP/CLS.
- **Safari/iOS : non vérifié.** BrowserStack authentifié a signalé une indisponibilité due à la charge pour iPhone 15/iOS 17, iPhone 16/iOS 18, iPhone 14 Pro/iOS 16, iPhone 13/iOS 18 et Safari 17.3/macOS Sonoma. Aucune session utile n’a démarré. L’essai affiche une minute par appareil ; aucun abonnement payant n’a été souscrit.

Suite : recontrôler Lighthouse sur l’URL finale après publication approuvée, puis effectuer un essai Safari réel quand une session est disponible. Contrôler galerie tactile, variante, panier, dialogue, clavier, comparateur et défilement du panneau. Reporter navigateur, version et résultat exact.

## Vérification du code et livraison

`npm run check` comprend syntaxe JavaScript, cohérence des contenus et formatage. Le contrôle de contenu vérifie les douze sections, leurs réglages/blocs/ordres, les clés FR/EN, références d’assets et images de reprise. Un workflow GitHub Actions à permissions de lecture est préparé avec versions d’actions figées ; **il n’a pas été exécuté sur GitHub**, le dépôt restant vide avant revue.

Theme Check ne signale aucune erreur et conserve deux avertissements dans `snippets/bento-grid.liquid` d’Horizon, inchangé. La validation finale et les paquets utilisent la même version des fichiers KNR. Les captures et la vidéo restent des preuves de recette d’un thème en brouillon, pas une déclaration de publication.

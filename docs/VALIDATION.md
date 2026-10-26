# Rapport de validation — version de revue

> **État actualisé au 26 octobre, après revue :** thème KNR publié, modèle attribué, URL permanente et accès visiteur vérifiés. Livraison en un seul commit initial. Voir [LIVRAISON.md](LIVRAISON.md). Les états de brouillon ci-dessous sont l’historique daté des vérifications ; ils ne décrivent plus l’état de livraison.

Rapport initial : contrôles des **22 et 23 octobre 2026**. Dernière revue de recette et des captures les **25 et 26 octobre**, détaillée dans [REVUE-AVANT-SOUMISSION.md](REVUE-AVANT-SOUMISSION.md). Contrôles initiaux, sur Chrome, boutique de développement `maison-celestine-knr-test.myshopify.com`, thème **KNR - Preview / 189290447076**, Horizon **4.3.0**. Le thème demeure **non publié**. Aucun commit n’a été créé. La [recette complémentaire](RECETTE-COMPLEMENTAIRE.md) détaille les cas limites, axe, les changements de contenus et les blocages des outils externes.

## Vérifications fonctionnelles

Le [premier retour de revue](RETOURS-REVUE.md) corrige le panier desktop qui comprimait la page : superposition modale, largeur stable, clavier, défilement, mises à jour panier et six largeurs vérifiés sur le brouillon.

| Parcours | Résultat observé |
| --- | --- |
| Accès protégé | Mot de passe KNRDEV accepté ; page française en EUR. |
| Variantes | 15 mL : 75 €/85 €, 500 €/100 mL. 150 mL : 150 €/170 €, 100 €/100 mL. Prix, média, disponibilité et URL synchronisés. |
| URL directe de variante | Le média associé est sélectionné au chargement. |
| Barre flottante | Sélection de 150 mL depuis la barre : les deux sélecteurs et les trois affichages de prix passent à 150 €. Retour à 15 mL confirmé. |
| Ajout au panier | Réponse Ajax confirmée, ouverture du tiroir Horizon, produit/variante et compteur corrects. |
| Quantités et retrait | 150 mL × 2 = 300 €, retour à 1 = 150 €, retrait et panier vide confirmés. |
| Persistance | Panier contenant un article conservé après rechargement, puis retrait confirmé. |
| Clics répétés | Double clic avec latence réseau : un seul article ajouté. |
| Erreur réseau | Réseau coupé pendant l’ajout : message français, compteur inchangé, bouton réactivé. Réseau restauré ensuite. |
| Indisponibilité | État indisponible observé avant configuration de la livraison France ; contrôles désactivés et message corrigé. Les deux variantes sont disponibles dans l’état livré. |
| Galerie | Navigation mobile et progression vérifiées. Après revue, le hero est non cliquable ; zoom, fermeture par Échap/fond/croix et retour du focus sur les deux images secondaires desktop. |
| Navigation mobile | Ouverture/fermeture, Échap et retour du focus vérifiés. |
| Comparateur | Flèche droite : valeur 50 → 51, position et libellé accessible synchronisés. Vérifié aussi dans l’éditeur après rechargement de section. |
| Témoignages | Navigation suivante/précédente, état 2/3 et bouclage 1 → 3 vérifiés. |
| Accordéons | Description, FAQ et menus de pied de page fonctionnels ; ouverture et fermeture de la seconde FAQ vérifiées. |
| Avis | Filtre 4 étoiles : 2 résultats. Tous les avis + Charger plus : 6 résultats ; bouton masqué en fin de liste. |
| Formulaires avis/questions | Dialogues, champs requis, validation HTML, Échap et restauration du focus vérifiés. Aucun avis n’est publié automatiquement. |
| Newsletter | E-mail vide/invalide rejeté par la validation native. Soumission de test acceptée par Shopify ; hCaptcha complété par le candidat ; retour sur la vue KNR avec « Merci pour votre inscription. ». |
| Confidentialité | Bannière native Shopify, refus des cookies et réouverture des préférences depuis le pied de page vérifiés. |
| Localisation | Choix France conservant la vue produit KNR ; prix et disponibilité vérifiés. |
| Actualités et menus | Quatre articles publiés dans l’ordre prévu ; menus principaux et de pied de page reliés à des destinations Shopify. |

La réception du contact est **confirmée** : le candidat a fourni la capture de la notification Shopify contenant le produit, le type `question` et le message de recette. La [confirmation serveur](final-validation/contact-success.png) est également visible sur le storefront. Aucun achat réel n’a été effectué.

## Éditabilité dans Shopify

- Produit : configuration et correction des images, associations aux variantes, prix unitaires et métachamps visibles sur la page.
- FAQ : titre modifié dans l’éditeur en « Questions fréquentes — contrôle éditeur », enregistré et observé dans une autre vue du storefront ; titre original ensuite rétabli et vérifié.
- Image : image Avant remplacée par l’image Après via la bibliothèque Shopify, enregistrée et vérifiée par son URL rendue ; image Avant originale ensuite restaurée et vérifiée.
- Rechargement de section : comparateur manipulé au clavier dans le nouvel aperçu de l’éditeur, valeur 51 observée après remplacement de section.
- Menus : ajout et correction des handles des trois menus de pied de page, puis vérification de leur rendu.
- Articles : titres, images et dates de publication enregistrés dans Shopify ; ordre de la section Actualités vérifié.

## Responsive et images

Mesure DOM aux largeurs **320, 375, 390, 768, 1024, 1440 et 1920 px** : aucun débordement horizontal du document. La grille du produit empêche le panneau de recouvrir le contenu suivant, notamment à 768 px. Les listes horizontales restent volontairement défilables.

Comparaison visuelle avec les exports Figma 1440 × 8544 et 390 × 8440 : galerie, panneau, images ingrédients/usage, comparateur, FAQ, avis, actualités, newsletter et pied de page. Corrections apportées aux espacements des accordéons, à la taille du titre mobile, aux badges, au recadrage du hero, à l’image newsletter mobile, au lien des actualités et aux chevrons.

Les contenus desktop sont communs aux deux tailles : la longueur de certains paragraphes, les six avis de démonstration et la traduction des titres expliquent des différences de hauteur et de retours à la ligne. Le panneau produit utilise une hauteur intrinsèque pour rester robuste lorsque le marchand modifie les contenus. Les nouvelles captures de l’audit détaillé masquent la barre native de prévisualisation Shopify via sa commande dédiée.

Captures principales de la revue détaillée : [desktop](audit-visuel/desktop-top.png), [mobile](audit-visuel/mobile-top.png), [FAQ mobile](audit-visuel/mobile-faq.png), [newsletter mobile](audit-visuel/mobile-newsletter.png). La [galerie comparative](audit-visuel/index.html) présente les sections séparément. Les anciennes captures du dossier screenshots documentent les premiers contrôles fonctionnels ; les captures détaillées font référence pour la revue visuelle.

## Accessibilité

Audit structurel DOM et contrôles manuels au clavier : langue `fr`, un seul H1, aucun ID dupliqué, aucun champ visible sans label, aucun bouton visible sans nom accessible, aucun lien vide ou `href="#"`, et attribut `alt` présent sur toutes les images KNR. Les images purement décoratives ont un alt vide.

Les contrôles sont natifs (`button`, `details/summary`, `input range`, `dialog`), les résultats utilisent des régions de statut, le focus est visible et les dialogues rendent le focus à leur déclencheur. Les animations et défilements respectent `prefers-reduced-motion`. Des audits axe-core 4.14.0 ont été exécutés : les corrections structurelles et les violations de contraste restantes sont détaillées dans [RECETTE-COMPLEMENTAIRE.md](RECETTE-COMPLEMENTAIRE.md). Aucune conformité globale WCAG AA n’est revendiquée. Le contraste sur photographie dépend du fond réel.

## Qualité du code

- **Shopify Theme Check : 0 erreur**, 2 avertissements `UnclosedHTMLElement` dans `snippets/bento-grid.liquid`, fichier Horizon inchangé. Aucun avertissement dans les fichiers KNR.
- Exceptions ciblées documentées dans `.theme-check.yml` pour les traductions non françaises de la base, les identifiants statiques natifs répétés et un filtre Shopify utilisé par Horizon que le bundle CLI ne reconnaît pas encore. Les fichiers personnalisés restent contrôlés.
- `node --check` : module JavaScript personnalisé et script d’assemblage valides.
- Prettier + plugin Liquid Shopify : vérification réussie des sources personnalisées.
- Assemblage effectué avec une copie fraîche du thème Horizon installé sur la boutique ; validation de sa version 4.3.0 avant assemblage.
- Aucun framework front-end, aucune URL temporaire Figma dans le paquet livré ; Inter auto-hébergé, 39 112 + 40 668 octets en WOFF2.

## Mesure de performance mobile

Mesure navigateur sur la **prévisualisation protégée**, viewport vérifié **390 × 844**, cache désactivé, CPU ralenti ×4, latence 150 ms, débit descendant 200 000 octets/s et montant 93 750 octets/s. Paramètres de ralentissement restaurés après le test.

| Mesure Chrome observée | Valeur |
| --- | ---: |
| First Meaningful Paint, depuis NavigationStart | 4,478 s |
| DOMContentLoaded, depuis NavigationStart | 7,267 s |

Ces métriques CDP ne sont **ni un score Lighthouse, ni LCP/INP/CLS**, et ne doivent pas être présentées comme telles. Les mesures incluent les scripts Horizon, Shopify, protection de formulaire et barre d’aperçu. Le journal réseau ayant été tronqué par l’outil, aucun total de transfert fiable n’est annoncé. Les valeurs brutes et conditions sont dans [mobile-performance.json](mobile-performance.json).

Optimisations appliquées : images Shopify responsives et dimensions réservées, chargement différé sous la ligne de flottaison, polices WOFF2 sous-ensemblées, URL de préchargement identique à celle du `@font-face`, suppression des ressources KNR inutilisées, JavaScript en module, absence d’application tierce. Un [audit Lighthouse via PageSpeed](PERFORMANCE-PAGESPEED.md) est désormais disponible sur le brouillon : médianes 88 mobile / 98 ordinateur après animations et survols. Le contrôle sur l’URL publiée et les essais Safari/iOS restent à réaliser après validation.

## Éléments volontairement en attente

Revue et corrections demandées par le candidat ; recontrôle Lighthouse sur l’URL finale (audit du brouillon effectué) ; Safari/iOS ; publication ; attribution du modèle produit ; vérification finale de l’URL directe hors session administrateur ; commit unique et soumission via le formulaire reçu par e-mail. Ces éléments restent ouverts. La réception des messages de contact est désormais confirmée. Le candidat a décidé de conserver les couleurs Figma ; les limites de contraste sont documentées et ne sont plus un arbitrage en attente.

## Revue visuelle détaillée complémentaire

Voir [AUDIT-VISUEL.md](AUDIT-VISUEL.md) et la galerie de comparaison associée pour le contrôle section par section, les mesures et les corrections. Après cette passe : Theme Check 0 erreur / 2 avertissements natifs inchangés ; contrôles JavaScript et Prettier réussis. Filtre 4 étoiles = 2 avis ; Tous les avis puis Charger plus = 6 avis ; carrousel mobile au clavier avec progression observée. Les couleurs secondaires claires de Figma ont été conservées pour la fidélité visuelle : une conformité de contraste WCAG AA globale n’est pas revendiquée.

## Relecture du brief — 23 octobre 2026

Voir [CONFORMITE-BRIEF.md](CONFORMITE-BRIEF.md). Les étoiles décoratives suivent désormais les notes Shopify, le recadrage d’article devient un réglage explicite, et les derniers libellés fixes du pied de page passent par les données/traductions. Theme Check : 0 erreur et 2 avertissements Horizon inchangés ; syntaxe JavaScript et formatage valides ; nouvel assemblage réussi. Le déploiement reste limité au thème de revue. Les consignes de remise ont été corrigées pour le formulaire reçu par e-mail.

Contrôle après déploiement : quatre images produit, trois notes de témoignage rendues depuis les métaobjets, recadrage rapproché actif uniquement sur la carte choisie, nom de boutique dans le texte alternatif et absence d’erreur Liquid observés. [Capture des actualités après correction](screenshots/brief-audit-news.jpg). Le thème reste en statut `unpublished`, les deux dossiers Git locaux contiennent zéro commit.

## Revue finale après les effets

[Revue finale après animations et survols](REVUE-FINALE.md) : aucun nouveau défaut fonctionnel reproduit ; contrôles code réussis, Theme Check 0 erreur / 2 avertissements natifs. Nouvelles médianes PageSpeed 88 mobile / 98 ordinateur. Le thème reste non publié et le dépôt sans commit.

## Passe finale des 25–26 octobre

[Résultats et limites actuels](REVUE-AVANT-SOUMISSION.md) · [Relevés fonctionnels et responsive](final-validation/pre-submission-20261025/checks.json) · [Comparaison visuelle récente](final-validation/pre-submission-20261025/index.html). Aucun nouveau correctif de code nécessaire ; les états de test sont restaurés. Aucun nouveau contact, inscription ou achat effectué. Les succès serveur et modifications de contenu ci-dessus sont des preuves historiques, pas des opérations répétées pendant cette passe. Les nouveaux contrôles de code passent ; Theme Check : 0 erreur, 2 avertissements Horizon existants.

## Mesures PageSpeed complémentaires du 26 octobre

Le nouveau lien fourni par le candidat a permis trois analyses par profil de la version courante : médianes 81 mobile / 98 ordinateur, plages 68–90 / 96–98, accessibilité 96, bonnes pratiques 92 et SEO 69. Tous les résultats sont conservés dans [PERFORMANCE-PAGESPEED.md](PERFORMANCE-PAGESPEED.md). Le LCP mobile reste un point ouvert et ces mesures ne démontrent pas une causalité des animations. Aucun changement de code ni de sécurité, aucune publication ni commit. Les preuves d’interaction et de disponibilité restent celles du domaine normal du brouillon ; une différence de disponibilité dans notre session du lien temporaire est signalée.

## Disponibilité internationale et contrôle iPhone

Le [correctif international du 26 octobre](DISPONIBILITE-INTERNATIONALE.md) résout le signalement iPhone : marchés de recette et profils d’expédition standards, vrais ajouts 15/150 mL et recommandation, retrait, quantités et restauration des paniers vérifiés. Tunisie, France et États-Unis contrôlés. Le candidat a confirmé sur son iPhone 16 Pro que les deux tailles et le panier fonctionnent. Ce contrôle ciblé ne remplace pas un audit Safari complet. Aucun changement de code, de stock suivi, de mot de passe, ni publication/commit.

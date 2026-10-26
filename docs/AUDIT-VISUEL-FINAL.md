# Audit visuel final — 25 octobre 2026

Les douze sections ont été comparées aux références [ordinateur 720:729](https://www.figma.com/design/gkR3Ew3ksO4sd8AmoMeAHB?node-id=720-729) et [mobile 653:1125](https://www.figma.com/design/gkR3Ew3ksO4sd8AmoMeAHB?node-id=653-1125). Les mesures et le contexte complet des deux frames ont été relus dans Figma pendant cette passe. Le thème **189290447076 reste non publié**, sans commit.

**Complément de revue :** une vignette incorrecte de la barre d’achat flottante avait échappé à cette passe. Elle a été remplacée par le tube blanc exact de Figma et vérifiée sur la boutique. Voir le [correctif et les précisions sur l’annonce et le prix unitaire](RETOURS-REVUE.md#16-annonce-prix-unitaire-et-image-de-lachat-flottant).

## Méthode

Comparaison des espacements, grilles, alignements, tailles et interlignages, graisses, approche, couleurs, bordures, dimensions et proportions des images et icônes. Largeurs de contenu égales à Figma : 1440 et 390 px. Le desktop réserve 10 px à sa barre de défilement ; sa fenêtre de capture mesure donc 1450 px. Ces 10 px ont été recadrés à droite, sans redimensionnement. Les captures mobiles finales sont natives en 390 × 844 px, avec émulation tactile.

Les captures de sections Figma proviennent de l’export du 22 octobre déjà conservé dans le dossier d’audit. Leur géométrie a été confirmée avec le contexte complet et les mesures relus le 25 octobre. Les captures Shopify ci-dessous sont nouvelles. Aucun test Safari/iPhone réel n’est revendiqué.

Les captures de repos utilisent temporairement l’émulation de réduction des mouvements, afin de mesurer les positions finales sans transition. Les animations restent activées dans les réglages Shopify ; aucune donnée de configuration n’a été changée pour cet audit. Les écarts de longueur liés aux contenus convenus ne sont pas compensés par des hauteurs forcées.

## Résultat section par section

| Section | Points contrôlés | Résultat / correction |
| --- | --- | --- |
| Annonce et en-tête | Hauteurs 32/56 px, logo, alignements et icônes, navigation responsive | Composition conservée. Texte blanc mobile de l’annonce conservé pour sa lisibilité. |
| Produit et galerie | Panneau superposé, marges, titre, badges, prix, onglets, images et recadrages | Mesures conformes ; chevrons ramenés aux proportions intrinsèques. Prix réels convenus conservés. |
| Ingrédients | Hauteur 800 px desktop / 747 px mobile, placement du fond et du texte, largeur et interlignage | Conforme aux mesures de Figma. |
| Utilisation | Marges, grille à trois colonnes, carré des images, écarts du texte et défilement mobile | Conforme ; contenu ordinateur et titre français convenus conservés. |
| Résultats avant/après | Titres, marges, cadre 1280 × 640 px desktop / 342 × 250 px mobile, poignée | Dimensions et alignements conformes ; libellés français conservés. |
| Témoignages | Largeur du texte, taille et interlignage, étoiles et flèches | Mesures conformes ; données de démonstration conservées. |
| FAQ | Largeur 720 px desktop, marges mobile, séparateurs, espacement des questions | Chevrons corrigés. Le texte complet de la réponse ordinateur ajoute 22 px sur mobile. |
| Avis | Colonnes, étoiles, filtres, actions, contenu et pagination | Géométrie contrôlée. Les cibles tactiles et l’avertissement de démonstration expliquent la hauteur supplémentaire. |
| Actualités | Grille, cadrages, typographie, marges, cartes et progression mobile | Mesures conformes ; titres français et contenus d’articles convenus conservés. |
| Newsletter | Image, deux colonnes desktop, pile mobile, formulaire, titre et mentions | Mesures conformes ; titre ordinateur partagé conservé, soit 40 px de moins que le titre mobile plus long. |
| Réassurance | Colonnes, centrage, fonds, hauteur des titres et écart avec les paragraphes | Correction : titres non étirés et écart constant de 24 px sur les quatre cartes. Texte desktop sur toute la largeur utile de chaque carte. |
| Pied de page | Colonnes, accordéons, certification, logo, barre finale, sélecteurs et réseaux | Correction : largeur des sélecteurs selon la valeur choisie et ratio réservé du logo SVG. Français se place à moins de 1 px de sa position Figma desktop. |

Palette conservée : noir `#000000`, blanc `#FFFFFF`, papier `#F9F8F5`, sable `#DCD5C3`, accent `#B5A282`. Les couleurs de la maquette n’ont pas été remplacées pendant cette passe.

## Correctifs précis

- Le pays occupait 96 px à cause de l’option la plus longue. Son contrôle natif amélioré occupe désormais environ 76,67 px en France sur desktop, contre 77 px dans Figma. Le début de Français se situe à 132,67 px, contre 133 px dans Figma. Une copie visuelle masquée aux lecteurs d’écran fournit la largeur ; le véritable sélecteur et le formulaire Shopify restent natifs.
- Sur mobile, les petites cartes de réassurance pouvaient répartir verticalement leur espace libre. Chaque titre garde maintenant sa hauteur de 14 px, avec 24 px jusqu’au paragraphe. Les quatre cartes ont été mesurées aux sept largeurs.
- Les chevrons des détails produit, FAQ et menus mobiles utilisent `6.41421 × 10.8284 px`, dimensions de l’export d’origine, au lieu d’arrondis différents. Les SVG sont inchangés.
- Le logo de bas de page réserve le ratio d’origine `1360 / 141.305` avant chargement. Le logo configurable du marchand conserve son chemin de rendu existant.

## Contrôles après correction

- 192 rapprochements automatiques de styles de texte : 116 desktop et 76 mobile. Les 116 desktop et 74 mobile correspondent aux tailles, interlignages, approches, graisses et couleurs de référence. Deux différences mobiles conservées : le blanc de l’annonce, et la boîte de ligne de 12 px centrant le chiffre de 8 px dans la pastille de panier de 12 px. Les autres textes dynamiques ou regroupés ont été examinés visuellement et dans l’[audit intégral des textes](AUDIT-TEXTES.md).
- Aucun débordement horizontal du document ou des limites de section à **320, 375, 390, 768, 1024, 1440 et 1920 px** de contenu. Les carrousels conservent leur débordement interne intentionnel.
- Les **12 en-têtes d’accordéon** ont été activés au clavier puis remis dans leur état initial.
- Pays France → États-Unis : soumission native, persistance après rechargement et retour à France vérifiés. Langue française conservée. Focus clavier souligné, sans encadrement noir ; contour système de 2 px en couleurs forcées.
- Sans JavaScript : sélecteurs natifs visibles, copies visuelles masquées, bouton Appliquer disponible, action `/localization`. Émulation désactivée et onglet de test fermé après contrôle.
- `npm run check` réussi : syntaxe JavaScript, contenu, cinq tests du carrousel de réassurance et formatage. Theme Check : **0 erreur, 2 avertissements natifs Horizon existants**.

Aucun nouvel asset, dépendance, chargement réseau ou écouteur de défilement n’a été ajouté. Aucun nouveau score Lighthouse n’est annoncé ; les rapports de performance existants gardent leur date et leurs conditions. Les essais mobiles de cette passe sont effectués dans Chrome avec émulation tactile.

## Preuves de revue

[Relevés et bilan](final-validation/visual-20261025/checks.json) · [Largeurs](final-validation/visual-20261025/responsive.json) · [Interactions](final-validation/visual-20261025/interactions.json) · [Typographie](final-validation/visual-20261025/typography-comparison.json)

Les 26 captures `desktop-*` et `mobile-*` couvrent le haut de page, les détails produit, les ingrédients, l’utilisation, les résultats, les témoignages, la FAQ, les avis et leur bas, les actualités, la newsletter, la réassurance et le pied de page. Les différentes positions de défilement et la barre d’achat flottante peuvent différer des captures Figma ; les mesures sont comparées dans chaque section.

[Haut desktop](final-validation/visual-20261025/desktop-top.png) · [Haut mobile](final-validation/visual-20261025/mobile-top.png) · [Réassurance mobile](final-validation/visual-20261025/mobile-reassurance.png) · [Pied desktop](final-validation/visual-20261025/desktop-footer.png) · [Pied mobile](final-validation/visual-20261025/mobile-footer.png)

Les contenus et prix corrigés précédemment sont conservés. Le panier, le stock et le mot de passe n’ont pas été modifiés. Seuls cinq fichiers personnalisés ont été envoyés au thème non publié, sans suppression distante. Aucune publication, aucun commit et aucun envoi de candidature.

## Ajustement mobile approuvé après comparaison

À la demande du candidat, les liens Lire plus des cartes du rituel disposent maintenant d’un écart de 16 px avec leur paragraphe. Ce choix améliore la lisibilité et remplace volontairement le rapprochement présent dans Figma. Il ajoute 22 px à la hauteur mobile ; le desktop conserve ses mesures. Voir le [correctif et ses preuves](RETOURS-REVUE.md#18-espacement-mobile-du-lien-lire-plus).

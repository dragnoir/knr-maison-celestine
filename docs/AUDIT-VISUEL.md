# Audit visuel détaillé — Maison Célestine

Revue du 22 octobre 2026. Références Figma : fichier `gkR3Ew3ksO4sd8AmoMeAHB`, ordinateur `720:729` (1440 px), mobile `653:1125` (390 px). Comparaison des captures avec les valeurs des calques Figma, puis contrôle du DOM rendu et corrections du thème de prévisualisation **189290447076**. Aucun commit ni publication.

[Ouvrir les comparaisons par section](audit-visuel/index.html).

## Contrôles et corrections par composant

| Zone | Contrôle / correction |
| --- | --- |
| Annonce | Hauteur 32 px, ligne 12 px, espacement de 3 px, trait du lien sans décalage de hauteur. Texte mobile rendu lisible. |
| En-tête | Position, logo d’origine, espacement des liens et des icônes, placement de la pastille panier ; navigation mobile conservée. |
| Galerie | Visuels d’origine, proportions, recadrage et superposition du panneau ; hauteur du hero et position de la transition vers les deux images secondaires ; crop portrait 102,79 % / 102,83 % et marqueurs zoom vectoriels blancs d’origine. |
| Panneau produit | Largeur de 456 px sur ordinateur, marge intérieure de 40 px ; titre, approche, badges, étoiles, prix, variantes, bouton de 48 px et message de livraison vérifiés. |
| Accordéons produit | Traits sans ajout de hauteur à la boîte, retraits, lignes de 108/60 px sur ordinateur, couleur mobile de la maquette. |
| Produits associés | Cadres, proportions des images, titre, marges et lignes de prix ; défilement horizontal maintenu. |
| Barre d’achat | Image, titre, variantes, prix et bouton 200 × 56 px ; affichage conditionnel lié au défilement. Sa position dans une capture dépend du viewport. |
| Ingrédients | Recadrages distincts ordinateur/mobile, position de la pipette, superposition, colonne de 510 px, corps 32/40 px sur ordinateur et 22/24 px sur mobile. |
| Utilisation | Images 448 × 448 px sur ordinateur et 255 × 255 px sur mobile, retraits de 24/16 px, texte 14/22 px, approche −2 %, hauteur et progression du carrousel. |
| Avant/après | Cadre 1280 × 640 px sur ordinateur, 342 × 192 px sur mobile ; recadrages, séparateur, commande de 48 px, labels et précision des fichiers responsives. |
| Témoignages | Largeur 970 px, texte 32/40 px sur ordinateur ; 24/32 px et approche −2 % sur mobile ; étoiles, nom et commandes vérifiés. |
| FAQ | Espacements, taille des titres, chevrons, traits à 24 % d’opacité et hauteur des lignes ; réponse complète commune aux deux formats. |
| Avis | Trois colonnes sur ordinateur, pile centrée sur mobile ; étoiles pleines/contours d’origine, jauges 12 px, filtre natif, boutons, bordures et absence de marge parasite après le dernier avis visible. |
| Actualités | Grille 334 px / cartes mobiles 255 px, retraits, filet de 0,8 px, titres sur deux lignes éditables, images d’origine et résolution du recadrage agrandi. |
| Newsletter | Image 680 × 540 px sur ordinateur, 342 × 232 px sur mobile ; positionnement absolu du visuel mobile corrigé ; titres, champ et bouton de 48 px. |
| Réassurance | Colonnes, interligne, approche, marges de 80 px, bandeau sable, défilement mobile et indicateur de 88 px. |
| Pied de page | Grille 280/280/280/400 px, menus mobiles, certification, logo vectoriel d’origine, traits, sélecteurs et liens sociaux conditionnels. |

Les couleurs de référence comprennent `#000000`, `#ffffff`, `#f9f8f5`, `#dcd5c3`, `#b5a282` et le fond mobile `#dfdbd6`. Inter est auto-hébergé. Les bordures ont été converties en traits intérieurs quand Figma les dessine à l’intérieur du cadre : leur épaisseur ne décale plus les sections suivantes.

## Mesures de hauteur à largeur de contenu identique

| Section | Figma ordinateur | Rendu ordinateur | Figma mobile | Rendu mobile |
| --- | ---: | ---: | ---: | ---: |
| Produit, depuis y=32 | ≈1345 | 1345,22 | 1556,20 | 1556,20 |
| Ingrédients | 800 | 800 | 747 | 747 |
| Utilisation | 834 | 834 | 683,80 | 683,80 |
| Résultats et témoignage | 1368 | 1368 | 1030 | 1030 |
| FAQ | 788 | 788 | 624 | 646 |
| Avis | 1004 | 1058 | 1212 | 1280 |
| Actualités | 620,80 | 620,80 | 738,60 | 738,59 |
| Newsletter | 780 | 780 | 756 | 716 |
| Réassurance | 258 | 258 | 243 | 262,80 |

Les écarts de contenu sont détaillés dans [CORRECTIONS-MAQUETTE.md](CORRECTIONS-MAQUETTE.md) : réponse FAQ complète (+22 px mobile), mention des avis fictifs (+54/+68 px), titre newsletter commun (−40 px mobile) et promesses complètes. Les arrondis inférieurs au pixel proviennent du rendu des dimensions fractionnaires. Le défilement natif de Chrome occupe 10 px sur ordinateur ; le contrôle géométrique principal utilise donc 1450 px de viewport pour 1440 px de contenu. Les autres contrôles indiquent explicitement ces deux largeurs.

## Vérification après corrections

- Viewports 320, 375 et 390 px en mode mobile, puis 768, 1024 et 1920 px : aucun débordement de page observé. Les carrousels débordent volontairement dans leur propre zone de défilement.
- Panneau produit situé avant le contenu de la section ingrédients à toutes les largeurs contrôlées ; adaptation de la hauteur intrinsèque aux textes.
- Filtre 4 étoiles : deux avis ; filtre Tous puis Charger plus : six avis et bouton masqué.
- Carrousel d’utilisation au clavier : déplacement de 263 px, indicateur synchronisé. Témoignages : déplacement de 970 px, retour à la première citation confirmé.
- Theme Check : **0 erreur**, deux avertissements préexistants dans le snippet Horizon `bento-grid.liquid`. Syntaxe JavaScript et Prettier : réussite.

Fichiers : [mesures responsive](responsive-visual-audit.json), [Theme Check](theme-check.json), [validation complète](VALIDATION.md).

La revue ne prétend pas à une égalité raster absolue : l’anticrénelage du navigateur, la compression des captures et les contenus harmonisés diffèrent du rendu Figma. Les couleurs secondaires très claires sont celles de la maquette ; une certification globale de contraste WCAG AA n’est pas annoncée. Les captures par section permettent de distinguer les différences de contenu des réglages visuels.

Note sur les captures : la capture des détails produit mobile a été remise à l’échelle du viewport DOM mesuré (400 × 844, dont 10 px de scrollbar), puis recadrée sur les 390 px de contenu. L’outil avait renvoyé un raster réduit de 390 × 823. Aucun contenu visuel n’a été retouché. Les autres vues sont conservées à leur échelle de capture ; la colonne de scrollbar est retirée des vues ordinateur.

# Galerie mobile — navigation dans les deux sens

**26 octobre 2026.** Le candidat demande explicitement de compléter la maquette, qui présente seulement la flèche suivante : une flèche précédente est ajoutée à gauche du visuel principal sur mobile. Cette différence fonctionnelle avec Figma est approuvée et inscrite dans le journal des corrections.

Les deux commandes reprennent le même SVG noir de **16 px** ; celui de gauche est retourné à 180°. Chaque bouton a une cible tactile invisible de **44 × 44 px**. Le centre visuel de la flèche droite reste à sa position initiale. Les boutons sont masqués à partir de 750 px et ne sont rendus que lorsque le produit possède plusieurs images.

Précédent et suivant utilisent la même logique, avec retour de la première à la dernière image et inversement. Le glissement tactile, l’indicateur de progression et les flèches du clavier sur la galerie restent synchronisés. Entrée et Espace activent les boutons nommés « Image précédente » et « Image suivante » ; leurs libellés viennent des locales et `aria-controls` identifie la galerie. La réduction des mouvements rend le changement immédiat.

## Recette sur le brouillon

- Première image → précédente : quatrième image ; suivante depuis la quatrième : première.
- Suivante vers la deuxième, puis précédente vers la première ; Entrée, Espace et les deux flèches clavier contrôlés.
- Événements tactiles sur les deux boutons ; glissement vers la deuxième image, puis précédente vers la première. Indicateur de progression cohérent.
- Réduction des mouvements : précédent et suivant atteignent immédiatement leur destination.
- Choix 150 mL : quatrième image associée et prix de 150 EUR. Précédente affiche la troisième image sans changer la taille ni son prix. Retour à 15 mL : première image et prix de 75 EUR.
- Largeurs **320, 375, 390, 402 et 749 px** : deux boutons de 44 px. À **750 et 1440 px** : boutons masqués. Aucun débordement horizontal du document.
- Les visuels du carrousel ne déclenchent aucun zoom. Le clic de contrôle sur le hero n’ouvre aucun dialogue ; les images secondaires desktop conservent leur fonctionnement.

Les dix-sept relevés fonctionnels et sept relevés de largeur proviennent de Chrome, avec émulation tactile pour les gestes. **Aucun retest de ce correctif sur l’iPhone réel ni nouvelle mesure PageSpeed n’est annoncé.**

[Relevés](final-validation/gallery-previous/checks.json) · [Capture mobile avec les deux flèches](final-validation/gallery-previous/mobile-both-arrows.png) · [Arbitrages Figma](CORRECTIONS-MAQUETTE.md).

État final : première image, 15 mL à 75 EUR, panier initial de deux 15 mL / 150 EUR, France, tiroirs fermés. Aucun contenu marchand, stock ou prix modifié. Thème **189290447076 non publié**, zéro commit et aucune commande.

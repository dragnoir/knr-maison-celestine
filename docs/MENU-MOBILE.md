# Menu mobile — focus tactile et transitions

**26 octobre 2026.** Correction demandée après le signalement sur iPhone : l’ouverture tactile du menu ne doit pas entourer la croix d’un cadre noir. Le thème 189290447076 reste non publié, sans commit.

Le dialogue natif conserve son focus et sa modalité. Le composant distingue une activation tactile/souris d’une activation clavier : seule l’indication de focus de la croix et du bouton d’ouverture est masquée pour le pointeur. Tabulation ou interaction clavier rétablit les indicateurs existants. Aucun retrait global des styles de focus et aucun `blur()`.

La première correction utilisait une translation de 280 ms. Le [réglage harmonisé des deux tiroirs](TRANSITIONS-TIROIRS.md), demandé ensuite, utilise maintenant **320 ms à l’entrée, 240 ms à la sortie et un fondu du fond de 220 ms**. La sortie se termine avant la fermeture native et le retour du focus. Une interruption inverse la transition depuis sa position courante. La réduction des mouvements supprime les deux transitions, y compris si elle est activée pendant la fermeture. Aucun nouvel élément visible, dépendance ou minuteur permanent. Les relevés ci-dessous gardent les valeurs historiques de la première correction ; les nouveaux relevés sont dans le rapport d’harmonisation.

La recette a également révélé un événement natif `close` retardé pouvant remettre à zéro un menu rouvert rapidement. Le gestionnaire ignore cet ancien événement si le dialogue est déjà ouvert ; `aria-expanded` est remis à jour dès la fermeture effective. Le cycle de vie du composant annule aussi les opérations de fermeture devenues obsolètes. La largeur du panneau est limitée à l’espace disponible, sans décalage dû à la gouttière de défilement.

## Vérification sur le brouillon

- Chrome, émulation tactile : focus `:focus-visible` encore vrai après un parcours clavier, mais aucune bordure autour de la croix après ouverture tactile. Le focus reste sur le bouton.
- Clavier : entrée, Tab vers Produits, retour sur la croix et Échap ; indicateur visible et retour au bouton d’ouverture.
- Trois cycles de fermeture/réouverture rapide avec réduction des mouvements : panneau ouvert, visible et `aria-expanded=true` à chaque fois.
- Largeurs **320, 390, 402 et 430 px** : panneau dans les limites disponibles, aucun débordement horizontal du document. Fermeture par croix et par fond à 430 px.
- Réduction des mouvements initiale et activée pendant la sortie ; fermeture effective et attribut d’ouverture cohérent.
- Réinitialisation du composant simulée avec son callback public : dialogue fermé, réouverture fonctionnelle, puis rechargement de la page pour retirer cet état de test. Cela ne constitue pas un nouvel essai réel dans l’éditeur Shopify.
- À 1440 px : navigation desktop visible, bouton mobile masqué ; ouverture et fermeture du panier natif fonctionnelles. Panier inchangé : deux 15 mL, 150 EUR, France.

Le signalement initial vient de l’iPhone du candidat. **Ce correctif du menu n’a pas encore été retesté sur cet appareil réel** ; la confirmation iPhone précédente concerne les tailles et le panier. Les six rapports PageSpeed du matin précèdent aussi ce changement de code. Aucun nouveau score de performance n’est annoncé.

[Relevés de recette](final-validation/mobile-menu-refinement/checks.json) · [Menu après ouverture tactile](final-validation/mobile-menu-refinement/mobile-open.png) · [Indication clavier conservée](final-validation/mobile-menu-refinement/keyboard-focus.png).

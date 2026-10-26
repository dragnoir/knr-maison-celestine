# Transitions des tiroirs — menu et panier

**26 octobre 2026.** À la demande du candidat, les deux tiroirs partagent maintenant un mouvement discret : **320 ms à l’ouverture, 240 ms à la fermeture et fondu du fond de 220 ms**. Le menu avait initialement une transition de 280 ms ; le panier natif utilisait une entrée de 125 ms dans la configuration active.

Le panier utilise désormais `transform` pour la translation et `opacity` pour le fond, à la place de l’animation native de sa position `inset-inline-end`. Son contenu et les dimensions de la page restent stables. Les variables de mouvement sont communes dans `knr-base.css` ; chaque composant conserve ses styles dans son fichier propriétaire. Aucun nouveau contrôle visible, effet au chargement, minuteur de défilement ou dépendance.

Le cycle de vie natif du panier, le verrouillage du défilement, les événements et le retour du focus sont conservés. Un correctif limité au panier de la page KNR mémorise sa transformation au début de la fermeture : une entrée interrompue repart de la position réellement affichée. Ces propriétés temporaires sont retirées à la fermeture. Le correctif est reproduit par l’assembleur à partir d’Horizon 4.3.0, sans redistribuer son code dans le dépôt public.

## Vérification sur le thème non publié

- Entrée et sortie du menu et du panier : translation et fondu observés avec leurs durées effectives. La position du panier reste à `inset-inline-end: 0` pendant le mouvement ; la transformation assure le déplacement.
- Panier aux largeurs **320, 390, 402, 1440 et 1920 px** : largeur de page identique avant, pendant et après l’ouverture, aucun débordement horizontal positif. À 1440 px, fermeture par appui sur le fond ; Échap et croix également vérifiés.
- Entrée du panier interrompue : animation native mise à 80 ms par l’API Animation pour un contrôle déterministe, puis fermeture via sa méthode publique. La matrice de départ de sortie correspond exactement à celle affichée. Ce test n’est pas présenté comme une capture de geste réel.
- Réouverture demandée pendant une fermeture via les méthodes publiques natives : réouverture effective, aucune propriété de sortie obsolète, puis fermeture finale.
- Réduction des mouvements initiale : aucune animation du panneau ni du fond, aucun délai artificiel ; activation pendant la fermeture du panier également vérifiée.
- Menu : indication de focus visible au clavier et absente après ouverture tactile. Les corrections précédentes de focus et de réouverture sont conservées.
- Ajout rapide tactile Huile Précieuse : panier ouvert après confirmation Shopify, trois articles / 215 EUR ; retrait du produit de recette puis retour à deux 15 mL / 150 EUR. Défilement conservé à **1078 px** avant et après ce parcours.

Les contrôles sont réalisés dans Chrome, avec émulation tactile pour les interactions mobiles. **Le nouveau réglage n’a pas encore de retest sur iPhone réel ni de nouvelle mesure PageSpeed.** Les rapports précédents conservent leur date et leur périmètre.

[Relevés](final-validation/drawer-motion/checks.json) · [Panier ordinateur](final-validation/drawer-motion/desktop-cart.png) · [Panier mobile après ajout rapide](final-validation/drawer-motion/mobile-cart.png) · [Menu tactile](final-validation/drawer-motion/mobile-menu.png).

Les contrôles de code et Theme Check sont repris avec le correctif. Thème 189290447076 toujours non publié, mot de passe conservé, zéro commit, aucune commande et aucun changement de stock ou de contenu marchand. Les réglages temporaires du navigateur sont supprimés et les tiroirs laissés fermés.

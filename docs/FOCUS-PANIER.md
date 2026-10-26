# Focus du panier après interaction tactile

**26 octobre 2026.** Le candidat signale sur iPhone Chrome un cadre noir autour de la croix du panier, puis autour du « + » après sa fermeture. Après correction et actualisation, il confirme les deux parcours : **« Both are clear »** — ouverture depuis l’icône supérieure et depuis le « + », puis fermeture.

Le panier natif déplace le focus sur sa croix et le restitue ensuite au déclencheur. Ces mouvements sont conservés. Le problème reproduit dans Chrome venait de `:focus-visible`, encore vrai après une interaction tactile et un déplacement de focus par script.

Un composant invisible du layout suit la dernière interaction : pointeur tactile/souris ou clavier. Seuls la croix du panier et ses déclencheurs d’achat/panier masquent leur cadre de focus en mode pointeur. Tabulation, Entrée, Espace ou Échap rétablissent immédiatement le contexte clavier et ses indicateurs. Les champs de saisie conservent leur soulignement de focus ; aucun retrait global des styles de focus.

Le composant utilise deux écouteurs de document, nettoyés à la déconnexion. L’attribut de mode n’est modifié que lorsque la méthode d’entrée change. Cet état appartient au document courant. Aucun nouveau réglage marchand, module externe ou contrôle visible.

## Vérification

- Reproduction avant correction : après ouverture tactile, la croix était toujours `:focus-visible` avec un contour noir de 2 px.
- Même scénario après correction : focus toujours présent sur la croix, `:focus-visible` encore vrai dans le contrôle de stress, mais contour absent en mode pointeur.
- Retour tactile à l’icône supérieure puis au « + » de Crème Régénérante : cible de retour correcte et aucun cadre.
- Entrée au clavier depuis l’icône supérieure et depuis le « + », puis Échap : cadre de 2 px conservé sur la croix et sur le déclencheur de retour.
- Passage de l’usage tactile à Tabulation dans le panier : indicateurs clavier immédiatement présents.
- Champ Quantité : soulignement chaud conservé au pointeur ; Tabulation vers le bouton suivant conserve son cadre clavier. Aucune quantité changée par ce contrôle.
- Dix-neuf relevés de parcours : largeur mobile de 390 px et contrôle au viewport ordinateur normal de 1864 px. Aucun débordement horizontal constaté.
- **Retest réel du candidat sur iPhone Chrome : deux parcours confirmés sans cadre.** Cette confirmation concerne le focus du panier ; elle ne constitue pas un audit iOS complet de la page.

Deux onglets de recette partageaient le panier. Les unités temporaires de Crème Régénérante ont été retirées ; le panier final revient à **deux 15 mL, 150 EUR, France**. Les captures réduites ou incomplètes du pilote ont été exclues. La capture retenue a été inspectée visuellement.

[Relevés et confirmation iPhone](final-validation/cart-pointer-focus/checks.json) · [Panier mobile sans cadre autour de la croix](final-validation/cart-pointer-focus/mobile-cart-close-no-ring.png).

Trois fichiers de thème modifiés : module commun, layout et styles du panier. Le cycle de vie natif, le retour du focus et les transitions restent en place. Aucun nouveau score PageSpeed. Thème **189290447076 non publié**, zéro commit, aucune commande et aucun changement de stock ou de contenu marchand.

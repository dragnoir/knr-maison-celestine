# Ajout rapide tactile — Complétez votre rituel

**26 octobre 2026.** Le candidat signale que le petit « + » ouvre parfois la page du produit sur iPhone. La zone interactive mesurait 24 × 24 px, autour d’une icône de 16 × 16 px. Sur Chrome tactile, un appui précis au centre ajoutait bien le produit ; un point situé seulement 4 px à droite du bouton correspondait déjà au lien de l’image. Le signalement ne permet pas de conclure à un bug interne précis de Safari.

La correction porte uniquement sur les styles de `sections/knr-product.liquid` :

- **Zone tactile invisible de 44 × 44 px**, dans le coin inférieur gauche de chaque image.
- Icône Figma conservée à **16 × 16 px**, à 8 px du bord gauche et 7 px du bas ; aucune nouvelle icône ni modification des cadrages.
- Formulaire positionné dans une couche distincte au-dessus du lien de l’image. L’icône décorative laisse le bouton recevoir l’appui.
- Ajout Ajax existant conservé : même produit, quantité minimale, attente serveur, panier natif, gestion des erreurs et blocage pendant la requête. Aucun changement de JavaScript.

## Recette sur le brouillon

Les appuis de contrôle utilisent la nouvelle partie de la cible qui appartenait auparavant au lien de l’image. L’URL de la page principale reste identique à chaque ajout.

| Essai | Résultat confirmé |
| --- | --- |
| Huile Précieuse, appui tactile près de l’icône | 3 articles, total 215 EUR, panier ouvert. |
| Sérum Éclat, même appui | 4 articles, total 274 EUR. |
| Défilement horizontal tactile vers la troisième carte | Carrousel défilé de 162 px. |
| Crème Régénérante après ce défilement | 5 articles, total 359 EUR ; les trois produits complémentaires figurent dans le panier. |
| Huile Précieuse avec Entrée à 1440 px | 6 articles, total 424 EUR ; ajout clavier conservé. |
| Retrait de tous les produits de recette | Panier initial rétabli : deux 15 mL, 150 EUR, pays France, tiroir fermé. |

Aux largeurs **320, 390, 402 et 1440 px**, les trois cibles mesurent 44 × 44 px, les icônes 16 × 16 px et aucun débordement horizontal du document n’est détecté. Les images et les titres conservent leurs destinations produit. Le reste de l’image demeure un lien de navigation.

Le contrôle a été effectué dans Chrome avec de vrais événements tactiles émulés. **Le retest de ce correctif sur l’iPhone du candidat reste à effectuer.** La confirmation iPhone précédente concernait les variantes et le panier. Aucun nouveau score PageSpeed n’est annoncé après ce changement.

[Mesures et états du panier](final-validation/quick-add-touch/checks.json) · [Avant correction](final-validation/quick-add-touch/before.png) · [Panier après les trois ajouts tactiles](final-validation/quick-add-touch/mobile-cart-confirmed.png).

Thème **189290447076 non publié**, aucun commit, aucune commande. Les produits de recette ont été retirés du panier et les réglages temporaires du navigateur supprimés.

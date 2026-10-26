# Revue finale desktop et mobile — 23 octobre 2026

**Brouillon conservé : KNR - Preview, 189290447076. Aucun commit, publication ou envoi.** La passe finale n’a révélé aucun nouveau défaut fonctionnel reproductible dans les composants KNR. Aucun changement de code n’a donc été nécessaire ; les preuves, les chiffres et les notes de remise sont actualisés.

## Résultats de la passe

| Domaine | Contrôles réellement effectués | Résultat |
| --- | --- | --- |
| Mise en page | Revue visuelle des sections à 1440 et 390 px ; géométrie et captures supplémentaires à 320, 375, 768, 1024 et 1920 px | Aucun débordement horizontal du document ; images chargées et proportions conservées |
| Variantes | 15/150 mL, prix barré et unitaire, URL, retour navigateur et rechargement direct de 150 mL | 75/85 €, 500 €/100 mL ; 150/170 €, 100 €/100 mL ; synchronisation des contrôles |
| Achat | Bouton principal desktop/mobile, bouton flottant desktop, ajout rapide Huile Précieuse, double clic | Réponses confirmées ; un double clic ajoute une seule unité |
| Panier | Superposition modale, largeur de page inchangée, ouverture/fermeture, Échap, quantités, suppression, panier vide, persistance après rechargement | Fonctionnel ; panier initial restauré à 2 × 15 mL, total 150 € |
| Erreur réseau | Blocage temporaire de la seule requête `cart/add.js`, puis retrait du blocage et nouvel essai | Message explicite, commandes réactivées, nouvel ajout réussi ; aucun blocage réseau conservé |
| Galerie | Flèche mobile, clavier, progression, agrandissement, clic sur image, clic hors dialogue, Échap et focus rendu | Image interne conserve le dialogue ; extérieur/Échap ferment ; galerie synchronisée |
| Accordéons | Ouverture des détails produit, cinq FAQ au clavier, trois menus de pied de page mobile | Les images secondaires ne s’étirent pas ; menus et FAQ utilisables |
| Comparateur | Flèche droite 50 → 51, Home 0, End 100 | Position et texte accessible cohérents |
| Témoignages | Suivant/précédent, état observé après fin du défilement | 2/3 puis 1/3, positions 342 px puis 0 sur mobile |
| Listes mobiles | Usage, actualités, réassurance au clavier ; geste horizontal sur Usage | Scroll-snap et progression fonctionnels ; aucun défilement horizontal du document |
| Avis | 4 étoiles, 3 étoiles sans résultat, tous les avis, chargement des six entrées au clavier | 2/0/6 résultats ; focus sur la note au clic, sur le nouveau titre au chargement clavier ; aucun contour forcé sur Filtrer |
| Formulaires | Ouverture/fermeture des dialogues avis et question, soumission vide, newsletter avec e-mail invalide | Validation native et focus sur le champ invalide ; aucune nouvelle soumission valide envoyée |
| Navigation | 15 destinations uniques de navigation/produits/articles, huit ancres éditoriales, recherche « Sérum », lien compte | Destinations existantes, aucune ancre manquante ; recherche avec deux produits ; connexion Shopify atteinte sans envoi |
| Confidentialité/localisation | Ouverture et fermeture des préférences Shopify ; France puis Appliquer | Vue KNR et prix conservés |
| Paiement | Bouton Payer du panier | Passage à l’interface Shopify de paiement ; aucune commande ni transaction effectuée |
| Animations | Présence du contrôleur et des 15 cibles, fin des apparitions ; préférence réduite au rechargement | Aucun contenu bloqué transparent ; animations/zooms/transitions désactivés en mouvement réduit |
| Sémantique | Un H1, IDs, attributs alt, noms des boutons, liens visibles | Aucun ID dupliqué, aucun alt manquant ; le lien vide du modèle natif de recherche est hors interface visible |
| Code | `npm run check`, Theme Check sur le thème assemblé | Réussite ; 0 erreur et 2 avertissements natifs Horizon inchangés |

Les états serveur asynchrones ont été vérifiés après confirmation du total et fin de transition. Un relevé effectué pendant l’ouverture d’un tiroir ou un défilement n’est pas considéré comme son état final. La touche End native ne commande pas le défilement horizontal ; les flèches et gestes horizontaux ont été testés. La barre d’achat flottante est volontairement masquée sous 750 px, conformément au comportement existant de la maquette ; le bouton principal mobile est testé.

Les essais complets des trois ajouts rapides, des états indisponibles, des rechargements dans l’éditeur, de l’interrupteur Shopify et des 66 relevés de survol restent dans les preuves précédentes. Ils ne sont pas présentés comme intégralement rejoués dans cette passe. Le code correspondant n’a pas changé. La réception réelle des formulaires contact/newsletter avait déjà été confirmée avec l’intervention du candidat pour hCaptcha ; aucun e-mail supplémentaire n’a été envoyé.

## Performance après effets

Trois nouveaux rapports Google : **88 mobile / 98 ordinateur** en médiane ; accessibilité 96, bonnes pratiques 92, SEO 69. CLS 0 sur les six mesures ; TBT médian 39 ms mobile / 71 ms ordinateur. LCP mobile médian 3,301 s, supérieur au seuil de 2,5 s. Les anciennes médianes étaient 92/99 : elles ne sont pas utilisées comme chiffres actuels. Voir [méthode, résultats et comparaison](PERFORMANCE-PAGESPEED.md).

Le contraste de la maquette reste inchangé à la demande du candidat. La console finale contient des erreurs de télémétrie Shopify ; aucune pile du module KNR n’est observée dans le journal enregistré. Les résultats Chrome mobile sont une émulation, pas une validation sur iPhone/Safari réel. Safari, la publication, l’attribution finale du modèle et la vérification de l’URL définitive restent en attente.

## Preuves

- [Relevés DOM complémentaires](final-validation/final-review/checks-resumed.json), [destinations](final-validation/final-review/destinations.json), [inventaire des liens](final-validation/final-review/links.json), [console](final-validation/final-review/console-final.json).
- [Desktop haut de page](final-validation/final-review/desktop-top.png), [usage](final-validation/final-review/desktop-usage.png), [avis](final-validation/final-review/desktop-reviews.png), [footer](final-validation/final-review/desktop-footer.png).
- [Mobile haut de page](final-validation/final-review/mobile-top.png), [panier](final-validation/final-review/mobile-cart.png), [FAQ](final-validation/final-review/mobile-faq.png), [newsletter](final-validation/final-review/mobile-newsletter.png), [footer](final-validation/final-review/mobile-footer.png).
- [Largeur 320 px](final-validation/final-review/width-320.png), [768 px](final-validation/final-review/width-768.png), [1024 px](final-validation/final-review/width-1024.png), [1920 px](final-validation/final-review/width-1920.png).

Le panier est revenu à son état initial, la sélection à 15 mL, le mot de passe à KNRDEV, les réglages marchands sont inchangés. Aucune opération de publication, commit, push ou candidature n’a été effectuée.

## Ajout après cette passe : carrousel de réassurance

À la demande du candidat, les quatre traits sous le bouton d’achat sont devenus un carrousel éditable et automatique. Cet ajout de code intervient **après** les mesures Lighthouse ci-dessus. Sa recette ciblée et ses limites sont décrites dans [CARROUSEL-REASSURANCE.md](CARROUSEL-REASSURANCE.md). Le statut brouillon et l’absence de commit sont conservés.

## Correction du hero après revue

La zone de zoom et le « + » de l’image principale ont été retirés à la demande du candidat pour respecter Figma. Les images secondaires conservent leur agrandissement. La recette ciblée est détaillée dans [le retour de revue nº 9](RETOURS-REVUE.md#9-image-principale-sans-agrandissement). Aucun nouveau score Lighthouse ; brouillon conservé et aucun commit.

## Comparaison mobile animations activées/désactivées

Après les derniers retours, six audits mobiles ont été effectués avec le réglage activé puis désactivé. Les résultats, leur forte variabilité et la restauration du brouillon sont consignés dans [le diagnostic dédié](PERFORMANCE-ANIMATIONS.md). Ils complètent les mesures historiques ci-dessus ; aucun nouvel audit ordinateur dans cette passe.

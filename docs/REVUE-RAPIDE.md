# Parcours de revue — cinq minutes

> **État actualisé au 26 octobre, après revue :** thème KNR publié, modèle attribué, URL permanente et accès visiteur vérifiés. Livraison en un seul commit initial. Voir [LIVRAISON.md](LIVRAISON.md). Les états de brouillon ci-dessous sont l’historique daté des vérifications ; ils ne décrivent plus l’état de livraison.

Version du **26 octobre 2026**. Thème en brouillon, dépôt public vide, **zéro commit**. Le dossier est prêt pour notre revue ; les opérations de livraison finale attendent l’accord du candidat.

1. [Ouvrir la prévisualisation produit](https://maison-celestine-knr-test.myshopify.com/products/serum-precieux-regenerant?view=knr-serum&preview_theme_id=189290447076), mot de passe **KNRDEV**. Comparer ordinateur et mobile dans la [galerie récente](final-validation/pre-submission-20261025/index.html).
2. Choisir 150 mL : 150 €, barré 170 €, 100 €/100 mL. Ajouter au panier, changer la quantité puis retirer. Le tiroir recouvre la page sans en réduire la largeur. Revenir à 15 mL : 75 €, barré 85 €, 500 €/100 mL.
3. Parcourir ingrédients, utilisation, avant/après, témoignages, FAQ, avis, actualités, newsletter et footer. Tester le comparateur au clavier, le filtre quatre étoiles (deux avis), Charger plus (six avis) et le menu mobile. Le hero n’a pas de zoom ; seules les images secondaires desktop s’agrandissent.
4. Vérifier le [guide des contenus](CONTENU.md), les [corrections convenues](CORRECTIONS-MAQUETTE.md) et les [résultats récents](REVUE-AVANT-SOUMISSION.md). Les tests réels d’édition Shopify et leur restauration sont dans la [recette complémentaire](RECETTE-COMPLEMENTAIRE.md).
5. Regarder la [vidéo de 3 min 28 s](walkthrough/maison-celestine-parcours.mp4), puis examiner le [README](../README.md) et les [notes de soumission](REMISE.md).

Les sept largeurs testées ne présentent aucun débordement horizontal. Les contrôles de code passent et Theme Check relève zéro erreur, deux avertissements Horizon existants. Les limites de contraste Figma, l’absence d’audit iOS complet et la date des anciennes mesures PageSpeed restent explicites. La nouvelle passe PageSpeed du 26 octobre donne des médianes de 81 mobile / 98 ordinateur sur trois mesures par profil ; les valeurs mobiles 81, 90 et 68 restent un point ouvert de performance, détaillé dans le rapport.

La [correction de disponibilité internationale](DISPONIBILITE-INTERNATIONALE.md) a depuis été validée par de vrais ajouts panier et par le candidat sur iPhone 16 Pro. Les mesures PageSpeed du matin précèdent cette correction administrative ; elles ne représentent pas un nouveau contrôle après changement des marchés.

Le [menu mobile](MENU-MOBILE.md) a ensuite reçu le correctif de focus tactile et les transitions d’ouverture/fermeture. Le vérifier sur téléphone : ouverture sans cadre autour de la croix, fermeture fluide ; au clavier, les indicateurs restent visibles. Les captures dédiées sont plus récentes que la vidéo et les mesures PageSpeed.

Tester aussi le [« + » des recommandations](AJOUT-RAPIDE-TACTILE.md) : sa zone tactile invisible a été agrandie à 44 px. L’ajout doit ouvrir le panier sans changer de page, y compris après un défilement horizontal des cartes. Les trois produits ont été ajoutés puis retirés en recette Chrome tactile ; confirmation du correctif sur iPhone encore attendue.

Le [mouvement des deux tiroirs](TRANSITIONS-TIROIRS.md) est maintenant harmonisé : entrée douce, sortie plus courte, fond progressif. Vérifier ouverture/fermeture du menu et du panier ; le réglage de réduction des mouvements doit rendre ces interactions immédiates.

La [galerie mobile](GALERIE-MOBILE.md) dispose d’une flèche précédente à gauche, écart avec Figma approuvé par le candidat. Vérifier les deux sens, le retour de première à dernière image, le glissement et le choix des deux tailles ; aucun zoom n’a été ajouté au hero.

Ouvrir et refermer les [détails produit et la FAQ](ACCORDIONS.md) : mouvement discret de 260 ms, retour naturel avec un clic rapide en sens inverse, images stables. La réduction des mouvements conserve une bascule immédiate ; les espaces de repos restent ceux de la maquette.

Le [focus du panier](FOCUS-PANIER.md) distingue désormais pointeur et clavier. Sur téléphone, vérifier l’absence de cadre autour de la croix et du « + » de retour ; au clavier, les cadres restent visibles. Les deux parcours tactiles ont été confirmés par le candidat sur iPhone Chrome après actualisation.

## Décisions pour terminer après revue

- Approuver l’interface et les corrections de contenu déjà convenues.
- Confirmer la publication et l’attribution du modèle, puis vérifier le lien final comme visiteur ; le brief accepte aussi une prévisualisation directe.
- Autoriser l’unique commit et le push du code spécifique avec son assembleur. Le thème complet est fourni séparément selon la licence Horizon.
- Le candidat soumet le formulaire avec son adresse de candidature initiale et peut envoyer le lien sur Upwork, comme indiqué par le recruteur. Aucun envoi automatique.

Réception : **22 octobre 2026 à 14:55, heure de Tunis**. Cinq jours calendaires donnent **27 octobre à 14:55** ; viser la matinée du 27 pour garder une marge.

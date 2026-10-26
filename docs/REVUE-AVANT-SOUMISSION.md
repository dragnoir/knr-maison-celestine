# Revue avant soumission — 26 octobre 2026

> **État actualisé au 26 octobre, après revue :** thème KNR publié, modèle attribué, URL permanente et accès visiteur vérifiés. Livraison en un seul commit initial. Voir [LIVRAISON.md](LIVRAISON.md). Les états de brouillon ci-dessous sont l’historique daté des vérifications ; ils ne décrivent plus l’état de livraison.

**Dossier prêt pour la revue du candidat.** Le thème **KNR - Preview / 189290447076 reste non publié** ; Horizon reste le thème actif. Le dépôt public est encore vide, sans branche ni commit. Aucun message de candidature n’a été envoyé. La revue principale est complétée par les correctifs ciblés ci-dessous.

**Complément du 26 octobre :** le signalement iPhone a révélé un défaut de disponibilité des visiteurs hors France/États-Unis. La configuration des marchés et de l’expédition a été corrigée, les vrais ajouts panier retestés et le candidat a confirmé les deux tailles et le panier sur iPhone 16 Pro. [Correctif et preuves](DISPONIBILITE-INTERNATIONALE.md).

**Complément menu mobile :** le cadre noir après ouverture tactile a été supprimé en conservant les indicateurs clavier. Entrée/sortie en translation et fondu, réduction des mouvements, réouverture rapide et cycle de vie du composant vérifiés sur Chrome tactile. [Correctif, captures et portée des essais](MENU-MOBILE.md). Aucun nouveau score PageSpeed ni contrôle iPhone réel de ce correctif ; la vidéo antérieure n’est pas une preuve de sa transition.

**Complément ajout rapide :** le « + » des cartes complémentaires dispose d’une cible tactile invisible de 44 px, au-dessus du lien de l’image. Trois ajouts tactiles, défilement du carrousel et ajout clavier confirmés sans navigation ; panier initial rétabli. [Mesures, preuve et limites](AJOUT-RAPIDE-TACTILE.md). Le correctif n’a pas encore de retest iPhone réel ni de nouveau score PageSpeed.

**Complément transitions :** menu et panier partagent une entrée de 320 ms, une sortie de 240 ms et un fond de 220 ms. Panier déplacé par transformation ; entrée interrompue, réouverture pendant la fermeture, réduction des mouvements, focus, largeur stable et ajout rapide retestés. [Contrôles et captures](TRANSITIONS-TIROIRS.md). Aucun nouveau score PageSpeed ni retest iPhone réel de ce réglage.

**Complément galerie :** flèche précédente mobile ajoutée à la demande explicite du candidat, avec la même icône que la suivante et deux cibles de 44 px. Bouclage, glissement, clavier, progression, réduction des mouvements et images/prix de variantes contrôlés. [Recette et capture](GALERIE-MOBILE.md). La vidéo et les anciennes comparaisons Figma précèdent cet écart approuvé.

**Complément accordéons :** réponses produit et FAQ animées en hauteur et opacité sur 260 ms, avec chevrons synchronisés. Les neuf lignes, clics rapides, clavier, redimensionnement, réduction des mouvements et repli natif sans JavaScript sont contrôlés. Espacements et taille des images conservés. [Mesures et captures](ACCORDIONS.md). Aucun nouveau score PageSpeed ni résultat iPhone réel après ce complément.

**Complément focus panier :** suivi du mode pointeur/clavier pour retirer le cadre tactile de la croix et des déclencheurs restaurés, en conservant le focus natif et les indicateurs clavier. **Le candidat confirme sur iPhone Chrome les deux ouvertures, icône supérieure et « + », sans cadre après correction.** [Parcours et preuve](FOCUS-PANIER.md). Les anciens scores et la vidéo précèdent ce complément.

[Prévisualisation produit](https://maison-celestine-knr-test.myshopify.com/products/serum-precieux-regenerant?view=knr-serum&preview_theme_id=189290447076) · mot de passe **KNRDEV** · [parcours de revue](REVUE-RAPIDE.md) · [comparaisons récentes](final-validation/pre-submission-20261025/index.html).

## Comparaison visuelle

Les douze zones, de l’annonce au footer, ont été examinées sur ordinateur et mobile. Vingt-deux paires Figma / Shopify ont été inspectées, avec des vues complémentaires des témoignages et du panier mobile. Les mesures Figma détaillées et les 192 rapprochements typographiques de la passe précédente sont conservés dans l’[audit du 25 octobre](AUDIT-VISUEL-FINAL.md). Cette passe termine l’inspection des nouvelles captures après les derniers retours.

| Zone | Points examinés | Conclusion |
| --- | --- | --- |
| Annonce et en-tête | Hauteurs, logo, navigation, icônes, placement mobile | Aucun nouveau défaut constaté ; En savoir plus conservé selon décision du candidat. |
| Produit | Superposition, typographie, prix, détails, galerie et recadrages | Cohérent avec les mesures ; hero non cliquable, sans plus ; zoom sur les deux images secondaires desktop seulement. |
| Ingrédients | Image, hauteur, position et largeur du texte | Aucun nouvel écart de présentation identifié. |
| Utilisation | Grille, carrés des images, texte, défilement | Écart mobile Lire plus de 16 px conservé selon correction approuvée. |
| Résultats et témoignages | Cadre, poignée, centrage, texte et navigation | Aucun nouveau défaut constaté ; textes français et démonstrations conservés. |
| FAQ | Largeur, séparateurs, chevrons, interlignes | Réponses desktop complètes communes aux deux vues. |
| Avis | Colonnes, étoiles, filtres, boutons et liste | Six démonstrations réelles dans les données ; cibles tactiles conservées. |
| Actualités | Images, cadrages, grille, titres et liens | Données du blog Shopify ; titres français conservés. |
| Newsletter | Image, alignements, formulaire et mentions | Titre desktop partagé sur mobile, conformément à l’arbitrage de contenu. |
| Réassurance | Fond, hauteur, centrage et écart titre/paragraphe | Mise en page conservée ; première carte desktop utilisée comme départ mobile. |
| Pied de page | Menus, certification, logo, localisation et réseaux | Fond #F9F8F5 ; intitulés et quatre icônes Figma conservés. |
| Panier | Police, palette, bordures, contrôles, superposition | Style KNR, largeur de page stable et fermeture accessible. |

Les différences de contenu ne sont pas compensées par des hauteurs artificielles. Les retours à la ligne, la hauteur d’une réponse FAQ ou d’un avis peuvent donc différer. Aucune identité absolue pixel à pixel n’est revendiquée. [Décisions documentées](CORRECTIONS-MAQUETTE.md).

## Recette fonctionnelle des 25–26 octobre

- Variantes 15 mL : 75 € / 85 €, 500 €/100 mL ; 150 mL : 150 € / 170 €, 100 €/100 mL. Synchronisation des prix, médias, URL, achat principal et flottant ; rechargement d’une URL de variante vérifié.
- Ajouts, quantités, retrait, panier vide, restauration du focus et persistance contrôlés. Une erreur Ajax provoquée n’ajoute aucun article ; la tentative suivante réussit après restauration du réseau. Ajout rapide d’un produit complémentaire vérifié sur mobile puis retiré.
- Galerie mobile, images secondaires desktop, fermeture du zoom par fond, croix et Échap ; hauteur des images stable à l’ouverture des détails.
- Menu mobile, accordéons produit/FAQ/footer, navigation des témoignages et comparateur au clavier vérifiés. Position du comparateur rétablie à 50.
- Filtre quatre étoiles : deux avis ; trois étoiles : état vide ; retour à tous puis Charger plus : six avis. Le focus reste sur le filtre activé.
- Formulaires avis/questions : champs requis et focus ; newsletter : e-mail invalide rejeté. Aucune nouvelle inscription ni demande envoyée pendant cette passe.
- Carrousel des quatre messages : navigation, rotation automatique et arrêt en réduction des mouvements vérifiés. Les animations éditoriales respectent également ce réglage.
- Collection, article et liens natifs contrôlés ; pays États-Unis appliqué via Shopify puis retour à France/français. Panier initial rétabli : deux flacons de 15 mL, 150 €.

**Sept largeurs sans débordement horizontal du document ou des sections : 320, 375, 390, 768, 1024, 1440 et 1920 px.** Les carrousels gardent leur défilement interne intentionnel. Les essais mobiles utilisent Chrome avec émulation tactile.

Contrôle structurel : un H1, un contenu principal, langue française, aucun identifiant dupliqué, lien vide, image sans attribut alt, bouton visible sans nom ni champ visible sans libellé détecté. Il s’agit d’un contrôle ciblé, pas d’un nouvel audit axe complet ni d’une certification WCAG.

## Vérifications et preuves

`npm run check` réussi : syntaxe JavaScript, cohérence des contenus, cinq tests du carrousel et formatage. Theme Check : **0 erreur, 2 avertissements natifs Horizon inchangés**. Les 51 fichiers personnalisés sont comparés au thème complet et à l’assemblage ; les trois points du correctif panier natif sont également contrôlés au conditionnement.

[Relevés de recette](final-validation/pre-submission-20261025/checks.json) · [rôles Shopify](final-validation/pre-submission-20261025/theme-roles.json) · [état du dépôt](final-validation/pre-submission-20261025/repository-state.json) · [journal de checks](final-validation/code-check.log) · [Theme Check](theme-check.json).

La [vidéo actualisée de 3 min 28 s](walkthrough/maison-celestine-parcours.mp4) comporte seize séquences de l’interface réelle. Les seize vues de milieu de chapitre ont été inspectées ; encodage H.264, 1440 × 1080, sans audio. [Chapitres et présentation](PARCOURS-VIDEO.md).

Les captures ont été inspectées directement. La galerie HTML est un index local dont les chemins sont contrôlés ; son ouverture dans le navigateur automatisé a été bloquée par la politique interdisant le protocole file://. Aucun rendu navigateur réussi de cet index n’est annoncé.

## Limites à conserver dans la remise

- Le candidat a fourni un nouveau lien visiteur : six analyses PageSpeed ont été terminées le 26 octobre, après les derniers ajustements. **Médianes : 81 mobile / 98 ordinateur ; plages : 68–90 / 96–98.** La forte variation mobile et son LCP médian de 4,632 s restent un point ouvert, pas un contrôle déclaré réussi. Aucun résultat n’est écarté. Les anciennes médianes 88/98 et l’ancienne paire 92/98 gardent leur date du 23 octobre. [Diagnostic et six rapports](PERFORMANCE-PAGESPEED.md).
- Le LCP mobile est bien le hero ; les essais montrent un délai de rendu variable, un faible TBT et un CLS nul. Ils n’établissent pas que les animations causent l’écart et ne sont pas une nouvelle comparaison A/B. Aucun changement de code, de stock ou de sécurité n’a été effectué pour ces mesures. La différence de disponibilité constatée à ce stade a ensuite été résolue par la [correction des marchés et de l’expédition](DISPONIBILITE-INTERNATIONALE.md). Les six mesures précèdent cette correction de configuration, sans nouveau score postérieur annoncé.
- Le candidat a confirmé sur iPhone 16 Pro le fonctionnement des deux tailles et du panier après le correctif international. Ce contrôle ciblé et la capture initiale Messenger ne constituent pas une revue Safari complète de tous les composants. Les indisponibilités BrowserStack antérieures et les limites de l’émulation Chrome restent documentées.
- Les contrastes issus de Figma sont documentés et conservés selon décision du candidat. Le score SEO de prévisualisation reflète son blocage d’indexation ; ne pas supprimer cette protection pour améliorer le score.
- L’éditabilité par de vrais changements Shopify, leur restauration et la réception du contact ont été prouvées précédemment. Cette dernière passe ne simule pas une nouvelle preuve serveur. Aucune commande passée, aucun nouveau parcours de paiement complété.

Après validation seulement : décider du lien final, publier/attribuer le modèle si ce choix est confirmé, tester l’accès visiteur, actualiser les états documentés, créer et pousser l’unique commit, puis laisser le candidat effectuer la soumission. [Notes prêtes à adapter](REMISE.md).

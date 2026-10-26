# Arbitrages de contenu et de comportement

La maquette ordinateur sert de référence commune. La mise en page mobile est conservée ; les données commerciales proviennent du même produit Shopify sur tous les écrans. Les valeurs ci-dessous sont des données de démonstration du test.

| Élément | Écart observé | Choix retenu et raison |
| --- | --- | --- |
| Prix mobile | Plusieurs prix sont à zéro, contrairement au prix ordinateur de 75 €. | 15 mL : 75 €, prix barré 85 €. 150 mL : 150 €, prix barré 170 €. Une seule source : les variantes Shopify. |
| Prix unitaire | Le visuel indique 75 € / 100 mL pour un flacon à 75 € de 15 mL. | Mesures unitaires natives : 500 € / 100 mL pour 15 mL et 100 € / 100 mL pour 150 mL. |
| Avis | « 200 avis », distribution des étoiles et cartes répétées ne constituent pas un jeu de données cohérent. | Six avis fictifs éditables, dont quatre à 5 étoiles et deux à 4 étoiles. La moyenne de 4,7 et les effectifs sont calculés. Badge « Démo », sans prétendre à un achat vérifié. |
| Annonce | Le lien contient « consectetur. ». | « En savoir plus », vers la page Livraison et retours. |
| Navigation | « Diagnostique » est utilisé comme nom de rubrique. | « Diagnostic », vers les conseils du rituel. Aucun diagnostic médical automatisé n’est proposé. |
| Livraison | Une date fixe « Mercredi 25 février » devient rapidement obsolète. | Message éditable « En stock, livraison estimée sous 48h ». L’état indisponible remplace ce message lorsque la variante ne peut pas être achetée. |
| Lien Lire plus sur mobile | Le lien est collé au paragraphe dans la maquette ; une marge négative reproduisait cet effet. | À la demande du candidat le 25 octobre : écart de 16 px, commun aux trois cartes du rituel. Le bloc mobile gagne 22 px de hauteur ; la composition desktop est conservée. |
| Titres de sections | Plusieurs titres sont en anglais au milieu d’un site français. | « Comment l’utiliser », « Avis clients » et « Dernières actualités ». |
| Article recherche | Abréviation « lab ». | « laboratoire ». |
| Galerie | Un visuel de tube nettoyant ne représente pas la variante sérum 150 mL. | Le flacon de sérum fourni est associé à la variante 150 mL. Les visuels de tube sont utilisés dans les recommandations et, depuis le correctif de revue du 25 octobre, dans la vignette de la barre d’achat flottante, conformément à leurs emplacements dans la maquette. |
| Images avant/après | Libellés anglais dans les maquettes. | « Avant » / « Après », avec commande clavier et description accessible. Les images restent les visuels de démonstration fournis. |
| Liens de pied de page | Destinations non précisées dans Figma. | Pages Shopify éditables, articles, compte, FAQ et préférences natives de cookies. Aucun lien vide `#`. |
| Réseaux sociaux | Aucun compte officiel n’est fourni pour cette marque fictive. | Depuis la revue du 25 octobre : les quatre icônes Figma pointent vers les accueils Facebook, Instagram, TikTok et LinkedIn, à la demande du candidat. Les URL restent éditables ; les remplacer par les comptes officiels avant un usage commercial. |
| Réassurance / certifications | Le test fournit des promesses, scores et mentions de certification, sans justificatifs. | Reprise de ces contenus de démonstration ; la page Nos engagements précise le contexte fictif. Ils devront être validés avant un usage commercial réel. |
| Commandes de galerie | Une seule flèche suivante est dessinée sur mobile. | Le 26 octobre, le candidat demande explicitement une flèche précédente à gauche : même icône retournée, cibles tactiles de 44 px, navigation dans les deux sens avec bouclage. Les visuels du carrousel principal ne déclenchent pas de zoom ; les deux images secondaires desktop conservent le leur. [Recette et capture](GALERIE-MOBILE.md). |
| Mise en page intermédiaire | Aucune composition tablette n’est fournie. | Grille adaptative dont la hauteur suit le contenu, pour éviter que le panneau produit recouvre la section suivante. |

Les données de test ne représentent ni des ventes, ni des essais cliniques réalisés pour ce projet. Les formulaires d’avis et de questions passent par le formulaire de contact Shopify ; la publication des messages reste manuelle après modération.

## Écarts de contenu conservés pendant la revue visuelle

- FAQ mobile : la réponse complète de la maquette ordinateur est conservée ; elle ajoute une ligne de 22 px à 390 px.
- Newsletter mobile : le titre commun ordinateur remplace la variante mobile qui répétait le nom du produit ; le bloc est plus court de 40 px.
- Réassurance mobile : le carrousel commence par la livraison, premier bloc dans l’ordre ordinateur. Figma montre Service client avec un texte abrégé. Les quatre promesses complètes restent accessibles ; le bloc nécessite 20 px supplémentaires.
- Pied de page mobile : le texte À propos complet occupe une ligne supplémentaire. Depuis la revue du 25 octobre, les sélecteurs appliquent directement le choix, sans bouton visible avec JavaScript. Les quatre icônes sociales d’origine sont affichées ; leurs destinations temporaires sont les accueils des réseaux, sans compte officiel inventé. Le bouton Appliquer reste uniquement en repli sans JavaScript.
- Annonce mobile : le texte noir sur fond noir de Figma est repris en blanc, comme sur ordinateur, pour rester lisible.
- Les avis comportent une mention explicite de démonstration, soit 54 px supplémentaires sur ordinateur et 68 px sur mobile. Les barres représentent les vrais effectifs du jeu de démonstration.
- Les prix adoptent le format monétaire français de Shopify (75,00 €) et le prix unitaire calculé. Les chiffres ne sont pas remplacés par les valeurs incohérentes du dessin.

- Audit tactile : les filtres de notes mobiles utilisent des cibles de 24 px, sans chevauchement ; le groupe gagne 18 px. L’image des recommandations ouvre la fiche et le « + » est un bouton distinct d’ajout au panier. Voir [PageSpeed](PERFORMANCE-PAGESPEED.md).

Ces écarts sont des arbitrages de contenu ou de fonctionnement ; les espacements de mise en page ont été contrôlés séparément.

## Contrôle exhaustif des textes du 25 octobre

L’[audit des douze sections](AUDIT-TEXTES.md) compare les 279 calques de texte des deux références avec les contenus rendus. Il rétablit le fil d’Ariane « Soins anti-âge / Collection Cactus » et les quatre réponses FAQ qui avaient été reformulées. Les réponses complètes présentes dans les calques repliés de la maquette ordinateur sont communes aux deux formats. Les prix cohérents, les corrections orthographiques, la traduction des titres et les données de démonstration convenues sont conservés. Aucun écart de formulation inexpliqué ne reste dans l’inventaire après normalisation des espaces, apostrophes et capitales d’affichage.

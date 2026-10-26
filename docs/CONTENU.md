# Modifier les contenus sans toucher au code

## Produit et variantes

Dans **Produits → Sérum Précieux Régénérant**, modifier le titre, la description, les médias, les variantes, le stock et les prix. Le premier paragraphe sert d’introduction ; les paragraphes suivants alimentent l’accordéon Description. Si la description ne contient qu’un paragraphe, celui-ci reste visible dans l’accordéon.

Le produit comporte quatre images. Chaque variante peut recevoir son propre média. Les prix unitaires sont configurés dans chaque variante avec une référence de **100 mL**. Ne pas saisir un prix unitaire dans un texte du thème.

| Variante | Prix | Prix barré | Volume | Prix pour 100 mL |
| --- | ---: | ---: | ---: | ---: |
| 15 mL | 75 € | 85 € | 15 mL | 500 € |
| 150 mL | 150 € | 170 € | 150 mL | 100 € |

Ces prix et stocks sont des données de test. Le profil d’expédition standard propose une zone France/international à 5,90 €, gratuite dès 60 €, depuis le lieu possédant le stock. Un marché International — revue KNR couvre les régions de recette hors France/États-Unis. Les options US initiales sont conservées. Voir [la configuration et la recette internationale](DISPONIBILITE-INTERNATIONALE.md) et [les données de reprise](../content/markets-and-shipping.json). Aucun paiement réel ni expédition réelle n’est configuré par cette livraison de thème.

## Référencement du produit

Dans la même fiche produit, ouvrir **Référencement sur les moteurs de recherche → Modifier** (interface anglaise : **Search engine listing → Edit**). La méta-description est indépendante du texte visible de la fiche. La valeur validée est :

> Découvrez le Sérum Précieux Régénérant Maison Célestine, à 97 % d’ingrédients d’origine naturelle. Deux formats : 15 mL et 150 mL.

Après import du CSV sur une nouvelle boutique, renseigner ce champ puis enregistrer. Le thème natif réutilise automatiquement cette valeur pour la méta-description et les descriptions de partage social. Le [rapport SEO](PERFORMANCE-PAGESPEED.md) distingue ces métadonnées des restrictions d'indexation de l'aperçu Shopify.

## Métachamps produit

Les définitions se trouvent dans **Paramètres → Métachamps et métaobjets → Produits**. Les valeurs se modifient en bas de la fiche produit.

| Clé | Type | Utilisation |
| --- | --- | --- |
| `knr.benefits` | Liste de textes | Badges Unifie / Protège |
| `knr.benefits_detail` | Texte enrichi | Accordéon Bienfaits |
| `knr.ingredients` | Texte enrichi | Accordéon Ingrédients clés |
| `knr.skin_types` | Texte enrichi | Accordéon Adapté aux peaux |
| `knr.ingredient_story` | Texte multiligne | Texte de la section ingrédients |
| `knr.related_products` | Liste de produits | Complétez votre rituel |
| `knr.reviews` | Liste de métaobjets `knr_avis` | Avis, moyenne et distribution |
| `knr.testimonials` | Liste de métaobjets `knr_avis` | Carrousel de témoignages |

Les extensions facultatives `knr.summary` et `knr.details` sont prévues pour une introduction et une description indépendantes. Elles ne sont pas nécessaires aux données livrées : la description produit est utilisée par défaut.

## Avis et témoignages

Dans **Contenu → Métaobjets → Avis KNR**, chaque entrée comprend `author`, `title`, `body`, `rating` (entier de 1 à 5) et `date`. Les entrées doivent être actives et accessibles à la boutique en ligne. L’ordre des références sur le produit détermine l’ordre d’affichage.

La moyenne, la distribution, les filtres et le bouton Charger plus utilisent ces mêmes références. Les formulaires Écrire un avis et Poser une question créent une demande de contact Shopify. Ils ne créent pas automatiquement un avis public. Après validation, le gestionnaire crée ou modifie l’entrée du métaobjet et l’associe au produit.

## Sections du thème

Dans **Boutique en ligne → Thèmes → KNR - Preview → Personnaliser**, ouvrir la fiche produit avec le modèle `knr-serum`. Les sections préfixées **KNR** exposent leurs contenus : images ordinateur/mobile, titres, cartes du rituel, FAQ, textes de réassurance, menus, newsletter et pied de page.

Dans **KNR · Produit**, **Image de la barre d’achat flottante** choisit sa vignette sans dépendre de l’ordre des médias produit. Sans sélection, l’image principale du produit sert de repli. Le cadrage par défaut reproduit le tube blanc de Figma.

Dans **KNR · Produit**, le réglage **Collection du lien Complétez votre rituel** choisit la destination de la flèche. Sans sélection, elle utilise la collection du fil d’Ariane, puis le catalogue complet en dernier recours. Les boutons **+** ajoutent les produits associés à variante unique directement au panier. Leurs images et noms ouvrent toujours la fiche produit. Un produit à plusieurs variantes ou nécessitant un abonnement conduit au choix de ses options ; un produit simple indisponible a un bouton désactivé. Les formulaires natifs restent utilisables sans JavaScript, avec navigation Shopify habituelle vers le panier.

Le modèle Liquid imposé par l’exercice utilise des sections statiques. Leurs paramètres et blocs restent éditables, mais l’ordre des grandes sections est fixé par le modèle. Un modèle JSON serait préférable si le marchand devait réordonner ces sections librement ; il n’a pas été retenu afin de respecter la demande littérale du brief.

Le fil d’Ariane affiche « Soins anti-âge / Collection Cactus », conformément à Figma : premier libellé dans les traductions `knr.skin_care`, destination vers le catalogue Shopify, puis titre et URL de la collection choisie dans **KNR · Produit**. Les cinq réponses FAQ complètes correspondent aux textes de la référence ordinateur ; leurs contenus restent des blocs éditables. Voir l’[audit des textes](AUDIT-TEXTES.md) et ses exceptions de contenu convenues.

## Animations au défilement

Dans **Paramètres du thème → KNR · Apparence → Animations**, activer ou désactiver **Animer les contenus au défilement** (interface anglaise : **KNR · Appearance → Animate content on scroll**), puis enregistrer. Le réglage est activé par défaut et concerne uniquement la fiche KNR. Pour le vérifier, ouvrir l’aperçu de la boutique hors de l’éditeur et recharger après l’enregistrement.

Les titres éditoriaux et les cartes apparaissent une seule fois, avec un fondu et un déplacement de 12 px. Durée : 400 ms sur ordinateur, 360 ms sur mobile ; les cartes sur ordinateur ont un léger décalage de 60 ms, plafonné à 180 ms. Le produit, les commandes d’achat et les formulaires restent immédiatement visibles. La préférence de réduction des animations de l’appareil prime sur le réglage ; sa modification est prise en compte sans recharger. Sans JavaScript, le contenu reste visible. Dans l’éditeur Shopify, les sections restent statiques pour faciliter leur sélection et leur rechargement.

## Survol des commandes

Les états de survol utilisent les couleurs **papier, sable, accent et texte** de **KNR · Apparence**. Ils s’appliquent aux éléments interactifs et sont réservés aux appareils disposant d’un pointeur précis capable de survol. Les liens gardent un focus clavier visible ; les effets de zoom et de déplacement sont supprimés en mouvement réduit. L’interrupteur de défilement décrit ci-dessus concerne les apparitions éditoriales, pas le retour visuel des commandes au survol.

## Journal et navigation

Dans **KNR · Pied de page**, les champs **Facebook**, **Instagram**, **TikTok** et **LinkedIn** contrôlent les quatre icônes du bas. À la demande du candidat, ils pointent provisoirement vers les pages d’accueil de ces réseaux. Les remplacer par les URL officielles de la marque quand elles seront disponibles. Vider un champ masque uniquement l’icône correspondante. Le copyright reste éditable ; `[year]` est remplacé par l’année courante.

Les sélecteurs du pied de page utilisent les pays et langues publiés dans Shopify. Le choix recharge directement la page, sans bouton Appliquer visible avec JavaScript. Un texte accessible annonce ce comportement. En cas d’absence de JavaScript, le bouton natif reste disponible. Seul le français est actuellement publié ; aucune deuxième langue fictive n’est proposée.

- **Contenu → Articles de blog → Journal** : articles, images, extraits, tags et dates. La page produit affiche les quatre derniers articles publiés. Le tag sert de catégorie.
- **Contenu → Menus** : `main-menu`, `decouvrir`, `service-client` et `legal-transparence`.
- Les libellés exacts des trois menus de pied de page et leurs destinations sont consignés dans [footer-navigation.json](../content/footer-navigation.json). Les modifier dans Shopify, sans remplacement de texte dans Liquid. Le lien « Voir le certificat » se règle dans **KNR · Pied de page → Libellé du lien de certification** ; sa destination reste modifiable séparément.
- **Boutique en ligne → Pages** : Le rituel, Nos engagements, Livraison et retours, Nous contacter et Informations légales.
- **Paramètres → Confidentialité des clients** : bannière Shopify. Le lien Paramètres des cookies ouvre sa fenêtre de préférences ; sa destination de repli reste une page réelle.
- **Marchés** : France, États-Unis et International — revue KNR ; français et EUR. Les pays proposés par le sélecteur proviennent de ces marchés. **Paramètres → Expédition et livraison → General profile** : profils standards, origine possédant les stocks, zone US préexistante et zone France/international de démonstration. Ne pas remplacer cette configuration par le système anticipé Shipping by market pendant la recette ; le parcours panier international a été validé avec le profil standard.

Les libellés d’interface se trouvent dans `locales/fr.json`, sous la clé `knr`. Les libellés de l’éditeur de thème sont traduits dans `locales/fr.schema.json`.

### Titres des cartes Actualités

Les articles restent la source du titre complet, du texte, de l’image et de la destination. Les blocs **Titre de carte (retours à la ligne)** de la section Actualités permettent une composition éditoriale sur deux lignes : choisir l’article, puis saisir le titre avec un retour à la ligne. Si le bloc est vide ou supprimé, le titre de l’article est utilisé automatiquement. Ces titres courts sont à mettre à jour avec l’article lorsqu’ils sont renseignés.

Le réglage **Recadrage rapproché de la maquette** du bloc article active le cadrage détaillé du visuel de certification. Il se désactive lors du remplacement par une image qui doit conserver son cadrage standard ; le nom de l’URL ne pilote plus ce comportement.

Les étoiles décoratives des résumés et témoignages suivent les notes des métaobjets, arrondies à l’étoile la plus proche. Les moyennes numériques conservent leur précision à une décimale.

## Carrousel sous le bouton d’achat

Dans **KNR · Produit → Messages de livraison et réassurance**, modifier les quatre messages, l’interrupteur de rotation automatique et la durée de 4 à 12 secondes. Valeur livrée : 4 secondes. L’interface anglaise affiche **KNR product → Delivery and reassurance messages**. Un message secondaire vide est masqué ; la disponibilité de la variante conserve la priorité. La rotation reste suspendue dans l’éditeur pour faciliter la sélection ; l’aperçu extérieur permet de la vérifier après enregistrement. [Guide et recette détaillés](CARROUSEL-REASSURANCE.md).

## Images du hero et agrandissement

L’image principale et les autres vues du carrousel supérieur ne sont pas cliquables et n’affichent pas de bouton « + », conformément à la correction Figma demandée pendant la revue. Les deux images secondaires gardent leur agrandissement. Les images restent issues des médias du produit et du réglage d’image mobile existant ; la navigation du carrousel est conservée.

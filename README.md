# Maison Célestine — intégration Shopify KNR

Intégration complète de la fiche produit Figma, de l’annonce au pied de page, en **Liquid, CSS et JavaScript natif**, sur le thème Shopify **Horizon 4.3.0**. Développement, contrôles et déploiement avec Shopify CLI.

- **[Ouvrir la fiche produit](https://maison-celestine-knr-test.myshopify.com/products/serum-precieux-regenerant)** — mot de passe **KNRDEV**.
- [Dépôt public](https://github.com/dragnoir/knr-maison-celestine), livré en un seul commit initial.
- [Maquette de travail](https://www.figma.com/design/gkR3Ew3ksO4sd8AmoMeAHB/?node-id=720-729) : desktop `720:729`, mobile `653:1125`.

Le thème KNR est publié sur la **boutique de développement protégée**, et le modèle `knr-serum` est attribué au produit principal. Le lien fonctionne sans paramètre de prévisualisation. Après saisie du mot de passe, Shopify peut ramener à l’accueil : rouvrir alors le lien produit.

## Pour découvrir le travail

[Parcours en cinq minutes](docs/REVUE-RAPIDE.md) · [Édition des contenus](docs/CONTENU.md) · [Comparaisons Figma / Shopify](docs/final-validation/pre-submission-20261025/index.html) · [Validation](docs/VALIDATION.md) · [Contrôle de livraison](docs/LIVRAISON.md).

La [vidéo de 3 min 28 s](docs/walkthrough/maison-celestine-parcours.mp4) présente seize séquences réelles. Elle précède les dernières finitions des tiroirs, accordéons, commandes de galerie et focus ; les rapports ciblés contiennent des preuves plus récentes.

## Fonctionnalités

- **Achat** : prix, prix barré, prix unitaire, disponibilité, image et URL synchronisés entre variantes et achat flottant. Données de démonstration : 15 mL à 75 € / 85 €, et 150 mL à 150 € / 170 €. Prix unitaires natifs : respectivement 500 € et 100 € pour 100 mL.
- **Panier** : formulaires Shopify natifs améliorés par l’API Ajax localisée, confirmation serveur avant mise à jour, erreurs et clics répétés traités, quantités, retrait et persistance. Tiroir en superposition sans compression de la page, verrouillage du défilement et restauration du focus.
- **Recommandations** : trois ajouts rapides sans navigation, cibles tactiles de 44 px et lien de collection.
- **Interactions** : galerie tactile et deux flèches sur mobile, zoom des images secondaires sur ordinateur, avant/après au clavier, témoignages, accordéons, filtres d’avis et chargement supplémentaire. Le hero reste sans zoom.
- **Formulaires** : newsletter native Shopify ; avis/questions par contact natif. Confirmation serveur et réception d’un message de recette vérifiées. Les avis restent des démonstrations avec **publication manuelle après modération**.
- **Finitions** : tiroirs et accordéons fluides, survols cohérents, quatre messages de réassurance éditables, animations de défilement désactivables dans Shopify. Réduction des mouvements, navigation clavier et focus visibles conservés. Focus tactile du panier confirmé sur iPhone Chrome.

Les arbitrages de contenu desktop/mobile, la flèche précédente ajoutée sur demande et l’espace avant « Lire plus » sont consignés dans le [journal des corrections](docs/CORRECTIONS-MAQUETTE.md).

## Architecture et édition

`theme/` contient **52 fichiers spécifiques** : layout, template `product.knr-serum.liquid`, **12 sections `knr-`**, 10 snippets, styles, module JavaScript, icônes et Inter auto-hébergée. `data/` contient les ajouts de configuration/locales ; `content/` les données et images de reprise.

Le template Liquid utilise des références de sections statiques pour respecter la demande littérale du brief. Réglages et blocs restent éditables ; l’ordre des grandes sections est fixé par le template. Un template JSON conviendrait mieux à un besoin de réorganisation libre.

| Contenu | Source Shopify |
| --- | --- |
| Titre, description, médias, variantes, prix | Produit et variantes |
| Bienfaits, ingrédients, détails | Métachamps `knr` |
| Images éditoriales, FAQ, réassurance, animations | Réglages et blocs des sections |
| Témoignages et avis de démonstration | Métaobjets liés au produit |
| Produits complémentaires | Références produit |
| Actualités | Articles du blog Journal |
| Navigation | Menus |
| Libellés d’interface | Locales FR/EN |

`knr-components.js` est différé (`type="module"`). Les composants nettoient leurs écouteurs et supportent les rechargements de sections. Les styles sont limités au layout KNR. Le panier et les pages de support réutilisent Horizon. L’assembleur applique un correctif ciblé du tiroir via `scripts/patch-cart-overlay.mjs`, avec contrôle des points d’insertion pour éviter un assemblage silencieusement incompatible.

## Installation et développement

Versions utilisées : **Node.js 24.11.1**, **Shopify CLI 3.93.2**. Aucune dépendance front-end ajoutée ni compilation nécessaire.

1. Récupérer une copie autorisée d’**Horizon 4.3.0** :

   ```sh
   shopify theme pull --store votre-boutique.myshopify.com --theme ID_HORIZON --path ../horizon
   ```

2. Assembler dans un dossier neuf, puis contrôler et développer :

   ```sh
   node scripts/assemble.mjs --base ../horizon --out ../theme-knr
   npm ci
   npm run check
   shopify theme check --path ../theme-knr
   shopify theme dev --store votre-boutique.myshopify.com --path ../theme-knr
   ```

3. Sur une **nouvelle boutique**, suivre [CONTENU.md](docs/CONTENU.md) : importer `content/products.csv`, téléverser les images et créer métachamps, métaobjets, menus, pages et articles. Le CSV ne crée pas ces autres ressources. Régler prix unitaires et médias de variantes dans Shopify. Les marchés/expéditions fournis constituent une configuration de recette, pas une offre commerciale de production.
4. Déployer d’abord sur un thème non publié, puis attribuer le modèle après validation :

   ```sh
   shopify theme push --store votre-boutique.myshopify.com --path ../theme-knr --unpublished
   ```

La boutique livrée est déjà configurée : ne pas réimporter le CSV sans besoin de réinitialisation. Ne jamais ajouter de jeton, `.env`, session ou dossier `.shopify` au dépôt.

## Validation et performance

- `npm run check` : syntaxe JavaScript, cohérence des sections/blocs/réglages/locales/assets, cinq contrôles du carrousel et formatage réussis. Le workflow [Qualité](.github/workflows/quality.yml) reproduit ces contrôles sans identifiants Shopify, avec actions figées par SHA et permissions en lecture.
- **Theme Check : zéro erreur, deux avertissements préexistants d’Horizon** dans `bento-grid.liquid`. [Rapport](docs/theme-check.json).
- Comparaisons desktop **1440 px** et mobile **390 px**, **22 paires de captures** ; contrôles sans débordement du document à **320, 375, 390, 768, 1024, 1440 et 1920 px**. [Audit visuel](docs/AUDIT-VISUEL-FINAL.md).
- Recette principale de **53 contrôles fonctionnels**, puis régressions ciblées des tiroirs, ajouts rapides, galerie, accordéons et focus. Essais d’édition de produit, FAQ, image, menu et article observés puis restaurés. [Recette complémentaire](docs/RECETTE-COMPLEMENTAIRE.md).
- Deux variantes et panier confirmés par le candidat sur **iPhone 16 Pro** ; correctif tactile du panier ensuite confirmé sur iPhone Chrome. Cela ne remplace pas un audit Safari/iOS complet.
- **PageSpeed du 26 octobre au matin, trois analyses par profil sur prévisualisation protégée : médianes 98 ordinateur / 81 mobile**, plages 96–98 / 68–90 ; CLS médian 0. Le LCP mobile reste un point ouvert. Accessibilité automatique 96, bonnes pratiques 92, SEO 69 sur cette prévisualisation. Ces mesures **précèdent les dernières corrections** ; aucun score de la version publiée n’est revendiqué. [Résultats, conditions et limites](docs/PERFORMANCE-PAGESPEED.md).

Images responsives et dimensionnées, médias secondaires différés, Inter auto-hébergée et hero exclu des animations d’apparition. Les rapports conservent les essais variables, sans annoncer un score mobile constant ni attribuer la variation à une cause non établie. La protection reste active ; le score SEO de prévisualisation ne valide pas le référencement public.

Les contrastes Figma sont conservés à la demande du candidat. Les limites des audits sont documentées ; une conformité globale WCAG AA n’est pas revendiquée.

## Livraison et licences

La licence Horizon restreint la redistribution publique d’un thème dérivé complet. Ce dépôt fournit **le code spécifique et son assembleur**, à associer à une copie autorisée du thème. Le thème complet est déployé sur la boutique et fourni séparément au candidat. Notices Horizon et Inter OFL dans `licenses/`. [Licences et provenance](docs/LICENCES.md).

Références commerciales, certifications, témoignages et résultats affichés sont des **données de démonstration de l’exercice**. Les six avis sont identifiés comme tels ; leur publication est manuelle. Les liens sociaux utilisent les destinations génériques demandées.

Les [notes de remise](docs/REMISE.md) réunissent liens, message prêt à copier et précisions. Les rapports antérieurs décrivant un brouillon sont conservés comme historique daté, pas comme l’état actuel. Aucun message ni formulaire de candidature n’est envoyé automatiquement.

# Disponibilité internationale — correctif du 26 octobre 2026

**Les deux variantes et le panier fonctionnent après correction de la configuration Shopify.** Le candidat a confirmé le résultat sur son **iPhone 16 Pro** : « Both sizes and cart work ». Le thème KNR reste non publié ; aucun commit, aucune commande et aucun changement de code.

## Cause et vérification

Le stock réel de démonstration était présent : **100 unités de 15 mL et 100 unités de 150 mL** à Shop location, suivi du stock actif, vente hors stock désactivée. Le produit était actif et disponible sur les canaux. La page partagée recevait pourtant `available: false` de Liquid.

La boutique n’avait initialement que les marchés France et États-Unis. Un visiteur extérieur recevait l’expérience de repli France, avec ses prix et sa langue, sans appartenir à un marché où l’achat était autorisé. Cela explique pourquoi le sélecteur pouvait afficher France et le produit être indisponible. Le paramètre de mesure `knr_audit` ne pilote pas le stock. [Documentation Shopify : région de repli](https://help.shopify.com/en/manual/markets/backup-region) ; [stock livrable](https://help.shopify.com/en/manual/inventory-and-locations/setup/fulfillable-inventory).

L’ajout d’un marché international et d’une option d’expédition dans le système anticipé « Shipping by market » a rendu les variantes disponibles dans le HTML, mais l’API panier rejetait encore l’ajout. **Le formulaire Horizon inchangé reproduisait le même refus**, ce qui a permis de distinguer le défaut de configuration du code KNR. Le retour aux profils d’expédition standards, avec une zone associée au lieu possédant le stock, a ensuite produit des ajouts réellement confirmés par Shopify. Ce constat ne prétend pas diagnostiquer un bug interne précis de la plateforme.

La revue précédente signalait la différence entre les domaines, mais n’avait pas encore résolu ce parcours international. La capture du candidat et les nouveaux essais ont fermé ce point ; la couverture France seule n’était pas une validation suffisante du partage visiteur.

## Configuration livrée pour le test

| Ressource | État |
| --- | --- |
| France et United States | Marchés existants conservés. |
| International — revue KNR | Marché actif couvrant les 235 autres pays/régions proposés par Shopify ; catalogue hérité, français, EUR. |
| Expédition | Profils standards, sans le système anticipé d’expédition par marché. |
| General profile | Tous les produits non rattachés à un autre profil ; origine Shop location. |
| Zone Domestic / United States | Options préexistantes conservées : Standard 8 USD, gratuite dès 70 USD, et Express 15 USD. |
| Zone France et international — test KNR | Les 236 destinations hors États-Unis ; 5,90 EUR, gratuite dès 60 EUR. Aucun délai fixe ajouté à ce tarif de test. |
| Stock | 100 unités par variante principale, suivi et refus de survente conservés. |

Ces règles servent **uniquement à la recette de la boutique de développement**. Elles ne constituent pas une offre commerciale d’expédition mondiale ni une configuration de production. Pour une boutique réelle, le marchand définit ses destinations, tarifs, taxes et engagements. Les données de reprise sont dans [markets-and-shipping.json](../content/markets-and-shipping.json).

## Recette après correction

- Tunisie sur le domaine normal : 15 mL ajouté, 75 EUR, réponse serveur confirmée.
- Lien visiteur correspondant au signalement : 15 mL + 150 mL, deux articles et total **225 EUR**.
- Ajout rapide Huile Précieuse depuis cette session : trois articles, **290 EUR**, puis retrait des articles de test.
- États-Unis sur le domaine normal : 150 mL ajouté, **150 EUR**, puis retiré.
- France et lien partagé : 15 mL ajouté, **75 EUR**. Quantité portée à deux sur le domaine normal pour rétablir le panier initial de **150 EUR**.
- Le candidat a actualisé le lien propre sur iPhone 16 Pro, essayé les deux tailles et confirmé l’ouverture du panier. La capture initiale est celle d’un navigateur intégré Messenger ; ce contrôle ciblé ne vaut pas un audit Safari complet de toute la page.

Panier normal final : deux 15 mL, 150 EUR, France, tiroir fermé. Panier isolé du domaine de partage : vide ; session de test fermée. Une préférence de pays et la session de ce domaine de test ont été réinitialisées pendant la reproduction ; le mot de passe existant a été saisi à nouveau. Aucune session d’un autre site n’a été modifiée.

[Relevés](final-validation/market-availability/checks.json) · [Configuration du profil](final-validation/market-availability/standard-profile.png) · [Panier confirmé avec les deux tailles](final-validation/market-availability/tn-cart-two-variants.png) · [Signalement initial sur iPhone](final-validation/market-availability/reported-iphone.png) · [Rôles des thèmes](final-validation/market-availability/theme-roles.json).

Les six mesures PageSpeed du matin **précèdent cette correction des marchés et de l’expédition**. Le code du thème est identique, mais les données et les 237 choix du sélecteur de pays sont différents ; aucun nouveau score postérieur au correctif n’est annoncé. Les résultats et leurs limites restent datés dans [PERFORMANCE-PAGESPEED.md](PERFORMANCE-PAGESPEED.md).

La correction porte sur l’administration Shopify. Aucun état de disponibilité forcé, aucun changement des quantités, aucune suppression de protection, aucun ajout de script. Thème 189290447076 toujours non publié, Horizon 189289103588 toujours actif, historique Git local à zéro commit.

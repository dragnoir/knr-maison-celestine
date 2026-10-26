# Préparation à l’entretien technique

Objectif : pouvoir expliquer et modifier le projet sans dépendre d’un texte appris par cœur. Le brief autorise l’IA ; présenter honnêtement son rôle dans l’implémentation et la vérification, puis démontrer sa propre compréhension.

## Présentation en une minute

« Je suis parti du thème Horizon installé sur la boutique. J’ai construit un template produit Liquid dédié avec douze sections KNR, des styles isolés et du JavaScript natif différé. Les données commerciales restent dans Shopify ; les contenus éditoriaux sont administrables. J’ai harmonisé les incohérences desktop/mobile, puis vérifié les parcours d’achat et les modifications de contenu. Le dossier distingue les résultats mesurés des contrôles encore ouverts. »

Adapter cette présentation à ce que l’on maîtrise réellement. Ne pas annoncer une conformité AA, un score Lighthouse, un test iPhone ou une publication non réalisés.

## Questions probables et éléments de réponse

| Question | Réponse à expliquer avec le code |
| --- | --- |
| Pourquoi un template Liquid plutôt que JSON ? | Respect littéral du brief. Réglages/blocs éditables, ordre des grandes sections défini par le template. JSON serait le choix naturel pour laisser le marchand les réordonner. |
| Pourquoi utiliser Horizon ? | Conserver les parcours et composants natifs de panier, recherche et compte ; limiter la surface personnalisée. La notice de licence reste conservée. |
| Comment la variante est-elle synchronisée ? | Données Liquid sérialisées, sélection par ID, prix/disponibilité/média mis à jour, formulaires et barre flottante synchronisés, URL modifiée ; `popstate` rétablit la bonne variante. |
| Que se passe-t-il lors d’un échec panier ? | Boutons bloqués pendant la requête, réponse Shopify vérifiée avant succès, message d’erreur visible, réactivation. Si l’ajout a réussi mais le rafraîchissement échoue, proposer le panier et ne pas annoncer à tort un ajout rejeté. |
| Pourquoi ne pas recalculer tous les prix en JavaScript ? | Shopify fournit la référence commerciale et la présentation localisée. Le prix unitaire suit prix et volume réels, avec les données natives configurées. |
| Comment éviter les écouteurs doublés dans l’éditeur ? | Éléments personnalisés ; `AbortController` libère les abonnements à la déconnexion ; le cycle de mise à jour réinstalle les contrôles remplacés. |
| Comment modifier un avis ? | Métaobjet référencé par le produit, publication manuelle après modération. Une soumission de formulaire n’écrit pas un avis public. |
| Pourquoi la note n’est-elle pas celle dessinée partout ? | Moyenne calculée depuis les six entrées de démonstration. Une note de façade contredirait les données. |
| Comment as-tu vérifié l’éditabilité ? | Montrer les modifications réelles du produit isolé, du menu, de l’extrait d’article, de la FAQ et de l’image, puis leur restauration. |
| Que reste-t-il à vérifier ? | Safari à compléter ; URLs et état final à recontrôler après publication. Lighthouse mesuré : médianes 88 mobile / 98 ordinateur après animations et survols. Les couleurs Figma sont conservées conformément au périmètre de l'intégration ; les limites de contraste sont documentées. |
| Pourquoi le dépôt n’inclut-il pas tout Horizon ? | Sa notice encadre la redistribution publique. Le dépôt contient le travail spécifique et l’assembleur ; le thème complet est fourni séparément au marchand autorisé. |

## Répétition pratique, quinze minutes

1. Retrouver le template, la section produit, le module JS et le schéma FAQ sans recherche assistée.
2. Expliquer `addToCart` du formulaire à la réponse et à la mise à jour Horizon.
3. Modifier une question FAQ dans Shopify, vérifier le résultat puis la restaurer.
4. Expliquer le cas « première variante épuisée » et la correction du retour arrière.
5. Décrire un échec réellement rencontré, sa cause, la correction et sa preuve. Exemples : repli des produits complémentaires, état sans avis, modal devant CAPTCHA.
6. Ouvrir un rapport axe et distinguer violation, contrôle incomplet et test réussi.
7. Lancer les contrôles locaux et expliquer ce qu’ils ne testent pas : ni paiement réel, ni délivrabilité générale, ni tous les navigateurs.

Répondre avec un exemple précis du projet. Si une réponse n’est pas maîtrisée, ouvrir le code et vérifier au lieu d’improviser.

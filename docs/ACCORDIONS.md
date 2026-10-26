# Accordéons produit et FAQ — ouverture et fermeture fluides

**26 octobre 2026.** Les quatre détails produit et les cinq réponses FAQ s’ouvrent et se ferment désormais avec une variation de hauteur et un léger fondu de **260 ms**. Le chevron accompagne le mouvement. Le style de survol existant et les espacements au repos sont conservés ; aucun contrôle visible supplémentaire.

Les éléments natifs `details` et `summary` restent propriétaires de l’état et du clavier. Un composant commun anime seulement l’enveloppe de réponse ; le texte intérieur conserve ses marges et son padding. La fermeture native intervient après l’animation. Plusieurs réponses peuvent rester ouvertes, comme auparavant.

Un nouveau clic pendant le mouvement capture la hauteur et l’opacité affichées puis inverse la destination. Les anciennes animations sont annulées. Les hauteurs redeviennent automatiques à la fin : aucun style de hauteur ou d’opacité ne reste fixé. Un changement de largeur, une réinitialisation du composant ou l’activation de la réduction des mouvements termine proprement le mouvement en cours. Les liens d’une réponse en cours de fermeture ne restent pas accessibles au clavier ; si le focus était dedans, il revient sur son en-tête.

Les styles communs appartiennent à `knr-accordion-styles.liquid`, rendu par les deux sections. Aucun nouveau module externe, média, réglage marchand ni minuteur permanent. Les réponses initialement ouvertes restent visibles sans animation au chargement. Avec réduction des mouvements, les bascules sont immédiates ; sans JavaScript, les accordéons natifs continuent à fonctionner.

## Vérification sur le brouillon

- Les **neuf lignes** ont été basculées puis rétablies. Texte, état initial et hauteur de repos identiques avant/après.
- Mesures initiales à 1440 et 390 px : espacements strictement identiques à la version précédente. Les deux conteneurs d’images secondaires restent à **609 px** de hauteur à 1440 px, même avec les quatre détails ouverts.
- Les deux animations réelles présentent une durée de **260 ms**. Le parseur tient compte de la normalisation Shopify de `260ms` en `.26s` ; ce point a été corrigé après inspection des effets exécutés.
- Retournement rapide contrôlé à 100 puis 80 ms : hauteur de départ identique à celle rendue, état final correspondant au dernier clic, aucune animation résiduelle.
- Entrée et Espace sur une réponse FAQ ; focus visible conservé sur `summary`. Un lien temporaire de recette a permis de vérifier le retour du focus pendant la fermeture ; il a ensuite été retiré, puis la page rechargée.
- Réduction des mouvements initiale et activée pendant une animation : aucun mouvement restant. Redimensionnement pendant une animation : hauteur automatique et état final corrects.
- Neuf réponses ouvertes simultanément ; contrôles aux largeurs **320, 375, 390, 768, 1024, 1440 et 1920 px**, sans débordement horizontal.
- Réinitialisation du composant simulée via son callback public : animation supprimée, réouverture unique et fermeture fonctionnelles. Il ne s’agit pas d’un nouvel essai réel dans l’éditeur Shopify.
- JavaScript réellement désactivé puis page rechargée : cible repérée par le modèle de boîte natif du navigateur, appui tactile et attribut `open` vérifié avant/après. Les tentatives de clic par le pilote dépendant de JavaScript n’ont pas été utilisées comme preuve. JavaScript a ensuite été réactivé et la page rechargée.

Ces contrôles utilisent Chrome. **Aucun nouveau résultat iPhone réel ou PageSpeed n’est annoncé après ce changement.**

[Mesures et effets exécutés](final-validation/accordion-motion/checks.json) · [Détails produit sur mobile](final-validation/accordion-motion/mobile-product.png) · [FAQ sur ordinateur](final-validation/accordion-motion/desktop-faq.png).

État final : première réponse ouverte dans chaque groupe, autres réponses fermées, panier inchangé de deux 15 mL / 150 EUR, France, tiroirs fermés. Réglages temporaires du navigateur supprimés. Thème **189290447076 non publié**, aucun commit, aucune commande, aucun changement de prix, stock ou contenu marchand.

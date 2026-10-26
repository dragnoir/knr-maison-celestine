# Carrousel de livraison et réassurance — 23 octobre 2026

Ajout demandé pendant la revue, déployé uniquement sur **KNR - Preview (189290447076)**. Aucun commit ni publication.

## Utilisation et édition

Les quatre traits sous l’achat sélectionnent désormais quatre messages : disponibilité, livraison offerte dès 60 € en France métropolitaine, retours acceptés sous 30 jours et paiement sécurisé. Les conditions reprennent les contenus de démonstration déjà présents dans la boutique.

Dans **KNR · Produit → Messages de livraison et réassurance** (interface anglaise : **KNR product → Delivery and reassurance messages**), modifier les quatre textes, activer/désactiver **Faire défiler les messages automatiquement** et choisir une durée de **4 à 12 secondes**. Valeur livrée : **4 secondes**, rotation activée. Un texte secondaire vide retire son message et sa commande ; le premier reste lié à la disponibilité réelle de la variante et affiche « En stock » si son texte est vide.

Les traits conservent leur dessin de 16 × 1 px et leur espacement ; leurs zones cliquables mesurent 24 × 24 px. À la demande du candidat, aucun bouton Pause/Reprendre ni autre commande visuelle n’accompagne les quatre traits de la maquette. Le texte apparaît par un fondu de 180 ms, sans déplacement. La grille réserve la hauteur du message le plus long, y compris avant le chargement du JavaScript.

## Comportements

- Rotation circulaire ; sélection directe par clic, toucher, Entrée ou Espace.
- Suspension tant que le focus reste dans le carrousel ou que la souris le survole. La rotation reprend ensuite avec un nouvel intervalle complet de 4 secondes ; cliquer un trait sélectionne son message immédiatement.
- Timer suspendu hors écran ou dans un onglet masqué. Aucun nouveau script externe ni dépendance front-end.
- Réduction des animations : aucun défilement automatique ni fondu ; les traits restent utilisables. La modification de cette préférence est prise en compte immédiatement.
- Éditeur Shopify : rotation suspendue, sélection manuelle disponible, rebinding et nettoyage des timers/listeners après remplacement de section.
- Changement de variante : retour au message de disponibilité. Une variante épuisée affiche « Épuisé » et bloque le défilement ainsi que les autres messages jusqu’au retour à une variante disponible.
- Sans JavaScript : disponibilité rendue par Liquid, commandes inactives masquées, espace conservé.
- Les messages masqués sont exclus de l’arbre d’accessibilité. Aucun changement automatique n’est annoncé ; la sélection manuelle utilise une région polie. Focus clavier visible conservé. Seuls les quatre traits figurent dans l’ordre de tabulation. Le contrôle de rotation séparé recommandé par WAI-ARIA a été retiré à la demande du candidat afin de conserver la composition Figma ; la suspension repose sur le focus et le survol, et le mouvement réduit désactive la rotation.

## Recette réellement effectuée

Chrome desktop 1440 px et mobile tactile émulé 390 px : rotation, boucle, sélection des messages, pause/reprise, focus clavier et Espace, survol, sortie de l’écran, mouvement réduit à chaud et navigation entre 15/150 mL. Aucun débordement à **320, 375, 390, 768, 1024, 1440 et 1920 px**. Le panier s’ouvre toujours en superposition ; les deux unités de 15 mL présentes avant cette passe restent inchangées.

À 1440 px, la disponibilité reste à y=730 et les détails à y=801 avant/après l’ajout. Ces mêmes positions sont observées avec JavaScript désactivé. Chaque message partage la même hauteur ; un texte de test plus long enregistré dans Shopify reste stable entre les sélections. Le bouton de rotation présent dans la première version a ensuite été supprimé à la demande du candidat.

Un message de recette et la désactivation de la rotation ont été **enregistrés dans Shopify et constatés dans l’aperçu**. La durée de 4 secondes a également été enregistrée et vérifiée. Les textes livrés ont ensuite été rétablis. La durée finale est passée à 4 secondes lors de la correction demandée après cette première recette. Les contrôles restent utilisables dans l’éditeur après ses rechargements de section. Certaines premières lectures étaient encore servies par le cache Shopify ; les relevés suivants avec une URL d’aperçu renouvelée confirment les paramètres enregistrés.

**Cinq tests Node** exécutent le contrôleur réel avec une horloge et des nœuds simulés : cycle complet et timer unique, suspension hors écran/onglet masqué, rupture de stock, pause manuelle/mouvement réduit, modes sans autoplay/éditeur et nettoyage à la déconnexion/reconnexion. Le stock réel du produit n’a pas été modifié pour cette passe. Commande : `npm run check:reassurance`, incluse dans `npm run check`.

Contrôles JS/contenu/format réussis. Theme Check : 0 erreur, 2 avertissements natifs Horizon inchangés. Aucun message d’erreur `knr-components` relevé dans l’onglet testé. Les résultats de performance de la revue précédente précèdent cet ajout ; **aucun nouveau score Lighthouse ou résultat Safari/iPhone réel n’est revendiqué**.

[Relevés du navigateur](final-validation/reassurance/checks.json) · [ordinateur](final-validation/reassurance/desktop.png) · [mobile](final-validation/reassurance/mobile.png)

## Correction demandée après revue

Le candidat a demandé de retirer le bouton Pause/Reprendre absent de Figma et d’accélérer la rotation. La version actuelle conserve uniquement les quatre traits et utilise **4 secondes** au lieu de 6. Le réglage a été enregistré sur le même thème de brouillon. Les tests du contrôleur couvrent désormais la suspension au focus et la reprise à sa sortie. La recette de cette correction est consignée dans [revision-without-button.json](final-validation/reassurance/revision-without-button.json). Les relevés `checks.json` décrivent la première version, avant cette correction. Les captures ordinateur et mobile montrent la version corrigée. Aucun nouveau score PageSpeed n’est revendiqué.

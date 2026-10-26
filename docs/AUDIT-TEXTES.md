# Audit des textes de la fiche produit

**25 octobre 2026 — thème de brouillon 189290447076, sans publication ni commit.** Comparaison des douze sections avec les références Figma [ordinateur 720:729](https://www.figma.com/design/gkR3Ew3ksO4sd8AmoMeAHB?node-id=720-729) et [mobile 653:1125](https://www.figma.com/design/gkR3Ew3ksO4sd8AmoMeAHB?node-id=653-1125).

## Résultat

Les **279 calques de texte** des deux références ont été inventoriés : **176 correspondent** au contenu de leur section, **86 conservent une correction convenue**, et **17 sont des variantes masquées non utilisées**. Les nombres comptent les calques, donc plusieurs occurrences d’un même choix peuvent apparaître. Aucun écart de formulation inexpliqué ne reste dans cet inventaire.

La comparaison normalise uniquement les espaces/retours à la ligne, les apostrophes droites ou courbes et les capitales d’affichage CSS. Les prix, chiffres d’avis et différences de contenu mobile ne sont pas normalisés : chaque exception possède une raison explicite dans [comparison.json](final-validation/text-audit/comparison.json).

Les réponses FAQ présentes dans des calques masqués sont incluses dans la recette, car elles deviennent visibles à l’ouverture des accordéons. Les anciens onglets alternatifs et numéros dupliqués masqués dans Figma sont exclus de l’affichage.

## Corrections appliquées

1. **Fil d’Ariane** : « Collection Cactus / Sérum Précieux Régénérant » devient **« Soins anti-âge / Collection Cactus »**, comme dans le calque `720:752`. Le premier lien ouvre le catalogue Shopify ; la collection conserve son titre et sa destination dynamiques. Le libellé est traduit via `knr.skin_care`.
2. **Quand voir les effets ?** : rétablissement du texte complet du calque `720:969`, avec les premières améliorations à 4 semaines et le renforcement après 8 à 12 semaines.
3. **Convient-il à tous ?** : rétablissement du texte du calque `720:974`, qui avait été remplacé par une formulation générale de précautions.
4. **Est-il naturel ?** : rétablissement du texte complet du calque `720:979`, avec les mentions de composition et de fabrication de la maquette.
5. **Peut-on l’associer ?** : rétablissement du texte du calque `720:984`, avec la Crème Régénérante et la dernière phrase sur les rétinoïdes.

La première réponse FAQ était déjà conforme. Les quatre autres restent des blocs éditables dans **KNR · FAQ** ; les réglages locaux et ceux de la boutique sont synchronisés. Ces textes demeurent les données de démonstration fournies pour l’exercice, comme les autres mentions commerciales de la maquette. Aucune validation clinique ou de certification n’est revendiquée.

## Revue section par section

Les colonnes comptent les calques des deux maquettes : « conservés » désigne une correction convenue, « masqués » une variante de dessin non affichée.

| Section | Correspondants | Conservés | Masqués | Conclusion |
| --- | ---: | ---: | ---: | --- |
| Annonce | 2 | 2 | 0 | Livraison identique ; « En savoir plus » remplace le placeholder. |
| En-tête | 3 | 2 | 0 | Navigation correcte ; « Diagnostic » et compteur réel conservés. |
| Produit, achat flottant et recommandations | 44 | 19 | 4 | Fil d’Ariane corrigé ; titre, introduction, description et libellés contrôlés. Prix natifs conservés. |
| Ingrédients | 5 | 1 | 0 | Titre, paragraphe et signature ordinateur conformes ; « Doctor Name » mobile reste remplacé par Sophie M. |
| Utilisation | 13 | 6 | 9 | Paragraphes conformes ; titre français, orthographe et titres de cartes ordinateur conservés. |
| Avant/après et témoignages | 8 | 4 | 0 | Introduction et témoignage de Clara T. conformes ; Avant/Après en français. |
| FAQ | 18 | 4 | 0 | Cinq réponses complètes ordinateur contrôlées, y compris les quatre restaurées ; version commune sur mobile. |
| Avis | 12 | 42 | 0 | Actions et filtres conformes ; six avis fictifs cohérents, badge Démo et effectifs calculés conservés. |
| Actualités | 19 | 3 | 4 | Catégories, titres et extraits contrôlés ; titre français et mot « laboratoire » conservés. |
| Newsletter | 7 | 1 | 0 | Titre ordinateur commun, e-mail, inscription et note conformes. |
| Réassurance | 13 | 0 | 0 | Quatre promesses complètes contrôlées ; carrousel mobile conservé. |
| Pied de page et barre du bas | 32 | 2 | 0 | Menus, À propos, certification et copyright contrôlés ; texte ordinateur commun et coquille mobile corrigée. |

## Corrections convenues préservées

- **Prix** : 15 mL à 75 €, prix barré 85 €, soit 500 €/100 mL ; 150 mL à 150 €, prix barré 170 €, soit 100 €/100 mL. Même source Shopify sur tous les écrans. Les produits recommandés gardent leurs prix de démonstration réels, sans les zéros de Figma.
- **Contenu commun** : version ordinateur de la newsletter, de la signature, des cartes d’utilisation, des FAQ et du texte À propos ; pas de réintroduction des abréviations ou placeholders mobiles.
- **Avis** : six entrées éditables et mention de démonstration ; moyenne et répartition calculées, sans faux badge d’achat vérifié. Les témoignages supplémentaires assurent la navigation du composant.
- **Français et typographie** : Diagnostic, Comment l’utiliser, Dernières actualités, laboratoire, antioxydantes, Avant/Après, apostrophes courbes et format monétaire français.
- **Fonctionnement demandé** : quatre messages de livraison/réassurance éditables, sélection de pays sans bouton visible, liens sociaux de démonstration et champs de formulaire accessibles.

Les réponses complémentaires des accordéons produit Bienfaits, Ingrédients clés et Adapté aux peaux, ainsi que les textes de validation, de panier et de modération, n’ont pas de texte équivalent fourni dans Figma. Ils sont conservés comme contenus éditables ou interface fonctionnelle. Le détail des arbitrages reste dans [CORRECTIONS-MAQUETTE.md](CORRECTIONS-MAQUETTE.md).

## Vérifications effectuées

- Texte réel des douze sections relevé après rechargement en Chrome à **1 440 px**, puis à **390 px**. Les deux inventaires sont conservés avec les références originales.
- Cinq FAQ ouvertes sur ordinateur et mobile : paragraphes présents et lisibles, aucune réponse coupée, aucun débordement horizontal. État initial rétabli ensuite : première FAQ ouverte, quatre autres fermées.
- Mobile : sélection de 150 mL, lecture des prix 150/170 € et 100 €/100 mL ; retour à 15 mL, lecture des prix 75/85 € et 500 €/100 mL. Aucune opération sur le panier.
- Premier lien du fil d’Ariane : catalogue `/collections/all` ouvert, page Produits confirmée, onglet de contrôle fermé.
- `npm run check` réussi. Theme Check : **0 erreur**, **2 avertissements natifs Horizon inchangés** dans `bento-grid.liquid`. Parité des fichiers de l’intégration et intégrité des archives vérifiées.

Les contrôles portent sur le texte et son affichage dans Chrome, avec émulation de largeur mobile. Aucun nouveau score Lighthouse, résultat Safari/iPhone réel ou mesure de fidélité raster globale n’est ajouté par cet audit. Les variantes natives de formatage sont distinctes des différences de formulation.

## Preuves

- [Inventaire Figma](final-validation/text-audit/figma-text.json), [comparaison par calque](final-validation/text-audit/comparison.json), [interactions](final-validation/text-audit/interactions.json).
- [Produit ordinateur](final-validation/text-audit/desktop-product.png) et [FAQ développées](final-validation/text-audit/desktop-expanded-faq.png).
- [Produit mobile 15 mL](final-validation/text-audit/mobile-15ml.png), [mobile 150 mL](final-validation/text-audit/mobile-150ml.png) et [FAQ mobile](final-validation/text-audit/mobile-expanded-faq.png).

Le thème reste en brouillon. Aucun commit, publication ou envoi de candidature.

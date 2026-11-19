# Déclaration d'usage de l'IA

Dans ce fichier, j'explique quels outils d'IA j'ai utilisés pendant le projet, à quel moment, pour quoi faire, et ce que j'ai changé ou pas gardé dans ce qu'ils m'ont proposé.

## Ce que j'ai fait sans IA

- **Positionnement, cible et choix des trois projets** : écrits par moi.
- **Moodboard, pistes graphiques et identité visuelle** (couleurs rose, bleu et jaune, typographies, logo) : faits par moi.
- **Maquette Figma desktop et mobile** : entièrement faite par moi, et présentée à la soutenance maquette.
- **Dessins** : les personnages, les chibis et les illustrations des projets sont mes dessins.
- **Modèle 3D du chibi** : modélisé par moi dans Blender.
- **Textes des projets et de l'À propos** : écrits par moi dans la maquette, puis recopiés tels quels dans PocketBase.

## 1. Claude (Anthropic), dans un projet claude.ai

### Après la soutenance maquette : les retours des profs
- **Pour quoi faire** : je lui ai donné ma maquette et les commentaires de Xavier et Pascal pour avoir des idées. Les remarques portaient sur le « logo dans le logo », les compétences qui se limitaient aux logiciels, et le manque de détails dans la liste des projets.
- **Ce que j'en ai fait** : j'ai choisi moi-même les changements et je les ai faits dans Figma : un nouveau logo (une étoile avec mes initiales), une section « Mes compétences » séparée de « Code, création et outils », et des cartes projets plus complètes (année, contexte, rôle).

### PocketBase : organisation des contenus
- **Pour quoi faire** :
  - préparer les collections PocketBase (projets, messages, à propos) ;
  - faire des fiches pour recopier les textes de ma maquette dans les bons champs.
- **Ce que j'ai changé ensuite** (on le voit dans les migrations PocketBase du dépôt) : dans projets, j'ai ajouté `categorie` (liste de choix), `mise_en_situation` (images) et `contexte_fiche` ; dans competences, j'ai enlevé `exemple` ; dans technologies, j'ai ajouté `niveau` et transformé `categorie` en liste de choix ; dans parcours, j'ai ajouté `url` (13/11).

### Développement : écrire les prompts pour Claude Code
- **Pour quoi faire** : écrire, à partir de ma maquette, les consignes de chaque étape :
  - les pages : compétences, technologies, parcours, Mes projets, page projet et ses corrections, Contact, 404 ;
  - les refontes : accueil, À propos, pages projet, photo en arche ;
  - le reste : logo, cartes de formation cliquables, accessibilité et performance.
- **Ce que je demandais à chaque fois** :
  - que Claude Code lise le code et me propose un plan, que je validais avant qu'il modifie quoi que ce soit ;
  - une vérification à 402px et à 1280px.
- **Ce que j'ai corrigé** : je comparais toujours le résultat avec ma maquette, et je redemandais des corrections quand ce n'était pas pareil. Par exemple, la page Mentions légales avait des textes gris alors que ma maquette est en noir, donc j'ai demandé « que du noir ». Le chibi du hero était trop grand en mobile, donc je l'ai fait réduire. J'ai aussi essayé d'afficher le chibi en 3D avec model-viewer, mais le cadrage et l'éclairage ne ressemblaient pas à mon rendu Blender, donc je suis passée à des images PNG.

### Mise en ligne
- **Pour quoi faire** : adapter les TP de R215 (DNS, PocketBase, Astro, certificat HTTPS, GitHub Actions) à mon portfolio. Ça m'a aussi aidée à comprendre une erreur du déploiement automatique.
- **Ce que j'ai fait moi-même** : toutes les commandes sur le VPS, la configuration DNS sur Infomaniak et les secrets GitHub.

### Modèle 3D dans Blender
- **Pour quoi faire** : de l'aide pour utiliser Blender : retrouver les raccourcis, faire les expressions avec des shape keys, ou garder un seul fichier Blender pour toutes les expressions.
- **Ce que j'ai fait moi-même** : toute la modélisation et toutes les expressions. L'IA m'a seulement expliqué les outils.

### Mise à jour de la maquette après le développement
- **Pour quoi faire** : de petites modifications dans Figma pour que la maquette corresponde au site en ligne :
  - aligner le mobile sur le site ;
  - ajouter la page Mentions légales et mettre à jour le guide de style ;
  - créer une bibliothèque d'images.
- **Ce que j'ai corrigé** :
  - la première fiche projet mobile reprenait l'ancien design rose, avec des traits de séparation en mobile : je ne l'ai pas gardée ;
  - une version de la page Mentions légales avait un hero et un nouveau chibi 3D : j'ai préféré une version sans hero ;
  - j'ai fait recaler le footer desktop sur celui du site ;
  - j'ai fait refaire la bibliothèque d'images, parce que certains logos n'étaient pas visibles.

### Mentions légales et livrables
- **Pour quoi faire** :
  - un premier texte des mentions légales, à partir des informations de mon site ;
  - un brouillon de ce fichier, de `QUALITE.md` et de `JOURNAL.md`, que j'ai complétés ensuite.
- **Ce que j'ai vérifié** : l'hébergement, mes coordonnées, et chaque point de la grille qualité sur mon site.

## 2. Claude Code (Anthropic)

- **Quand** : pendant l'intégration, comme assistant de code, en plus de mon propre travail sur le site.
- **Pour quoi faire** : m'aider à écrire ou modifier certaines parties du code (composants Astro, styles Tailwind, scripts JavaScript, liaison avec PocketBase), à partir de ma maquette et de mes consignes.
- **Comment je l'ai contrôlé** :
  - il me proposait un plan, que je validais ou corrigeais ;
  - je relisais et j'adaptais les fichiers modifiés ;
  - je testais dans le navigateur, en mobile et en desktop.
- **Ce que j'ai changé ou abandonné**, d'après mon historique Git :
  - **30/10** : sur la page d'un projet, j'ai fait des corrections dans le même commit (« Page d'un projet + rectification code ») et j'ai enlevé deux fichiers qui ne servaient plus (`motif-parcours.svg`, `fleche_telechargement.svg`) ;
  - **30/10** : les motifs du hero et du footer ont d'abord été faits en SVG, puis en PNG, et je les ai finalement refaits en CSS (commits « Accessibilité » puis « Changement logo + favicon ») ;
  - **11/11** : j'ai enlevé les images provisoires (`perso.png`, `image_emplacement.png`) et des icônes qui ne servaient plus (commit « Ajout chibi page contact ») ;
  - **13/11** : j'ai corrigé le déploiement automatique en ajoutant une pause de 5 secondes avant le test de santé (commit « déploiement automatique 2 ») ;
  - **16/11** : je suis passée de npm à bun, et j'ai supprimé `package-lock.json` ;
  - **17/11** : j'ai abandonné le chibi en 3D avec model-viewer, et supprimé les modèles 3D du site (commit « Supprimé fichiers inutilisé ») ;
  - j'ai fait refaire le bouton de lecture de la vidéo, parce que le triangle n'était pas centré.

## 3. Autres outils

Je n'ai utilisé aucun autre outil d'IA. Claude Code m'a aussi servi, avec le connecteur Figma, à mettre à jour la maquette pour qu'elle corresponde au site, et à faire les captures d'écran du site en mobile.

## Ce que je peux expliquer en soutenance

Je peux expliquer :
- la structure du projet : les pages, les composants, le layout ;
- la récupération des données PocketBase dans `src/js/backend.mjs`, avec l'adresse de PocketBase dans le fichier `.env` ;
- le rendu côté serveur (SSR) ;
- les filtres et la pagination de Mes projets ;
- le formulaire de contact et son hook ;
- le déploiement avec GitHub Actions.

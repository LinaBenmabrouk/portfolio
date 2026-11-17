# Déclaration d'usage de l'IA

Ce fichier déclare, pour chaque outil d'IA utilisé dans le projet : à quelle étape, pour quoi faire, et ce que j'ai modifié, corrigé ou rejeté dans ce qu'il a produit.

> Les lignes marquées **[à vérifier]** sont à confirmer ou corriger avant le rendu. Elles concernent des choses dont je ne suis pas sûre du détail.

## Ce qui a été fait sans IA

- **Positionnement, cible et sélection des trois projets** : rédigés par moi.
- **Moodboard, pistes graphiques et identité visuelle** (couleurs rose, bleu et jaune, typographies, logo) : faits par moi.
- **Maquette Figma desktop et mobile** : conçue et réalisée entièrement par moi. Elle a été présentée à la soutenance maquette.
- **Dessins** : les personnages, les chibis et les illustrations des projets sont dessinés par moi.
- **Modèle 3D du chibi** : modélisé par moi dans Blender.
- **Textes des projets et de l'À propos** : écrits par moi dans la maquette, puis repris tels quels dans PocketBase.

## 1. Claude (Anthropic), dans un projet claude.ai

### Après la soutenance maquette : analyse des commentaires des profs
- **Pour quoi faire** : j'ai donné ma maquette et les commentaires de Xavier et Pascal, et j'ai demandé des idées pour y répondre. Les commentaires portaient sur le logo dans le logo, les compétences limitées aux logiciels, et le manque de détails dans la liste des projets.
- **Ce que j'ai gardé ou rejeté** : c'est moi qui ai choisi les changements et qui les ai faits dans Figma. **[à vérifier : liste ce que tu as changé suite aux commentaires (nouveau logo, compétences, détails des cartes projets…) et les idées que tu as rejetées]**

### PocketBase : organisation des contenus
- **Pour quoi faire** :
  - les schémas des collections PocketBase (projets, messages, à propos) ;
  - des fiches pour recopier mes textes de la maquette dans les champs PocketBase.
- **Ce que j'ai modifié** : **[à vérifier : les champs que tu as ajoutés, enlevés ou renommés]**

### Développement : rédaction des prompts pour Claude Code
- **Pour quoi faire** : rédiger, à partir de ma maquette, les consignes de chaque étape. Les prompts sont gardés dans le dossier `prompts/` :
  - les pages : compétences, technologies, parcours, Mes projets, page projet et ses corrections, Contact, 404 ;
  - les refontes : accueil, À propos, pages projet, photo en arche ;
  - le reste : logo, cartes de formation cliquables, accessibilité et performance.
- **Mes règles dans chaque prompt** :
  - Claude Code doit lire le code et me proposer un plan, et je valide avant qu'il modifie quoi que ce soit ;
  - une vérification à 402px et 1280px.
- **Ce que j'ai corrigé ou rejeté** : à chaque fois, je comparais le résultat avec ma maquette et je redemandais des corrections quand ce n'était pas pareil. **[à vérifier : ajoute un ou deux exemples précis]**

### Mise en ligne
- **Pour quoi faire** : adapter les TP de R215 (DNS, PocketBase, Astro, certificat HTTPS, GitHub Actions) à mon portfolio, dans le fichier `guide-deploiement-portfolio.md`. Ce travail a aussi servi à comprendre une erreur du déploiement automatique.
- **Ce que j'ai fait moi-même** : toutes les commandes sur le VPS, la configuration DNS sur Infomaniak et les secrets GitHub.

### Modèle 3D dans Blender
- **Pour quoi faire** : de l'aide sur l'utilisation de Blender, comme retrouver les raccourcis, créer les expressions avec des shape keys, ou garder un seul fichier 3D pour que le site reste léger.
- **Ce que j'ai fait moi-même** : toute la modélisation et toutes les expressions. L'IA a seulement expliqué les outils.

### Mise à jour de la maquette après le développement
- **Pour quoi faire** : de petites modifications dans Figma pour que la maquette corresponde au site en ligne :
  - aligner le mobile sur le site ;
  - ajouter la page Mentions légales et mettre à jour le guide de style ;
  - créer une bibliothèque d'images.
- **Ce que j'ai corrigé ou rejeté** :
  - j'ai rejeté une première fiche projet mobile, qui reprenait l'ancien design rose, et les traits de séparation en mobile ;
  - j'ai rejeté une page Mentions légales avec un hero et un nouveau chibi 3D, pour garder une version sans hero ;
  - j'ai fait recaler le footer desktop sur le site ;
  - j'ai fait refaire la bibliothèque d'images, parce que des logos n'étaient pas visibles.

### Mentions légales et livrables
- **Pour quoi faire** :
  - un premier texte des mentions légales, à partir des informations sur mon site ;
  - un brouillon de ce fichier, de `QUALITE.md` et de `JOURNAL.md`, que j'ai ensuite complétés.
- **Ce que j'ai vérifié** : l'hébergeur indiqué, mes coordonnées, et chaque point de la grille qualité sur mon site.

## 2. Claude Code (Anthropic)

- **Étape** : pendant l'intégration, comme assistant de code, en plus de mon propre travail sur le site.
- **Pour quoi faire** : m'aider à écrire ou modifier certaines parties du code (composants Astro, styles Tailwind, scripts JavaScript, liaison avec PocketBase), à partir de ma maquette et de mes consignes.
- **Comment je l'ai contrôlé** :
  - il proposait un plan, que je validais ou corrigeais ;
  - je relisais et adaptais les fichiers modifiés ;
  - je testais dans le navigateur en mobile et en desktop.
- **Ce que j'ai modifié ou rejeté**, d'après mon historique Git :
  - **30/10** : sur la page d'un projet, j'ai fait des rectifications dans le même commit (« Page d'un projet + rectification code ») et j'ai retiré deux fichiers qui ne servaient plus (`motif-parcours.svg`, `fleche_telechargement.svg`) ;
  - **30/10** : j'ai abandonné les motifs du hero et du footer en SVG, puis en PNG, pour les refaire en CSS (commits « Accessibilité » puis « Changement logo + favicon ») ;
  - **11/11** : j'ai retiré les images provisoires (`perso.png`, `image_emplacement.png`) et des icônes qui ne servaient plus (commit « Ajout chibi page contact ») ;
  - **13/11** : j'ai corrigé le déploiement automatique, en ajoutant une pause de 5 secondes avant le test de santé (commit « déploiement automatique 2 ») ;
  - **16/11** : j'ai abandonné npm pour bun, et supprimé `package-lock.json`.

## 3. Autres outils

**[à vérifier : ajoute tout autre outil d'IA utilisé, par exemple pour générer ou retoucher une image, un mockup, le rendu 3D du chibi, une traduction ou une correction d'orthographe. Si tu n'en as utilisé aucun, écris-le.]**

## Ce que je peux expliquer en soutenance

Je peux expliquer :
- la structure du projet : les pages, les composants, le layout ;
- la récupération des données PocketBase dans `src/js/backend.mjs` ;
- le rendu côté serveur (SSR) ;
- les filtres et la pagination de Mes projets ;
- le formulaire de contact et son hook ;
- le déploiement avec GitHub Actions.

**[à vérifier : relis les parties du code que tu maîtrises le moins avant la soutenance]**

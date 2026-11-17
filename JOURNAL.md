# Journal de bord

> **Avant le rendu** : les dates de chaque semaine et les lignes **[à compléter]** sont à reprendre avec l'historique Git (`git log --reverse --date=short --pretty="%ad %s"`). Ce qui est écrit ici vient de mes notes et de mes échanges pendant le projet. Les semaines 1 à 3, avant mon travail avec l'IA, sont à remplir de mémoire.

## Semaine 1 — Positionnement **[dates]**
- **Fait** : lecture du cahier des charges, choix de la cible **[à compléter : type de structure et poste visés]**.
- **Fait** : rédaction de la note de positionnement (message en 30 secondes, ce qui me distingue).
- **Fait** : sélection des trois projets étudiés en profondeur. **[à compléter : pourquoi ces trois-là]**
- **Coincé** : **[à compléter]**
- **Décidé** : **[à compléter]**

## Semaine 2 — Recherche graphique **[dates]**
- **Fait** : moodboard, puis exploration de plusieurs pistes graphiques.
- **Décidé** : rose, bleu et jaune comme seules couleurs. Space Grotesk et DM Sans pour les textes, Titan One pour les touches ludiques. Des personnages chibi pour me représenter.
- **Décidé** : deux pistes écartées, **[à compléter : lesquelles et pourquoi]**.
- **Coincé** : **[à compléter]**

## Semaine 3 — Maquette Figma **[dates]**
- **Fait** : maquette desktop et mobile (accueil, à propos, mes projets, page projet, contact), guide de style.
- **Fait** : dossiers pour présenter les projets, chibis dessinés pour le hero.
- **Fait** : liste des technologies prévues, Astro, Tailwind et PocketBase, avec leur justification.
- **Coincé** : **[à compléter]**

## Semaine 4 — Soutenance maquette et retours **[dates]**
- **Fait** : soutenance maquette.
- **Retours** :
  - Xavier n'est pas convaincu par le « logo dans le logo » et trouve que les compétences ne doivent pas se limiter à des logiciels ;
  - Pascal veut plus de détails sur les projets dans la liste, aime les dossiers, et rappelle que ce sont des technologies, pas des compétences.
- **Fait** : analyse des commentaires avec Claude, qui a proposé des idées. J'ai choisi et fait les changements dans Figma.
- **Décidé** **[à vérifier]** :
  - un nouveau logo (une étoile avec mes initiales) ;
  - une section « Mes compétences » séparée de « Code, création et outils » ;
  - les cartes projets enrichies (année, contexte, rôle).
- Pas encore de code cette semaine.

## Semaine 5 — Mise en place du projet et développement des pages **26/10 – 01/11**
- **Fait** : création du repository GitHub, projet Astro avec Tailwind 4, PocketBase en local.
- **Fait** : collections PocketBase (projets, messages, à propos), et saisie de mes textes de la maquette.
- **Fait** : header, footer, layout et premières pages.
- **Fait** :
  - les pages À propos (compétences, technologies, parcours), Mes projets (filtres), page projet (intention, processus, rendu, navigation entre projets) ;
  - la page Contact et son formulaire (hook PocketBase qui m'envoie un e-mail) ;
  - la page 404.
- **Fait** : nouveau logo en SVG, utilisé aussi comme favicon.
- **Fait** : une passe accessibilité et performance.
- **Décidé** : rendu côté serveur (SSR, adaptateur Node), pour que les contenus de PocketBase soient à jour sans tout reconstruire.
- **Décidé** : méthode de travail avec Claude Code, avec un plan à valider avant chaque modification, puis un test à 402px et 1280px.
- **Décidé** : couleur d'accent selon la catégorie du projet (dev ou design).
- **Coincé** : la page projet ne ressemblait pas assez à la maquette, ce qui a demandé deux séries de corrections. Il a aussi fallu adapter le mobile à part.
- **Coincé** : le 30/10, la page d'un projet a demandé des rectifications dans le même commit (« Page d'un projet + rectification code »). Les motifs du hero et du footer ont été ajoutés en SVG, puis en PNG, et retirés le soir même pour être refaits en CSS dans `global.css`.

## Semaine 6 — Sans commit **02/11 – 08/11**
- Pas de commit cette semaine. Les pages, l'effet sur les boutons (30/10), la passe accessibilité (30/10) et le logo + favicon (30/10) sont déjà dans les commits de la semaine 5.

## Semaine 7 — Refonte, contenus et mise en ligne **09/11 – 15/11**
- **Fait** : j'ai retouché le design dans Figma, puis reporté les changements dans le code en quatre étapes :
  - les titres du site et l'accueil ;
  - la page À propos ;
  - les pages projet ;
  - la photo dans une arche avec des étoiles.
- **Fait** : ajout des projets Philmo et TikTak dans PocketBase, en plus des trois projets principaux.
- **Fait** : chibi et bulle sur la page Contact, qui change quand le message est envoyé (11/11), puis chibi du bloc « En ce moment » (13/11).
- **Fait** : préparation du déploiement (13/11), avec le champ `url` du parcours dans PocketBase et le bloc « En ce moment » en composant.
- **Fait** : cartes de formation cliquables.
- **Fait** :
  - DNS sur Infomaniak (portfolio.linabenmabrouk.fr, pb.linabenmabrouk.fr, et redirection du domaine principal) ;
  - PocketBase et le site sur le VPS (ports 8002 et 3010), certificats HTTPS ;
  - déploiement automatique avec GitHub Actions (13/11).
- **Coincé** : une erreur dans le déploiement automatique, comprise et corrigée. Le premier déploiement échouait au test de santé : le commit « déploiement automatique 2 » ajoute une pause de 5 secondes avant ce test (13/11). Le site appelle aussi PocketBase en ligne au lieu de `127.0.0.1` (13/11).
- **Décidé** : **[à compléter]**

## Semaine 8 — Finitions **16/11 – 22/11**
- **Fait** : passage de npm à bun (16/11).
- **Fait** : modèle 3D du chibi dans Blender. J'ai refait la base à cause des cheveux, puis créé les expressions avec des shape keys, une par page.
- **Coincé** : la prise en main de Blender (interface, raccourcis sans pavé numérique).
- **Décidé** : un seul fichier 3D avec plusieurs expressions, plutôt qu'un fichier par page, pour garder le site léger.
- **Fait** : maquette mise à jour pour correspondre au site, et page Mentions légales sans hero.

## Choix des réseaux professionnels

**[à adapter selon ton positionnement]**

LinkedIn est le réseau où les recruteurs cherchent des stagiaires et des alternants : j'y publie mes projets et le lien du portfolio.

GitHub montre mon code, avec le repository public du portfolio et mes projets de développement web. C'est ce qu'une équipe technique regarde pour juger mon niveau.

Behance présente la partie création de mon profil (design, affiches, personnages, VTuber), que GitHub ne montre pas.

Ces trois réseaux reprennent les deux côtés du portfolio : développement web et projets créatifs.

Instagram n'a pas été retenu, parce qu'il montre surtout le résultat final, alors que je veux mettre en avant mon processus et mon code.

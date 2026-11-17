# Grille qualité du portfolio

Site : https://portfolio.linabenmabrouk.fr (Astro en SSR, Tailwind 4, PocketBase, sur un VPS).

Pour chaque critère :
- **Pourquoi** : en quoi il concerne mon site en particulier ;
- **Vérification** : ce que j'ai contrôlé et avec quel outil ;
- **Résultat / correction** : ce que j'ai trouvé et ce que j'ai corrigé.

> Les cases **[à mesurer]** ou **[à confirmer]** sont à remplir avec le vrai résultat avant le rendu. Ne laisse aucun chiffre inventé.

## Outils utilisés

- **Lighthouse** (Chrome DevTools), en navigation privée, sur la version en ligne, en mobile et en desktop.
- **WAVE** (extension de WebAIM) et **axe DevTools** pour l'accessibilité automatique.
- **WebAIM Contrast Checker** pour les couleurs.
- **Clavier seul** (Tab, Maj+Tab, Entrée, Échap) et **VoiceOver** sur Mac (Cmd+F5).
- **Onglet Réseau** des DevTools, pour le poids des pages, des images et des polices.
- **EcoIndex** (ecoindex.fr) pour la sobriété.
- **Validateur W3C** pour le HTML.
- **Onglet Application** des DevTools, pour les cookies et le stockage.

---

## 1. Accessibilité

| Critère | Pourquoi sur mon site | Vérification | Résultat / correction |
|---|---|---|---|
| **Contraste rose (#F34D85) sur bleu (#0000BB)** | Le rose est utilisé sur les fonds bleus du hero et du footer. | WebAIM Contrast Checker | Ratio de **3,62:1**. C'est suffisant pour un grand texte (24px, ou 19px en gras), mais pas pour un texte normal, qui doit atteindre 4,5:1. Il faut le garder pour les grands titres et passer les petits textes en blanc ou en jaune. Le jaune sur bleu fait 8,56:1 et le blanc sur bleu 12,23:1. Vérifié dans le code : les seuls petits éléments roses sur bleu sont les **✱** du hero (« ✱ Portfolio 2026 » et le ✱ du surtitre, dans `Hero.astro`). Ce sont des symboles décoratifs, pas du texte : je les ai gardés. Le rose sur bleu reste pour les grands titres (« FOLIO », « PROFIL »…). |
| **Contraste rose sur rose clair (#FEF3F7)** | Les mots-clés des projets (« Développement Web · … ») et les numéros 01, 02… sont roses sur le fond du site. | WebAIM Contrast Checker | Ratio de **3,12:1**. C'est insuffisant pour un texte de 16–18px. Il faut assombrir le rose de ces petits textes, ou les passer en bleu (11,28:1). **[à confirmer : décision et correction]** |
| **Contraste des titres jaunes sur rose clair** | Les titres de section (« Qui je suis. », « Projets sélectionnés. »…) sont jaunes (#FFC600) sur le fond rose clair. | WebAIM Contrast Checker | Ratio de **1,45:1**. C'est sous le minimum de 3:1, même pour un grand titre. Si les titres ont un contour bleu, c'est le contour qui compte et ça passe. Sinon, il faut ajouter un contour ou changer la couleur. Vérifié dans le code : les titres n'ont **pas de contour** pour l'instant. Je décide de la solution dans Figma. |
| **Contraste du texte courant** | Les paragraphes sont en noir, et les descriptions (compétences, processus) en noir à 70 % (`text-noir/70`), sur rose clair. | WebAIM Contrast Checker | Noir : **19,38:1**. Noir à 70 % : environ **8,2:1**. Conforme. |
| **Menu burger au clavier** | En mobile, toute la navigation passe par le burger. | Clavier seul et VoiceOver, à 402px | Le bouton a `aria-expanded` et `aria-controls`. Ce n'était pas le cas au départ, j'ai corrigé `Header.astro` : à l'ouverture, le focus va sur le premier lien du menu ; Échap ferme le menu et le focus revient sur le bouton ; un clic sur un lien ferme aussi le menu. Testé au clavier à 402px. |
| **Focus visible** | Le site a beaucoup de fonds différents (bleu, rose clair, jaune). | Tab sur chaque page | Contour `focus-visible`, bleu foncé sur fond clair et jaune sur fond bleu. **[à confirmer page par page]** |
| **Lien « Aller au contenu »** | Le header et le menu sont répétés sur chaque page. | Premier Tab sur chaque page | Le lien apparaît au focus et mène à `<main id="contenu">`. Confirmé : le lien et `<main id="contenu">` sont dans `Layout.astro`, donc sur toutes les pages. |
| **Filtres et pagination de Mes projets** | Ce sont des boutons JavaScript : il faut savoir lequel est actif. | Clavier et VoiceOver | `aria-pressed` sur le filtre actif. Confirmé dans `projets/index.astro` : « Page 1 / 3 » est dans un `aria-live="polite"`, donc annoncé à chaque changement, et « Précédent » reçoit `disabled` sur la première page, donc il n'est pas cliquable. |
| **Formulaire de contact** | C'est la seule interaction qui envoie des données. | WAVE, clavier, VoiceOver | Champs avec `<label>` et `required`. La bulle du chibi a `aria-live="polite"`, pour annoncer « message envoyé ». En partie : le message de retour (« Envoi en cours… », « Votre message a bien été envoyé ! », « Oups, le message n'est pas parti… ») est aussi en `aria-live="polite"`, donc l'échec d'envoi est lu. Pour les champs vides ou mal remplis, ce sont les messages du navigateur (`required`, `type="email"`), sans message personnalisé. |
| **Textes alternatifs** | Les images des projets viennent de PocketBase, et il y a beaucoup d'éléments décoratifs (étoiles, motifs, dossiers). | WAVE (onglet Images) | Les images de projet ont un alt tiré du titre du projet. Les décorations ont `alt=""` et `aria-hidden="true"`. **[à confirmer : 0 erreur dans WAVE]** |
| **Animations réduites** | Bande défilante sur Contact et carrousel. | macOS : Réglages > Accessibilité > Affichage > Réduire les animations | `motion-reduce:animate-none` et `prefers-reduced-motion` dans global.css. Confirmé dans le code : la règle `prefers-reduced-motion` de global.css coupe les animations et transitions, et la bande défilante a `motion-reduce:animate-none`. |
| **Vidéo VTuber** | Elle est sur la page projet VTuber. | Test clavier | Pas de lecture automatique, bouton lecture avec `aria-label`. **[à confirmer : s'il y a du son ou de la parole, ajouter des sous-titres]** |
| **Structure** | Lecteurs d'écran. | WAVE (onglet Structure) | `lang="fr"`, un seul `<h1>` par page, titres dans l'ordre, et `<header>`, `<nav>`, `<main>`, `<footer>`. Confirmé dans le code : `lang="fr"` dans le Layout, et un seul `<h1>` par page (celui du hero, ou celui de la 404 et des Mentions légales). |

**Score Lighthouse Accessibilité** : mobile **[à mesurer]**, desktop **[à mesurer]**.

---

## 2. Sobriété et performance

| Critère | Pourquoi sur mon site | Vérification | Résultat / correction |
|---|---|---|---|
| **Poids du modèle 3D** | **[à compléter quand le modèle 3D sera dans le code]** | | |
| **Images** | Le site montre beaucoup de grands visuels de projets (par exemple Vtuber_showcase fait 18000px de large à l'origine). | Onglet Réseau, Lighthouse (« Properly size images ») | Images passées par `astro:assets` ou `PbImage` en webp, avec des miniatures PocketBase (`?thumb=`). `loading="lazy"` sous le premier écran, `fetchpriority="high"` sur le hero, `width` et `height` contre les sauts de mise en page. Vérifié sur l'accueil en ligne : tout est en place, sauf le chibi du bloc « En ce moment », qui était chargé à sa taille d'origine (1817px de large). Je l'ai corrigé dans `EnCeMoment.astro` avec `widths` et `sizes` : il est maintenant chargé à 600px en webp sur un écran haute définition, pour 282px affichés. |
| **Polices** | Cinq familles : Space Grotesk, DM Sans et Titan One, plus Anton et Micro 5 pour les titres de Flying Tap Fest et de VTuber. | Onglet Réseau, filtre Font | Seulement les graisses utilisées, hébergées avec le site (pas d'appel à Google). Mesuré sur l'accueil en ligne : **11 fichiers woff2, 141 Ko** au total. |
| **Vidéo VTuber** | La vidéo est lourde. | Onglet Réseau, au chargement de la page | `preload="none"` et un poster : rien n'est téléchargé avant le clic. Confirmé dans `projets/[slug].astro`. |
| **Rendu serveur et PocketBase** | Chaque page interroge PocketBase à chaque visite. | Temps de réponse dans l'onglet Réseau (TTFB) | Appels en parallèle (`Promise.all`) et cache court (`Cache-Control: max-age=60`) sur les pages de contenu. Confirmé : `Promise.all` sur À propos et la page projet, et `cache-control: public, max-age=60` vérifié en ligne sur l'accueil, À propos, Mes projets et une page projet. |
| **Poids total et requêtes** | Il faut savoir ce que coûte une visite. | EcoIndex sur l'accueil, Mes projets et une page projet | Accueil **[à mesurer]** Mo et **[à mesurer]** requêtes. Note EcoIndex **[à mesurer]**. |
| **Pas de dépendance inutile** | Aucun script sur une page qui n'en a pas besoin. | Lecture du code et onglet Réseau | Confirmé : il n'y a de script que dans le header (menu burger), sur Contact (formulaire, avec le SDK PocketBase), sur Mes projets (filtres et pagination) et sur la page projet (vidéo). |

**Score Lighthouse Performance** : mobile **[à mesurer]**, desktop **[à mesurer]**. Mesures : LCP **[à mesurer]**, CLS **[à mesurer]**.

---

## 3. Référencement

| Critère | Pourquoi sur mon site | Vérification | Résultat / correction |
|---|---|---|---|
| **Title et meta description de chaque page** | Il y a 7 types de pages : accueil, À propos, Mes projets, page projet, Contact, Mentions légales, 404. | Code source de chaque page et Lighthouse SEO | Passés en props au Layout. Pour les pages projet, ils viennent du titre et du résumé PocketBase. Le Layout ajoute « – Lina Ben Mabrouk » à la fin. J'ai remplacé « | » par « – » sur les Mentions légales, pour que toutes les pages soient pareilles. Titles : « Lina Ben Mabrouk – Portfolio développeuse front-end » (accueil), « À propos – Lina Ben Mabrouk », « Mes projets – Lina Ben Mabrouk », « [titre du projet] – Lina Ben Mabrouk », « Contact – Lina Ben Mabrouk », « Mentions légales – Lina Ben Mabrouk », « Page introuvable – Lina Ben Mabrouk » (404). |
| **Un seul h1 parlant** | Les grands titres du hero sont très graphiques (« MES PROJETS. »). | Extension HeadingsMap ou WAVE | En partie : un seul `<h1>` par page, mais c'est le grand titre graphique du hero (« PORT FOLIO. », « MON PROFIL. », « ON FAIT ÉQUIPE? »). |
| **URLs lisibles** | Les pages projet utilisent le slug PocketBase. | Test des URLs | `/projets/nunc`, `/projets/vtuber`… |
| **Partage sur les réseaux (Open Graph)** | Le lien du portfolio sera partagé sur LinkedIn. | Post Inspector de LinkedIn | Balises `og:title`, `og:description` et `og:image`. Confirmé dans `Layout.astro` : `og:title`, `og:description`, `og:image` (le chibi en 1200px), `og:url`, `og:locale` et `twitter:card`, sur toutes les pages. |
| **Sitemap et robots.txt** | Les pages projet sont générées dynamiquement. | Ouvrir /sitemap.xml et /robots.txt | La 404 ne doit pas être indexée. Il n'y en avait pas, je les ai ajoutés : `public/robots.txt` (tout est autorisé, avec l'adresse du sitemap) et `src/pages/sitemap.xml.js`, qui récupère les projets dans PocketBase à chaque visite. Le sitemap liste les 5 pages principales et toutes les pages projet (16 adresses aujourd'hui), et un nouveau projet y apparaît tout seul. La 404 a maintenant `<meta name="robots" content="noindex">`, grâce à une prop `noindex` du Layout. |
| **Nom de domaine et HTTPS** | linabenmabrouk.fr et www redirigent vers portfolio.linabenmabrouk.fr. | Navigateur et `curl -I` | Certificat HTTPS valide. Confirmé avec `curl` : `linabenmabrouk.fr`, `www.linabenmabrouk.fr` et `http://portfolio.linabenmabrouk.fr` redirigent en **301** vers `https://portfolio.linabenmabrouk.fr/`. |
| **Textes alternatifs et contenu texte** | Les moteurs ne lisent pas les images. | WAVE | Voir la partie Accessibilité. |

**Score Lighthouse SEO** : **[à mesurer]**.

---

## 4. Conformité juridique

| Critère | Pourquoi sur mon site | Vérification | Résultat / correction |
|---|---|---|---|
| **Mentions légales (loi LCEN)** | C'est obligatoire pour tout site publié. | Page /mentions-legales, accessible depuis le footer de chaque page | Éditeur, directrice de la publication, contact, hébergeur. Hébergeur : Infomaniak. |
| **Données du formulaire (RGPD)** | Le formulaire enregistre nom, e-mail, sujet et message dans PocketBase. | Lecture du formulaire et des règles de la collection messages | Seules les données utiles sont demandées. La finalité et les droits sont indiqués dans les mentions légales. **[à ajouter : une durée de conservation, par exemple suppression après 1 an, et une phrase sous le formulaire avec un lien vers les mentions légales]** |
| **Sécurité des messages** | Les messages ne doivent pas être lisibles par tout le monde. | Règles API de la collection messages dans PocketBase, test d'un appel GET sans connexion | Création publique, lecture réservée à l'admin. Confirmé : un GET sans connexion sur la collection messages renvoie « Only superusers can perform this action » (erreur 403). `pocketbase/pb_data/` est dans le `.gitignore` et aucun de ses fichiers n'est sur GitHub. Il n'y a pas de fichier `.env` dans le projet : les secrets du déploiement sont dans les secrets GitHub. |
| **Cookies** | Pas de bandeau cookies : il faut prouver qu'il n'y en a pas besoin. | DevTools > Application > Cookies, sur chaque page | Aucun cookie de mesure d'audience ni publicitaire. Polices hébergées sur le site, donc pas de transfert vers Google. Confirmé en ligne : aucun cookie déposé sur les pages, et aucun appel à Google ou à un outil de mesure d'audience. |
| **Droits sur les images** | Les moodboards (NŨNC, Lumimix) contiennent des photos qui ne sont pas à moi, et les mockups d'écrans viennent peut-être de modèles téléchargés. | Vérification de chaque image publiée | **[à confirmer : retirer ces photos, ou indiquer leurs sources et la licence des mockups]** |
| **Projets de groupe** | NŨNC a été fait en équipe, Bordeaux Surchauffe en binôme. | Accord des membres de l'équipe | **[à confirmer : accord obtenu, et noms des coéquipiers crédités sur la page projet]** |
| **Marques des logiciels** | Les logos de Figma, Blender, Live2D… sont affichés. | Mentions légales | Mention « Les logos des logiciels présentés appartiennent à leurs propriétaires ». |
| **Licences des polices et librairies** | Space Grotesk, DM Sans, Titan One, Anton et Micro 5, plus Astro, Tailwind et PocketBase. | Licences sur Google Fonts et GitHub | Polices sous licence OFL, librairies sous licence MIT : usage libre, crédités dans les mentions légales. |
| **Usage de l'IA** | Demandé par le cahier des charges. | Fichier `IA.md` à la racine du repository | Fait. |

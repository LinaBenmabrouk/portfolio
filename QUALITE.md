# Grille qualité du portfolio

Site : https://portfolio.linabenmabrouk.fr (Astro en SSR, Tailwind 4, PocketBase, sur un VPS).

Pour chaque critère :
- **Pourquoi** : en quoi il concerne mon site en particulier ;
- **Vérification** : ce que j'ai contrôlé et avec quel outil ;
- **Résultat / correction** : ce que j'ai trouvé et ce que j'ai corrigé.

## Outils utilisés

- **Lighthouse** (Chrome DevTools et PageSpeed Insights), sur la version en ligne, en mobile et en desktop. PageSpeed Insights en desktop (17/11/2026) : Performance 100, Accessibilité 95, Bonnes pratiques 100, SEO 100.
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
| **Contraste rose (#F34D85) sur bleu (#0000BB)** | Le rose est utilisé sur les fonds bleus du hero et du footer. | WebAIM Contrast Checker | Ratio de **3,62:1**. Ça suffit pour un grand texte (24px, ou 19px en gras), mais pas pour un texte normal, qui doit atteindre 4,5:1. Je garde donc le rose pour les grands titres, et les petits textes sont en blanc ou en jaune (le jaune sur bleu fait 8,56:1 et le blanc sur bleu 12,23:1). En vérifiant dans le code, les seuls petits éléments roses sur bleu sont les **✱** du hero (« ✱ Portfolio 2026 » et le ✱ du surtitre, dans `Hero.astro`). Ce sont des symboles décoratifs, pas du texte, donc je les ai gardés. Le rose sur bleu reste pour les grands titres (« FOLIO », « PROFIL »…). |
| **Contraste rose sur rose clair (#FEF3F7)** | Les mots-clés des projets (« Développement Web · … ») et les numéros 01, 02… sont roses sur le fond du site. | WebAIM Contrast Checker | Ratio de **3,12:1**. Ce n'est pas assez pour un texte de 16–18px. Il faudrait assombrir le rose de ces petits textes, ou les passer en bleu (11,28:1). Je ne l'ai pas encore corrigé : j'ai essayé un rose plus foncé (#C4245C), mais je suis revenue au rose d'origine. Le contraste reste à 3,12:1, et Lighthouse le signale aussi. |
| **Contraste des titres jaunes sur rose clair** | Les titres de section (« Qui je suis. », « Projets sélectionnés. »…) sont jaunes (#FFC600) sur le fond rose clair. | WebAIM Contrast Checker | Ratio de **1,45:1**. C'est sous le minimum de 3:1, même pour un grand titre. Avec un contour bleu autour des titres, c'est le contour qui compterait et ça passerait. Pour l'instant, les titres n'ont **pas de contour** dans le code. Je dois encore choisir la solution dans Figma : ajouter un contour ou changer la couleur. |
| **Contraste du texte courant** | Les paragraphes sont en noir, et les descriptions (compétences, processus) en noir à 70 % (`text-noir/70`), sur rose clair. | WebAIM Contrast Checker | Noir : **19,38:1**. Noir à 70 % : environ **8,2:1**. Conforme. |
| **Menu burger au clavier** | En mobile, toute la navigation passe par le burger. | Clavier seul et VoiceOver, à 402px | Au départ, le bouton n'avait pas `aria-expanded` ni `aria-controls`. J'ai corrigé `Header.astro` : à l'ouverture, le focus va sur le premier lien du menu ; Échap ferme le menu et le focus revient sur le bouton ; un clic sur un lien ferme aussi le menu. Testé au clavier à 402px. |
| **Focus visible** | Le site a beaucoup de fonds différents (bleu, rose clair, jaune). | Tab sur chaque page | Contour `focus-visible`, bleu foncé sur fond clair et jaune sur fond bleu. J'ai vérifié page par page le 17/11/2026, en mobile et en desktop (accueil, À propos, Mes projets, une page projet, Contact, Mentions légales, 404) : chaque élément atteint avec Tab a un contour visible. Seule exception : les champs Nom et E-mail de Contact n'ont pas de contour, mais leur trait du bas devient plus épais et bleu foncé au focus. |
| **Lien « Aller au contenu »** | Le header et le menu sont répétés sur chaque page. | Premier Tab sur chaque page | Le lien apparaît au focus et mène à `<main id="contenu">`. Le lien et `<main id="contenu">` sont dans `Layout.astro`, donc sur toutes les pages. |
| **Filtres et pagination de Mes projets** | Ce sont des boutons JavaScript : il faut savoir lequel est actif. | Clavier et VoiceOver | `aria-pressed` sur le filtre actif. Dans `projets/index.astro`, « Page 1 / 3 » est dans un `aria-live="polite"`, donc il est annoncé à chaque changement, et « Précédent » a `disabled` sur la première page, donc on ne peut pas cliquer dessus. |
| **Formulaire de contact** | C'est la seule interaction qui envoie des données. | WAVE, clavier, VoiceOver | Champs avec `<label>` et `required`. La bulle du chibi a `aria-live="polite"`, pour annoncer « message envoyé ». Le message de retour (« Envoi en cours… », « Votre message a bien été envoyé ! », « Oups, le message n'est pas parti… ») est aussi en `aria-live="polite"`, donc l'échec d'envoi est lu. Par contre, pour les champs vides ou mal remplis, ce sont les messages du navigateur (`required`, `type="email"`), je n'ai pas fait de message personnalisé. |
| **Textes alternatifs** | Les images des projets viennent de PocketBase, et il y a beaucoup d'éléments décoratifs (étoiles, motifs, dossiers). | WAVE (onglet Images) | Les images de projet ont un alt tiré du titre du projet. Les décorations ont `alt=""` et `aria-hidden="true"`. Je n'ai pas lancé WAVE, mais l'audit d'accessibilité de Lighthouse (17/11/2026, accueil) ne trouve aucune image sans alt : ses seules erreurs concernent le contraste (voir plus haut). |
| **Animations réduites** | Bande défilante sur Contact et carrousel. | macOS : Réglages > Accessibilité > Affichage > Réduire les animations | Chaque élément animé a la classe Tailwind `motion-reduce:animate-none` ou `motion-reduce:transition-none` (par exemple la bande défilante), donc ses animations s'arrêtent quand le réglage est activé. En JavaScript, les étoiles du bouton d'envoi sur Contact ne se lancent pas, et le défilement de la pagination de Mes projets n'est plus animé (`matchMedia("(prefers-reduced-motion: reduce)")`). |
| **Vidéo VTuber** | Elle est sur la page projet VTuber. | Test clavier | Pas de lecture automatique, bouton lecture avec `aria-label`. Aucune vidéo n'est publiée pour l'instant : le champ vidéo est vide dans PocketBase. Le son et les sous-titres seront à vérifier quand je l'ajouterai. |
| **Structure** | Lecteurs d'écran. | WAVE (onglet Structure) | `lang="fr"` dans le Layout, un seul `<h1>` par page (celui du hero, ou celui de la 404 et des Mentions légales), titres dans l'ordre, et `<header>`, `<nav>`, `<main>`, `<footer>`. |

**Score Lighthouse Accessibilité** : mobile **95**, desktop **95** (accueil en ligne, 17/11/2026). Les points perdus viennent du contraste : les mots-clés roses des cartes projets (voir plus haut) et un titre jaune foncé sur le fond clair.

---

## 2. Sobriété et performance

| Critère | Pourquoi sur mon site | Vérification | Résultat / correction |
|---|---|---|---|
| **Poids du modèle 3D** | Le chibi du hero devait être en 3D. | Onglet Réseau | Pas de modèle 3D finalement : le chibi est une image PNG, une expression par page, servie en webp (environ 6 Ko en mobile et 25 Ko en desktop). |
| **Images** | Le site montre beaucoup de grands visuels de projets (par exemple Vtuber_showcase fait 18000px de large à l'origine). | Onglet Réseau, Lighthouse (« Properly size images ») | Images passées par `astro:assets` ou `PbImage` en webp, avec des miniatures PocketBase (`?thumb=`). `loading="lazy"` sous le premier écran, `fetchpriority="high"` sur le hero, `width` et `height` contre les sauts de mise en page. Sur l'accueil en ligne, tout était en place sauf le chibi du bloc « En ce moment », qui était chargé à sa taille d'origine (1817px de large). Je l'ai corrigé dans `EnCeMoment.astro` avec `widths` et `sizes` : il est maintenant chargé à 600px en webp sur un écran haute définition, pour 282px affichés. Les images sont aussi gardées en cache sur le serveur et préparées à chaque déploiement, pour ne pas être recalculées à chaque visite. |
| **Polices** | Cinq familles : Space Grotesk, DM Sans et Titan One, plus Anton et Micro 5 pour les titres de Flying Tap Fest et de VTuber. | Onglet Réseau, filtre Font | Seulement les graisses utilisées, hébergées avec le site (pas d'appel à Google). Mesuré sur l'accueil en ligne : **11 fichiers woff2, 141 Ko** au total. |
| **Vidéo VTuber** | La vidéo est lourde. | Onglet Réseau, au chargement de la page | `preload="none"` et un poster dans `projets/[slug].astro` : rien n'est téléchargé avant le clic. |
| **Rendu serveur et PocketBase** | Chaque page interroge PocketBase à chaque visite. | Temps de réponse dans l'onglet Réseau (TTFB) | Appels en parallèle (`Promise.all`) sur À propos et la page projet, et cache court (`cache-control: public, max-age=60`), que j'ai vérifié en ligne sur l'accueil, À propos, Mes projets et une page projet. |
| **Poids total et requêtes** | Il faut savoir ce que coûte une visite. | EcoIndex sur l'accueil, Mes projets et une page projet | Accueil **0,53 Mo** et **29 requêtes** en mobile, **0,49 Mo** et **28 requêtes** en desktop (Lighthouse, 17/11/2026). Note EcoIndex **A (82/100)** sur l'accueil (ecoindex.fr, 17/11/2026 : 494 Ko, 29 requêtes, 203 éléments). |
| **Pas de dépendance inutile** | Aucun script sur une page qui n'en a pas besoin. | Lecture du code et onglet Réseau | Il n'y a de script que dans le header (menu burger), sur Contact (formulaire, avec le SDK PocketBase), sur Mes projets (filtres et pagination) et sur la page projet (vidéo). |

**Score Lighthouse Performance** : mobile **93**, desktop **100** (accueil en ligne, 17/11/2026). Mesures : LCP **2,7 s** en mobile et **0,6 s** en desktop, CLS **0** en mobile et **0,008** en desktop.

---

## 3. Référencement

| Critère | Pourquoi sur mon site | Vérification | Résultat / correction |
|---|---|---|---|
| **Title et meta description de chaque page** | Il y a 7 types de pages : accueil, À propos, Mes projets, page projet, Contact, Mentions légales, 404. | Code source de chaque page et Lighthouse SEO | Ils sont passés en props au Layout. Pour les pages projet, ils viennent du titre et du résumé dans PocketBase. Le Layout ajoute « – Lina Ben Mabrouk » à la fin. Sur les Mentions légales, j'ai remplacé « | » par « – » pour que toutes les pages soient pareilles. Titles : « Lina Ben Mabrouk – Portfolio développeuse front-end » (accueil), « À propos – Lina Ben Mabrouk », « Mes projets – Lina Ben Mabrouk », « [titre du projet] – Lina Ben Mabrouk », « Contact – Lina Ben Mabrouk », « Mentions légales – Lina Ben Mabrouk », « Page introuvable – Lina Ben Mabrouk » (404). |
| **Un seul h1 parlant** | Les grands titres du hero sont très graphiques (« MES PROJETS. »). | Extension HeadingsMap ou WAVE | En partie : un seul `<h1>` par page, mais c'est le grand titre graphique du hero (« PORT FOLIO. », « MON PROFIL. », « ON FAIT ÉQUIPE ? »). |
| **URLs lisibles** | Les pages projet utilisent le slug PocketBase. | Test des URLs | `/projets/nunc`, `/projets/vtuber`… |
| **Partage sur les réseaux (Open Graph)** | Le lien du portfolio sera partagé sur LinkedIn. | Post Inspector de LinkedIn | Dans `Layout.astro`, sur toutes les pages : `og:title`, `og:description`, `og:image` (une image de partage de 1200×630 en jpg, avec le chibi, et ses dimensions dans `og:image:width` et `og:image:height`), `og:url`, `og:locale` et `twitter:card`. |
| **Sitemap et robots.txt** | Les pages projet sont générées dynamiquement. | Ouvrir /sitemap.xml et /robots.txt | Il n'y en avait pas au départ, je les ai ajoutés : `public/robots.txt` (tout est autorisé, avec l'adresse du sitemap) et `src/pages/sitemap.xml.js`, qui récupère les projets dans PocketBase à chaque visite. Le sitemap liste les 5 pages principales et toutes les pages projet (16 adresses aujourd'hui), et un nouveau projet y apparaît tout seul. La 404 ne doit pas être indexée : elle a maintenant `<meta name="robots" content="noindex">`, grâce à une prop `noindex` du Layout. |
| **Nom de domaine et HTTPS** | linabenmabrouk.fr et www redirigent vers portfolio.linabenmabrouk.fr. | Navigateur et `curl -I` | Certificat HTTPS valide. Avec `curl`, `linabenmabrouk.fr`, `www.linabenmabrouk.fr` et `http://portfolio.linabenmabrouk.fr` redirigent en **301** vers `https://portfolio.linabenmabrouk.fr/`. |
| **Textes alternatifs et contenu texte** | Les moteurs ne lisent pas les images. | WAVE | Voir la partie Accessibilité. |

**Score Lighthouse SEO** : **100**, en mobile et en desktop (accueil en ligne, 17/11/2026).

---

## 4. Conformité juridique

| Critère | Pourquoi sur mon site | Vérification | Résultat / correction |
|---|---|---|---|
| **Mentions légales (loi LCEN)** | C'est obligatoire pour tout site publié. | Page /mentions-legales, accessible depuis le footer de chaque page | Éditeur, directrice de la publication, contact et hébergement. Le site et sa base de données sont sur un VPS, et le nom de domaine est enregistré chez Infomaniak. |
| **Données du formulaire (RGPD)** | Le formulaire enregistre nom, e-mail, sujet et message dans PocketBase. | Lecture du formulaire et des règles de la collection messages | Je demande seulement les données utiles. À quoi elles servent et les droits RGPD sont indiqués dans les mentions légales. Il manque encore la durée de conservation des messages, et une phrase d'information sous le formulaire. |
| **Sécurité des messages** | Les messages ne doivent pas être lisibles par tout le monde. | Règles API de la collection messages dans PocketBase, test d'un appel GET sans connexion | Création publique, lecture réservée à l'admin : un GET sans connexion sur la collection messages renvoie « Only superusers can perform this action » (erreur 403). `pocketbase/pb_data/` est dans le `.gitignore`, donc aucun de ses fichiers n'est sur GitHub. L'adresse de PocketBase est dans un fichier `.env`, lui aussi dans le `.gitignore` (un `.env.example` sert de modèle). Les secrets du déploiement sont dans les secrets GitHub. |
| **Cookies** | Pas de bandeau cookies : il faut prouver qu'il n'y en a pas besoin. | DevTools > Application > Cookies, sur chaque page | Aucun cookie de mesure d'audience ni publicitaire. Les polices sont hébergées sur le site, donc rien n'est envoyé à Google. En ligne, aucun cookie n'est déposé sur les pages, et il n'y a aucun appel à Google ou à un outil de mesure d'audience. |
| **Droits sur les images** | Les moodboards (NŨNC, Lumimix) contiennent des photos qui ne sont pas à moi, et les mockups d'écrans viennent peut-être de modèles téléchargés. | Vérification de chaque image publiée | Pas encore fait : les photos des moodboards et les mockups sont toujours en ligne, sans la source. |
| **Projets de groupe** | NŨNC a été fait en équipe, Bordeaux Surchauffe en binôme. | Accord des membres de l'équipe | L'accord de l'équipe est indiqué dans les mentions légales. Les noms des coéquipiers ne sont pas encore crédités : les pages NŨNC, Bordeaux Surchauffe et Philmo indiquent seulement « Travail en équipe » ou « Travail en binôme ». |
| **Marques des logiciels** | Les logos de Figma, Blender, Live2D… sont affichés. | Mentions légales | Mention « Les logos des logiciels présentés appartiennent à leurs propriétaires ». |
| **Licences des polices et librairies** | Space Grotesk, DM Sans, Titan One, Anton et Micro 5, plus Astro, Tailwind et PocketBase. | Licences sur Google Fonts et GitHub | Les polices sont sous licence OFL et les librairies sous licence MIT, donc libres d'utilisation. Elles sont créditées dans les mentions légales. |
| **Usage de l'IA** | Demandé par le cahier des charges. | Fichier `IA.md` à la racine du repository | Fait. |

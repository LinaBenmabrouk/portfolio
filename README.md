# Portfolio – Lina Ben Mabrouk

Mon portfolio d'étudiante en BUT MMI : développement web front-end, design et animation.

**Site en ligne : https://portfolio.linabenmabrouk.fr**

## Technologies

- Astro (rendu côté serveur, adaptateur Node)
- Tailwind CSS 4
- JavaScript
- PocketBase pour les contenus (projets, à propos, messages du formulaire)

## Lancer le projet en local

1. Installer les dépendances :
   ```
   bun install
   ```
2. Créer un fichier `.env` à partir de `.env.example`, avec l'adresse de PocketBase.
3. Lancer le site :
   ```
   bun run dev
   ```

Le site s'ouvre sur http://localhost:4321.

## Mise en ligne

Le site est hébergé sur un VPS. À chaque push sur `main`, il est déployé automatiquement avec GitHub Actions.

## Livrables

- [JOURNAL.md](JOURNAL.md) : journal de bord du projet, semaine par semaine
- [QUALITE.md](QUALITE.md) : grille qualité (accessibilité, performance, référencement, juridique)
- [IA.md](IA.md) : déclaration d'usage de l'IA

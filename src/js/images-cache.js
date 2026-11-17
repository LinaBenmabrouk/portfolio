// Point d'accès des images (/_image), à la place de celui d'Astro.
// Astro calcule l'image (taille + webp) une seule fois, puis on la garde dans le dossier cache-images/ :
// les visites suivantes la reçoivent directement, même après un redémarrage du serveur
import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, rename, writeFile } from "node:fs/promises";
import path from "node:path";

const dossier = path.join(process.cwd(), "cache-images");
// Nombre d'images gardées au plus (pour ne pas remplir le disque avec des tailles inventées)
const maxImages = 2000;
// Type de fichier envoyé au navigateur, selon le format demandé (paramètre f de l'adresse)
const types = { webp: "image/webp", avif: "image/avif", png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", gif: "image/gif", svg: "image/svg+xml" };

// Code d'Astro qui calcule les images : version dev (bun run dev) ou version serveur
const astro = import.meta.env.DEV ? await import("astro/assets/endpoint/dev") : await import("astro/assets/endpoint/node");

export async function GET(contexte) {
  const url = new URL(contexte.request.url);
  const format = url.searchParams.get("f");
  // Image de PocketBase (adresse en http) : son nom change quand on la remplace, le cache reste à jour
  const imagePocketBase = (url.searchParams.get("href") || "").startsWith("http");

  // Sans cache : format inconnu, ou image locale en dev (en dev, son adresse ne change pas quand on modifie le fichier)
  if (!types[format] || (import.meta.env.DEV && !imagePocketBase)) {
    return astro.GET(contexte);
  }

  // Nom du fichier : une empreinte de l'adresse (chaque image et chaque taille a la sienne)
  const nom = createHash("sha1").update(url.pathname + url.search).digest("hex") + "." + format;
  const fichier = path.join(dossier, nom);
  const entetes = { "Content-Type": types[format], "Cache-Control": "public, max-age=31536000" };

  // Image déjà calculée : on la renvoie directement
  try {
    return new Response(await readFile(fichier), { headers: entetes });
  } catch {
    // Pas encore dans le cache : on continue
  }

  // Sinon, Astro la calcule
  const reponse = await astro.GET(contexte);
  if (!reponse.ok) {
    return reponse;
  }
  const image = Buffer.from(await reponse.arrayBuffer());

  // On la garde pour les prochaines fois (fichier .tmp puis renommé : jamais de fichier à moitié écrit)
  try {
    await mkdir(dossier, { recursive: true });
    if ((await readdir(dossier)).length < maxImages) {
      await writeFile(fichier + ".tmp", image);
      await rename(fichier + ".tmp", fichier);
    }
  } catch (erreur) {
    console.error("Image non gardée dans le cache :", erreur.message);
  }

  return new Response(image, { headers: entetes });
}

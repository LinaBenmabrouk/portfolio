import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, rename, writeFile } from "node:fs/promises";
import path from "node:path";

const dossier = path.join(process.cwd(), "cache-images");
const maxImages = 2000;
const types = { webp: "image/webp", avif: "image/avif", png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", gif: "image/gif", svg: "image/svg+xml" };

const astro = import.meta.env.DEV ? await import("astro/assets/endpoint/dev") : await import("astro/assets/endpoint/node");

export async function GET(contexte) {
  const url = new URL(contexte.request.url);
  const format = url.searchParams.get("f");
  const imagePocketBase = (url.searchParams.get("href") || "").startsWith("http");

  if (!types[format] || (import.meta.env.DEV && !imagePocketBase)) {
    return astro.GET(contexte);
  }

  const nom = createHash("sha1").update(url.pathname + url.search).digest("hex") + "." + format;
  const fichier = path.join(dossier, nom);
  const entetes = { "Content-Type": types[format], "Cache-Control": "public, max-age=31536000" };

  try {
    return new Response(await readFile(fichier), { headers: entetes });
  } catch {
  }

  const reponse = await astro.GET(contexte);
  if (!reponse.ok) {
    return reponse;
  }
  const image = Buffer.from(await reponse.arrayBuffer());

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

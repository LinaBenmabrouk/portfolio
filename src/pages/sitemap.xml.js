// Plan du site pour les moteurs de recherche (/sitemap.xml).
// Il est créé à chaque visite, comme les autres pages : un nouveau projet de PocketBase y apparaît tout seul
import { getProjetsNav } from "../js/backend.mjs";

const site = "https://portfolio.linabenmabrouk.fr";

export async function GET() {
  // Pages écrites à la main (liste créée à chaque visite, sinon les projets s'ajouteraient en double)
  const pages = ["/", "/a-propos", "/projets", "/contact", "/mentions-legales"];

  // Une page par projet de PocketBase
  const projets = await getProjetsNav();
  for (const projet of projets) {
    pages.push("/projets/" + projet.slug);
  }

  // Une balise <url> par page
  let liens = "";
  for (const page of pages) {
    liens += "  <url><loc>" + site + page + "</loc></url>\n";
  }

  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + liens + "</urlset>\n";

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      // Cache d'une minute, comme les pages
      "Cache-Control": "public, max-age=60",
    },
  });
}

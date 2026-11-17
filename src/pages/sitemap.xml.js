import { getProjetsNav } from "../js/backend.mjs";

const site = "https://portfolio.linabenmabrouk.fr";

export async function GET() {
  const pages = ["/", "/a-propos", "/projets", "/contact", "/mentions-legales"];

  const projets = await getProjetsNav();
  for (const projet of projets) {
    pages.push("/projets/" + projet.slug);
  }

  let liens = "";
  for (const page of pages) {
    liens += "  <url><loc>" + site + page + "</loc></url>\n";
  }

  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + liens + "</urlset>\n";

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=60",
    },
  });
}

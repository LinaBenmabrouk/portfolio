import PocketBase from "pocketbase";

export const pb = new PocketBase(import.meta.env.PUBLIC_POCKETBASE_URL);

pb.autoCancellation(false);

async function getListe(collection, options) {
  try {
    return await pb.collection(collection).getFullList(options);
  } catch (erreur) {
    console.error("Impossible de récupérer " + collection + " :", erreur.message);
    return [];
  }
}

export async function getProjets() {
  return await pb.collection("projets").getFullList({ sort: "ordre" });
}

export async function getProjetsNav() {
  return await getListe("projets", { sort: "ordre", fields: "slug,titre" });
}

export async function getProjetsEnAvant() {
  return await getListe("projets", { filter: "en_avant = true", sort: "ordre" });
}

export async function getCompetences() {
  return await getListe("competences", { sort: "numero" });
}

export async function getSavoirEtre() {
  return await getListe("savoir_etre", { sort: "created" });
}

export async function getTechnologies(categorie) {
  return await getListe("technologies", { filter: 'categorie = "' + categorie + '"', sort: "created" });
}

export async function getParcours() {
  return await getListe("parcours", { sort: "ordre" });
}

export async function getProjet(slug) {
  try {
    return await pb.collection("projets").getFirstListItem(pb.filter("slug = {:slug}", { slug }));
  } catch (erreur) {
    return null;
  }
}

export function getImageUrl(record, fichier, miniature) {
  return pb.files.getURL(record, fichier, miniature ? { thumb: miniature } : {});
}

export async function envoyerMessage(data) {
  return await pb.collection("messages").create(data);
}

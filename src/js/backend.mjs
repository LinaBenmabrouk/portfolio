import PocketBase from "pocketbase";

export const pb = new PocketBase("http://127.0.0.1:8090");

// Évite que deux requêtes simultanées s'annulent (pendant le build notamment)
pb.autoCancellation(false);

export async function getProjets() {
  return await pb.collection("projets").getFullList({ sort: "ordre" });
}

// Projets cochés "en_avant" (section "Projets sélectionnés" de l'accueil).
// Si PocketBase ne répond pas, on renvoie une liste vide pour que le site marche quand même.
export async function getProjetsEnAvant() {
  try {
    return await pb.collection("projets").getFullList({
      filter: "en_avant = true",
      sort: "ordre",
    });
  } catch (erreur) {
    console.error("Impossible de récupérer les projets en avant :", erreur.message);
    return [];
  }
}

export async function getProjet(slug) {
  return await pb
    .collection("projets")
    .getFirstListItem(pb.filter("slug = {:slug}", { slug }));
}

export function getImageUrl(record, fichier) {
  return pb.files.getURL(record, fichier);
}

export async function envoyerMessage(data) {
  return await pb.collection("messages").create(data);
}

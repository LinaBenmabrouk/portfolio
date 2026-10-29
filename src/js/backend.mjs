import PocketBase from "pocketbase";

export const pb = new PocketBase("http://127.0.0.1:8090");

// Évite que deux requêtes simultanées s'annulent (pendant le build notamment)
pb.autoCancellation(false);

export async function getProjets() {
  return await pb.collection("projets").getFullList({ sort: "ordre" });
}

export async function getProjetsEnAvant() {
  return await pb.collection("projets").getFullList({
    filter: "en_avant = true",
    sort: "ordre",
  });
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

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

// Les 5 compétences du BUT MMI (page À propos), triées par numéro.
// Liste vide si PocketBase ne répond pas.
export async function getCompetences() {
  try {
    return await pb.collection("competences").getFullList({ sort: "numero" });
  } catch (erreur) {
    console.error("Impossible de récupérer les compétences :", erreur.message);
    return [];
  }
}

// Les savoir-être (page À propos), triés par ordre.
// Liste vide si PocketBase ne répond pas.
export async function getSavoirEtre() {
  try {
    return await pb.collection("savoir_etre").getFullList({ sort: "ordre" });
  } catch (erreur) {
    console.error("Impossible de récupérer les savoir-être :", erreur.message);
    return [];
  }
}

// Technologies d'une catégorie (ex : "Outils"), triées par ordre (page À propos).
// Liste vide si PocketBase ne répond pas.
export async function getTechnologies(categorie) {
  try {
    return await pb.collection("technologies").getFullList({
      filter: 'categorie = "' + categorie + '"',
      sort: "ordre",
    });
  } catch (erreur) {
    console.error("Impossible de récupérer les technologies :", erreur.message);
    return [];
  }
}

// Étapes du parcours (page À propos), triées par ordre.
// Liste vide si PocketBase ne répond pas.
export async function getParcours() {
  try {
    return await pb.collection("parcours").getFullList({ sort: "ordre" });
  } catch (erreur) {
    console.error("Impossible de récupérer le parcours :", erreur.message);
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

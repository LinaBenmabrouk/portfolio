import PocketBase from "pocketbase";

export const pb = new PocketBase("http://127.0.0.1:8090");

// Évite que deux requêtes simultanées s'annulent
pb.autoCancellation(false);

// Récupère toute une collection (options : tri, filtre...).
// Si PocketBase ne répond pas, on renvoie une liste vide pour que le site marche quand même.
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

// Projets cochés "en_avant" (section "Projets sélectionnés" de l'accueil)
export async function getProjetsEnAvant() {
  return await getListe("projets", { filter: "en_avant = true", sort: "ordre" });
}

// Les 5 compétences du BUT MMI (page À propos), triées par numéro
export async function getCompetences() {
  return await getListe("competences", { sort: "numero" });
}

// Les savoir-être (page À propos)
export async function getSavoirEtre() {
  return await getListe("savoir_etre", { sort: "ordre" });
}

// Technologies d'une catégorie (ex : "Outils") (page À propos)
export async function getTechnologies(categorie) {
  return await getListe("technologies", { filter: 'categorie = "' + categorie + '"', sort: "ordre" });
}

// Étapes du parcours (page À propos)
export async function getParcours() {
  return await getListe("parcours", { sort: "ordre" });
}

// Un seul projet, retrouvé grâce à son slug. Renvoie null s'il n'existe pas.
export async function getProjet(slug) {
  try {
    return await pb.collection("projets").getFirstListItem(pb.filter("slug = {:slug}", { slug }));
  } catch (erreur) {
    return null;
  }
}

export function getImageUrl(record, fichier) {
  return pb.files.getURL(record, fichier);
}

export async function envoyerMessage(data) {
  return await pb.collection("messages").create(data);
}

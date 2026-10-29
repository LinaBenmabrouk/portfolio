/// <reference path="../pb_data/types.d.ts" />

// Envoie un email à chaque nouveau message du formulaire de contact.
// L'envoi utilise les réglages SMTP de PocketBase (Settings > Mail settings).
onRecordAfterCreateSuccess((e) => {
  // Les fonctions doivent être définies dans le handler (contexte isolé de PocketBase)
  const echapper = (texte) =>
    String(texte || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/\n/g, "<br>");

  const r = e.record;
  const meta = e.app.settings().meta;

  const message = new MailerMessage({
    // Les infos de la personne vont dans les vrais champs de l'email
    from: { address: meta.senderAddress, name: r.get("nom") + " (" + r.get("email") + ")" }, // De : son nom et son adresse
    headers: { "Reply-To": r.get("email") }, // Répondre à : son adresse
    to: [{ address: "linabenmabrouk23@gmail.com" }], // À : ton adresse de réception
    subject: "[Portfolio] " + (r.get("sujet") || "Nouveau message") + " - " + r.get("nom"), // Objet : [Portfolio] + son sujet + son nom
    html:
      // Gmail cache le nom de l'expéditeur, donc on le remet en haut du mail
      "<p><strong>De :</strong> " + echapper(r.get("nom")) + " (" + echapper(r.get("email")) + ")</p>" +
      "<p>" + echapper(r.get("message")) + "</p>" +
      "<p style=\"color:#888;font-size:12px\">Envoyé depuis le formulaire de contact de ton portfolio.</p>",
  });

  try {
    e.app.newMailClient().send(message);
  } catch (err) {
    // Le message reste enregistré dans PocketBase même si l'email échoue
    e.app.logger().error("Email de contact non envoyé", "error", err.message);
  }

  e.next();
}, "messages");

// 📡 Backend Express – Server d'envoi de formulaire de contact
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import validator from "validator";

// 🔐 Charge les variables d'environnement (.env)
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 📬 Route API POST /api/contact
app.post("/api/contact", async (req, res) => {
  const { type, date, lieu, nombre, message, from, firstName, lastName, phone } = req.body;

  // ✅ Sécurité et validation
  if (!validator.isEmail(from)) {
    return res.status(400).json({ success: false, message: "Adresse email invalide." });
  }

  // Validation des noms
  if (!firstName || !validator.matches(firstName, /^[a-zA-ZÀ-ÿ\s-]{2,50}$/)) {
    return res.status(400).json({ success: false, message: "Prénom invalide." });
  }
  if (!lastName || !validator.matches(lastName, /^[a-zA-ZÀ-ÿ\s-]{2,50}$/)) {
    return res.status(400).json({ success: false, message: "Nom invalide." });
  }

  // Validation du téléphone (format français)
  if (phone && !validator.isMobilePhone(phone, 'fr-FR')) {
    return res.status(400).json({ success: false, message: "Numéro de téléphone invalide." });
  }

  if (!message || message.trim().length === 0) {
    return res.status(400).json({ success: false, message: "Le message ne peut pas être vide." });
  }

  // Configuration du transporteur SMTP (Nodemailer)
  const transporter = nodemailer.createTransport({
    service: "Yandex", // ou autre : Gmail, OVH, etc.
    auth: {
      user: process.env.MAIL_SENDER, // Adresse expéditrice authentifiée
      pass: process.env.MAIL_PASS,   // Mot de passe ou app password
    },
  });

  try {
    // Construction du mail à envoyer
    await transporter.sendMail({
      from: process.env.MAIL_SENDER,      // Expéditeur réel (ex: noreply@...)
      to: process.env.MAIL_TO,            // Adresse qui reçoit les demandes
      subject: `🎉 Nouvelle demande de devis – ${validator.escape(type)}`,
      replyTo: from,                      // Pour répondre facilement au client
      html: `
        <h2>Nouvelle demande de contact</h2>
        <p><strong>Client :</strong> ${validator.escape(firstName)} ${validator.escape(lastName)}</p>
        <p><strong>Email :</strong> ${validator.escape(from)}</p>
        <p><strong>Téléphone :</strong> ${validator.escape(phone)}</p>
        <p><strong>Type d'événement :</strong> ${validator.escape(type)}</p>
        <p><strong>Date :</strong> ${validator.escape(date)}</p>
        <p><strong>Lieu :</strong> ${validator.escape(lieu)}</p>
        <p><strong>Nombre de personnes :</strong> ${validator.escape(String(nombre))}</p>
        <p><strong>Message :</strong><br>${validator.escape(message)}</p>
      `,
    });

    res.status(200).json({ success: true, message: "Demande envoyée avec succès." });
  } catch (error) {
    console.error("Erreur envoi email :", error);
    res.status(500).json({ success: false, message: "Erreur lors de l'envoi de l'email." });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});

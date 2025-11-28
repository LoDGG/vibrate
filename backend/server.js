// 📡 Backend Express – Server d'envoi de formulaire de contact
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import validator from "validator";
import { readFileSync } from "fs";

// 🔐 Charge les variables d'environnement (.env)
dotenv.config();

let logoBuffer = null;
try {
  logoBuffer = readFileSync(new URL("../frontend/public/vibrate_logo.png", import.meta.url));
} catch (error) {
  console.warn("⚠️ Impossible de charger le logo email :", error.message);
}

const app = express();

// Middleware
globalThis.__VIBRATE_API_PREFIX = "/api/contact"; // For clarity in future scaling
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
    host: process.env.MAIL_HOST, // ex: smtp.hostinger.com
    port: Number(process.env.MAIL_PORT) || 465,
    secure: (process.env.MAIL_SECURE || "true") === "true", // true si port 465
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
        <p><strong>Téléphone :</strong> ${validator.escape(phone || "Non renseigné")}</p>
        <p><strong>Type d'événement :</strong> ${validator.escape(type)}</p>
        <p><strong>Date :</strong> ${validator.escape(date || "À préciser")}</p>
        <p><strong>Lieu :</strong> ${validator.escape(lieu || "À préciser")}</p>
        <p><strong>Nombre de personnes :</strong> ${validator.escape(String(nombre))}</p>
        <p><strong>Message :</strong><br>${validator.escape(message)}</p>
      `,
    });

    const safeFirstName = firstName ? validator.escape(firstName) : "Vibrate";

    const confirmationMail = {
      from: process.env.MAIL_SENDER,
      to: from,
      subject: "Vibrate – Nous avons bien reçu votre demande ✨",
      html: `
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="font-family:Arial,sans-serif;background-color:#f5f5f5;padding:24px 0;">
          <tr>
            <td align="center">
              <table width="560" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#ffffff;border-radius:18px;padding:32px;border:1px solid #eeeeee;color:#111111;">
                <tr>
                  <td align="center" style="padding-bottom:24px;">
                    ${
                      logoBuffer
                        ? '<img src="cid:vibrate-logo" alt="Vibrate" style="height:42px;display:block;" />'
                        : '<span style="font-size:20px;font-weight:bold;letter-spacing:0.2em;color:#111;">VIBRATE</span>'
                    }
                  </td>
                </tr>
                <tr>
                  <td style="font-size:16px;line-height:1.6;color:#333333;">
                    <p style="margin:0 0 16px;">Hello ${safeFirstName},</p>
                    <p style="margin:0 0 16px;">Merci d'avoir pris contact avec nous. Votre demande a bien été prise en compte et un membre de l'équipe prendra contact avec vous prochainement.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:24px;background-color:#fafafa;border:1px solid #f0f0f0;border-radius:12px;font-size:15px;line-height:1.5;color:#333333;">
                    <p style="margin:0 0 10px;font-weight:bold;color:#ff2ebc;">Résumé rapide</p>
                    <p style="margin:0;">
                      💽 <strong>Type :</strong> ${validator.escape(type)}<br/>
                      📅 <strong>Date :</strong> ${validator.escape(date || "À confirmer")}<br/>
                      📍 <strong>Lieu :</strong> ${validator.escape(lieu || "À confirmer")}<br/>
                      👤 <strong>Nombre de personnes :</strong> ${validator.escape(String(nombre))}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="font-size:15px;line-height:1.6;color:#333333;padding-top:24px;">
                    <p style="margin:0 0 16px;">Besoin d'ajouter des précisions ? Répondez simplement à cet email ou contactez-nous sur <a href="mailto:event@vibrate.fr" style="color:#00a3ff;">event@vibrate.fr</a>.</p>
                    <p style="margin:32px 0 0;">À très vite,<br/><strong>L'équipe Vibrate</strong></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `,
      attachments: logoBuffer
        ? [
            {
              filename: "vibrate_logo.png",
              content: logoBuffer,
              cid: "vibrate-logo",
            },
          ]
        : [],
    };

    try {
      await transporter.sendMail(confirmationMail);
    } catch (confirmationError) {
      console.error("Erreur envoi mail de confirmation :", confirmationError);
    }

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

import { useState } from "react";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";

const Contact = () => {
  const [formData, setFormData] = useState({
    type: "Mariage",
    date: "",
    lieu: "",
    nombre: "",
    message: "",
    from: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const [status, setStatus] = useState(null); // null | "success" | "error" | "loading"
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Utilisation directe dans React (affichage côté client uniquement)
const formatDateFr = (isoDate) => {
  return new Intl.DateTimeFormat('fr-FR').format(new Date(isoDate));
};

  const validateForm = () => {
    const errors = {};
    
    // Email validation
    if (!formData.from || !isEmail(formData.from)) {
      errors.from = "Veuillez entrer une adresse email valide.";
    }

    // Name validation
    if (!formData.firstName || !/^[a-zA-ZÀ-ÿ\s-]{2,50}$/.test(formData.firstName)) {
      errors.firstName = "Le prénom doit contenir entre 2 et 50 caractères (lettres, espaces ou tirets).";
    }
    if (!formData.lastName || !/^[a-zA-ZÀ-ÿ\s-]{2,50}$/.test(formData.lastName)) {
      errors.lastName = "Le nom doit contenir entre 2 et 50 caractères (lettres, espaces ou tirets).";
    }

    // Phone validation (French format)
    if (formData.phone && !isMobilePhone(formData.phone, 'fr-FR')) {
      errors.phone = "Veuillez entrer un numéro de téléphone valide (format français).";
    }

    // Message validation
    if (!formData.message || formData.message.trim() === "") {
      errors.message = "Le message ne peut pas être vide.";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setFormData({
          type: "Mariage",
          date: "",
          lieu: "",
          nombre: "",
          message: "",
          from: "",
          firstName: "",
          lastName: "",
          phone: "",
        });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20 px-6 bg-black text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Contact</h2>
        <p className="text-lg text-gray-300 mb-10">
          Dites-nous tout sur votre événement. On vous répond vite et bien.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-400">🎉 Type d'événement</p>
              <select name="type" value={formData.type} onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FF2EBC]">
                <option>Mariage</option>
                <option>Soirée privée</option>
                <option>Anniversaire</option>
                <option>Événement professionnel</option>
                <option>Autre</option>
              </select>
            </div>
            <div>
              <p className="text-gray-400">📅 Date de l'événement</p>
              <input type="date" name="date" value={formData.date} onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00F0FF]" />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-400">📍 Lieu</label>
              <input type="text" name="lieu" value={formData.lieu} onChange={handleChange} placeholder="Ville, lieu exact..."
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FF2EBC]" />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-400">🧑‍🤝‍🧑 Nombre de personnes</label>
              <input type="number" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Ex: 80"
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00F0FF]" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm text-gray-400">👤 Prénom *</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Votre prénom"
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FF2EBC]" />
              {formErrors.firstName && <p className="text-red-400 text-sm mt-1">{formErrors.firstName}</p>}
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-400">👤 Nom *</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Votre nom"
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00F0FF]" />
              {formErrors.lastName && <p className="text-red-400 text-sm mt-1">{formErrors.lastName}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm text-gray-400">📧 Email *</label>
              <input type="email" name="from" value={formData.from} onChange={handleChange} placeholder="Votre adresse email"
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00F0FF]" />
              {formErrors.from && <p className="text-red-400 text-sm mt-1">{formErrors.from}</p>}
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-400">📞 Téléphone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="06 00 00 00 00"
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FF2EBC]" />
              {formErrors.phone && <p className="text-red-400 text-sm mt-1">{formErrors.phone}</p>}
            </div>
          </div>

          <div>
            <p className="text-gray-400">📝 Message *</p>
            <textarea rows="5" name="message" value={formData.message} onChange={handleChange} placeholder="Ambiance souhaitée : je voudrais quelque chose de festif et élégant.
Style musical : j’aime le rock et la variété française.
Contraintes : je pense que la soirée se terminera vers 1h, la salle que j’ai louée n’est disponible qu’à partir de 16h."
              className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FF2EBC]"></textarea>
            {formErrors.message && <p className="text-red-400 text-sm mt-1">{formErrors.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 mt-4 bg-[#FF2EBC] text-white font-semibold rounded-md hover:bg-pink-600 transition"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Envoi en cours..." : "Envoyer"}
          </button>

          {status === "success" && <p className="text-green-400 mt-4">✅ Votre message a été envoyé !</p>}
          {status === "error" && <p className="text-red-400 mt-4">❌ Une erreur est survenue. Essayez plus tard.</p>}
        </form>
      </div>
    </section>
  );
};

export default Contact;

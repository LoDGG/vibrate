// 💡 Section Prestations – Composant React pour Vibrate
import React from "react";

const Services = () => {
  const cardBase =
    "bg-[#0A0A0A] rounded-2xl overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.02] cursor-pointer hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] relative";

  const circularElementBase =
    "absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full text-white flex items-center justify-center text-2xl font-light";

  const colorStyles = {
    mariage: "bg-[rgba(236,72,153,0.15)] shadow-[0_0_20px_rgba(236,72,153,0.3)]",
    soiree: "bg-[rgba(34,211,238,0.15)] shadow-[0_0_20px_rgba(34,211,238,0.3)]",
    pro: "bg-[rgba(139,92,246,0.15)] shadow-[0_0_20px_rgba(139,92,246,0.3)]"
  };

  const prestations = [
    {
      title: "Mariages",
      color: "hover:shadow-[0_10px_30px_rgba(236,72,153,0.5)]",
      img: "assets/mockups/Mockup_Mariage_SoiréeDance.jpg",
      description: "Une célébration unique, une ambiance sur mesure – du cocktail à la dernière danse.",
      buttonStyle: colorStyles.mariage
    },
    {
      title: "Soirées privées",
      color: "hover:shadow-[0_10px_30px_rgba(34,211,238,0.5)]",
      img: "assets/mockups/Mockup_SoireePrivee_Lightshow.jpg",
      description: "Anniversaire, fête entre amis, soirée marquante – l'animation s'adapte à votre ambiance.",
      buttonStyle: colorStyles.soiree
    },
    {
      title: "Événements Pro",
      color: "hover:shadow-[0_10px_30px_rgba(167,139,250,0.5)]",
      img: "assets/mockups/Mockup_EventPro_KaraokeBlindtest.jpg",
      description: "Ambiance détendue ou festive pour vos séminaires, cocktails ou lancements de produit.",
      buttonStyle: colorStyles.pro
    }
  ];

  return (
    <section id="services" className="bg-black text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
        Une expérience pensée pour vous <br ></br>
        Un moment qui vous ressemble
        </h2>


        <div className="grid md:grid-cols-3 gap-10">
          {prestations.map((item, index) => (
            <a
              key={index}
              href="#contact"
              className={`${cardBase} ${item.color}`}
              aria-label={`En savoir plus sur ${item.title} et accéder au formulaire de contact`}
            >
              <img src={item.img} alt={item.title} className="w-full h-56 object-cover transition group-hover:brightness-110" />
              <div className="p-6 pb-16">
                <h3 className="text-2xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-gray-300 mb-4">{item.description}</p>
                <div className={`${circularElementBase} ${item.buttonStyle}`}>
                  +
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-20">
          <p className="text-xl text-white mb-6">
            Un projet en tête ? Discutons ensemble de l'ambiance qui vous ressemble.
          </p>
          <a 
            href="#contact" 
            className="inline-block px-8 py-3 text-lg font-medium text-white bg-[#FF2EBC] rounded-full shadow-neon hover:shadow-xl hover:scale-105 transition-all"
          >
            Créer mon devis personnalisé
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
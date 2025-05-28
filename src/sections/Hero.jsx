import { motion } from "framer-motion"
import heroBg from "/assets/MOCKUP_HERO_EVENT_SCENE_WITH_LIGHTS.jpg"

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen w-full flex items-center justify-center text-center px-4 bg-black overflow-hidden"
    >
      {/* BG visuel avec éclairage doux */}
      <img
        src={heroBg}
        alt="Ambiance DJ événement"
        className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
      />

      {/* Overlay sombre pour lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-black/90" />

      {/* Contenu principal */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold text-white mb-4 bg-gradient-to-r from-[#00F0FF] via-white to-[#FF2EBC] bg-clip-text text-transparent"
        >
          Élevez vos événements. Célébrez avec style.
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-base md:text-lg text-zinc-200 max-w-xl mx-auto mb-8"
        >
          DJ, sonorisation, éclairage et ambiance pour mariages, soirées privées et événements professionnels.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#contact"
            className="px-6 py-2 rounded-full text-white text-sm font-medium bg-gradient-to-r from-[#00F0FF] to-[#FF2EBC] shadow-neon hover:scale-105 transition"
          >
            Demander un devis
          </a>
          <a
            href="#services"
            className="px-6 py-2 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/10 hover:scale-105 transition"
          >
            Voir nos services
          </a>
        </motion.div>
      </div>

      {/* Indicateur scroll */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#FF2EBC] text-2xl"
      >
        ↓
      </motion.div>
    </section>
  )
}

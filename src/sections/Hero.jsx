import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section
      id="hero"
      className="h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-b from-black via-zinc-900 to-black text-white"
    >
      {/* Titre principal */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-6xl font-extrabold mb-6"
      >
        Sound. Light. Celebration.
      </motion.h1>

      {/* Slogan secondaire */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="text-lg md:text-xl max-w-xl mx-auto mb-8 text-zinc-300"
      >
        Celebrise sublime vos événements avec un univers sonore et lumineux immersif.
        Mariages, soirées privées, événements d’entreprise – offrez-vous une expérience professionnelle et inoubliable.
      </motion.p>

      {/* CTA */}
      <motion.a
        href="#contact"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.3, delay: 0.8 }}
        className="inline-block px-5 py-2 text-sm font-medium text-white bg-[#FF2EBC] rounded-full shadow-neon hover:shadow-xl hover:scale-105 transition-all"
      >
        Demander un devis
      </motion.a>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="mt-16 text-[#FF2EBC] text-2xl"
      >
        ↓
      </motion.div>
    </section>
  )
}

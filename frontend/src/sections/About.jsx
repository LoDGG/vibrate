import { motion } from "framer-motion"
import familyMockup from "/assets/mockups/MOCKUP_FAMILY_TEAM_PHOTO.jpg" // image à remplacer plus tard

export default function About() {
  return (
    <section
      id="about"
      className="bg-black text-softWhite py-20 px-6 md:px-12 scroll-mt-16"
    >
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Titre principal */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-white text-center"
        >
          Une histoire de passion et de transmission
        </motion.h2>

        {/* Visuel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <img
            src={familyMockup}
            alt="L'équipe familiale Celebrise"
            className="w-full max-w-md rounded-lg shadow-neon"
          />
        </motion.div>

        {/* Paragraphe 1 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-zinc-300 leading-relaxed text-lg"
        >
          Il y a des souvenirs que la lumière et la musique rendent inoubliables.
          Un premier slow. Une chanson criée à pleins poumons. Une salle figée dans le silence, suspendue à une voix. Celebrise est née de cette conviction : 
        </motion.p>

          {/* centered bold sentence */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-zinc-300 leading-relaxed text-lg text-center font-bold"
          > "L'émotion ne s'improvise pas, elle se crée."
          </motion.p>
        {/* Paragraphe 2 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-zinc-300 leading-relaxed text-lg"
        >
        Derrière chaque prestation, il y a une histoire familiale : <br />
Un père, DJ et régisseur passionné, fort de plus de 30 ans d'expérience. Mariages, scènes, soirées privées… autant de moments où il a su faire danser, vibrer, rassembler. <br />
Et son fils, animé par le désir de transmettre, de valoriser et de faire rayonner ce savoir-faire.</motion.p>

        {/* Paragraphe 3 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-zinc-300 leading-relaxed text-lg"
        >
        Aujourd'hui, Celebrise met cette complicité au service de vos événements : <br />
        une maîtrise millimétrée portée par un regard neuf, pour vous offrir une expérience unique et sur mesure.</motion.p>

        {/* Paragraphe 4 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-zinc-300 leading-relaxed text-lg"
        >
Nous prenons le temps d'écouter, de conseiller et de soigner chaque détail, afin de vous libérer de toute contrainte, pour que vous puissiez vous concentrer sur l'essentiel : 
        </motion.p>

        {/* Citation */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-8 text-xl md:text-2xl font-semibold text-pink"
        >
          Vivre pleinement l'instant.
        </motion.blockquote>
      </div>
    </section>
  )
}

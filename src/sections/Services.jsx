import { motion } from "framer-motion"
import { Heart, Sparkles, Briefcase } from "lucide-react"

const services = [
  {
    icon: <Heart size={40} />,
    title: "Mariage",
    description: "Ambiance romantique et festive pour le plus beau jour de votre vie.",
  },
  {
    icon: <Sparkles size={40} />,
    title: "Soirée Privée",
    description: "Fête entre amis ou en famille, nous créons une ambiance mémorable.",
  },
  {
    icon: <Briefcase size={40} />,
    title: "Événement Pro",
    description: "Sonorisation, lumière et animation pour vos séminaires et lancements.",
  },
]

export default function Services() {
  return (
    <section id="services" className="min-h-screen py-24 px-6 bg-zinc-900 text-white">
      <h2 className="text-4xl font-bold text-center mb-16">Nos prestations</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-zinc-800 p-8 rounded-2xl shadow-lg hover:scale-105 hover:shadow-pink-500/30 transition-transform"
          >
            <div className="text-pink-500 mb-4">{service.icon}</div>
            <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
            <p className="text-zinc-300">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

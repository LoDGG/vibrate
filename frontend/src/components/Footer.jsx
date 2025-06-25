import logo from '/assets/vibrate_logo.png'

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white py-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
        {/* Colonne 1 - Logo & brand */}
        <div>
          <img src={logo} alt="Vibrate Logo" className="h-10 mb-4" />
          <p className="text-pink-400 font-semibold">Son • Lumière • Ambiance</p>
          <p className="text-zinc-400 mt-2">
            Prestations DJ et événements sur mesure en Île-de-France.
          </p>
        </div>

        {/* Colonne 2 - Navigation */}
        <div>
          <h3 className="text-white font-semibold mb-4">Navigation</h3>
          <ul className="space-y-2 text-zinc-400">
            <li><a href="#hero" className="hover:text-pink-400 transition">Accueil</a></li>
            <li><a href="#services" className="hover:text-pink-400 transition">Services</a></li>
            <li><a href="#gallery" className="hover:text-pink-400 transition">Galerie</a></li>
            <li><a href="#about" className="hover:text-pink-400 transition">À propos</a></li>
            <li><a href="#testimonials" className="hover:text-pink-400 transition">Témoignages</a></li>
            <li><a href="#contact" className="hover:text-pink-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* Colonne 3 - Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-zinc-400">
            <li>📧 contact@vibrate.event</li>
            <li>📞 06 00 00 00 00</li>
            <li>📍 Basé à Melun (77)</li>
            <li>📸 Instagram : @vibrate.events</li>
          </ul>
        </div>

        {/* Colonne 4 - Légal */}
        <div>
          <h3 className="text-white font-semibold mb-4">Légal</h3>
          <ul className="space-y-2 text-zinc-400">
            <li><a href="#" className="hover:text-pink-400 transition">Mentions légales</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">CGV</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">Politique de confidentialité</a></li>
            <li className="mt-4 text-xs">© 2025 Vibrate — Tous droits réservés</li>
          </ul>
        </div>
      </div>

      {/* Bas de page */}
      <div className="mt-10 text-center text-xs text-zinc-500 px-6">
        Site hébergé par <span className="text-white">OVHcloud</span> — Directeur de la publication : <span className="text-white">Jean Dupont</span><br />
        N° SIRET : 000 000 000 00000
      </div>
    </footer>
  )
}

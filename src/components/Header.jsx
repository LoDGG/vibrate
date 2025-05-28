import logo from '/assets/celebrise_logo.png'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-zinc-800 shadow-lg h-16">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 h-full">
          <img src={logo} alt="Celebrise Logo" className="h-8 w-auto" />
        </a>

        {/* Navigation */}
        <nav className="hidden md:flex h-full items-stretch text-softWhite font-body text-sm uppercase tracking-wider">
  {[
    { name: 'Accueil', href: '#hero' },
    { name: 'Prestations', href: '#services' },
    { name: 'Galerie', href: '#gallery' },
    { name: 'À propos', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ].map((link) => (
<a
  key={link.name}
  href={link.href}
  className="group relative flex items-center justify-center px-6 h-full transition-colors duration-300 text-white hover:text-[#FF2EBC]"
>
  <span className="relative z-10">{link.name}</span>

  {/* Halo principal – diffus */}
  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-3 bg-[#FF2EBC] blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></span>

  {/* Halo secondaire – net et intense */}
  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-[2px] bg-[#FF2EBC] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></span>
</a>

  ))}
</nav>



        {/* CTA bouton devis */}
        <a
          href="#contact"
          className="ml-6 px-5 py-2 text-sm font-medium text-white bg-[#FF2EBC] rounded-full shadow-neon hover:shadow-xl hover:scale-105 transition-all"
        >
          Demander un devis
        </a>
      </div>
    </header>
  )
}

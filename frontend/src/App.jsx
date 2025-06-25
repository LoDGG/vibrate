import Header from './components/Header'
import { Button } from './components/ui/button'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import Services from './sections/Services'
import Gallery from './sections/Gallery'
import About from './sections/About'
import Contact from './sections/Contact'
import Testimonials from './sections/Testimonials'

function App() {
  return (
    <>
      <Header />
      <main className="bg-black text-white font-sans scroll-smooth">
        <Hero />
        <Services />
        <Gallery />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App

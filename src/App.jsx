import Header from './components/Header'
import Hero from './sections/Hero'
import Services from './sections/Services'
import Gallery from './sections/Gallery'
import About from './sections/About'
import Contact from './sections/Contact'

function App() {
  return (
    <>
      <Header />
      <main className="bg-black text-white font-sans scroll-smooth">
        <Hero />
        <Services />
        <Gallery />
        <About />
        <Contact />
      </main>
    </>
  )
}

export default App

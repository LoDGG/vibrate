import { motion } from "framer-motion";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Testimonials = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [currentGallery, setCurrentGallery] = useState([]);

  const testimonials = [
    {
      firstName: "Marie",
      date: "Mai 2025",
      eventType: "Mariage",
      quote: "Une soirée magique ! L'ambiance était parfaite du cocktail jusqu'au bout de la nuit. Nos invités en parlent encore.",
      gallery: [
        {
          src: "assets/gallery/mariage-marie-1.jpg",
          thumb: "assets/gallery/mariage-marie-1-thumb.jpg",
          alt: "Première danse des mariés"
        },
        {
          src: "assets/gallery/mariage-marie-2.jpg",
          thumb: "assets/gallery/mariage-marie-2-thumb.jpg",
          alt: "Ambiance soirée dansante"
        },
        {
          src: "assets/gallery/mariage-marie-3.jpg",
          thumb: "assets/gallery/mariage-marie-3-thumb.jpg",
          alt: "Installation DJ et jeux de lumière"
        }
      ]
    },
    {
      firstName: "Thomas",
      date: "Avril 2025",
      eventType: "Soirée d'entreprise",
      quote: "Un professionnalisme remarquable. La transition entre les moments calmes et festifs était parfaitement orchestrée.",
      gallery: [
        {
          src: "assets/gallery/corporate-thomas-1.jpg",
          thumb: "assets/gallery/corporate-thomas-1-thumb.jpg",
          alt: "Cocktail d'entreprise"
        },
        {
          src: "assets/gallery/corporate-thomas-2.jpg",
          thumb: "assets/gallery/corporate-thomas-2-thumb.jpg",
          alt: "Animation karaoké"
        },
        {
          src: "assets/gallery/corporate-thomas-3.jpg",
          thumb: "assets/gallery/corporate-thomas-3-thumb.jpg",
          alt: "Soirée dansante"
        }
      ]
    },
    {
      firstName: "Sophie",
      date: "Mars 2025",
      eventType: "Anniversaire",
      quote: "Une ambiance incroyable pour mes 30 ans ! Tout était parfait, de la playlist personnalisée aux jeux de lumière."
    },
    {
      firstName: "Lucas",
      date: "Février 2025",
      eventType: "Mariage",
      quote: "Une équipe à l'écoute qui a su s'adapter à nos demandes tout au long de la soirée. Un grand merci !",
      gallery: [
        {
          src: "assets/gallery/mariage-lucas-1.jpg",
          thumb: "assets/gallery/mariage-lucas-1-thumb.jpg",
          alt: "Entrée des mariés"
        },
        {
          src: "assets/gallery/mariage-lucas-2.jpg",
          thumb: "assets/gallery/mariage-lucas-2-thumb.jpg",
          alt: "Dancefloor en action"
        },
        {
          src: "assets/gallery/mariage-lucas-4.jpg",
          thumb: "assets/gallery/mariage-lucas-4-thumb.jpg",
          alt: "Show lumière"
        }
      ]
    },
    {
      firstName: "Emma",
      date: "Janvier 2025",
      eventType: "Soirée privée",
      quote: "Ambiance de folie ! Le light show était incroyable et la playlist parfaitement adaptée à nos goûts."
    }
  ];

  const extraTestimonials = [
    {
      firstName: "Antoine",
      date: "Décembre 2024",
      eventType: "Afterwork",
      quote: "Une super ambiance pour notre afterwork de fin d'année. Tout le monde a adoré !"
    },
    {
      firstName: "Julie",
      date: "Novembre 2024",
      eventType: "Mariage",
      quote: "Des pros de A à Z. La transition cocktail/dîner/soirée était parfaite."
    }
  ];

  const displayedTestimonials = isExpanded 
    ? [...testimonials, ...extraTestimonials]
    : testimonials;

  const handleGalleryOpen = (gallery, startIndex = 0) => {
    if (gallery && gallery.length > 0) {
      setCurrentGallery(gallery);
      setLightboxIndex(startIndex);
    }
  };

  return (
    <section id="testimonials" className="bg-black text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          Ils nous font confiance
        </motion.h2>

        <div className="grid gap-8">
          {displayedTestimonials.map((testimonial, index) => (
            <motion.div
              key={`${testimonial.firstName}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => testimonial.gallery && handleGalleryOpen(testimonial.gallery, 0)}
              className={`bg-[#0A0A0A] rounded-2xl p-6 md:p-8 relative overflow-hidden group ${
                testimonial.gallery ? 'hover:bg-[#0F0F0F] transition-colors duration-300 cursor-pointer' : ''
              }`}
            >
              {/* Effet de gradient au hover pour les témoignages avec galerie */}
              {testimonial.gallery && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF2EBC]/5 to-[#00F0FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 text-[#FF2EBC] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </>
              )}

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[#FF2EBC] font-semibold">{testimonial.firstName}</span>
                  <span className="text-zinc-500">•</span>
                  <span className="text-zinc-400">{testimonial.date}</span>
                  <span className="text-zinc-500">•</span>
                  <span className="text-zinc-400">{testimonial.eventType}</span>
                </div>

                <blockquote className="text-lg text-zinc-300 italic leading-relaxed mb-6">
                  "{testimonial.quote}"
                </blockquote>

                {/* Miniatures de la galerie */}
                {testimonial.gallery && (
                  <div className="flex gap-3 mt-4">
                    {testimonial.gallery.slice(0, 3).map((photo, photoIndex) => (
                      <button
                        key={photo.src}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGalleryOpen(testimonial.gallery, photoIndex);
                        }}
                        className="relative group/thumb w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-[#FF2EBC] focus:ring-offset-2 focus:ring-offset-black"
                      >
                        <img 
                          src={photo.thumb} 
                          alt={photo.alt}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover/thumb:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300"></div>
                      </button>
                    ))}
                    {testimonial.gallery.length > 3 && (
                      <div className="w-24 h-16 rounded-lg bg-[#1A1A1A] flex items-center justify-center text-zinc-400 text-sm">
                        +{testimonial.gallery.length - 3}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {!isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button
              onClick={() => setIsExpanded(true)}
              className="px-8 py-3 text-sm font-medium text-white bg-[#0A0A0A] border border-zinc-800 rounded-full hover:border-[#FF2EBC] transition-all duration-300 group"
            >
              <span className="inline-flex items-center gap-2">
                Voir plus de témoignages
                <svg 
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </motion.div>
        )}

        {/* Lightbox Gallery */}
        <Lightbox
          open={lightboxIndex >= 0}
          close={() => setLightboxIndex(-1)}
          index={lightboxIndex}
          slides={currentGallery}
          styles={{
            container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
            button: { color: "#FF2EBC" },
            navigationPrev: { backgroundColor: "rgba(255, 46, 188, 0.1)" },
            navigationNext: { backgroundColor: "rgba(255, 46, 188, 0.1)" }
          }}
        />
      </div>
    </section>
  );
};

export default Testimonials; 
import { motion } from "framer-motion";
import { useState } from "react";
import VideoLightbox from "../components/VideoLightbox";
import VideoThumbnail from "../components/VideoThumbnail";

const Testimonials = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const testimonials = [
    {
      firstName: "Marie",
      date: "Mai 2025",
      eventType: "Anniversaire 35 ans",
      quote: "J’étais sceptique quand on m’a proposé de faire appel à un DJ pour mon anniversaire… je pensais que c’était trop “gros” pour une soirée entre amis. Mais en vrai, ça a tout changé. L’ambiance est montée progressivement, ils ont passé nos sons préférés sans qu’on ait à demander quoi que ce soit, et tout le monde s’est mis à danser sans forcer.",
      gallery: [
        {
          src: "assets/gallery/Soirée/Marie/Anniv.JPG",
          alt: "Show lumière",
          type: "image"
        },
      ]
    },
    {
      firstName: "Thomas",
      date: "Avril 2025",
      eventType: "Soirée d'entreprise",
      quote: "On voulait une ambiance détendue mais qualitative pour notre afterwork client : pari réussi. Installation rapide, musique au top, lumière très soignée. Les collègues m’en parlent encore. On refera appel à eux sans hésiter",

    },
    {
      firstName: "Sandrine",
      date: "Mars 2025",
      eventType: "Soirée d'entreprise",
      quote: "Une ambiance incroyable pour mon seminaire ! Tout était parfait, de la playlist personnalisée aux jeux de lumière.",
      gallery: [
        {
          src: "assets/gallery/Pro/guinot/pro_1.mp4",
          alt: "Show lumière",
          type: "video"
        },
        {
          src: "assets/gallery/Pro/guinot/pro_2.mp4",
          alt: "Show lumière",
          type: "video"
        },
        {
          src: "assets/gallery/Pro/guinot/pro_3.mp4",
          alt: "Show lumière",
          type: "video"
        },
      ]
    },
  ];

  const extraTestimonials = [

  ];

  const displayedTestimonials = isExpanded 
    ? [...testimonials, ...extraTestimonials]
    : testimonials;

  const handleGalleryOpen = (gallery, startIndex = 0) => {
    if (gallery && gallery.length > 0) {
      setSelectedItem(gallery[startIndex]);
    }
  };

  const handleCloseLightbox = () => {
    setSelectedItem(null);
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
                          setSelectedItem(photo);
                        }}
                        className="relative group/thumb w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-[#FF2EBC] focus:ring-offset-2 focus:ring-offset-black"
                      >
                        {photo.type === "video" ? (
                          <VideoThumbnail
                            src={photo.src}
                            thumb={photo.thumb}
                            alt={photo.alt}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover/thumb:scale-110"
                          />
                        ) : (
                          <img 
                            src={photo.thumb || photo.src} 
                            alt={photo.alt}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover/thumb:scale-110"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Icône de lecture pour les vidéos */}
                        {photo.type === "video" && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black/50 rounded-full p-1">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </div>
                          </div>
                        )}
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

        {/* Lightbox personnalisé pour les images */}
        {selectedItem && selectedItem.type === "image" && (
          <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50">
            <div className="relative w-full max-w-4xl mx-4">
              <button
                onClick={handleCloseLightbox}
                className="absolute -top-12 right-0 text-white hover:text-[#FF2EBC] transition-colors duration-200 z-10"
                aria-label="Fermer l'image"
              >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <img
                src={selectedItem.src}
                alt={selectedItem.alt}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
            </div>
          </div>
        )}

        {/* Lightbox personnalisé pour les vidéos */}
        {selectedItem && selectedItem.type === "video" && (
          <VideoLightbox
            src={selectedItem.src}
            alt={selectedItem.alt}
            onClose={handleCloseLightbox}
          />
        )}
      </div>
    </section>
  );
};

export default Testimonials; 
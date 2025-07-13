import { motion } from "framer-motion";
import { useState } from "react";
import VideoLightbox from "../components/VideoLightbox";
import VideoThumbnail from "../components/VideoThumbnail";
import { galleryData, categories } from "../utils/galleryData";

export default function Gallery() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredItems = selectedCategory === "all" 
    ? galleryData 
    : galleryData.filter(item => item.category === selectedCategory);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseLightbox = () => {
    setSelectedItem(null);
  };

  return (
    <section id="gallery" className="min-h-screen py-24 px-4 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Galerie
          </h2>
          <p className="text-xl text-zinc-400">
            Ambiances, lumières, scènes live…
          </p>
        </motion.div>

        {/* Filtres par catégorie */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-[#FF2EBC] text-white"
                  : "bg-[#1A1A1A] text-zinc-400 hover:bg-[#2A2A2A] hover:text-white"
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Grille de la galerie */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.src}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => handleItemClick(item)}
              className="group cursor-pointer relative overflow-hidden rounded-xl bg-[#1A1A1A] hover:bg-[#2A2A2A] transition-all duration-300"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                {item.type === "video" ? (
                  <VideoThumbnail
                    src={item.src}
                    thumb={item.thumb}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <img
                    src={item.thumb}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Overlay avec icône selon le type */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-[#FF2EBC]/20 backdrop-blur-sm rounded-full p-3">
                    {item.type === "video" ? (
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    )}
                  </div>
                </div>
                
                {/* Badge vidéo */}
                {item.type === "video" && (
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 text-xs font-medium bg-red-500 text-white rounded-full flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                      Vidéo
                    </span>
                  </div>
                )}
              </div>
              
              {/* Badge de catégorie */}
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 text-xs font-medium bg-[#FF2EBC] text-white rounded-full">
                  {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Message si aucune image trouvée */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-zinc-500 text-lg">
              Aucune image trouvée pour cette catégorie.
            </p>
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
}
  
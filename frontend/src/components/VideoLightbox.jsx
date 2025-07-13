import React from 'react';

const VideoLightbox = ({ src, alt, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/95 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-label="Lecteur vidéo"
    >
      <div className="relative w-full max-w-5xl mx-4 flex items-center justify-center">
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white hover:text-[#FF2EBC] transition-colors duration-200 z-10 bg-black/60 rounded-full p-2"
          aria-label="Fermer la vidéo"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <video
          src={src}
          controls
          autoPlay
          className="w-full h-full max-h-[90vh] object-contain rounded-lg bg-black"
          aria-label={alt}
        >
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>
      </div>
    </div>
  );
};

export default VideoLightbox; 
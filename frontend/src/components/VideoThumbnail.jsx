import React, { useEffect, useState } from "react";

const VideoThumbnail = ({ src, thumb, alt, className = "" }) => {
  const [generatedThumb, setGeneratedThumb] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Si un thumbnail est fourni, l'utiliser
    if (thumb) {
      setIsLoading(false);
      return;
    }

    // Sinon, générer automatiquement une frame de la vidéo
    const video = document.createElement("video");
    video.src = src;
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.playsInline = true;
    video.preload = "metadata";
    
    // Essayer plusieurs positions pour éviter les frames noires
    const timePositions = [0.1, 0.5, 1, 2];
    let currentPosition = 0;

    const tryGenerateThumb = () => {
      if (currentPosition >= timePositions.length) {
        setIsLoading(false);
        return;
      }

      video.currentTime = timePositions[currentPosition];
      currentPosition++;
    };

    video.addEventListener("loadeddata", tryGenerateThumb);
    video.addEventListener("seeked", () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth || 320;
        canvas.height = video.videoHeight || 240;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Vérifier si l'image n'est pas complètement noire
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        let hasContent = false;
        
        for (let i = 0; i < data.length; i += 4) {
          if (data[i] > 10 || data[i + 1] > 10 || data[i + 2] > 10) {
            hasContent = true;
            break;
          }
        }
        
        if (hasContent) {
          setGeneratedThumb(canvas.toDataURL("image/jpeg", 0.8));
          setIsLoading(false);
        } else {
          tryGenerateThumb();
        }
      } catch (error) {
        console.warn("Erreur lors de la génération du thumbnail:", error);
        tryGenerateThumb();
      }
    });

    video.addEventListener("error", () => {
      console.warn("Erreur lors du chargement de la vidéo pour thumbnail");
      setIsLoading(false);
    });

    // Nettoyage
    return () => {
      video.remove();
    };
  }, [src, thumb]);

  // Si un thumbnail est fourni, l'utiliser
  if (thumb) {
    return <img src={thumb} alt={alt} className={className} />;
  }

  // Si un thumbnail a été généré, l'utiliser
  if (generatedThumb) {
    return <img src={generatedThumb} alt={alt} className={className} />;
  }

  // Placeholder pendant le chargement ou en cas d'erreur
  return (
    <div className={`flex items-center justify-center bg-black/40 text-white ${className}`} style={{aspectRatio: '4/3'}}>
      {isLoading ? (
        <svg className="w-8 h-8 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="10" strokeWidth="4" />
        </svg>
      ) : (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z"/>
        </svg>
      )}
    </div>
  );
};

export default VideoThumbnail; 
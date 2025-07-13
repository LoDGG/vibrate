// 🖼️ Générateur automatique de données de galerie
// Utilise import.meta.glob pour scanner récursivement public/assets/gallery/

// Types de fichiers supportés
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov', '.avi'];

// Fonction pour détecter le type de fichier
function getFileType(filename) {
  const ext = filename.toLowerCase().split('.').pop();
  if (IMAGE_EXTENSIONS.includes(`.${ext}`)) return 'image';
  if (VIDEO_EXTENSIONS.includes(`.${ext}`)) return 'video';
  return null;
}

// Fonction pour extraire le tag (nom du dossier de profondeur 0)
function extractTag(filepath) {
  const pathParts = filepath.split('/');
  // Le tag est le premier dossier après 'gallery'
  const galleryIndex = pathParts.findIndex(part => part === 'gallery');
  if (galleryIndex !== -1 && galleryIndex + 1 < pathParts.length) {
    return pathParts[galleryIndex + 1];
  }
  return 'autre';
}

// Fonction pour générer le chemin du thumbnail
function generateThumbPath(filepath, type) {
  // Pour les images, utiliser le fichier lui-même comme thumbnail
  if (type === 'image') {
    return filepath;
  }
  
  // Pour les vidéos, on utilisera le composant VideoThumbnail
  // qui génère automatiquement une frame de la vidéo
  return null; // Pas de thumbnail prédéfini pour les vidéos
}

// Fonction pour générer l'alt text
function generateAltText(filepath, tag) {
  const filename = filepath.split('/').pop().split('.')[0];
  const cleanName = filename.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return `${tag} - ${cleanName}`;
}

// Scanner récursivement le dossier gallery
const galleryFiles = import.meta.glob('/public/assets/gallery/**/*', { 
  eager: true,
  as: 'url'
});

// Générer les données de galerie
export function generateGalleryData() {
  const galleryItems = [];
  
  for (const [filepath, url] of Object.entries(galleryFiles)) {
    const type = getFileType(filepath);
    if (!type) continue; // Ignorer les fichiers non supportés
    
    const tag = extractTag(filepath);
    const thumbPath = generateThumbPath(filepath, type);
    const alt = generateAltText(filepath, tag);
    
    // Convertir le chemin pour l'utilisation dans le frontend
    const src = url.replace('/public', '');
    const thumb = thumbPath ? thumbPath.replace('/public', '') : null;
    
    galleryItems.push({
      src,
      thumb,
      alt,
      category: tag, // Utiliser le tag comme catégorie
      type
    });
  }
  
  // Trier par tag puis par nom de fichier
  galleryItems.sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    return a.src.localeCompare(b.src);
  });
  
  return galleryItems;
}

// Fonction pour obtenir les catégories uniques (tags)
export function getCategories(galleryData) {
  const categories = [...new Set(galleryData.map(item => item.category))];
  return [
    { id: 'all', name: 'Tout' },
    ...categories.map(cat => ({
      id: cat,
      name: cat // Garder le nom original du dossier
    }))
  ];
}

// Données de galerie générées automatiquement
export const galleryData = generateGalleryData();
export const categories = getCategories(galleryData); 
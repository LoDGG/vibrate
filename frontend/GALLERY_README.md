# 🖼️ Système de Galerie Automatique

Ce système génère automatiquement les données de galerie à partir des fichiers stockés dans `public/assets/gallery/` en utilisant les noms des dossiers de profondeur 0 comme tags.

## 📁 Architecture des dossiers

```
public/assets/gallery/
├── Mariage/              # Tag "Mariage"
│   ├── lucas/           # Sous-dossier
│   │   ├── mariage-lucas-1.webp
│   │   ├── mariage-lucas-2.jpg
│   │   └── mariage-lucas-3.jpg
│   └── mariage-lucas-4.jpg
├── Pro/                  # Tag "Pro"
│   ├── Michel/
│   │   └── corpo_michel.jpg
│   └── Thomas/
│       └── corporate-thomas-1.jpg
├── Soirée/               # Tag "Soirée"
│   └── pro_3.mp4
└── Autre/                # Tag "Autre"
    └── (fichiers divers)
```

## 🏷️ Système de tags

### Règles de catégorisation
- **Les noms des dossiers de profondeur 0** deviennent automatiquement les tags
- **Tous les fichiers** dans un dossier et ses sous-dossiers héritent du tag du dossier parent
- **Nouveaux tags** : Il suffit de créer un nouveau dossier de profondeur 0

### Exemples
- `gallery/Mariage/lucas/photo.jpg` → Tag: "Mariage"
- `gallery/Pro/Thomas/video.mp4` → Tag: "Pro"
- `gallery/Soirée/pro_3.mp4` → Tag: "Soirée"

## 🎯 Conventions de nommage

### Images
- **Fichier principal** : `nom-description.jpg`
- **Thumbnail** : Utilise l'image elle-même (pas de fichier séparé)

### Vidéos
- **Fichier principal** : `nom-description.mp4`
- **Thumbnail** : Génération automatique d'une frame de la vidéo

### Organisation
- **Dossiers de profondeur 0** : Tags (Mariage, Pro, Soirée, etc.)
- **Sous-dossiers** : Organisation libre (clients, événements, etc.)
- **Fichiers** : Nommage libre dans les sous-dossiers

## 🚀 Utilisation

### 1. Ajouter des fichiers
Placez vos images/vidéos dans la structure appropriée :
```bash
# Créer un nouveau tag
mkdir public/assets/gallery/Anniversaire

# Ajouter des fichiers dans un tag existant
cp mon-image.jpg public/assets/gallery/Mariage/nouveau-client/

# Ajouter une vidéo
cp ma-video.mp4 public/assets/gallery/Soirée/
```

### 2. Scanner la galerie
```bash
npm run gallery:scan
```

### 3. Redémarrer le serveur de développement
```bash
npm run dev
```

## 🔧 Fonctionnalités

### ✅ Supporté
- **Images** : JPG, JPEG, PNG, WebP, GIF, SVG
- **Vidéos** : MP4, WebM, MOV, AVI
- **Tags dynamiques** basés sur les noms de dossiers
- **Thumbnails automatiques** pour les vidéos
- **Scan récursif** de tous les sous-dossiers
- **Filtres dynamiques** par tag

### 🎨 Interface
- **Grille responsive** (1-4 colonnes)
- **Filtres par tag** (générés automatiquement)
- **Lightbox** pour images et vidéos
- **Icônes différenciées** (loupe/vidéo)
- **Badges de tag**

## 📊 Format des données générées

```javascript
{
  src: "assets/gallery/Mariage/lucas/mariage-lucas-1.webp",
  thumb: "assets/gallery/Mariage/lucas/mariage-lucas-1.webp", // Même fichier pour les images
  alt: "Mariage - Mariage Lucas 1",
  category: "Mariage", // Tag basé sur le dossier
  type: "image"
}
```

## 🛠️ Développement

### Fichiers principaux
- `src/utils/galleryData.js` - Générateur de données
- `src/sections/Gallery.jsx` - Composant galerie
- `src/components/VideoThumbnail.jsx` - Thumbnails vidéo
- `src/components/VideoLightbox.jsx` - Lecteur vidéo
- `scripts/generate-thumbnails.js` - Script de scan

### Personnalisation
Pour ajouter de nouveaux tags, il suffit de créer un nouveau dossier de profondeur 0 dans `public/assets/gallery/`.

## 🎯 Bonnes pratiques

1. **Organisation claire** : Utilisez des sous-dossiers pour organiser les fichiers
2. **Noms de dossiers** : Utilisez des noms descriptifs pour les tags
3. **Optimisation** : Compresser les images avant upload
4. **Cohérence** : Gardez une structure logique dans les sous-dossiers

## 🔍 Dépannage

### Problème : Fichier non détecté
- Vérifiez l'extension (supportée)
- Vérifiez le chemin (dans `public/assets/gallery/`)
- Redémarrez le serveur de développement

### Problème : Tag incorrect
- Vérifiez que le fichier est dans le bon dossier de profondeur 0
- Le tag correspond au nom du dossier parent

### Problème : Thumbnail vidéo
- Les thumbnails sont générés automatiquement
- Si problème, vérifiez que la vidéo est accessible

## 📈 Avantages de cette architecture

1. **Flexibilité** : Ajout facile de nouveaux tags
2. **Simplicité** : Pas de fichiers thumbnail séparés
3. **Organisation** : Structure claire et logique
4. **Automatisation** : Génération complètement automatique
5. **Maintenabilité** : Code simple et extensible 
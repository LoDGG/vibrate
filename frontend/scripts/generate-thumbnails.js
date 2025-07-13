#!/usr/bin/env node

/**
 * Script de génération automatique des thumbnails
 * Usage: node scripts/generate-thumbnails.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GALLERY_PATH = path.join(__dirname, '../public/assets/gallery');

// Extensions supportées
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov', '.avi'];
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

// Fonction pour scanner récursivement un dossier
function scanDirectory(dir) {
  const files = [];
  
  function scan(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scan(fullPath);
      } else if (stat.isFile()) {
        const ext = path.extname(item).toLowerCase();
        if (VIDEO_EXTENSIONS.includes(ext) || IMAGE_EXTENSIONS.includes(ext)) {
          files.push({
            path: fullPath,
            name: item,
            ext: ext,
            isVideo: VIDEO_EXTENSIONS.includes(ext)
          });
        }
      }
    }
  }
  
  scan(dir);
  return files;
}

// Fonction pour extraire le tag (nom du dossier de profondeur 0)
function extractTag(filePath) {
  const relativePath = path.relative(GALLERY_PATH, filePath);
  const pathParts = relativePath.split(path.sep);
  return pathParts[0] || 'autre';
}

// Fonction pour générer un rapport
function generateReport() {
  console.log('🔍 Scan de la galerie...\n');
  
  if (!fs.existsSync(GALLERY_PATH)) {
    console.log('❌ Dossier gallery non trouvé:', GALLERY_PATH);
    return;
  }
  
  const files = scanDirectory(GALLERY_PATH);
  const videos = files.filter(f => f.isVideo);
  const images = files.filter(f => !f.isVideo);
  
  console.log(`📊 Statistiques:`);
  console.log(`   - Total: ${files.length} fichiers`);
  console.log(`   - Vidéos: ${videos.length}`);
  console.log(`   - Images: ${images.length}\n`);
  
  // Analyser les tags (dossiers de profondeur 0)
  const tags = new Set();
  const filesByTag = {};
  
  files.forEach(file => {
    const tag = extractTag(file.path);
    tags.add(tag);
    
    if (!filesByTag[tag]) {
      filesByTag[tag] = { images: [], videos: [] };
    }
    
    if (file.isVideo) {
      filesByTag[tag].videos.push(file);
    } else {
      filesByTag[tag].images.push(file);
    }
  });
  
  console.log('🏷️  Tags détectés (dossiers de profondeur 0):');
  Array.from(tags).sort().forEach(tag => {
    const tagData = filesByTag[tag];
    const total = tagData.images.length + tagData.videos.length;
    console.log(`   - ${tag}: ${total} fichiers (${tagData.images.length} images, ${tagData.videos.length} vidéos)`);
  });
  
  // Afficher la structure des dossiers
  console.log('\n📁 Structure des dossiers:');
  function printDirectoryStructure(dir, level = 0) {
    const items = fs.readdirSync(dir);
    const indent = '  '.repeat(level);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        console.log(`${indent}📁 ${item}/`);
        printDirectoryStructure(fullPath, level + 1);
      } else {
        const ext = path.extname(item).toLowerCase();
        if (VIDEO_EXTENSIONS.includes(ext) || IMAGE_EXTENSIONS.includes(ext)) {
          const icon = VIDEO_EXTENSIONS.includes(ext) ? '🎬' : '🖼️';
          console.log(`${indent}${icon} ${item}`);
        }
      }
    }
  }
  
  printDirectoryStructure(GALLERY_PATH);
  
  // Informations sur les thumbnails
  console.log('\n💡 Informations sur les thumbnails:');
  console.log('   - Images: Utilisent l\'image elle-même comme thumbnail');
  console.log('   - Vidéos: Génération automatique d\'une frame de la vidéo');
  console.log('   - Aucun fichier thumbnail séparé nécessaire');
  
  if (videos.length > 0) {
    console.log('\n🎬 Vidéos trouvées:');
    videos.forEach(video => {
      const tag = extractTag(video.path);
      console.log(`   - ${video.name} (Tag: ${tag})`);
    });
  }
}

// Exécuter le rapport
generateReport(); 
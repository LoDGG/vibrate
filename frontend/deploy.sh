#!/bin/bash

echo "🚀 Déploiement de Vibrate en cours..."

# Se placer dans le dossier du projet
cd ~/vibrate_website/vibrate || { echo "❌ Dossier projet introuvable"; exit 1; }

echo "📥 Pull depuis Git..."
git pull || { echo "❌ Échec du git pull"; exit 1; }

# === FRONTEND ===
echo "🎨 Mise à jour du frontend..."
cd frontend || { echo "❌ Dossier frontend introuvable"; exit 1; }

if [ -f package.json ]; then
    echo "📦 Installation des dépendances frontend..."
    npm install
fi

echo "🔨 Build du frontend..."
npm run build || { echo "❌ Build frontend échoué"; exit 1; }

echo "♻️ Redémarrage du serveur frontend avec PM2..."
pm2 restart vibrate-frontend

# === BACKEND ===
echo "🧠 Mise à jour du backend..."
cd ../backend || { echo "❌ Dossier backend introuvable"; exit 1; }

if [ -f package.json ]; then
    echo "📦 Installation des dépendances backend..."
    npm install
fi

echo "♻️ Redémarrage du serveur backend avec PM2..."
pm2 restart vibrate-backend

echo "✅ Déploiement terminé avec succès !"

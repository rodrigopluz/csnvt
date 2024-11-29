#!/bin/bash

set -e  # Para o script em caso de erro

echo "🚀 Atualizando código do repositório..."
git pull origin main || { echo "❌ Falha no git pull"; exit 1; }

if [ -e .env.production ]; then
  if [ ! -e .env ]; then
    echo "🔧 Renomeando .env.production para .env..."
    mv .env.production .env || { echo "❌ Falha ao renomear .env.production"; exit 1; }
  else
    echo "⚠️ Arquivo .env já existe. Renomeie manualmente, se necessário."
  fi
else
  echo "⚠️ Arquivo .env.production não encontrado. Certifique-se de configurá-lo."
fi

echo "📦 Instalando dependências do Node.js..."
yarn install || { echo "❌ Falha ao instalar dependências"; exit 1; }

echo "🛠️ Compilando projeto Node.js..."
yarn run build || { echo "❌ Falha na compilação"; exit 1; }

echo "🔧 Ajustando permissões do diretório dist..."
chmod -R 755 dist || { echo "❌ Falha ao ajustar permissões"; exit 1; }

echo "🚀 Instalando PM2 globalmente..."
sudo yarn global add pm2 || { echo "❌ Falha ao instalar PM2"; exit 1; }

echo "♻️ Reiniciando o servidor com PM2..."
pm2 restart dist/index.js --name my-app || { echo "❌ Falha ao reiniciar com PM2"; exit 1; }

echo "✅ Deploy do backend concluído com sucesso!"

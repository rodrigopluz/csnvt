#!/bin/bash

set -e  # Para o script em caso de erro

# Diretório de saída do build
BUILD_DIR="packages/server/dist"

echo "🚀 Atualizando código..."
git pull origin main || { echo "❌ Falha ao atualizar código"; exit 1; }

echo "📦 Instalando dependências..."
yarn install || { echo "❌ Falha ao instalar dependências"; exit 1; }

echo "🛠️ Construindo o back-end..."
yarn workspace @csnvt/server build || { echo "❌ Falha no build do back-end"; exit 1; }

echo "🔍 Verificando se o diretório de build existe..."
if [ ! -d "$BUILD_DIR" ]; then
  echo "❌ Diretório '$BUILD_DIR' não encontrado. Verifique o processo de build."
  exit 1
fi

echo "📤 Enviando arquivos para o servidor..."
scp -r $BUILD_DIR/* user@your-kinghost-server:/public_html/www/app_nodejs || { echo "❌ Falha ao copiar arquivos para o servidor"; exit 1; }

echo "✅ Deploy do back-end concluído!"

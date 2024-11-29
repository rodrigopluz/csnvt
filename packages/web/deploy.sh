#!/bin/bash

set -e  # Para o script em caso de erro

# Diretório de saída do build
BUILD_DIR="packages/web/dist"

echo "🚀 Atualizando código do repositório..."
git pull origin main || { echo "❌ Falha no git pull"; exit 1; }

echo "📦 Instalando dependências do React..."
yarn install || { echo "❌ Falha ao instalar dependências"; exit 1; }

echo "🛠️ Construindo o front-end..."
yarn workspace @csnvt/web build || { echo "❌ Falha no build do front-end"; exit 1; }

echo "🔍 Verificando se o diretório de build existe..."
if [ ! -d "$BUILD_DIR" ]; then
  echo "❌ Diretório '$BUILD_DIR' não encontrado. Verifique o processo de build."
  exit 1
fi

echo "📤 Enviando arquivos para o servidor..."
scp -r $BUILD_DIR/* user@your-kinghost-server:/public_html/www/app_nodejs || { echo "❌ Falha ao copiar arquivos para o servidor"; exit 1; }

echo "✅ Deploy do front-end concluído!"

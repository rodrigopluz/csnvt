#!/bin/bash

set -e  # Para o script em caso de erro

echo "🚀 Atualizando código do repositório..."
git pull origin main || { echo "❌ Falha no git pull"; exit 1; }

echo "📦 Instalando dependências do React..."
yarn install || { echo "❌ Falha ao instalar dependências"; exit 1; }

echo "🛠️ Compilando projeto React..."
yarn run build || { echo "❌ Falha na compilação"; exit 1; }

if [ -d dist ]; then
  echo "📤 Transferindo arquivos para o servidor..."
  scp -r dist/* user@your-kinghost-server:/public_html/www/app_nodejs || { echo "❌ Falha no SCP"; exit 1; }
else
  echo "❌ Diretório 'dist' não encontrado"
  exit 1
fi

echo "✅ Deploy do frontend concluído com sucesso!"

#!/bin/bash

# Atualiza o código do repositório
git pull origin main

# Verifica se o arquivo .env existe
if [ -e .env.production ]; then
  # Renomeia o arquivo .env.production para .env
  mv .env.production .env
  echo "Arquivo .env.production renomeado para .env"
else
  echo "Arquivo .env.production não encontrado"
fi

# Instala as dependências do Node.js
yarn install

# Compilação do TypeScript
yarn run build

# Instalação do PM2
sudo yarn global add pm2

# Reinicia o servidor Node.js usando PM2
pm2 restart ./dist/index.js

#!/bin/bash

# Atualiza o código do repositório
git pull origin main

# Instala as dependências do React.js
yarn install

# Compilação do TypeScript
yarn run build

# Copia os arquivos de build para o servidor
scp -r dist/* user@your-kinghost-server:/public_html/www/app_nodejs

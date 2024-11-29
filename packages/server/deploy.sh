#!/bin/bash

# Atualiza o código do repositório
git pull origin main

# Verifica se o arquivo .env.production existe
if [ -e .env.production ]; then
  mv .env.production .env
  echo "Arquivo .env.production renomeado para .env"
else
  echo "Arquivo .env.production não encontrado"
fi

# Instala as dependências
yarn install

# Compilação do TypeScript
yarn run build

# Login na Vercel (você precisa garantir que o token Vercel esteja configurado como variável de ambiente)
echo "Fazendo login na Vercel..."
vercel login

# Deploy na Vercel
echo "Fazendo deploy na Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
  echo "Deploy do Back-End na Vercel concluído com sucesso!"
else
  echo "Erro durante o deploy do Back-End na Vercel!"
  exit 1
fi

echo "✅ Deploy do back-end concluído!"

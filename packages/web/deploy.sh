#!/bin/bash

# Verifica se o diretório dist existe
if [ ! -d "dist" ]; then
  echo "O diretório 'dist' não foi encontrado! Certifique-se de ter executado 'yarn build' corretamente."
  exit 1
fi

# Login na Vercel (você precisa garantir que o token Vercel esteja configurado como variável de ambiente)
echo "Fazendo login na Vercel..."
vercel login

# Deploy na Vercel
echo "Fazendo deploy na Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
  echo "Deploy do Front-End na Vercel concluído com sucesso!"
else
  echo "Erro durante o deploy do Front-End na Vercel!"
  exit 1
fi

echo "✅ Deploy do front-end concluído!"

#!/bin/bash

# Verificando diretório dist
echo "Verificando diretório dist..."
ls -la packages/web/dist

# Verifica se o diretório dist existe
if [ ! -d "packages/web/dist" ]; then
  echo "Erro: Diretório dist não encontrado!"
  exit 1
fi

echo "Diretório dist encontrado, iniciando o deploy."

# Login na Vercel (usando o token configurado como variável de ambiente)
echo "Fazendo login na Vercel..."
vercel login --token $VERCEL_TOKEN_CSNVT

# Deploy na Vercel com confirmação automática (--yes)
echo "Fazendo deploy na Vercel..."
vercel --prod --token $VERCEL_TOKEN_CSNVT --yes

# Verificando o status do deploy
if [ $? -eq 0 ]; then
  echo "Deploy do Front-End na Vercel concluído com sucesso!"
else
  echo "Erro durante o deploy do Front-End na Vercel!"
  exit 1
fi

echo "✅ Deploy do front-end concluído!"

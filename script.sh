#!/bin/bash

# Define a pasta do repositório
REPO_FOLDER=/home/api/htdocs/api.uniproducoes.com.br

cd $REPO_FOLDER

git fetch origin main

if git rev-parse HEAD..origin/main >/dev/null 2>&1; then
  echo "Nova atualização na main. Executando comando..."
  
  yarn install
  yarn run migration
  pm2 restart 0
  
  echo "Comando executado com sucesso."
else
  echo "Não há novas atualizações na main."
fi

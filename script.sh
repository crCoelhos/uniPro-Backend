#!/bin/bash

# Define a pasta do repositório
REPO_FOLDER=/home/api/htdocs/api.uniproducoes.com.br
current_date=$(date +"-%d-%m-%Y %H:%M:%S")

cd $REPO_FOLDER

git fetch origin main

if git rev-parse HEAD..origin/main >/dev/null 2>&1; then
  echo "Nova atualização na main. Executando comando..."
  
  yarn install
  yarn run migration
  pm2 restart back
  
  echo "Executado em: $current_date" >> /home/api/script_log.txt
else
  echo "$current_date Não há novas atualizações na main" >> /home/api/script_log.txt
fi

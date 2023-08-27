#!/bin/bash

# Define a pasta do repositório
REPO_FOLDER=/home/api/htdocs/api.uniproducoes.com.br

cd $REPO_FOLDER

git pull origin main

if git rev-parse HEAD..origin/main >/dev/null 2>&1; then
  echo "Nova atualização na main. Executando comando..."
  
  yarn install
  yarn run migration
  pm2 restart back
  
  current_date=$(date +"-%d-%m-%Y %H:%M:%S")
  echo "Executado em: $current_date" >> /home/front/script_log.txt
else
  current_date=$(date +"-%d-%m-%Y %H:%M:%S")
  echo "$current_date Não há novas atualizações na main" >> /home/front/script_log.txt
fi
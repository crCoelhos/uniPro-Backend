#!/bin/bash

# Define a pasta do repositório
REPO_FOLDER=/home/api/htdocs/api.uniproducoes.com.br

cd $REPO_FOLDER

git_pull_output=$(git pull origin main)

if [[ "$git_pull_output" != *"Already up to date."* ]]; then
  echo "Nova atualização na main. Executando comando..."
  
  yarn install
  yarn run migration
  pm2 restart back
  
  current_date=$(date +"-%d-%m-%Y %H:%M:%S")
  echo "Executado em: $current_date" >> /home/front/script_log.txt
else
  current_date=$(date +"-%d-%m-%Y %H:%M:%S")
  echo "$current_date Não há novas atualizações na main" >> /home/api/script_log.txt
fi
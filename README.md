# Back End JogosUni

[Back end jogosuni!](api.uniproducoes.com.br)

## Conteudo

- [Getting Started](#getting-started)
- [Features](#features)
- [Installation](#installation)
- [TODO List](todo.md)

## Getting Started

[Back end jogosuni!](api.uniproducoes.com.br) densevolvido pela [NXT-Gen](nxtgeneration.com.br)  para o website do JogosUni usado para vendas de ingressos. Utilizamos MySQL como banco de dados, Node.js com javascript para o Back End.


## Features

- CRUD para eventos e ingressos

## Installation

Antes de iniciar o projeto, é necessário configurar as variáveis de ambiente. Para isso, copie o ``.env.example`` para ``.env`` e preencha as variáveis de acordo com o ambiente.

```bash
cp .env.example .env # Linux/Macos
copy .env.example .env # Windows
```

Rode as migrations para criar as tabelas do banco de dados

```bash
npx sequelize-cli db:migrate
```

Caso esteja em Development, rode as seeders para ter dados para testes

```bash
npx sequelize-cli db:seed:all
```

inicie o servidor com

```bash
node .
```
# ST IT Cloud - Development Test LV. 3

## Dependências
* docker
* docker-compose

## Runtime:
* Node.js 16.x
* npm 8.3.x

## Bibliotecas Utilizadas
* koa (koa/koa-joi-router/koa-jwt)
* stream-json

## Executando o projeto

### Docker
```sh
docker-compose --env-file=dev.env -f docker-compose.yml -f docker-compose.dev.yml up --build --force-recreate
```

### Local
Instalar as depencencias
```sh
npm install
```
Exportar as variáveis do arquivo `dev.env`:
```sh
set -a
. ./dev.env
set +a
```

Iniciar o servidor:

```sh
npm run dev
```

O arquivo `dev.env` possuí as seguintes variáveis esperadas pelo servidor:
* PORT - porta que o server irá escutar e o docker irá exportar
* JWT_SECRET - chave para assinar o token JWT
* JWT_EXPIRES_IN - tempo de expiração do token JWT

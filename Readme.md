# TechnoFit Manager

## Início
Necessário ter o **NodeJS** e o **Yarn** instalados na máquina, caso não tenha, [você precisará aqui para baixar o NodeJS](https://nodejs.org/en/) e [aqui para o Yarn](https://yarnpkg.com/lang/en/).
Um servidor **MySql** também é obrigatório estar rodando na porta 5000. O Dump do banco se encontra na pasta `Database`.
O Front-End foi desenvolvido em React e o Back-End em Node.

## Front-End

Estando na pasta `/FrontEnd/` siga os passos a seguir:

Depois de fazer o git clone, rode o comando

```
yarn
```

Rodar o template em dev:
```
npm run start
```
Um servidor irá começar a rodar na porta 3000 (padrão).

Gerar build de produção (conteúdo será gerado na pasta /build):
```
npm run build
```

Testes Unitários:
```
npm run test
```

Ou para ver uma versão mais detalhada

```
npm run test:watch
```
## Observações
Mais atualizações conforme o minimal template for evoluindo.
Todos os comandos podem ser substituidos de `npm run` por `yarn`, ex: ```yarn start``` 
Para dúvidas, informações, dicas e sugestões: juansaintclair@gmail.com

## Back-End

Estando na pasta `/BackEnd/` siga os passos a seguir:

Rodar o comando a seguir para iniciar o servidor na porta `5000`

```
node api.js
```

----

## Considerações

Tanto `Front-End` quanto `Back-End` e Banco `MySql` precisando estar rodando ao mesmo tempo para que o sistema funciona localmente.

 


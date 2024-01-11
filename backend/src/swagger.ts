import swaggerAutogen from 'swagger-autogen';
import dotenv from 'dotenv';

dotenv.config();

const doc = {
    info: {
        title: "Api da loja virtual",
        description: "Documentação da API da Loja Virtual no Web Academy"
    },
    host: `${process.env.HOST}:${process.env.PORT}`,
    // exemplo de um dado de entidade
    definitions: {
        ReturnReadAllEventos: [{
                    "id": "19a233e8-fc69-4f14-b21f-9a27003c31bd",
                    "nome": "arraoz",
                    "preco": 2,
                    "estoque": 1,
                    "createdAt": "2023-11-01T00:31:02.184Z",
                    "updatedAt": "2023-11-01T00:31:02.184Z"
                },
                {
                    "id": "72091312-1ba3-4b60-9f0c-4f7ce128ebd2",
                    "nome": "Mouse",
                    "preco": 379,
                    "estoque": 5,
                    "createdAt": "2023-11-07T22:01:08.554Z",
                    "updatedAt": "2023-11-11T14:00:35.424Z"
                },
                {
                    "id": "ad6d2f8c-b32b-42d2-832a-6bef04fd4158",
                    "nome": "arroz",
                    "preco": 2,
                    "estoque": 1,
                    "createdAt": "2023-11-01T00:30:15.445Z",
                    "updatedAt": "2023-11-01T00:30:15.445Z"
                },
                {
                    "id": "b066e5b6-6bf5-4718-8f42-9290102734bd",
                    "nome": "arraozss",
                    "preco": 2,
                    "estoque": 1,
                    "createdAt": "2023-11-01T00:33:27.057Z",
                    "updatedAt": "2023-11-01T00:33:27.057Z"
                },
                {
                    "id": "ba28ccab-59dc-4872-8fd0-419cc765f3ce",
                    "nome": "Salad",
                    "preco": 439,
                    "estoque": 3,
                    "createdAt": "2023-11-07T22:06:20.656Z",
                    "updatedAt": "2023-11-07T22:06:20.656Z"
                },
                {
                    "id": "f733fc26-2f0c-4df2-8728-45761518fb61",
                    "nome": "feijão",
                    "preco": 2.56,
                    "estoque": 1,
                    "createdAt": "2023-11-07T21:47:49.170Z",
                    "updatedAt": "2023-11-07T21:47:49.170Z"
                }]
    }
};

const outputFile = `${__dirname}/swagger-doc.json`;
const routers = [`${__dirname}/router/index.ts`]

swaggerAutogen()(outputFile,routers,doc);
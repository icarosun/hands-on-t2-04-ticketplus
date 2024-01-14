import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";

dotenv.config();

const doc = {
  info: {
    title: "Api do TicketPlus",
    description: "Documentação da API - TicketPlus",
  },
  host: `${process.env.HOST}:${process.env.PORT}`,
  definitions: {
    ModeloCompraSwagger: {
      eventoId: "19454928-0f2b-44e6-ba87-8e65a1fff615",
      qtde_ingressos: 3,
      valor_total: 32.5,
      status: "Pago",
      forma_pagamento: "Cartão de Crédito",
    },
    ReturnReadAllEventos: [
      {
        id: "19454928-0f2b-44e6-ba87-8e65a1fff615",
        titulo: "Chiado da Chinela",
        localizacao: "Av. Torquato Tapajós, nº 207",
        faixaEtaria: 18,
        categoria: "Show de Forró",
        createdAt: "2024-01-13T15:04:31.647Z",
        updatedAt: "2024-01-13T15:04:31.647Z",
      },
      {
        id: "19454928-0f2b-44e6-ba87-8e65a1fff616",
        titulo: "Suá sem dó",
        localizacao: "Av. do Turismo, nº 1033",
        faixaEtaria: 23,
        categoria: "Show de Forró Pisapé",
        createdAt: "2024-01-13T15:04:31.647Z",
        updatedAt: "2024-01-13T15:04:31.647Z",
      },
      {
        id: "19454928-0f2b-44e6-ba87-8e65a1fff617",
        titulo: "Galinha Pintadinha - ao vivo",
        localizacao: "Rua Empaminondas, nº 2",
        faixaEtaria: 5,
        categoria: "Festa Infantil",
        createdAt: "2024-01-13T15:04:31.647Z",
        updatedAt: "2024-01-13T15:04:31.647Z",
      },
      {
        id: "19454928-0f2b-44e6-ba87-8e65a1fff618",
        titulo: "Javascript Mental",
        localizacao: "Rua Timbiras, nº 555",
        faixaEtaria: 30,
        categoria: "Workshop",
        createdAt: "2024-01-13T15:04:31.647Z",
        updatedAt: "2024-01-13T15:04:31.647Z",
      },
    ],
  },
};

const outputFile = `${__dirname}/swagger-doc.json`;
const routers = [`${__dirname}/router/index.ts`];

swaggerAutogen()(outputFile, routers, doc);

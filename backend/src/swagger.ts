import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";

dotenv.config();

const doc = {
  info: {
    title: "API do TicketPlus",
    description: "Documentação da API - TicketPlus",
  },
  host: `${process.env.HOST}:${process.env.PORT}`,
  definitions: {
    Compra: {
      eventoId: "19454928-0f2b-44e6-ba87-8e65a1fff615",
      qtde_ingressos: 3,
      forma_pagamento: "Cartão de Crédito",
    },
    Compras: [
      {
        id: "b470d926-bba1-4a8f-af29-0aab82a24643",
        usuarioId: "0b2ea4ac-ba7d-4605-8b4a-d2752f4cab23",
        eventoId: "19454928-0f2b-44e6-ba87-8e65a1fff615",
        qtde_ingressos: 100,
        valor_total: 59.99,
        status: "Pago",
        forma_pagamento: "PIX"
      },
      {
        id: "73fc3562-ef65-4d06-9916-d70d14f9affb",
        usuarioId: "0b2ea4ac-ba7d-4605-8b4a-d2752f4cab23",
        eventoId: "19454928-0f2b-44e6-ba87-8e65a1fff616",
        qtde_ingressos: 50,
        valor_total: 39.89,
        status: "Pago",
        forma_pagamento: "Cartão de Crédito"
      },
      {
        id: "b8684ba0-106d-4d91-94fc-f3a4caae151b",
        usuarioId: "0b2ea4ac-ba7d-4605-8b4a-d2752f4cab23",
        eventoId: "19454928-0f2b-44e6-ba87-8e65a1fff617",
        qtde_ingressos: 5000,
        valor_total: 199.99,
        status: "Pago",
        forma_pagamento: "Boleto"
      }
    ],
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
    Usuarios: [
      {
        "id": "0b2ea4ac-ba7d-4605-8b4a-d2752f4cab23",
        "nome": "Comprador",
        "sobrenome": "Usuario",
        "email": "compradorusuario@usuario.com",
        "senha": "$2a$10$wspOMexHYHDxs9ewX99M5.4RYVDJuPppzpaoj/pnH7Sjedq1Vaja.",
        "tipoUsuario": "daf7a4e1-3345-49a5-809d-55bb4d0633d7",
        "createdAt": "2024-01-13T06:12:38.916Z",
        "updatedAt": "2024-01-13T06:12:38.916Z"
      },
      {
        "id": "18b39e33-8aa5-4a6f-9f2c-c62eef849145",
        "nome": "Organizador",
        "sobrenome": "Usuario",
        "email": "organizadorusuario@usuario.com",
        "senha": "$2a$10$OM56.XNwB1g5hb3wwSt5lOZ4zduxZ8osQUODcFtrosfqL7oTizawO",
        "tipoUsuario": "60124bd9-8654-4717-ba11-deda3df4e0bb",
        "createdAt": "2024-01-13T15:22:34.130Z",
        "updatedAt": "2024-01-13T15:22:34.130Z"
      }
    ],
    CadastraUsuario: {
      "nome": "João",
      "sobrenome": "Silva",
      "email": "joaosilva@usuario.com",
      "senha": "Senhamuitoforte680$",
      "repeteSenha": "Senhamuitoforte680$",
      "tipoUsuario": "comprador"
    },
    Login: {
      "email": "joaosilva@usuario.com",
      "senha": "Senhamuitoforte680$"
    }
  },
};

const outputFile = `${__dirname}/swagger-doc.json`;
const routers = [`${__dirname}/router/index.ts`];

swaggerAutogen()(outputFile, routers, doc);

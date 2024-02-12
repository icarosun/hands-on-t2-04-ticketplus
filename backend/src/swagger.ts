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
        forma_pagamento: "PIX",
      },
      {
        id: "73fc3562-ef65-4d06-9916-d70d14f9affb",
        usuarioId: "0b2ea4ac-ba7d-4605-8b4a-d2752f4cab23",
        eventoId: "19454928-0f2b-44e6-ba87-8e65a1fff616",
        qtde_ingressos: 50,
        valor_total: 39.89,
        status: "Pago",
        forma_pagamento: "Cartão de Crédito",
      },
      {
        id: "b8684ba0-106d-4d91-94fc-f3a4caae151b",
        usuarioId: "0b2ea4ac-ba7d-4605-8b4a-d2752f4cab23",
        eventoId: "19454928-0f2b-44e6-ba87-8e65a1fff617",
        qtde_ingressos: 5000,
        valor_total: 199.99,
        status: "Pago",
        forma_pagamento: "Boleto",
      },
    ],
    ReturnReadAllEventos: [
      {
        id: "19454928-0f2b-44e6-ba87-8e65a1fff615",
        titulo: "Chiado da Chinela",
        localizacao: "Av. Torquato Tapajós, nº 207",
        faixaEtaria: 18,
        preco: 12.99,
        imageUrl: "../../../src/assets/imgs/chiado-da-chinela.jpg",
        organizadorId: "19454928-0f2b-44e6-ba87-8e65a1fff621",
        categoriaEventoId: 1,
        createdAt: "2024-01-13T15:04:31.647Z",
        updatedAt: "2024-01-13T15:04:31.647Z",
      },
      {
        id: "19454928-0f2b-44e6-ba87-8e65a1fff616",
        titulo: "Suá sem dó",
        localizacao: "Av. do Turismo, nº 1033",
        faixaEtaria: 23,
        preco: 15.89,
        imageUrl: "../../../src/assets/imgs/sua-sem-do.jpg",
        organizadorId: "19454928-0f2b-44e6-ba87-8e65a1fff621",
        categoriaEventoId: 1,
        createdAt: "2024-01-13T15:04:31.647Z",
        updatedAt: "2024-01-13T15:04:31.647Z",
      },
      {
        id: "19454928-0f2b-44e6-ba87-8e65a1fff617",
        titulo: "Galinha Pintadinha - ao vivo",
        localizacao: "Rua Empaminondas, nº 2",
        faixaEtaria: 5,
        preco: 21.99,
        imageUrl: "../../../src/assets/imgs/galinha-pintadinha.jpg",
        organizadorId: "19454928-0f2b-44e6-ba87-8e65a1fff621",
        categoriaEventoId: 1,
        createdAt: "2024-01-13T15:04:31.647Z",
        updatedAt: "2024-01-13T15:04:31.647Z",
      },
      {
        id: "19454928-0f2b-44e6-ba87-8e65a1fff618",
        titulo: "Javascript Mental",
        localizacao: "Rua Timbiras, nº 555",
        faixaEtaria: 30,
        preco: 199.99,
        imageUrl: "../../../src/assets/imgs/javascript-mental.jpg",
        organizadorId: "19454928-0f2b-44e6-ba87-8e65a1fff621",
        categoriaEventoId: 1,
        createdAt: "2024-01-13T15:04:31.647Z",
        updatedAt: "2024-01-13T15:04:31.647Z",
      },
    ],
    Compradores: [
      {
        id: "0b2ea5ec-ba7d-4605-8b4a-d2752f4cab90",
        nome: "Comprador",
        email: "compradorusuario@usuario.com",
        senha: "$2a$10$wspOMexHYHDxs9ewX99M5.4RYVDJuPppzpaoj/pnH7Sjedq1Vaja.",
        saldo: 100,
        createdAt: "2024-01-13T06:12:38.916Z",
        updatedAt: "2024-01-13T06:12:38.916Z",
      },
      {
        id: "0b2ea5ec-ba7d-4605-8b4a-d2752f4cab14",
        nome: "Comprador2",
        email: "compradorusuario@usuario.com",
        senha: "$2a$10$wspOMexHYHDxs9ewX99M5.4RYVDJuPppzpaoj/pnH7Sjedq1Vaja.",
        saldo: 0.1,
        createdAt: "2024-01-13T06:12:38.916Z",
        updatedAt: "2024-01-13T06:12:38.916Z",
      },
    ],
    Organizadores: [
      {
        id: "0b2ea4ac-ba7d-4605-8b4a-d2752f4cab23",
        nome: "Organizador",
        email: "organizador@usuario.com",
        senha: "$2a$10$wspOMexHYHDxs9ewX99M5.4RYVDJuPppzpaoj/pnH7Sjedq1Vaja.",
        conta: "001;48783-9",
        cnpj: "01234567891011",
        createdAt: "2024-01-13T06:12:38.916Z",
        updatedAt: "2024-01-13T06:12:38.916Z",
      },
      {
        id: "0b2ea4ac-ba7d-4605-8b4a-d2752f4cab32",
        nome: "Organizador2",
        email: "organizador2@usuario.com",
        senha: "$2a$10$wspOMexHYHDxs9ewX99M5.4RYVDJuPppzpaoj/pnH7Sjedq1Vaja.",
        conta: "002;48783-9",
        cnpj: "40363091000144",
        createdAt: "2024-01-13T06:12:38.916Z",
        updatedAt: "2024-01-13T06:12:38.916Z",
      },
    ],
    CadastraUsuario: {
      nome: "João",
      email: "joaosilva@usuario.com",
      senha: "Senhamuitoforte680$",
      repeteSenha: "Senhamuitoforte680$",
      tipoUsuario: "comprador",
    },
    Login: {
      email: "joaosilva@usuario.com",
      senha: "Senhamuitoforte680$",
    },
  },
};

const outputFile = `${__dirname}/swagger-doc.json`;
const routers = [`${__dirname}/router/index.ts`];

swaggerAutogen()(outputFile, routers, doc);

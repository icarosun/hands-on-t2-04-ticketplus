import { PrismaClient } from "@prisma/client";
//import { TiposUsuarios } from "../src/resources/tipoUsuario/tipoUsuario.constants";
const prisma = new PrismaClient();

async function evento () {
  await prisma.evento.createMany({
    data: [
      {
        id: 1,
        titulo: "Chiado da Chinela",
        descricao:
          "Forró estilo pé de serra. Mulher não paga. Cerveja liberada a partir da 00:00",
        localizacao: "Av. Torquato Tapajós, nº 207",
        faixaEtaria: 18,
        preco: 12.99,
        imageUrl: "../../../src/assets/imgs/chiado-da-chinela.jpg",
        organizadorId: "19454928-0f2b-44e6-ba87-8e65a1fff621",
        categoriaEventoId: 1,
      },
      {
        id: 2,
        titulo: "Suá sem dó",
        descricao:
          "Forró ao céu aberto, com piscina e bar liberado até 1h da manhã.",
        localizacao: "Av. do Turismo, nº 1033",
        faixaEtaria: 23,
        preco: 15.89,
        imageUrl: "../../../src/assets/imgs/sua-sem-do.jpg",
        organizadorId: "19454928-0f2b-44e6-ba87-8e65a1fff621",
        categoriaEventoId: 1,
      },
      {
        id: 3,
        titulo: "Galinha Pintadinha - ao vivo",
        localizacao: "Rua Empaminondas, nº 2",
        faixaEtaria: 5,
        descricao:
          "Ambiente fechado e climatizado, crianças de até 8 anos tem entrada franca.",
        preco: 21.99,
        imageUrl: "../../../src/assets/imgs/galinha-pintadinha.jpg",
        organizadorId: "19454928-0f2b-44e6-ba87-8e65a1fff621",
        categoriaEventoId: 1,
      },
      {
        id: 4,
        titulo: "Javascript Mental",
        localizacao: "Rua Timbiras, nº 555",
        faixaEtaria: 30,
        descricao:
          "Aprenda como otimizar o seu raciocínio quântico para a programação web.",
        preco: 199.99,
        imageUrl: "../../../src/assets/imgs/javascript-mental.jpg",
        organizadorId: "19454928-0f2b-44e6-ba87-8e65a1fff621",
        categoriaEventoId: 1,
      },
      {
        id: 5,
        titulo: "Amazon Games",
        localizacao: "Rua Maceió, nº 7",
        faixaEtaria: 40,
        descricao:
          "Venha conhecer os diversos jogos e mercadorias do mundo gamer.",
        preco: 20.89,
        imageUrl: "../../../src/assets/imgs/amazon-games.jpg",
        organizadorId: "19454928-0f2b-44e6-ba87-8e65a1fff621",
        categoriaEventoId: 1,
      },
    ],
    skipDuplicates: true,
  });
}

async function comprador () {
  await prisma.comprador.createMany({
    data: [
      {
        id: "518ce6e8-b66c-4168-9bee-aa71d3c01647",
        nome: "Luiz",
        email: "joao@usuario.com",
        senha: "$2a$10$AlzsERbpGbrLig3.vPWGN.T.NzFxilZJqBIJ05vA00tJYommOYvRC", //Senha: 12345678
        saldo: 100
      },
    ],
    skipDuplicates: true,
  })
}

async function organizador () {
  await prisma.organizador.createMany({
    data: [
      {
        id: "19454928-0f2b-44e6-ba87-8e65a1fff621",
        nome: "WebAcademy",
        email: "webacademy@email.com",
        senha: "$2a$10$KSQe4QRqp30agHrkr1rueOvRQHi8hobNZmeWyIGQENz678.haa7PO", //Senha: 12345678
        conta: "001;48783-9",
        cnpj: "01234567891011"
      },
    ],
    skipDuplicates: true,
  });
}

async function categoriaEvento () {
  await prisma.categoriaEvento.createMany({
    data: [
      {
        id: 1,
        descricao: "geral"
      }
    ]
  })
}

evento()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
});

comprador()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
});

organizador()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
});

categoriaEvento()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
});

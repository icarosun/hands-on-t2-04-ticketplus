import { PrismaClient } from "@prisma/client";
//import { TiposUsuarios } from "../src/resources/tipoUsuario/tipoUsuario.constants";
const prisma = new PrismaClient();


async function comprador() {
  await prisma.comprador.createMany({
    data: [
      {
        id: "518ce6e8-b66c-4168-9bee-aa71d3c01647",
        nome: "Luiz",
        email: "joao@usuario.com",
        senha: "$2a$10$AlzsERbpGbrLig3.vPWGN.T.NzFxilZJqBIJ05vA00tJYommOYvRC", //Senha: 12345678
        cpf: "76201437002"
      },
    ],
    skipDuplicates: true,
  });
}

async function organizador() {
  await prisma.organizador.createMany({
    data: [
      {
        id: "19454928-0f2b-44e6-ba87-8e65a1fff621",
        nome: "WebAcademy",
        email: "webacademy@email.com",
        senha: "$2a$10$KSQe4QRqp30agHrkr1rueOvRQHi8hobNZmeWyIGQENz678.haa7PO", //Senha: 12345678
        conta: "001;48783-9",
        cnpj: "01234567891011",
      },
    ],
    skipDuplicates: true,
  });
}

async function categoriaEvento() {
  await prisma.categoriaEvento.createMany({
    data: [
      {
        id: 1,
        descricao: "Teatros e Espetáculos",
      },
      {
        id: 2,
        descricao: "Eventos Geeks",
      },
      {
        id: 3,
        descricao: "Congressos e Palestras",
      },
      {
        id: 4,
        descricao: "Infantil",
      },
      {
        id: 5,
        descricao: "Passeios e Tour",
      },
      {
        id: 6,
        descricao: "Cursos e Workshops"
      },
      {
        id: 7,
        descricao: "Gastronomia"
      },
      {
        id: 8,
        descricao: "Outros"
      }
    ],
    skipDuplicates: true,
  });
}

async function tipoTicket() {
  await prisma.tipoTicket.createMany({
    data: [
      {
        id: 1,
        descricao: "inteira",
      },
      {
        id: 2,
        descricao: "meia-entrada",
      },
      {
        id: 3,
        descricao: "VIP",
      }
    ],
    skipDuplicates: true,
  })
}

tipoTicket()
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

comprador()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
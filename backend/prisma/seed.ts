import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function comprador() {
  await prisma.comprador.createMany({
    data: [
      {
        id: "518ce6e8-b66c-4168-9bee-aa71d3c01647",
        nome: "Luiz",
        email: "joao@usuario.com",
        senha: "$2a$10$AlzsERbpGbrLig3.vPWGN.T.NzFxilZJqBIJ05vA00tJYommOYvRC", //Senha: 12345678
        saldo: 100,
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

async function evento() {
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
        vagas: 100,
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
        vagas: 1123,
        organizadorId: "19454928-0f2b-44e6-ba87-8e65a1fff621",
        categoriaEventoId: 1,
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
        descricao: "geral",
      },
    ],
    skipDuplicates: true,
  });
}

async function tiposTickets() {
  await prisma.tipoTicket.createMany({
    data: [
      {
        id: 1,
        descricao: "Inteira",
        eventoId: 1,
      },
      {
        id: 2,
        descricao: "Meia-Entrada",
        eventoId: 1,
      },
      {
        id: 3,
        descricao: "VIP",
        eventoId: 1,
      },
      {
        id: 4,
        descricao: "Inteira",
        eventoId: 2,
      },
      {
        id: 5,
        descricao: "Meia-Entrada",
        eventoId: 2,
      },
    ],
    skipDuplicates: true,
  });
}

async function tiposTicketsEventos() {
  await prisma.tiposTicketsEventos.createMany({
    data: [
      {
        tipoTicketId: 1,
        eventoId: 1,
        quantidade: 500,
        preco: 10,
      },
      {
        tipoTicketId: 2,
        eventoId: 1,
        quantidade: 500,
        preco: 5,
      },
      {
        tipoTicketId: 3,
        eventoId: 1,
        quantidade: 100,
        preco: 50,
      },
      {
        tipoTicketId: 4,
        eventoId: 2,
        quantidade: 50,
        preco: 5,
      },
      {
        tipoTicketId: 5,
        eventoId: 2,
        quantidade: 100,
        preco: 2.5,
      },
      {
        tipoTicketId: 6,
        eventoId: 3,
        quantidade: 100,
        preco: 50,
      },
    ],
    skipDuplicates: true,
  });
}

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

tiposTickets()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

tiposTicketsEventos()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

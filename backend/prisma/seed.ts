import { PrismaClient } from "@prisma/client";
//import { TiposUsuarios } from "../src/resources/tipoUsuario/tipoUsuario.constants";
const prisma = new PrismaClient();

const pagamentosTipos: string[] = [
  "Cartão de Crédito",
  "Débito",
  "PIX",
  "PayPal",
];

function getRandomStringFromArray(arr: string[]): string {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

async function comprador() {
  await prisma.comprador.createMany({
    data: [
      {
        id: "518ce6e8-b66c-4168-9bee-aa71d3c01647",
        nome: "Luiz",
        email: "joao@usuario.com",
        cpf: "81417831065",
        senha: "$2a$10$AlzsERbpGbrLig3.vPWGN.T.NzFxilZJqBIJ05vA00tJYommOYvRC", //Senha: 12345678
      },
      {
        id: "518ce6e8-b66c-4168-9bee-aa71d3c01648",
        nome: "Compradores",
        email: "joaquim@gmail.com",
        cpf: "00732820227",
        senha: "$2a$10$AlzsERbpGbrLig3.vPWGN.T.NzFxilZJqBIJ05vA00tJYommOYvRC", //Senha: 12345678
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
        descricao: "Cursos e Workshops",
      },
      {
        id: 7,
        descricao: "Gastronomia",
      },
      {
        id: 8,
        descricao: "Outros",
      },
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
      },
    ],
    skipDuplicates: true,
  });
}

// enderecos
async function enderecosEventos() {
  await prisma.enderecosEventos.createMany({
    data: [
      // UFAM
      {
        id: 1,
        cep: "69080900",
        numero: 6200,
        cidade: "Manaus",
      },
      // Motorola Brasil
      {
        id: 2,
        cep: "04794000",
        numero: 14401,
        cidade: "São Paulo",
      },
      // Arena da Amazonia
      {
        id: 3,
        cep: "69043100",
        numero: 5001,
        cidade: "Manaus",
      },
      // Bumbodromo de Parintins
      {
        id: 4,
        cep: "69151060",
        numero: 1,
        cidade: "Parintins",
      },
      // Centro de Convenções Vasco Vasques
      {
        id: 5,
        cep: "69058795",
        numero: 5001,
        cidade: "Manaus",
      },
    ],
    skipDuplicates: true,
  });
}

// eventos
async function eventos() {
  await prisma.evento.createMany({
    data: [
      {
        id: 1,
        titulo: "Web Academy",
        descricao:
          "O Web Academy é um projeto realizado pela Universidade Federal do Amazonas (UFAM), em parceria com a Motorola Mobility Comércio de Produtos Eletrônicos Ltda e Flextronics da Amazônia Ltda. O projeto visa a formação de profissionais na área de Desenvolvimento em Web Full Stack, com foco em alunos de graduação, pós-graduação e profissionais do mercado com curso superior.",
        localizacao: "Universidade Feral do Amazonas - Manaus-AM",
        faixaEtaria: 16,
        vagas: 45,
        dataInicio: new Date("2024-03-27 19:00:00.000000"),
        createdAt: new Date("2024-03-01 19:00:00.000000"),
        dataFim: new Date("2024-03-27 21:00:00.000000"),
        organizadorId: "19454928-0f2b-44e6-ba87-8e65a1fff621",
        categoriaEventoId: 6,
        enderecoEventoId: 1,
      },
      {
        id: 2,
        titulo: "Workshop Motorola",
        descricao:
          "Workshop voltado para todos os estudantes da área de TI. Exibição de novas tecnologias e lançamentos.",
        localizacao: "Motorola Solutions Brasil - São Paulo-SP",
        faixaEtaria: 18,
        vagas: 100,
        dataInicio: new Date("2024-03-27 19:00:00.000000"),
        createdAt: new Date("2024-03-27 19:00:00.000000"),
        dataFim: new Date("2024-03-27 21:00:00.000000"),
        organizadorId: "19454928-0f2b-44e6-ba87-8e65a1fff621",
        categoriaEventoId: 6,
        enderecoEventoId: 2,
      },
      {
        id: 5,
        titulo: "Gastro Academy",
        descricao:
          "O Gastor Academy é um projeto realizado em parceria com o renomado chefe de cozinha Alex Atala.",
        localizacao: "Centro de Convenções Vasco Vasques - Manaus-AM",
        faixaEtaria: 16,
        vagas: 50,
        dataInicio: new Date("2024-02-18 19:00:00.000000"),
        createdAt: new Date("2024-02-18 19:00:00.000000"),
        dataFim: new Date("2024-03-30 19:00:00.000000"),
        organizadorId: "19454928-0f2b-44e6-ba87-8e65a1fff621",
        categoriaEventoId: 7,
        enderecoEventoId: 5,
      },
    ],
    skipDuplicates: true,
  });
}

// tipoTicketEventos
async function tipoTicketsEventos() {
  await prisma.tiposTicketsEventos.createMany({
    data: [
      // Web Academy 45 vagas
      {
        tipoTicketId: 1,
        eventoId: 1,
        quantidade: 30,
        preco: 150,
        createdAt: new Date("2024-03-01 19:00:00.000000"),
      },
      {
        tipoTicketId: 2,
        eventoId: 1,
        quantidade: 5,
        preco: 75,
        createdAt: new Date("2024-03-01 19:00:00.000000"),
      },
      {
        tipoTicketId: 3,
        eventoId: 1,
        quantidade: 10,
        preco: 200,
        createdAt: new Date("2024-03-01 19:00:00.000000"),
      },
      // Motorola - 100 vagas
      {
        tipoTicketId: 1,
        eventoId: 2,
        quantidade: 40,
        preco: 25.5,
        createdAt: new Date("2024-03-27 19:00:00.000000"),
      },
      {
        tipoTicketId: 2,
        eventoId: 2,
        quantidade: 40,
        preco: 12.25,
        createdAt: new Date("2024-03-27 19:00:00.000000"),
      },
      {
        tipoTicketId: 3,
        eventoId: 2,
        quantidade: 20,
        preco: 50,
        createdAt: new Date("2024-03-27 19:00:00.000000"),
      },
      // Centro de Convenções Vasco Vasques 50 vagas
      {
        tipoTicketId: 1,
        eventoId: 5,
        quantidade: 25,
        preco: 50,
      },
      {
        tipoTicketId: 2,
        eventoId: 5,
        quantidade: 10,
        preco: 25,
      },
      {
        tipoTicketId: 3,
        eventoId: 5,
        quantidade: 15,
        preco: 100,
      },
    ],
    skipDuplicates: true,
  });
}

// pedidos
async function pedidos() {
  await prisma.pedido.createMany({
    data: [
      // WebAcademy - 30 inteiras (R$150) - 5 meia-entrada (R$75) - 10 vip (R$200)
      {
        id: "518ce6e8-b66c-4168-9bee-aa71d3c01644",
        formaPagamento: getRandomStringFromArray(pagamentosTipos),
        quantidade: 5,
        valor: 750,
        status: "Pago",
        compradorId: "518ce6e8-b66c-4168-9bee-aa71d3c01648",
        createdAt: new Date("2024-03-01 20:00:00.000000"),
        eventoId: 1,
        tipoTicketId: 1,
      },
      {
        id: "518ce6e8-b66c-4168-9bee-aa71d3c01645",
        formaPagamento: getRandomStringFromArray(pagamentosTipos),
        quantidade: 3,
        valor: 600,
        status: "Pago",
        compradorId: "518ce6e8-b66c-4168-9bee-aa71d3c01648",
        createdAt: new Date("2024-03-01 20:00:00.000000"),
        eventoId: 1,
        tipoTicketId: 3,
      },
      {
        id: "518ce6e8-b66c-4168-9bee-aa71d3c01646",
        formaPagamento: getRandomStringFromArray(pagamentosTipos),
        quantidade: 1,
        valor: 150,
        status: "Pago",
        compradorId: "518ce6e8-b66c-4168-9bee-aa71d3c01648",
        createdAt: new Date("2024-03-01 20:00:00.000000"),
        eventoId: 1,
        tipoTicketId: 1,
      },
      {
        id: "518ce6e8-b66c-4168-9bee-aa71d3c01647",
        formaPagamento: getRandomStringFromArray(pagamentosTipos),
        quantidade: 1,
        valor: 150,
        status: "Pago",
        compradorId: "518ce6e8-b66c-4168-9bee-aa71d3c01648",
        createdAt: new Date("2024-03-02 20:00:00.000000"),
        eventoId: 1,
        tipoTicketId: 1,
      },
      {
        id: "518ce6e8-b66c-4168-9bee-aa71d3c01649",
        formaPagamento: getRandomStringFromArray(pagamentosTipos),
        quantidade: 1,
        valor: 200,
        status: "Pago",
        compradorId: "518ce6e8-b66c-4168-9bee-aa71d3c01648",
        createdAt: new Date("2024-03-04 20:00:00.000000"),
        eventoId: 1,
        tipoTicketId: 3,
      },
      {
        id: "518ce6e8-b66c-4168-9bee-aa71d3c01650",
        formaPagamento: getRandomStringFromArray(pagamentosTipos),
        quantidade: 2,
        valor: 300,
        status: "Pago",
        compradorId: "518ce6e8-b66c-4168-9bee-aa71d3c01648",
        createdAt: new Date("2024-03-04 20:00:00.000000"),
        eventoId: 1,
        tipoTicketId: 1,
      },
      {
        id: "518ce6e8-b66c-4168-9bee-aa71d3c01651",
        formaPagamento: getRandomStringFromArray(pagamentosTipos),
        quantidade: 2,
        valor: 400,
        status: "Pago",
        compradorId: "518ce6e8-b66c-4168-9bee-aa71d3c01648",
        createdAt: new Date("2024-03-06 20:00:00.000000"),
        eventoId: 1,
        tipoTicketId: 3,
      },
      {
        id: "518ce6e8-b66c-4168-9bee-aa71d3c01652",
        formaPagamento: getRandomStringFromArray(pagamentosTipos),
        quantidade: 1,
        valor: 150,
        status: "Pago",
        compradorId: "518ce6e8-b66c-4168-9bee-aa71d3c01648",
        createdAt: new Date("2024-03-07 20:00:00.000000"),
        eventoId: 1,
        tipoTicketId: 1,
      },
      {
        id: "518ce6e8-b66c-4168-9bee-aa71d3c01653",
        formaPagamento: getRandomStringFromArray(pagamentosTipos),
        quantidade: 1,
        valor: 150,
        status: "Pago",
        compradorId: "518ce6e8-b66c-4168-9bee-aa71d3c01648",
        createdAt: new Date("2024-03-07 20:00:00.000000"),
        eventoId: 1,
        tipoTicketId: 1,
      },
      {
        id: "518ce6e8-b66c-4168-9bee-aa71d3c01654",
        formaPagamento: getRandomStringFromArray(pagamentosTipos),
        quantidade: 1,
        valor: 200,
        status: "Pago",
        compradorId: "518ce6e8-b66c-4168-9bee-aa71d3c01648",
        createdAt: new Date("2024-03-11 20:00:00.000000"),
        eventoId: 1,
        tipoTicketId: 3,
      },
      {
        id: "518ce6e8-b66c-4168-9bee-aa71d3c01655",
        formaPagamento: getRandomStringFromArray(pagamentosTipos),
        quantidade: 2,
        valor: 300,
        status: "Pago",
        compradorId: "518ce6e8-b66c-4168-9bee-aa71d3c01648",
        createdAt: new Date("2024-03-13 20:00:00.000000"),
        eventoId: 1,
        tipoTicketId: 1,
      },
      {
        id: "518ce6e8-b66c-4168-9bee-aa71d3c01656",
        formaPagamento: getRandomStringFromArray(pagamentosTipos),
        quantidade: 2,
        valor: 300,
        status: "Pago",
        compradorId: "518ce6e8-b66c-4168-9bee-aa71d3c01648",
        createdAt: new Date("2024-03-15 20:00:00.000000"),
        eventoId: 1,
        tipoTicketId: 1,
      },
      {
        id: "518ce6e8-b66c-4168-9bee-aa71d3c01657",
        formaPagamento: getRandomStringFromArray(pagamentosTipos),
        quantidade: 1,
        valor: 200,
        status: "Pago",
        compradorId: "518ce6e8-b66c-4168-9bee-aa71d3c01648",
        createdAt: new Date("2024-03-15 20:00:00.000000"),
        eventoId: 1,
        tipoTicketId: 3,
      },
      {
        id: "518ce6e8-b66c-4168-9bee-aa71d3c01658",
        formaPagamento: getRandomStringFromArray(pagamentosTipos),
        quantidade: 2,
        valor: 400,
        status: "Pago",
        compradorId: "518ce6e8-b66c-4168-9bee-aa71d3c01648",
        createdAt: new Date("2024-03-15 20:00:00.000000"),
        eventoId: 1,
        tipoTicketId: 3,
      },
      // 16 inteiras restantes
      {
        id: "518ce6e8-b66c-4168-9bee-aa71d3c01659",
        formaPagamento: getRandomStringFromArray(pagamentosTipos),
        quantidade: 1,
        valor: 150,
        status: "Pago",
        compradorId: "518ce6e8-b66c-4168-9bee-aa71d3c01648",
        createdAt: new Date("2024-03-18 20:00:00.000000"),
        eventoId: 1,
        tipoTicketId: 1,
      },
      {
        id: "518ce6e8-b66c-4168-9bee-aa71d3c01660",
        formaPagamento: getRandomStringFromArray(pagamentosTipos),
        quantidade: 1,
        valor: 150,
        status: "Pago",
        compradorId: "518ce6e8-b66c-4168-9bee-aa71d3c01648",
        createdAt: new Date("2024-03-19 20:00:00.000000"),
        eventoId: 1,
        tipoTicketId: 1,
      },
      {
        id: "518ce6e8-b66c-4168-9bee-aa71d3c01661",
        formaPagamento: getRandomStringFromArray(pagamentosTipos),
        quantidade: 2,
        valor: 300,
        status: "Pago",
        compradorId: "518ce6e8-b66c-4168-9bee-aa71d3c01648",
        createdAt: new Date("2024-03-20 20:00:00.000000"),
        eventoId: 1,
        tipoTicketId: 1,
      },
      {
        id: "518ce6e8-b66c-4168-9bee-aa71d3c01662",
        formaPagamento: getRandomStringFromArray(pagamentosTipos),
        quantidade: 1,
        valor: 75,
        status: "Pago",
        compradorId: "518ce6e8-b66c-4168-9bee-aa71d3c01648",
        createdAt: new Date("2024-03-21 20:00:00.000000"),
        eventoId: 1,
        tipoTicketId: 2,
      },
      {
        id: "518ce6e8-b66c-4168-9bee-aa71d3c01663",
        formaPagamento: getRandomStringFromArray(pagamentosTipos),
        quantidade: 1,
        valor: 150,
        status: "Pago",
        compradorId: "518ce6e8-b66c-4168-9bee-aa71d3c01648",
        createdAt: new Date("2024-03-21 20:00:00.000000"),
        eventoId: 1,
        tipoTicketId: 1,
      },
      {
        id: "518ce6e8-b66c-4168-9bee-aa71d3c01664",
        formaPagamento: getRandomStringFromArray(pagamentosTipos),
        quantidade: 1,
        valor: 150,
        status: "Pago",
        compradorId: "518ce6e8-b66c-4168-9bee-aa71d3c01648",
        createdAt: new Date("2024-03-21 20:00:00.000000"),
        eventoId: 1,
        tipoTicketId: 1,
      },
      {
        id: "518ce6e8-b66c-4168-9bee-aa71d3c01665",
        formaPagamento: getRandomStringFromArray(pagamentosTipos),
        quantidade: 5,
        valor: 750,
        status: "Pago",
        compradorId: "518ce6e8-b66c-4168-9bee-aa71d3c01648",
        createdAt: new Date("2024-03-25 20:00:00.000000"),
        eventoId: 1,
        tipoTicketId: 1,
      },
      {
        id: "518ce6e8-b66c-4168-9bee-aa71d3c01666",
        formaPagamento: getRandomStringFromArray(pagamentosTipos),
        quantidade: 3,
        valor: 450,
        status: "Pago",
        compradorId: "518ce6e8-b66c-4168-9bee-aa71d3c01648",
        createdAt: new Date("2024-03-26 20:00:00.000000"),
        eventoId: 1,
        tipoTicketId: 1,
      },
      {
        id: "518ce6e8-b66c-4168-9bee-aa71d3c01667",
        formaPagamento: getRandomStringFromArray(pagamentosTipos),
        quantidade: 1,
        valor: 150,
        status: "Pago",
        compradorId: "518ce6e8-b66c-4168-9bee-aa71d3c01648",
        createdAt: new Date("2024-03-26 20:00:00.000000"),
        eventoId: 1,
        tipoTicketId: 1,
      },
      // Motorola Brasil
      // Arena da Amazonia

      // Bumbodromo de Parintins

      // Centro de Convenções Vasco Vasques
    ],
    skipDuplicates: true,
  });
}

// compras

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

enderecosEventos()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

eventos()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

tipoTicketsEventos()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

pedidos()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

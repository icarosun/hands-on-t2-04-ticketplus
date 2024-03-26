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
        faixaEtaria: 18,
        vagas: 30,
        dataInicio: new Date("2023-07-18 19:00:00.000000"),
        createdAt: new Date("2023-07-18 19:00:00.000000"),
        dataFim: new Date("2024-03-27 19:00:00.000000"),
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
        dataInicio: new Date("2024-02-27 19:00:00.000000"),
        createdAt: new Date("2024-02-27 19:00:00.000000"),
        dataFim: new Date("2024-03-27 19:00:00.000000"),
        organizadorId: "19454928-0f2b-44e6-ba87-8e65a1fff621",
        categoriaEventoId: 6,
        enderecoEventoId: 2,
      },
      {
        id: 3,
        titulo: "Festival Folclórico de Parintins 2024",
        descricao:
          "O Festival Folclórico de Parintins é uma festa popular que acontece todos os anos no município brasileiro de Parintins, no interior do estado do Amazonas. O festival é reconhecido como Patrimônio Cultural do Brasil pelo Instituto do Patrimônio Histórico e Artístico Nacional (IPHAN). As apresentações simbolizam uma disputa a céu aberto entre duas agremiações folclóricas, a do Boi Garantido (vermelho) e a do Boi Caprichoso (azul), que acontece no Centro Cultural de Parintins – mais conhecido como Bumbódromo, tem capacidade para 35 mil espectadores.",
        localizacao: "Centro Cultural de Parintins - Parintins-AM",
        faixaEtaria: 18,
        vagas: 35000,
        dataInicio: new Date("2024-03-01 19:00:00.000000"),
        createdAt: new Date("2024-03-01 19:00:00.000000"),
        dataFim: new Date("2024-06-30 19:00:00.000000"),
        organizadorId: "19454928-0f2b-44e6-ba87-8e65a1fff621",
        categoriaEventoId: 1,
        enderecoEventoId: 4,
      },
      {
        id: 4,
        titulo: "Ivete Sangalo - O Turnê",
        descricao:
          "Show da Ivete Sangalo em Manaus. Comemorando seus 30 anos de carreira.",
        localizacao: "Arena da Amazônia - Manaus-AM",
        faixaEtaria: 5,
        vagas: 5000,
        dataInicio: new Date("2024-07-27 19:00:00.000000"),
        createdAt: new Date("2024-07-27 19:00:00.000000"),
        dataFim: new Date("2024-06-01 19:00:00.000000"),
        organizadorId: "19454928-0f2b-44e6-ba87-8e65a1fff621",
        categoriaEventoId: 1,
        enderecoEventoId: 3,
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
      // Web Academy 30 vagas
      {
        tipoTicketId: 1,
        eventoId: 1,
        quantidade: 10,
        preco: 10,
      },
      {
        tipoTicketId: 2,
        eventoId: 1,
        quantidade: 10,
        preco: 5,
      },
      {
        tipoTicketId: 3,
        eventoId: 1,
        quantidade: 10,
        preco: 20,
      },
      // Motorola - 100 vagas
      {
        tipoTicketId: 1,
        eventoId: 2,
        quantidade: 40,
        preco: 100,
      },
      {
        tipoTicketId: 2,
        eventoId: 2,
        quantidade: 40,
        preco: 50,
      },
      {
        tipoTicketId: 3,
        eventoId: 2,
        quantidade: 20,
        preco: 200,
      },
      // Parintins 35.000 vagas
      {
        tipoTicketId: 1,
        eventoId: 3,
        quantidade: 20000,
        preco: 2000,
      },
      {
        tipoTicketId: 2,
        eventoId: 3,
        quantidade: 5000,
        preco: 1000,
      },
      {
        tipoTicketId: 3,
        eventoId: 3,
        quantidade: 10000,
        preco: 5000,
      },
      // Arena da Amazonia 5.000 vagas
      {
        tipoTicketId: 1,
        eventoId: 4,
        quantidade: 1000,
        preco: 1000,
      },
      {
        tipoTicketId: 2,
        eventoId: 4,
        quantidade: 2000,
        preco: 500,
      },
      {
        tipoTicketId: 3,
        eventoId: 4,
        quantidade: 2000,
        preco: 2500,
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
      // WebAcademy
      {
        id: "518ce6e8-b66c-4168-9bee-aa71d3c01611",
        formaPagamento: "Cartão de Crédito",
        quantidade: 5,
        valor: 50,
        status: "Pago",
        compradorId: "518ce6e8-b66c-4168-9bee-aa71d3c01648",
        createdAt: new Date("2023-07-18 19:00:00.000000"),
        eventoId: 1,
        tipoTicketId: 1,
      },
      {
        id: "518ce6e8-b66c-4168-9bee-aa71d3c01611",
        formaPagamento: "Cartão de Crédito",
        quantidade: 2,
        valor: 40,
        status: "Pago",
        compradorId: "518ce6e8-b66c-4168-9bee-aa71d3c01648",
        createdAt: new Date("2023-07-19 19:00:00.000000"),
        eventoId: 1,
        tipoTicketId: 3,
      },
      {
        id: "518ce6e8-b66c-4168-9bee-aa71d3c01611",
        formaPagamento: "Cartão de Crédito",
        quantidade: 1,
        valor: 10,
        status: "Pago",
        compradorId: "518ce6e8-b66c-4168-9bee-aa71d3c01648",
        createdAt: new Date("2023-07-19 19:00:00.000000"),
        eventoId: 1,
        tipoTicketId: 1,
      },
      {
        id: "518ce6e8-b66c-4168-9bee-aa71d3c01611",
        formaPagamento: "Débito",
        quantidade: 4,
        valor: 40,
        status: "Pago",
        compradorId: "518ce6e8-b66c-4168-9bee-aa71d3c01648",
        createdAt: new Date("2023-07-20 19:00:00.000000"),
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

tipoTicket()
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

import { PrismaClient } from "@prisma/client";
//import { TiposUsuarios } from "../src/resources/tipoUsuario/tipoUsuario.constants";
const prisma = new PrismaClient();

async function evento() {
  await prisma.evento.createMany({
    data: [
      {
        id: 1,
        titulo: "Chiado da Chinela",
        localizacao: "Av. Torquato Tapajós, nº 207",
        faixaEtaria: 18,
        categoria: "Show de Forró",
        descricao:
          "Forró estilo pé de serra. Mulher não paga. Cerveja liberada a partir da 00:00",
        preco: 12.99
      },
      {
        id: 2,
        titulo: "Suá sem dó",
        localizacao: "Av. do Turismo, nº 1033",
        faixaEtaria: 23,
        categoria: "Show de Forró Pisapé",
        descricao:
          "Forró ao céu aberto, com piscina e bar liberado até 1h da manhã.",
        preco: 15.89
      },
      {
        id: 3,
        titulo: "Galinha Pintadinha - ao vivo",
        localizacao: "Rua Empaminondas, nº 2",
        faixaEtaria: 5,
        categoria: "Festa Infantil",
        descricao:
          "Ambiente fechado e climatizado, crianças de até 8 anos tem entrada franca.",
        preco: 21.99
      },
      {
        id: 4,
        titulo: "Javascript Mental",
        localizacao: "Rua Timbiras, nº 555",
        faixaEtaria: 30,
        categoria: "Workshop",
        descricao:
          "Aprenda como otimizar o seu raciocínio quântico para a programação web.",
        preco: 199.99
      },
      {
        id: 5,
        titulo: "Amazon Games",
        localizacao: "Rua Maceió, nº 7",
        faixaEtaria: 40,
        categoria: "Workshop Gamer",
        descricao:
          "Venha conhecer os diversos jogos e mercadorias do mundo gamer.",
        preco: 20.89
      },
    ],
    skipDuplicates: true,
  });
}

async function usuario() {
  await prisma.usuario.createMany({
    data: [
      {
        id: "19454928-0f2b-44e6-ba87-8e65a1fff621",
        nome: "WebAcademy",
        tipoUsuario: "daf7a4e1-3345-49a5-809d-55bb4d0633d7",
        senha: "$2a$10$KSQe4QRqp30agHrkr1rueOvRQHi8hobNZmeWyIGQENz678.haa7PO", //Senha: 12345678
        email: "webacademy@email.com",
        saldo: 60.66
      },
      {
        id: "19454928-0f2b-44e6-ba87-8e65a1fff622",
        nome: "Luiz",
        tipoUsuario: "daf7a4e1-3345-49a5-809d-55bb4d0633d7",
        senha: "$2a$10$u0WWbaKvdNNRzZgbtPDwFORMmFdbvWVNOyvd0qxGziyF7F9TA5VgG", // Senha: 12345678
        email: "joaosilva@usuario.com",
        saldo: 25.5
      },
    ],
    skipDuplicates: true,
  });
}

evento()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

usuario()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from "@prisma/client";
//import { TiposUsuarios } from "../src/resources/tipoUsuario/tipoUsuario.constants";
const prisma = new PrismaClient();

async function evento() {
  await prisma.evento.createMany({
    data: [
      {
        id: "19454928-0f2b-44e6-ba87-8e65a1fff615",
        titulo: "Chiado da Chinela",
        localizacao: "Av. Torquato Tapajós, nº 207",
        faixaEtaria: 18,
        categoria: "Show de Forró",
      },
      {
        id: "19454928-0f2b-44e6-ba87-8e65a1fff616",
        titulo: "Suá sem dó",
        localizacao: "Av. do Turismo, nº 1033",
        faixaEtaria: 23,
        categoria: "Show de Forró Pisapé",
      },
      {
        id: "19454928-0f2b-44e6-ba87-8e65a1fff617",
        titulo: "Galinha Pintadinha - ao vivo",
        localizacao: "Rua Empaminondas, nº 2",
        faixaEtaria: 5,
        categoria: "Festa Infantil",
      },
      {
        id: "19454928-0f2b-44e6-ba87-8e65a1fff618",
        titulo: "Javascript Mental",
        localizacao: "Rua Timbiras, nº 555",
        faixaEtaria: 30,
        categoria: "Workshop",
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
        nome: "Tarcisio",
        sobrenome: "Moreira",
        tipoUsuario: "daf7a4e1-3345-49a5-809d-55bb4d0633d7",
        senha: "123456",
        email: "tarcisio.moreira@gmail.com",
      },
      {
        id: "19454928-0f2b-44e6-ba87-8e65a1fff622",
        nome: "Josenilda",
        sobrenome: "Amarantes",
        tipoUsuario: "daf7a4e1-3345-49a5-809d-55bb4d0633d7",
        senha: "1234567",
        email: "josenilda.amarantes@hotmail.com",
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

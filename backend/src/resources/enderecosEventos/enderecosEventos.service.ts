import {
    EnderecosEventos,
    PrismaClient
} from "@prisma/client";
import { getDadosEnderecoByCEP } from "../endereco/endereco.service";
import { DadosEnderecoType } from "../endereco/endereco.types";

const prisma = new PrismaClient();

export async function getEnderecosEventosByCEP (
    cep: string
): Promise<EnderecosEventos[] | null | undefined> {
    const dadosEndereco = await getDadosEnderecoByCEP(cep);
    const cidade = dadosEndereco.localidade;
    if (String(cidade) === "undefined") return undefined;
    return await prisma.enderecosEventos.findMany({
        where: {
            cidade
        },
        include: {
            eventos: true
        }
    })
  }
import {
    EnderecosEventos,
    PrismaClient
} from "@prisma/client";
import { CreateEnderecoEventoDto } from "./endereco.types";

const prisma = new PrismaClient();

export async function getDadosEnderecoByCEP (
    CEP: string
) {
    return await fetch(`https://viacep.com.br/ws/${CEP}/json/`).then((res) => {
        return res.json().then((data) => {
            console.log(data)
            return data;
        })
    })
}

export async function getEnderecoEvento (
    cep: string,
    numero: number
): Promise<EnderecosEventos | null> {
    return await prisma.enderecosEventos.findFirst({
        where: {
            cep,
            numero
        }
    });
}

export async function createEnderecoEvento (
    enderecoEvento: CreateEnderecoEventoDto
): Promise<EnderecosEventos> {
    return await prisma.enderecosEventos.create({
        data: enderecoEvento
    });
}
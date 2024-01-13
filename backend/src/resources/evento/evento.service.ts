import { PrismaClient, Evento } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllEventos = async ():Promise<Evento[]> => {
    return await prisma.evento.findMany();
}
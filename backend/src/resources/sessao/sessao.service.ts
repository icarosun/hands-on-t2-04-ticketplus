import { Usuario, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getSessaoUsuario (idUsuario: string): Promise<Usuario | null> {
    return await prisma.usuario.findUnique({
        where: {
            id: idUsuario
    }});
}
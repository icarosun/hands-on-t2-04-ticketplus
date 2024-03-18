import { CategoriaEvento, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getCategoriaEventoById (
    id: number
): Promise<CategoriaEvento | null> {
    return await prisma.categoriaEvento.findFirst({
        where: {
            id
        }
    });
}

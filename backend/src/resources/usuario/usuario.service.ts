import { PrismaClient, Usuario } from "@prisma/client";

const prisma = new PrismaClient();

export async function listaUsuarios (): Promise<Usuario[] | null> {
	return prisma.usuario.findMany();
}

export async function buscaUsuarioPorEmail (email: string | undefined): Promise<Usuario | null> {
	return await prisma.usuario.findUnique({
		where: { email }
	});
} 

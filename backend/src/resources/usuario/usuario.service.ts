import { PrismaClient, Usuario } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

export async function listaUsuarios (): Promise<Usuario[] | null> {
	return prisma.usuario.findMany();
}

export async function buscaUsuarioPorEmail (email: string | undefined): Promise<Usuario | null> {
	if (email === undefined) return null;
	return await prisma.usuario.findUnique({
		where: { email }
	});
}

export async function updateUsuarioService (usuarioId: string | undefined, saldo: Decimal): Promise<Usuario | null> {
	return await prisma.usuario.update({
		where: {
			id: usuarioId
		},
		data: {
			saldo
		}
	})
}
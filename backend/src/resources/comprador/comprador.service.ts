import { PrismaClient, Comprador } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

export async function getAllCompradores (): Promise<Comprador[] | null> {
	return prisma.comprador.findMany();
}

export async function getCompradorByEmail (email: string | undefined): Promise<Comprador | null> {
	if (email === undefined) return null;
	return await prisma.comprador.findUnique({
		where: { email }
	});
}

export async function updateSaldoComprador (compradorId: string | undefined, saldo: Decimal): Promise<Comprador | null> {
	return await prisma.comprador.update({
		where: {
			id: compradorId
		},
		data: {
			saldo
		}
	})
}
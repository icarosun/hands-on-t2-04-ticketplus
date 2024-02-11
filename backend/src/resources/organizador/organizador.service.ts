import { PrismaClient, Organizador } from "@prisma/client";
// import { Decimal } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

export async function getAllOrganizadores (): Promise<Organizador[] | null> {
	return prisma.organizador.findMany();
}

export async function getOrganizadorByEmail (email: string | undefined): Promise<Organizador | null> {
	if (email === undefined) return null;
	return await prisma.organizador.findUnique({
		where: { email }
	});
}
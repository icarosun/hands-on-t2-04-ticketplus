import { Organizador } from "@prisma/client";


export type OrganizadorDto = Pick<Organizador,
    | "nome"
    | "email"
    | "senha"
    | "conta"
    | "cnpj"
>;

export type CreateOrganizadorDto = OrganizadorDto;
export type UpdateOrganizadorDto = OrganizadorDto;
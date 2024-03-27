import { HttpInstance } from "../utils/http";

interface SignupOrganizadorReqType {
    nome: string;
    email: string;
    senha: string;
    repeteSenha: string;
    conta: string;
    cnpj: string;
}

export async function signupOrganizador (dadosOrganizador: SignupOrganizadorReqType) {
    return await HttpInstance.http.post("/auth/organizador", {
        ...dadosOrganizador
    })
}
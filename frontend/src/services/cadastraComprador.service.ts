import { HttpInstance } from "../utils/http";

export interface UsuarioComprador {
  nome: string;
  email: string;
  senha: string;
  repeteSenha: string;
  cpf: string;
}

export async function signupComprador (dadosRequisicao: UsuarioComprador) {

  return HttpInstance.http.post("/auth/comprador", {...dadosRequisicao});
}

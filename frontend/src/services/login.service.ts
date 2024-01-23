import { HttpInstance } from "../utils/http";

export interface Usuario {
  nome: string;
  sobrenome: string;
  email: string;
}

export async function login(email: string, senha: string): Promise<Usuario> {
  const res = await HttpInstance.http.put("/auth", { email, senha });
  const usuario = res.data as Usuario;

  if (res.status !== 200) throw Error();

  const dadosUsuario: Usuario = {
    nome: usuario.nome,
    sobrenome: usuario.sobrenome,
    email: usuario.email,
  };

  return dadosUsuario;
}

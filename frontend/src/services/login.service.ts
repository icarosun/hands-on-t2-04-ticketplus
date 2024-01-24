import { HttpInstance } from "../utils/http";

export interface Usuario {
  nome: string;
  sobrenome: string;
  email: string;
}

export async function login (email: string, senha: string): Promise<Usuario | null> {
  const res = await HttpInstance.http.put("/auth", { email, senha });
  if (res.status === 401) return null;
  const usuario = res.data as Usuario;

  const dadosUsuario: Usuario = {
    nome: usuario.nome,
    sobrenome: usuario.sobrenome,
    email: usuario.email,
  };

  return dadosUsuario;
}
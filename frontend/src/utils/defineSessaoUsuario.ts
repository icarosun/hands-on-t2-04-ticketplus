import { HttpInstance } from "./http";


export async function defineSessaoUsuario() {
  return await HttpInstance.http.get("/sessao");
}

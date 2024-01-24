import { HttpInstance } from "./http";


export async function defineSessaoUsuario() {
  const result = await HttpInstance.http.get("/sessao");
  console.log(result.data);
}

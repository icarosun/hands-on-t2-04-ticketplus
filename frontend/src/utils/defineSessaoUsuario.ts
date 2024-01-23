import { HttpInstance } from "./http";


export async function defineSessaoUsuario() {
  const result = await HttpInstance.http.get("/sessao");

  if (result.status !== 200) throw Error();

  console.log(result);
}

import { useDispatch } from "react-redux";
import { setSession } from "../redux/slices/session.slice";

import { HttpInstance } from "./http";


export async function defineSessaoUsuario() {
  const dispatch = useDispatch();
  const result = await HttpInstance.http.get("/sessao");
  


  console.log(result.data);
}

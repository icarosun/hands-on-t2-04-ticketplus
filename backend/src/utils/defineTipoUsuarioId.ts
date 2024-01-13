import { TiposUsuarios } from "../resources/tipoUsuario/tipoUsuario.constants";


export function defineTipoUsuarioId (tipoUsuario: string): TiposUsuarios.ORGANIZADOR_ID | TiposUsuarios.COMPRADOR_ID {
	if (tipoUsuario === TiposUsuarios.COMPRADOR) return TiposUsuarios.COMPRADOR_ID;
	else return TiposUsuarios.ORGANIZADOR_ID;
}
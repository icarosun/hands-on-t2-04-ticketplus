import { TiposUsuarios } from "../utils/tipoUsuario.constants";

export interface AppBarProps {
    tipoUsuario: TiposUsuarios.COMPRADOR | TiposUsuarios.ORGANIZADOR;
}
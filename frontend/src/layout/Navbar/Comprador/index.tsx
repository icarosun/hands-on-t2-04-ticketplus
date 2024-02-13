import { Outlet } from "react-router-dom";
import AppBarComprador from "../../../components/AppBar/AppBarUsuario/AppBarUsuario.tsx";
import { TiposUsuarios } from "../../../utils/tipoUsuario.constants.ts";

interface NavBarLayoutProps {
  tipoUsuario: TiposUsuarios.COMPRADOR | TiposUsuarios.ORGANIZADOR;
}

export default function CompradorNavBarLayout(props: NavBarLayoutProps) {
  return (
    <div>
      <AppBarComprador tipoUsuario={props.tipoUsuario}></AppBarComprador>
      <Outlet />
    </div>
  );
}
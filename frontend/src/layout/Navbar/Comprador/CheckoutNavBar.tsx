import { Outlet } from "react-router-dom";
import { TiposUsuarios } from "../../../utils/tipoUsuario.constants.ts";
import CheckoutAppBar from "../../../components/AppBar/AppBarCheckout/CheckoutAppBar.tsx";

interface NavBarLayoutProps {
  tipoUsuario: TiposUsuarios.COMPRADOR | TiposUsuarios.ORGANIZADOR;
}

export default function CheckoutNavBarLayout(props: NavBarLayoutProps) {
  return (
    <div>
      <CheckoutAppBar tipoUsuario={props.tipoUsuario}></CheckoutAppBar>
      <Outlet/>
    </div>
  );
}
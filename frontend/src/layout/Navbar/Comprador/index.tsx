import { Outlet } from "react-router-dom";
import AppBarComprador from "../../../components/AppBar/AppBarComprador/AppBarComprador.tsx";

interface NavBarLayoutProps {
  tipoUsuario: "comprador" | "organizador";
}

export default function CompradorNavBarLayout(props: NavBarLayoutProps) {
  return (
    <div>
      <AppBarComprador tipoUsuario={props.tipoUsuario}></AppBarComprador>
      <Outlet />
    </div>
  );
}
import { createBrowserRouter } from "react-router-dom";
import NavBarLayout from "../layout/Navbar/Main/index.tsx";
import PaginaComprador from "../pages/Comprador/index.tsx";
import PaginaOrganizador from "../pages/Organizador/index.tsx";
import CompradorNavBarLayout from "../layout/Navbar/Comprador/index.tsx";
import PaginaInicial from "../pages/PaginaInicial/index.tsx";
import { TiposUsuarios } from "../utils/tipoUsuario.constants.ts";

const router = createBrowserRouter([
  {
    element: <NavBarLayout />,
    children: [
      {
        path: "/",
        element: <PaginaInicial />,
      },
    ],
  },
  {
    element: <CompradorNavBarLayout tipoUsuario={TiposUsuarios.COMPRADOR} />,
    children: [
      {
        path: "/paginacomprador",
        element: <PaginaComprador />,
      },
    ],
  },
  {
    element: <CompradorNavBarLayout tipoUsuario={TiposUsuarios.ORGANIZADOR} />,
    children: [
      {
        path: "/paginaorganizador",
        element: <PaginaOrganizador />,
      },
    ],
  },
]);

export default router;

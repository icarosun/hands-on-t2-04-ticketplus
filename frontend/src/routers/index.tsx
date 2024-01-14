import { createBrowserRouter } from "react-router-dom";
import NavBarLayout from "../layout/Navbar/Main/index.tsx";
import PaginaComprador from "../pages/Comprador/index.tsx";
import CompradorNavBarLayout from "../layout/Navbar/Comprador/index.tsx";
import PaginaInicial from "../pages/PaginaInicial/index.tsx";

const router = createBrowserRouter([
  {
    element: <NavBarLayout />,
    children: [
      {
        path: "/",
        element: <PaginaInicial/>,
      },
    ],
  },
  {
    element: <CompradorNavBarLayout/>,
    children: [
      {
        path: "/paginacomprador",
        element: <PaginaComprador/>,
      },
    ],
  },
]);

export default router;
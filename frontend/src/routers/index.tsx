import { createBrowserRouter } from "react-router-dom";
import NavBarLayout from "../layout/Navbar/Main/index.tsx";
import PaginaComprador from "../pages/Comprador/index.tsx";
import PaginaOrganizador from "../pages/Organizador";
import CompradorNavBarLayout from "../layout/Navbar/Comprador/index.tsx";
import PaginaInicial from "../pages/PaginaInicial/index.tsx";
import { TiposUsuarios } from "../utils/tipoUsuario.constants.ts";
import DashboardGeral from "../components/Dashboard/Geral/";
import DashboardIndividual from "../components/Dashboard/Individual/";
import CheckoutNavBarLayout from "../layout/Navbar/Comprador/CheckoutNavBar.tsx";
import CheckoutStepper from "../pages/CheckoutPage/CheckPage.tsx";
import EventDetailsV1 from "../components/EventDetailsContaner/EventDetailsV1.tsx";
import EventDetailsV2 from "../components/EventDetailsContaner/EventDetailsV2.tsx";
import LoginNavBar from "../layout/Navbar/Main/LoginNavBar.tsx";
import LoginClientPage from "../components/Login/LoginPage.tsx";
import NovoEvento from "../components/OrganizadorComponents/NovoEvento.tsx";
import NavBarLayoutOrganizador from "../layout/Navbar/Organizador/index.tsx";
import PaginaPrincipalOrganizador from "../components/OrganizadorComponents/EventsConteiner.tsx";


const router = createBrowserRouter([
  {
    element: <NavBarLayout />,
    children: [
      {
        path: "/",
        element: <PaginaInicial />,
      },
      {
        path: "/detalhes-do-evento-v2/:id",
        element: <EventDetailsV2 />,
      }
    ],
  },
  {
    element: <CompradorNavBarLayout tipoUsuario={TiposUsuarios.COMPRADOR} />,
    children: [
      {
        path: "/paginacomprador",
        element: <PaginaComprador />,
      },
      {
        path: "/detalhes-do-evento-v1/:id",
        element: <EventDetailsV1 />,
      }
    ],
  },
  {
    element: <NavBarLayoutOrganizador tipoUsuario={TiposUsuarios.ORGANIZADOR} />,
    children: [
      {
        path: "/paginaorganizador",
        element: <PaginaOrganizador />,
      },
      {
        path: "/eventos-publicados",
        element: <PaginaPrincipalOrganizador />,
      },
      {
        path: "/novo-evento",
        element: <NovoEvento />,
      },
    ],
  },
  {
    element: <NavBarLayoutOrganizador tipoUsuario={TiposUsuarios.ORGANIZADOR} />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardGeral />,
      },
    ],
  },
  {
    element: <NavBarLayoutOrganizador tipoUsuario={TiposUsuarios.ORGANIZADOR} />,
    children: [
      {
        path: "/dashboardIndividual",
        element: <DashboardIndividual />,
      },
    ],
  },
  {
    element: <CheckoutNavBarLayout />,
    children: [
      {
        path: "/checkout",
        element: <CheckoutStepper></CheckoutStepper>,
      },
    ],
  },
  {
    element: <LoginNavBar  />,
    children: [
      {
        path: "/login_cliente",
        element: <LoginClientPage />,
      },
      /*{
        path: "/signup",
        element: <SignUpComprador />
      }*/
    ],
  }
]);

export default router;

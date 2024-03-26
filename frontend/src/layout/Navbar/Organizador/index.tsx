import * as React from 'react';
import { Outlet } from "react-router-dom";
import { TiposUsuarios } from '../../../utils/tipoUsuario.constants';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import SidebarOranizador from '../../../components/OrganizadorComponents/SideBarOrganizador';

interface NavBarLayoutProps {
  tipoUsuario: TiposUsuarios.COMPRADOR | TiposUsuarios.ORGANIZADOR;
}

export default function NavBarLayoutOrganizador(props: NavBarLayoutProps) {
  return (
    <React.Fragment>
      <CssVarsProvider disableTransitionOnChange>
        <CssBaseline />
        <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
          <SidebarOranizador tipoUsuario={props.tipoUsuario}></SidebarOranizador>
          <Box
            component="main"
            className="MainContent"
            sx={{
              pt: { xs: 'calc(12px + var(--Header-height))', md: 3 },
              pb: { xs: 2, sm: 2, md: 3 },
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              minWidth: 0,
              height: '100dvh',
              gap: 1,
              overflow: 'auto',
            }}
          >
            <Outlet></Outlet>
          </Box>
        </Box>
      </CssVarsProvider>
    </React.Fragment>
  );
}
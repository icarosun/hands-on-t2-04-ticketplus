// ** MUI Imports
import Button from '@mui/joy/Button';
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useEffect } from "react";
import { defineSessaoUsuario } from "../../../utils/defineSessaoUsuario";
import { TiposUsuarios } from "../../../utils/tipoUsuario.constants";
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "@mui/material";
import UserDropdownMenu from "./UserDropdownMenu";
import LogoTicketPlus from "../../../assets/logo_ticketplus.png"
import Input from "@mui/joy/Input";
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';

export interface InfoIngressoType {
  id: number;
  imageUrlEvento: string;
  nomeEvento: string;
  localEvento: string;
  quantidadeIngressos: number;
  nomeProprietario: string;
}

interface AppBarProps {
  tipoUsuario: TiposUsuarios.COMPRADOR | TiposUsuarios.ORGANIZADOR;
}

const AppBarUsuario = (props: AppBarProps) => {
  useEffect(() => {
    (async () => {
      try {
        await defineSessaoUsuario();
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const sections = [
    { title: 'Tecnologia', url: '#' },
    { title: 'Cultura', url: '#' },
    { title: 'Festas e Shows', url: '#' },
    { title: 'Gastronomia', url: '#' },
    { title: 'Esporte', url: '#' },
    { title: 'Cursos', url: '#' },
  ];

  return (
    <Box>
      {props.tipoUsuario === TiposUsuarios.COMPRADOR ? (
        <>
          <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Select
              placeholder="Selecione a cidade"
              startDecorator={<FmdGoodOutlinedIcon />}
              sx={{ width: 270 }}
            >
              <Option value="dog">Manaus</Option>
              <Option value="cat">São Paulo</Option>
              <Option value="fish">Rio de Janeiro</Option>
              <Option value="bird">Salvador</Option>
              <Option value="bird">Roraima</Option>
              <Option value="bird">Belém</Option>
              <Option value="bird">Fortaleza</Option>
              <Option value="bird">Belo Horizonte</Option>
              <Option value="bird">Brasilia</Option>
            </Select>
            <div
              style={{ flex: 1, textAlign: 'center' }}
            >
              <img width="150" height="80" src={LogoTicketPlus} />
            </div>
            <Input
              placeholder="Pesquisar eventos..."
              startDecorator={
                <Button variant="soft" color="neutral" startDecorator={<SearchIcon />}>
                  Pesquisar
                </Button>
              }
              sx={{ width: 300, marginRight: 2 }}
            />
            <UserDropdownMenu tipoUsuario={props.tipoUsuario} />
          </Toolbar>
          <Toolbar
            component="nav"
            variant="dense"
            sx={{ justifyContent: 'center', overflowX: 'auto' }}
          >
            {sections.map((section) => (
              <Link
                color="inherit"
                noWrap
                key={section.title}
                variant="body2"
                href={section.url}
                sx={{ p: 1, flexShrink: 0, marginRight: 10 }}
              >
                {section.title}
              </Link>
            ))}
          </Toolbar>
        </>
      ) : (
        <>
          <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Button variant="outlined" startDecorator={<EventAvailableOutlinedIcon />}>Ver Todos Os Eventos</Button>
            <div
              style={{ flex: 1, textAlign: 'center' }}
            >
              <img width="150" height="80" src={LogoTicketPlus} />
            </div>
            <UserDropdownMenu tipoUsuario={props.tipoUsuario} />
          </Toolbar>
        </>
      )}
    </Box>
  );
};

export default AppBarUsuario;
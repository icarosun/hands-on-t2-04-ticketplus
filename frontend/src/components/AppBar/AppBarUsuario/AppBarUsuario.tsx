// ** MUI Imports
import * as React from "react";
import Button from '@mui/joy/Button';
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/joy/Typography";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { defineSessaoUsuario } from "../../../utils/defineSessaoUsuario";
import {
  CompraType,
  getIngressosByComprador,
} from "../../../services/listaIngressos";
import SaldoComponente from "../../CarteiraUsuario/CarteiraItem";
import MeusIngressos from "../../IngressosComprados/MeusIngressos";
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
import Stack from "@mui/joy/Stack";
import IconButton from "@mui/joy/IconButton";

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
  const [saldoAtual, setSaldoAtual] = useState<number | undefined>(undefined);
  const [ingressos, setIngressos] = useState<InfoIngressoType[]>([]);
  const [mostraSpinner, setMostraSpinner] = useState(true);

  const usuarioComprador = props.tipoUsuario === TiposUsuarios.COMPRADOR;

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const resSessao = await defineSessaoUsuario();
        if (props.tipoUsuario === TiposUsuarios.COMPRADOR) {
          const resIngressos = await getIngressosByComprador();
          const saldo = resSessao.data.saldo;
          setSaldoAtual(saldo);
          const compras = resIngressos?.data.comprasData;
          let index = 1;
          const ingressosAux: InfoIngressoType[] = [];
          compras?.map((compra: CompraType) => {
            const ingresso = compra.evento;
            const comprador = compra.comprador;
            const ingressoInfo = {
              id: parseInt(`${ingresso.id}${index}`),
              imageUrlEvento: compra.imageUrl,
              nomeEvento: ingresso.titulo,
              localEvento: ingresso.localizacao,
              quantidadeIngressos: 1,
              nomeProprietario: comprador.nome,
            };
            ingressosAux.push(ingressoInfo);
            index++;
          });
          setIngressos(ingressosAux);
        }
      } catch (error) {
        navigate("/");
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (saldoAtual !== undefined) setMostraSpinner(false);
  }, [saldoAtual]);

  let componentesComprador: any[] = [];

  if (props.tipoUsuario === TiposUsuarios.COMPRADOR) {
    componentesComprador = [
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        <SaldoComponente saldo={saldoAtual} spinner={mostraSpinner} />
        <MeusIngressos ingressos={ingressos}></MeusIngressos>
      </Box>,
    ];
  } else {
    //ggg
  }

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
            <MeusIngressos ingressos={ingressos}></MeusIngressos>
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
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{ flex: 1, textAlign: 'center' }}
            >
              <img width="150" height="80" src={LogoTicketPlus} />
            </div>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 1.5,
                alignItems: 'center',
              }}
            >
              <UserDropdownMenu tipoUsuario={props.tipoUsuario} />
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default AppBarUsuario;

import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/joy/Typography';
import { TiposUsuarios } from "../../../utils/tipoUsuario.constants";
import { defineSessaoUsuario } from "../../../utils/defineSessaoUsuario";
import { useNavigate } from 'react-router-dom';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import {
  CompraType,
  getIngressosByComprador,
} from "../../../services/listaIngressos";
import { AppBar } from '@mui/material';
import LogoTicketPlus from "../../../assets/logo_ticketplus.png"

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

function CkeckoutAppBar(props: AppBarProps) {

  const navigate = useNavigate();

  React.useEffect(() => {
    (async () => {
      try {
        //const resSessao = await defineSessaoUsuario();
        if (props.tipoUsuario === TiposUsuarios.COMPRADOR) {
          const resIngressos = await getIngressosByComprador();
          //const saldo = resSessao.data.saldo;
          //setSaldoAtual(saldo);
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
          //setIngressos(ingressosAux);
        }
      } catch (error) {
        navigate("/");
        console.error(error);
      }
    })();
  }, []);

  return (
    <React.Fragment>
      <AppBar
        position="absolute"
        elevation={0}
        sx={{
          backgroundColor: '#fff',
          position: 'relative',
          borderBottom: (t) => `0px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <div
            style={{ flex: 1, textAlign: 'center' }}
          >
            <img width="120" height="60" src={LogoTicketPlus} />
          </div>
          <IconButton>
            <VerifiedUserIcon sx={{ color: '#5271FF' }} />
          </IconButton>
          <Typography
            level="body-lg"
            noWrap
            sx={{ color: '#252525' }}
          >
            Site Seguro
          </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
export default CkeckoutAppBar;
// ** MUI Imports
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import BarChartIcon from "@mui/icons-material/BarChart";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/joy/Button";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ListItemText from "@mui/material/ListItemText";
import UserDropdownMenu from "./UserDropdownMenu";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setDashboard } from "../../../redux/slices/dashboard.slice";
import { defineSessaoUsuario } from "../../../utils/defineSessaoUsuario";
import {
  CompraType,
  getIngressosByComprador,
} from "../../../services/listaIngressos";
import SaldoComponente from "../../CarteiraUsuario/CarteiraItem";
import MeusIngressos from "../../IngressosComprados/MeusIngressos";
import { TiposUsuarios } from "../../../utils/tipoUsuario.constants";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 8,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: 20,
  marginLeft: 20,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "16ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

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
  const dispatch = useDispatch();
  const dashOrPage = useSelector((state: any) => state.DashboardReducer);
  const [btn, setBtn] = useState<boolean>(dashOrPage.dashboard);
  const [saldoAtual, setSaldoAtual] = useState<number | undefined>(undefined);
  const [ingressos, setIngressos] = useState<InfoIngressoType[]>([]);
  const [mostraSpinner, setMostraSpinner] = useState(true);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

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
        setBtn(dashOrPage.dashboard);
      } catch (error) {
        navigate("/");
        console.error(error);
      }
    })();
  }, [dashOrPage]);

  useEffect(() => {
    if (saldoAtual !== undefined) setMostraSpinner(false);
  }, [saldoAtual]);

  const handleInitialPage = () => {
    dispatch(setDashboard());
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  let componentesComprador: any[] = [];

  const AppBarStyle: object = {
    backgroundColor: "primary",
  };

  const ToolbarStyle: object = {
    marginLeft: "20px",
    marginRight: "20px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  const SearchBarStyle = {
    display: "block",
  };

  if (props.tipoUsuario === TiposUsuarios.COMPRADOR) {
    componentesComprador = [
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        <SaldoComponente saldo={saldoAtual} spinner={mostraSpinner} />
        <MeusIngressos ingressos={ingressos}></MeusIngressos>
      </Box>,
    ];
  } else {
    SearchBarStyle.display = "none";
  }

  return (
    <AppBar position="static" style={AppBarStyle}>
      <Toolbar disableGutters style={ToolbarStyle}>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <ConfirmationNumberIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 3,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
            key={`tp-1`}
          >
            TicketPlus
          </Typography>

          <Button
            onClick={handleInitialPage}
            startDecorator={btn ? <BarChartIcon /> : <LocalActivityIcon />}
            sx={{ my: 1.5, color: "white", marginRight: 2 }}
          >
            {btn ? "Dashboard" : "Meus Eventos"}
          </Button>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ width: 320, maxWidth: "100%" }}
            >
              <MenuList>
                <MenuItem>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText>Copy</ListItemText>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
          <ConfirmationNumberIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 3,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
            key={`tp-2`}
          >
            TicketPlus
          </Typography>

          {componentesComprador}
        </Box>

        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Search sx={SearchBarStyle}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Pesquisar Evento"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <UserDropdownMenu tipoUsuario={props.tipoUsuario} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarUsuario;

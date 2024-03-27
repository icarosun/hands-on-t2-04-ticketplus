import * as React from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import LinearProgress from "@mui/joy/LinearProgress";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import SupportRoundedIcon from "@mui/icons-material/SupportRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AspectRatio from "@mui/joy/AspectRatio";
import CardOverflow from "@mui/joy/CardOverflow";
import { closeSidebar } from "./utils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../services/logout.service";
import { setSession } from "../../redux/slices/session.slice";
import { TiposUsuarios } from "../../utils/tipoUsuario.constants";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import EventIcon from "@mui/icons-material/Event";
import EditCalendarRoundedIcon from "@mui/icons-material/EditCalendarRounded";

interface SideBarOrganizadorProps {
  tipoUsuario: TiposUsuarios.COMPRADOR | TiposUsuarios.ORGANIZADOR;
}

function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "0.2s ease",
          "& > *": {
            overflow: "hidden",
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

export default function SidebarOranizador(props: SideBarOrganizadorProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function doLogout() {
    try {
      await logout();
      dispatch(
        setSession({
          nome: "",
          sobrenome: "",
          email: "",
        })
      );
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("nomeUsuario");
      navigate("/");
    } catch (error: any) {
      // especificando o erro como tipo 'any'
      alert("Erro ao tentar realizar o logout");
      console.error(error.response?.data?.msg); // acessando os dados de resposta se estiverem disponíveis
    }
  }
  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 10000,
        height: "100dvh",
        width: "var(--Sidebar-width)",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "0px solid",
        borderColor: "divider",
        bgcolor: "background.level1",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "320px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "320px",
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center", mt: -4 }}>
        <Card
          variant="plain"
          sx={{
            textAlign: "center",
            alignItems: "center",
            width: "100%",
            backgroundColor: "background.level1",
            "--icon-size": "100px",
          }}
        >
          <CardOverflow variant="plain">
            <AspectRatio
              variant="outlined"
              ratio="1"
              sx={{
                m: "auto",
                transform: "translateY(50%)",
                borderRadius: "50%",
                width: "var(--icon-size)",
                boxShadow: "sm",
                bgcolor: "background.level1",
                position: "relative",
              }}
            >
              <div>
                <LocalActivityIcon color="primary" sx={{ fontSize: "4rem" }} />
              </div>
            </AspectRatio>
          </CardOverflow>
          <Typography
            level="title-lg"
            sx={{ mt: "calc(var(--icon-size) / 2)" }}
          >
            TicketPlus
          </Typography>
        </Card>
      </Box>
      <Input
        size="sm"
        startDecorator={<SearchRoundedIcon />}
        placeholder="Pesquisar Evento"
      />
      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem>
            <ListItemButton onClick={() => navigate("/dashboard")}>
              <AssignmentRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Relatórios</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              onClick={() => navigate("/eventos-publicados")}
              role="menuitem"
              component="a"
            >
              <EventIcon />
              <ListItemContent>
                <Typography level="title-sm">Eventos Publicados</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              onClick={() => navigate("/novo-evento")}
              role="menuitem"
              component="a"
            >
              <EditCalendarRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Novo Evento</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
        <List
          size="sm"
          sx={{
            mt: "auto",
            flexGrow: 0,
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
            "--List-gap": "8px",
            mb: 2,
          }}
        >
          <ListItem>
            <ListItemButton>
              <SupportRoundedIcon />
              Suporte
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <SettingsRoundedIcon />
              Configurações
            </ListItemButton>
          </ListItem>
        </List>
        <Card
          invertedColors
          variant="soft"
          color="primary"
          size="sm"
          sx={{ boxShadow: "none" }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography level="title-sm">Plano Atual</Typography>
            <IconButton size="sm">
              <CloseRoundedIcon />
            </IconButton>
          </Stack>
          <Typography level="body-sm">
            Gratuito, tenha acesso a diversas funcionalidades e com atualizações
            em tempo real
          </Typography>
          <Button size="sm" variant="solid">
            Atualizar Plano
          </Button>
        </Card>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Avatar variant="soft" color="primary" />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">{`${sessionStorage.nomeUsuario}`}</Typography>
          <Typography level="body-xs">{`${sessionStorage.email}`}</Typography>
        </Box>
        <IconButton
          size="sm"
          variant="plain"
          color="neutral"
          onClick={doLogout}
        >
          <LogoutRoundedIcon />
        </IconButton>
      </Box>
    </Sheet>
  );
}

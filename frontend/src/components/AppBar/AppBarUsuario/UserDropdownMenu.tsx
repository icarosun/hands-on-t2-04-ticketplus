// ** React Imports
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from '../../../services/logout.service';
import { setSession } from '../../../redux/slices/session.slice';

// ** MUI Imports
import Avatar from '@mui/joy/Avatar';
import Chip from '@mui/joy/Chip';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import { Box, Dropdown, Menu } from '@mui/joy';
import MenuButton from '@mui/joy/MenuButton';
import Person from '@mui/icons-material/Person';
import Settings from '@mui/icons-material/Settings';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { TiposUsuarios } from "../../../utils/tipoUsuario.constants";
import { primeiraLetraMaiuscula } from "../../../utils/primeiraLetraMaiuscula";


interface UserDropdownMenuProps {
  tipoUsuario: TiposUsuarios.COMPRADOR | TiposUsuarios.ORGANIZADOR;
}

const UserDropdownMenu = (props: UserDropdownMenuProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  async function doLogout() {
    try {
      await logout();
      dispatch(setSession({
        nome: '',
        sobrenome: '',
        email: ''
      }));
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("nomeUsuario");
      navigate("/");
    } catch (error: any) { // especificando o erro como tipo 'any'
      alert("Erro ao tentar realizar o logout");
      console.error(error.response?.data?.msg); // acessando os dados de resposta se estiverem disponíveis
    }
  }

  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'solid', color: 'primary' } }}
      >
        <Person />
      </MenuButton>

      <Menu
        placement="bottom-end"
      >
        <Card
          sx={{
            width: 320,
            height: 350,
            maxHeight: '100%',
            maxWidth: '100%',
            boxShadow: 10,
            border: 0,
            marginBottom: -0.7
          }}
        >
          <CardContent sx={{ alignItems: 'center', textAlign: 'center', marginTop:4 }}>
            <Avatar sx={{ '--Avatar-size': '5rem'}} />
            <Chip
              size="sm"
              variant="solid"
              color="primary"
              sx={{
                mt: -1.2,
                mb: 1,
                border: '3px solid',
                borderColor: 'background.surface',
              }}
            >
              {primeiraLetraMaiuscula(props.tipoUsuario)}
            </Chip>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                mt: 2,
                '& > button': { borderRadius: '2rem' },
              }}
            >
              <Card
                orientation="horizontal"
                size="sm"
                variant="soft"
                sx={{ borderRadius: 10, mb: 1 }}
              >
                <CardContent>
                  <Typography level="title-lg">{`${sessionStorage.nomeUsuario}`}</Typography>
                  <Typography level="body-sm" sx={{ maxWidth: '24ch' }}>
                    {`${sessionStorage.email}`}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </CardContent>
          <CardOverflow sx={{ bgcolor: 'background.level1' }}>
            <CardActions buttonFlex="1">
              <ButtonGroup variant="soft" color="primary" sx={{ bgcolor: 'background.surface' }}>
                <Button> <Settings /></Button>
                <Button onClick={doLogout}><LogoutRoundedIcon></LogoutRoundedIcon> </Button>
              </ButtonGroup>
            </CardActions>
          </CardOverflow>
        </Card>
      </Menu>
    </Dropdown>
  )
}

export default UserDropdownMenu

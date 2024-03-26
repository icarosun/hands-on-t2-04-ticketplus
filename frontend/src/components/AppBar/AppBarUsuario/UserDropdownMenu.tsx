// ** React Imports
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from '../../../services/logout.service';
import { setSession } from '../../../redux/slices/session.slice';

// ** MUI Imports
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import { Dropdown, Menu } from '@mui/joy';
import MenuButton from '@mui/joy/MenuButton';
import { TiposUsuarios } from "../../../utils/tipoUsuario.constants";

import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemButton from '@mui/joy/ListItemButton';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

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
        sx={{ width: 200 }}
        variant='plain'>
        <Typography
          level="body-sm"
          startDecorator={<AccountCircleOutlinedIcon />}
          endDecorator={<KeyboardArrowDownRoundedIcon />}
          sx={{ alignItems: 'flex-center', width: 200, wordBreak: 'break-all' }}
        >
          Olá {`${sessionStorage.nomeUsuario}`}, minha conta
        </Typography>
      </MenuButton>

      <Menu
        placement="bottom-end"
      >
        <List
        >
          <ListItem role="none">
            <ListItemButton role="menuitem">
              <ListItemContent>Ver Minha Conta</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListDivider />
          <ListItem
            role="none"
            endAction={
              <IconButton  onClick={doLogout} variant="outlined" color="neutral" size="sm">
                <LogoutOutlinedIcon />
              </IconButton>
            }
          >
            <ListItemButton role="menuitem">
              Sair da Conta
            </ListItemButton>
          </ListItem>
        </List>
      </Menu>
    </Dropdown>
  )
}

export default UserDropdownMenu;

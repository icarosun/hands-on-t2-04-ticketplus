// ** MUI Imports
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import UserDropdown from './UserDropdown'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Typography from '@mui/joy/Typography';
import { Link, Theme, createStyles, makeStyles, useScrollTrigger } from "@mui/material";
import LogoTicketPlus from "../../../assets/logo_ticketplus.png"
import Input from "@mui/joy/Input";
import Button from '@mui/joy/Button';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useState } from 'react'
import { searchEventosByTitulo } from '../../../services/searchEventoByTitulo';

const sections = [
  { title: 'Tecnologia', url: '#' },
  { title: 'Cultura', url: '#' },
  { title: 'Festas e Shows', url: '#' },
  { title: 'Gastronomia', url: '#' },
  { title: 'Esporte', url: '#' },
  { title: 'Cursos', url: '#' },
];

const AppBarContent = () => {
  const navigate = useNavigate();
  const [valueSearch, setValueSearch] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValueSearch(event.target.value); 
  }

  const loginClientPage = (event: any) => {
    navigate(`/login_cliente`);
  }

  const signUpClientPage = (event: any) => {
    navigate('/signup');
  }

  const handleSearch = async () => {
    if (valueSearch.length > 0) {
      navigate(`/search?titulo=${valueSearch}`);
     }
  }

  return (
    <React.Fragment>
      <AppBar position='static' style={{ backgroundColor: '#fff' }}>
        <Toolbar sx={{ borderBottom: 0, borderColor: 'divider' }}>
          <Dropdown>
            <MenuButton variant='plain'><Typography
              level="body-sm"
              startDecorator={<AccountCircleOutlinedIcon />}
              endDecorator={<KeyboardArrowDownRoundedIcon />}
              sx={{ alignItems: 'flex-center', width: 220, wordBreak: 'break-word' }}
            >
              Olá, faça seu login ou cadastre-se.
            </Typography></MenuButton>
            <Menu variant='soft' sx={{ alignItems: 'flex-center', width: 250, wordBreak: 'break-all' }}>
              <MenuItem onClick={loginClientPage}>Entrar</MenuItem>
              <MenuItem onClick={signUpClientPage}>Cadastrar</MenuItem>
            </Menu>
          </Dropdown>
          <div
            style={{ flex: 1, textAlign: 'center' }}
          >
            <img width="150" height="80" src={LogoTicketPlus} />
          </div>
          <UserDropdown></UserDropdown>
          <Input
            placeholder="Pesquisar eventos..."
            value = {valueSearch}
            onChange = {handleChange}
            startDecorator={
              <Button onClick={handleSearch} variant="soft" color="neutral" startDecorator={<SearchIcon />}>
                Pesquisar
              </Button>
            }
            sx={{ width: 300, marginRight: 2 }}
          />
        </Toolbar>
        <Toolbar
          component="nav"
          variant="dense"
          sx={{ justifyContent: 'center', overflowX: 'auto' }}
        >
          {sections.map((section) => (
            <Link
              noWrap
              key={section.title}
              variant="body2"
              href={section.url}
              sx={{ p: 1, flexShrink: 0, marginRight: 10, color: '#252525' }}
            >
              {section.title}
            </Link>
          ))}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default AppBarContent;

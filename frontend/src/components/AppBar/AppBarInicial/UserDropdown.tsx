// ** React Imports
import React, { useState } from 'react'

// ** MUI Imports
import Menu from '@mui/material/Menu'
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import Check from '@mui/icons-material/Check';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

// ** Styled Component
const UserDropdown = () => {
  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)


  const open = Boolean(anchorEl);
  const handleDropdownOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Button onClick={handleDropdownOpen} variant="outlined" color='neutral' size='md' sx={{marginRight:1}}>Crie seu Evento</Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { maxWidth: 400, marginTop: 2, backgroundColor: 'transparent', maxHeight: 400, boxShadow: 10, borderRadius: 5 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Card size="lg" variant="solid" sx={{ maxHeight: 400, boxShadow: 10, borderRadius: 5, marginBottom:-1, backgroundColor:'#fff'}}>
          <Chip size="sm" variant="outlined" color="neutral">
            Anunciador
          </Chip>
          <Typography level="h2">Crie seu evento</Typography>
          <Divider inset="none" />
          <List size="sm" sx={{ mx: 'calc(-1 * var(--ListItem-paddingX))' }}>
            <ListItem>
              <ListItemDecorator>
                <Check />
              </ListItemDecorator>
              Acesso Ilimitado
            </ListItem>
            <ListItem>
              <ListItemDecorator>
                <Check />
              </ListItemDecorator>
              Plataforma Segura
            </ListItem>
            <ListItem>
              <ListItemDecorator>
                <Check />
              </ListItemDecorator>
              Suporte Técnico
            </ListItem>
            <ListItem>
              <ListItemDecorator>
                <Check />
              </ListItemDecorator>
              Facilidade com o cliente
            </ListItem>
          </List>
          <Divider inset="none" />
          <CardActions>
            <Typography level="title-lg" sx={{ mr: 'auto' }}>
              Veja nossos planos
              <Typography fontSize="sm" textColor="text.tertiary">
                / mensais
              </Typography>
            </Typography>
            <Button
              variant="solid"
              color="success"
              endDecorator={<KeyboardArrowRight />}
              sx={{borderRadius:6}}
            >
              Anunciar
            </Button>
          </CardActions>
        </Card>
      </Menu>
    </React.Fragment>
  )
}

export default UserDropdown

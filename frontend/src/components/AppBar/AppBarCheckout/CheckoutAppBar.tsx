import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/joy/Typography';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { AppBar } from '@mui/material';
import LogoTicketPlus from "../../../assets/logo_ticketplus.png"

function CkeckoutAppBar() {
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
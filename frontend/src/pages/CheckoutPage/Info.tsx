import * as React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

interface InfoProps {
  titulo: string;
  precoUnitario: number;
  total: number;
  tipoIngressoSelecionado: string;
}

export default function Info(props: InfoProps) {
  return (
    <React.Fragment>
      <Typography variant="subtitle2" color="text.secondary">
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        {`$${props.total} `}
      </Typography>
      <List disablePadding>
          <ListItem key={props.titulo} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={props.titulo}
              secondary={props.tipoIngressoSelecionado}
            />
            <Typography variant="body1" fontWeight="medium">
              {`$${props.precoUnitario}`}
            </Typography>
          </ListItem>
      </List>
    </React.Fragment>
  );
}
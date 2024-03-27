import * as React from 'react';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type:', detail: 'Visa' },
  { name: 'Card holder:', detail: 'Mr. John Smith' },
  { name: 'Card number:', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date:', detail: '04/2024' },
];

export interface ReviewProps {
  tipoIngressoSelecionado?: string;
  precoUnitario?: number;
  total?: number;
  quantidade?: number;
}

export default function Review(props: ReviewProps) {
  return (
    <Stack spacing={2}>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary={`Ingresso ${props.tipoIngressoSelecionado}`} secondary="Valor unitário" />
          <Typography variant="body2">{`$${props.precoUnitario}`}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Quantidade" />
          <Typography variant="body2">{props.quantidade}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {`$${props.total}`}
          </Typography>
        </ListItem>
      </List>
      <Divider />
    </Stack>
  );
}
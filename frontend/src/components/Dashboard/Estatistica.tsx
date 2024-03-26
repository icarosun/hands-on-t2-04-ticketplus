import { ReactElement } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
//import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TrendingUp from "mdi-material-ui/TrendingUp";
import CurrencyUsd from "mdi-material-ui/CurrencyUsd";
import { Money } from "../../utils/currency";

interface Estatistica {
  title?: string;
  valores: number[];
}
interface DataType {
  valor: string;
  title: string;
  color: string;
  icon: ReactElement;
}

function renderStats(salesData: DataType[]) {
  return salesData.map((item: DataType, index: number) => (
    <Grid item xs={12} sm={3} key={index}>
      <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          variant="rounded"
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: "common.white",
            backgroundColor: `${item.color}.main`,
          }}
        >
          {item.icon}
        </Avatar>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="caption">{item.title}</Typography>
          <Typography variant="h6">{item.valor}</Typography>
        </Box>
      </Box>
    </Grid>
  ));
}

export default function EstatisticasVendas(props: Estatistica) {
  const title: string = props.title
    ? `Resumo Geral de Vendas - ${props.title}`
    : "Resumo Geral de Vendas";

  const salesData: DataType[] = [
    {
      valor: `${props.valores[1]}`,
      title: "Vendidos",
      color: "primary",
      icon: <ShoppingCartIcon sx={{ fontSize: "1.75rem" }} />,
    },
    {
      valor: `${props.valores[2].toFixed(2)}%`,
      color: "warning",
      title: "Margem",
      icon: <TrendingUp sx={{ fontSize: "1.75rem" }} />,
    },
    {
      valor: `${Money.format(props.valores[3])}`,
      color: "success",
      title: "Receita",
      icon: <CurrencyUsd sx={{ fontSize: "1.75rem" }} />,
    },
  ];

  return (
    <Card>
      <CardHeader
        title={title}
        subheader={
          <Typography variant="body2">
            <Box
              component="span"
              sx={{ fontWeight: 600, color: "text.primary" }}
            >
              De todos os tickets dos eventos disponíveis
            </Box>
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: "2rem !important",
            letterSpacing: "0.15px !important",
          },
        }}
      />
      <CardContent sx={{ pt: (theme) => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats(salesData)}
        </Grid>
      </CardContent>
    </Card>
  );
}

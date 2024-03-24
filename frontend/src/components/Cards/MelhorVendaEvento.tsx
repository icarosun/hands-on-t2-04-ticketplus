import Card from "@mui/material/Card";
//import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Trophy from "../../assets/images/trophy.png";
import TriangleLight from "../../assets/images/triangle-light.png";

interface Card {
  titulo: string;
  title?: string;
  tickets: number;
}

const TriangleImg = styled("img")({
  right: 0,
  bottom: 0,
  height: 170,
  position: "absolute",
});

const TrophyImg = styled("img")({
  right: 36,
  bottom: 20,
  height: 98,
  position: "absolute",
});

export default function MelhorVendaEvento(props: Card) {
  return (
    <Card sx={{ position: "relative" }}>
      <CardContent>
        <Typography variant="h5">{props.titulo}</Typography>
        <Typography variant="body2" sx={{ letterSpacing: "0.25px" }}>
          Evento com a maior venda {props.title ? `- ${props.title}` : ""}
        </Typography>
        <Typography variant="h6" sx={{ my: 4, color: "primary.main" }}>
          {props.tickets} tickets vendidos
        </Typography>
        <Button size="small" variant="contained">
          Visualizar Evento
        </Button>
        <TriangleImg alt="triangle background" src={TriangleLight} />
        <TrophyImg alt="trophy" src={Trophy} />
      </CardContent>
    </Card>
  );
}

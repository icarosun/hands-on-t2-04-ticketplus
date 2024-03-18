import React from "react";
import { Typography } from '@mui/material';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import { AspectRatio, CardContent, Card } from "@mui/joy";
import { useNavigate } from "react-router-dom";

interface CardEventoDataType {
  id: number;
  title: string;
  description: string;
  place: string;
  imageUrl: string;
}

const CardEvento = (props: CardEventoDataType) => {
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/evento/${id}`)
  }

  return (
    <Card 
      onClick= {() => handleClick(props.id)}
      data-testid = "card-evento-component" 
      variant="plain"
      sx={{
        backgroundColor: "white",
        border: 0,
        cursor: "pointer",
        width: 272,
        height: 340,
        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' }
      }}
    >
      <AspectRatio
        sx = {{
          borderRadius: 5,
        }}
      >
        <img 
          src = {props.imageUrl}
          loading="lazy"
          alt = "Imagem do Evento"
        />
      </AspectRatio>

      <CardContent> 
          <Typography variant = "subtitle1" sx= {{fontWeight: 'bold'}}>
            {props.title}
          </Typography>
          <Typography>
            {props.description}
          </Typography>
          <Typography sx={{textAlign: "center", marginTop: 2}}>
          <FmdGoodOutlinedIcon />
            {props.place}
          </Typography>
      </CardContent>
    </Card>
  );
} 

export default CardEvento;

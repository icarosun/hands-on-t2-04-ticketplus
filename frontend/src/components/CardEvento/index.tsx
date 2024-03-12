import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';

interface CardEventoDataType {
  id: number;
  title: string;
  description: string;
  place: string;
  imageUrl: string;
}

const CardEvento = (props: CardEventoDataType) => {

  return (
    <Card sx={{
      borderRadius: 5,
      width: 272,
      height: 340,
    }}>
      <CardMedia
        sx={{ 
          height: 160,
          borderRadius: 5,
          margin: 2,
          marginBottom: 0
      }} image={props.imageUrl}/>
      <CardContent sx = {{
        margin: 'auto', 
        height: "100%" 
      }}> 
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

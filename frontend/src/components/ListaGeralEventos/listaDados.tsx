import { HttpInstance } from "../../utils/http";

// import { HttpInstance } from "../../../src/assets/imgs/amazon-games.jpg";


interface ProductDataType {
  id: number;
  imageUrl: string;
  titulo: string;
  localizacao: string;
  descricao: string;
  preco: number;
}

export const productData: ProductDataType[] = [];

const res = await HttpInstance.http.get("/evento");
const eventos = res.data;


eventos.map((data: ProductDataType) => {
  productData.push({
    id: data.id,
    imageUrl: data.imageUrl,
    titulo: data.titulo,
    localizacao: data.localizacao,
    descricao: data.descricao,
    preco: data.preco
  })
});

export const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 5,
      slidesToSlide: 2,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  

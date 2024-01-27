import { HttpInstance } from "../../utils/http";


interface ProductDataType {
  id: number;
  imageUrl: string;
  titulo: string;
  localizacao: string;
  descricao: string;
}

export const productData: ProductDataType[] = [];

const res = await HttpInstance.http.get("/evento");
const eventos = res.data;

eventos.map((data: ProductDataType) => {
  productData.push({
    id: data.id,
    imageUrl: "https://images.sympla.com.br/65818da477050-xs.png",
    titulo: data.titulo,
    localizacao: data.localizacao,
    descricao: data.descricao
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
  

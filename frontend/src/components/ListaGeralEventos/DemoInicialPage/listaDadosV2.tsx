import { GetEventoReqType } from "../../../interfaces/GetEventoReqType";
import { HttpInstance } from "../../../utils/http";

export const productDataV2: GetEventoReqType[] = [];

const res = await HttpInstance.http.get("/evento");
const eventos = res.data;


eventos.map((data: GetEventoReqType) => {
  productDataV2.push({
    id: data.id,
    titulo: data.titulo,
    descricao: data.descricao,
    localizacao: data.localizacao,
    faixaEtaria: data.faixaEtaria,
    vagas: data.vagas,
    dataInicio: data.dataInicio,
    dataFim: data.dataFim,
    categoria: data.categoria,
    imageUrl: data.imageUrl
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
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import EventoModal from "../CarrouselEventos/eventoModal.tsx";
import { productData, responsive } from "../CarrouselEventos/data.tsx";

export default function CarrouselEventos() {
  const product = productData.map((item, index) => (
    <EventoModal
      key={index}
      name={item.titulo}
      url={item.imageUrl}
      place={item.localizacao}
      description={item.descricao}
    />
  ));

  return (
    <div className="mt-4">
      <h5>Eventos Diversos</h5>
      <Carousel className="mt-4" showDots={true} responsive={responsive}>
        {product}
      </Carousel>
    </div>
  );
}
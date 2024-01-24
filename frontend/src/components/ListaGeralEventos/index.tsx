import { productData } from "./listaDados.tsx";
import ItemModal from "./itemModal.tsx";

export default function ListaGeralEventos() {
  return (
    <div className="mt-4 text-center">
      <h5>Eventos Diversos</h5>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 mx-auto">
        {productData.map((item, index) => (
          <div className="col mb-4" key={index}>
            <ItemModal
              name={item.titulo}
              url={item.imageUrl}
              place={item.localizacao}
              description={item.descricao}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
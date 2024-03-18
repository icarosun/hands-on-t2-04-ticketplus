import { useParams } from "react-router-dom";

const PaginaEvento = () => {
  const { id } = useParams();

  return(
    <>Pagina Evento {id}</>
  );
}

export default PaginaEvento;

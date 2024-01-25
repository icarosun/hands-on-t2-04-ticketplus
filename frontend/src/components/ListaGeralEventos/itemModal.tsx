import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import Card from "react-bootstrap/esm/Card";
import EventDetailsContainer from "../EventDetailsContaner/EventDetailsContainer";
import { getDetalhesEvento } from "../../services/evento.service";
import { DetalhesEventoType } from "../../services/evento.service";
import { defineSessaoUsuario } from "../../utils/defineSessaoUsuario";

interface EventoDataType {
  titulo: string;
  descricao: string;
  localizacao: string;
  preco: number;
}

export default function ItemModal(props: { id: string; url: string | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; place: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) {
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [eventoData, setEventoData] = useState<EventoDataType>({
    titulo: "",
    descricao: "",
    localizacao: "",
    preco: NaN
  });

  const handleCardClick = async () => {
    try {
      const idEvento = props.id;
      const res = await getDetalhesEvento(idEvento);
      setEventoData(res?.data as DetalhesEventoType);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckout = async () => {
    try {
      const res = await defineSessaoUsuario();
      const sessaoData = res.data;
      if (JSON.stringify(sessaoData) === "{}") {
        alert("Realize o login para fazer a compra");
        return
      }
      alert("Compra sendo realizada...");
    } catch (error) {
      alert("Erro ao tentar realizar a compra");
      console.error(error);
    }
  }

  useEffect(() => {
    if (
      eventoData.titulo !== ""
      && eventoData.descricao !== ""
      && eventoData.localizacao !== ""
      && String(eventoData.preco) !== "NaN"
    )
      setShowEventDetails(true);
  }, [eventoData])

  const handleCloseEventDetails = () => {
    setShowEventDetails(false);
  };

  return (
    <div className="ms-0" style={{ width: '400px' }}>
      <Card className="ms-0" style={{
        overflow: 'hidden',
        width: '400px',
        cursor: 'pointer',
        border: '0',
      }}
        onClick={() => handleCardClick()}>
        <Card.Body>
          <div>
            <Card.Img src={props.url} className="img-fluid rounded-start" style={{ width: '300px', height: '200px' }} />
            <Card.Body>
              <Card.Title>{props.name}</Card.Title>
              <Card.Text>
                {props.description}
              </Card.Text>
              <Card.Text>
                <small className="text-body-secondary"><Badge bg="secondary"><FontAwesomeIcon className="text-white me-2" icon={faMapPin}/>{props.place}</Badge></small>
              </Card.Text>
            </Card.Body>
          </div>
        </Card.Body>
      </Card>
      {/* Renderizar o EventDetailsContainer se showEventDetails for verdadeiro */}
      <EventDetailsContainer
        show={showEventDetails}
        detailsEvent={{
          id: 0,
          imageUrl: 'https://ufam.edu.br/images/Artigos/2023/04-Abril/DC_2.jpg',
          title: eventoData.titulo,
          description: eventoData.descricao,
          price: eventoData.preco,
          place: eventoData.localizacao,
          handleAddToCart: () => { },
          handleCheckout: handleCheckout,
        }}
        handleClose={handleCloseEventDetails}
      />
    </div>
  );
}
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Badge } from "react-bootstrap";
import Card from "react-bootstrap/esm/Card";
import EventDetailsContainer from "../EventDetailsContaner/EventDetailsContainer";

export default function ItemModal(props: { url: string | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; place: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) {
  const [showEventDetails, setShowEventDetails] = useState(false);

  const handleCardClick = () => {
    setShowEventDetails(true);
  };

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
        onClick={handleCardClick}>
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
          title: 'Evento XYZ',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
          price: 200.0,
          place: 'Rua X, Bairro Y nº 1',
          handleAddToCart: () => { },
          handleCheckout: () => { },
        }}
        handleClose={handleCloseEventDetails}
      />
    </div>
  );
}
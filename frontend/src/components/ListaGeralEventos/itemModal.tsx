import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Badge } from "react-bootstrap";
import Card from "react-bootstrap/esm/Card";

export default function ItemModal(props: { url: string | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; place: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) {
  const [isClicked, setClicked] = useState(false);

  const handleCardClick = () => {
    setClicked(!isClicked);
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
    </div>
  );
}
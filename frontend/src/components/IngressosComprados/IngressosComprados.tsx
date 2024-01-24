import React, { useState } from "react";
import { Modal, Button, Card, Badge, Row, Col, Figure } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket } from "@fortawesome/free-solid-svg-icons";

interface Ingresso {
    id: number;
    imageUrlEvento: string;
    nomeEvento: string;
    localEvento: string;
    dataEvento: string;
    quantidadeIngressos: number;
    nomeProprietario: string;
}

interface IngressosCompradosProps {
    ingressos: Ingresso[];
}

const IngressosComprados: React.FC<IngressosCompradosProps> = ({ ingressos }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Button variant="light" className="ms-2 me-2" onClick={handleShow}>
                <FontAwesomeIcon icon={faTicket} className="me-2" />
                INGRESSOS
            </Button>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Ingressos Comprados</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {ingressos.map((ingresso) => (
                        <Card key={ingresso.id} className="mb-4">
                            <Card.Body>
                                <Row>
                                    {/* Primeira coluna */}
                                    <Col md={6}>
                                        <Figure>
                                            <Figure.Image
                                                width={100}
                                                height={100}
                                                alt="100x100"
                                                src={ingresso.imageUrlEvento}
                                            />
                                        </Figure>
                                        <p>{ingresso.nomeEvento}</p>
                                        <p>
                                            <strong>Local:</strong> {ingresso.localEvento}
                                        </p>
                                    </Col>

                                    {/* Segunda coluna */}
                                    <Col md={6}>
                                        <p>
                                            <strong>Data:</strong> {ingresso.dataEvento}
                                        </p>
                                        <p>
                                            <strong>Quantidade de Ingressos:</strong>{" "}
                                            <Badge bg="primary">{ingresso.quantidadeIngressos}</Badge>
                                        </p>
                                        <p>
                                            <strong>Proprietário:</strong> {ingresso.nomeProprietario}
                                        </p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default IngressosComprados;
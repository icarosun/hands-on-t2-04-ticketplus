import { faCartShopping} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Badge, Button, ListGroup, Modal, ModalFooter } from 'react-bootstrap';

const CarrinhoModal = () => {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return (
        <div>
            <button type="button" onClick={handleShow} className="btn btn-light"><FontAwesomeIcon className="text-primary me-2" icon={faCartShopping} />MEU CARRINHO</button>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Carrinho de Compras</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <ListGroup as="ol" numbered>
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">Produto</div>
                                    Quantidade
                                </div>
                                <Badge bg="primary" pill>
                                    9.99
                                </Badge>
                            </ListGroup.Item>
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">Produto</div>
                                    Quantidade
                                </div>
                                <Badge bg="primary" pill>
                                    9.99
                                </Badge>
                            </ListGroup.Item>
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">Produto</div>
                                    Quantidade
                                </div>
                                <Badge bg="primary" pill>
                                    9.99
                                </Badge>
                            </ListGroup.Item>
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">Produto</div>
                                    Quantidade
                                </div>
                                <Badge bg="primary" pill>
                                    9.99
                                </Badge>
                            </ListGroup.Item>
                        </ListGroup>
                    </form>
                </Modal.Body>
                <ModalFooter>
                    <Button variant="primary" onClick={handleClose}>Finalizar Compra</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default CarrinhoModal;
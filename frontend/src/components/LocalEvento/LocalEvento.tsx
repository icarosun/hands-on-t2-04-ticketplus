import { faLocationDot, faMapPin } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { ListGroup, Modal } from 'react-bootstrap';

const LocalEventoModal = () => {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return (
        <div>
            <button type="button" onClick={handleShow} className="btn btn-light"><FontAwesomeIcon className="text-primary me-2" icon={faLocationDot} />LOCALIZAÇÃO</button>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Localização</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label>Insira o local para exibir os eventos por região</label>
                            <input
                                type="text"
                                className="form-control mt-2"
                                placeholder="onde?"
                            />
                        </div>
                        <ListGroup>
                            <ListGroup.Item><FontAwesomeIcon className="text-primary me-2" icon={faMapPin}/>Localização</ListGroup.Item>
                        </ListGroup>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default LocalEventoModal;
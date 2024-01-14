import { useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { faMasksTheater, faBurger, faGraduationCap, faChampagneGlasses, faMicrochip, faFutbol} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CategoriaEvento() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Selecione uma cateogria
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Coleções</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={4}>
              <div className="d-flex flex-column align-items-center">
                <i className="bi bi-gear-fill text-primary" style={{ fontSize: '2rem' }}> <FontAwesomeIcon icon={faMasksTheater} /></i>
                <p className="mt-2">Teatros</p>
              </div>
            </Col>
            <Col xs={4}>
              <div className="d-flex flex-column align-items-center">
                <i className="bi bi-box-arrow-up-right text-primary" style={{ fontSize: '2rem' }}><FontAwesomeIcon icon={faChampagneGlasses} /></i>
                <p className="mt-2">Festas e Shows</p>
              </div>
            </Col>
            <Col xs={4}>
              <div className="d-flex flex-column align-items-center">
                <i className="bi bi-file-earmark-pdf-fill text-primary" style={{ fontSize: '2rem' }}><FontAwesomeIcon icon={faBurger} /></i>
                <p className="mt-2">Gastronomia</p>
              </div>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xs={4}>
              <div className="d-flex flex-column align-items-center">
                <i className="bi bi-file-image-fill text-primary" style={{ fontSize: '2rem' }}><FontAwesomeIcon icon={faGraduationCap} /></i>
                <p className="mt-2">Wokshops</p>
              </div>
            </Col>
            <Col xs={4}>
              <div className="d-flex flex-column align-items-center">
                <i className="bi bi-calendar-date-fill text-primary" style={{ fontSize: '2rem' }}><FontAwesomeIcon icon={faMicrochip} /></i>
                <p className="mt-2">Tecnologia</p>
              </div>
            </Col>
            <Col xs={4}>
              <div className="d-flex flex-column align-items-center">
                <i className="bi bi-sticky-fill text-primary" style={{ fontSize: '2rem' }}><FontAwesomeIcon icon={faFutbol} /></i>
                <p className="mt-2">Esportes</p>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CategoriaEvento;

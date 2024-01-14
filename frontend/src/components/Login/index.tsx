import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const LoginModal = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const chamaPaginaDoComprador = () => {
    navigate("/paginacomprador");
  };

  return (
    <div>
      <button type="button" onClick={handleShow} className="btn btn-light">ACESSE SUA CONTA</button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Acesse Sua Conta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control mt-2"
                placeholder="digite seu email"
              />
            </div>
            <div className="mb-3">
              <label>Senha</label>
              <input
                type="password"
                className="form-control mt-2"
                placeholder="digite sua senha"
              />
            </div>
            <p className="forgot-password text-center">
              Recuperar <a href="#">senha?</a>
            </p>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            FECHAR
          </Button>
          <Button variant="primary" onClick={chamaPaginaDoComprador}>
            LOGIN
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LoginModal;
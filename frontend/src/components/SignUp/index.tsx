import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const SignUpModal = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div>
      <button type="button" className="btn btn-primary ms-4" onClick={handleShow}>CADASTRE-SE</button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registre-se</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label>Nome</label>
              <input
                type="text"
                className="form-control mt-2"
                placeholder="digite seu primeiro nome"
              />
            </div>
            <div className="mb-3">
              <label>Sobrenome</label>
              <input
                type="text"
                className="form-control mt-2"
                placeholder="digite seu sobrenome"
              />
            </div>
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
                placeholder="digite uma senha"
              />
            </div>
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              label="Sou Organizador"
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            FECHAR
          </Button>
          <Button variant="primary" onClick={handleClose}>
            SALVAR ALTERAÇÕES
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SignUpModal;
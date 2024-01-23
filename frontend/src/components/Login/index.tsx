import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { login, User } from "../../services/login.service";

const LoginModal = () => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  /*  const chamaPaginaDoComprador = () => {
    navigate("/paginacomprador");
  };*/

  async function doLogin() {
    try {
      const res: User = await login(email, password);
      localStorage.setItem("user", JSON.stringify(res));
      navigate("/paginacomprador");
    } catch (error) {
      //ToastError("Verifique suas credências e tente novamente");
      console.log(error);
    }
  }

  return (
    <div>
      <button type="button" onClick={handleShow} className="btn btn-light">
        ACESSE SUA CONTA
      </button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Acesse Sua Conta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label>Email</label>
              <input
                onChange={(e) => SetEmail(e.target.value)}
                type="email"
                className="form-control mt-2"
                placeholder="digite seu email"
              />
            </div>
            <div className="mb-3">
              <label>Senha</label>
              <input
                onChange={(e) => SetPassword(e.target.value)}
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
          <Button variant="primary" onClick={doLogin}>
            LOGIN
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LoginModal;

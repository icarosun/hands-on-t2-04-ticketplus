import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket } from '@fortawesome/free-solid-svg-icons';
import SignUpModal from '../../SignUp/index.tsx';
//import LocalEventoModal from '../../LocalEvento/LocalEvento.tsx';
import LoginModal from '../../Login/index.tsx';
//import CarrinhoModal from '../../CarrinhoDeCompra/CarrinhoDeCompra.tsx';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ height: '80px' }}>
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="navbar-brand">
          <div className="container text-center">
            <div className="row align-items-center">
              <div className="col">
                <FontAwesomeIcon icon={faTicket}></FontAwesomeIcon>
              </div>
              <div className="col">
                <h5>TicketPlus</h5>
              </div>
            </div>
          </div>
        </div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex">
            <div className="input-group">
              <input
                type="search"
                className="form-control"
                placeholder="Pesquisar Evento"
                aria-label="Search"
                style={{ width: '400px', height: '45px', border: '0', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
              />
              <button className="btn btn-primary" type="submit" style={{ width: '60px' }}>
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </form>

          <ul className="navbar-nav ms-auto">
            {/*<li className="nav-item">
              <LocalEventoModal></LocalEventoModal>
            </li>
            <li className="nav-item">
              <CarrinhoModal></CarrinhoModal>
            </li>*/}
            <li className="nav-item">
              <LoginModal></LoginModal>
            </li>
            <li className="nav-item">
              <SignUpModal></SignUpModal>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
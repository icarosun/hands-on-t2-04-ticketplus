import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket } from '@fortawesome/free-solid-svg-icons';
import LocalEventoModal from '../../LocalEvento/LocalEvento.tsx';
import CarrinhoModal from '../../CarrinhoDeCompra/CarrinhoDeCompra.tsx';
import PerfilCompradorModal from '../../PerfilModal/Comprador/index.tsx';

const NavbarComprador = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{height:'80px'}}>
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
                <form className="d-flex">
                    <div className="input-group">
                        <input
                            type="search"
                            className="form-control"
                            placeholder="Pesquisar Evento"
                            aria-label="Search"
                            style={{width:'400px', height:'45px', border:'0', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'}}
                        />
                        <button className="btn btn-primary" type="submit" style={{width:'60px'}}>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </form>

                <div className="nav justify-content-end">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ustify-content-end">

                            <li className="nav-item">
                                <LocalEventoModal></LocalEventoModal>
                            </li>
                            <li className="nav-item">
                                <CarrinhoModal></CarrinhoModal>
                            </li>
                            <li className="nav-item">
                                <PerfilCompradorModal></PerfilCompradorModal>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavbarComprador;

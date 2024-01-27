import { useEffect, useState } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket } from '@fortawesome/free-solid-svg-icons';
import PerfilCompradorModal from '../../PerfilModal/Comprador/index.tsx';
import SaldoComponente from '../../CarteiraUsuario/CarteiraItem.tsx';
import IngressosComprados from '../../IngressosComprados/IngressosComprados.tsx';
import { defineSessaoUsuario } from '../../../utils/defineSessaoUsuario.ts';


const NavbarComprador = () => {
    const [saldoAtual, setSaldoAtual] = useState<number>(0);

    useEffect(() => {
        (async () => {
            try {
                const res = await defineSessaoUsuario();
                const saldo = res.data.saldo;
                setSaldoAtual(saldo);
            } catch (error) {
                alert("Erro ao tentar obter os dados da sessão do usuário");
                console.error(error);
            }
        })();
    }, [])
    
    const ingressos = [
        {
            id: 1,
            imageUrlEvento: "https://ufam.edu.br/images/Artigos/2023/04-Abril/DC_2.jpg",
            nomeEvento: "Nome do Evento",
            localEvento: "Local do Evento",
            dataEvento: "01/01/2023",
            quantidadeIngressos: 2,
            nomeProprietario: "Proprietário 1",
        },
        {
            id: 2,
            imageUrlEvento: "https://ufam.edu.br/images/Artigos/2023/04-Abril/DC_2.jpg",
            nomeEvento: "Nome do Evento",
            localEvento: "Local do Evento",
            dataEvento: "01/01/2023",
            quantidadeIngressos: 2,
            nomeProprietario: "Proprietário 1",
        },
        {
            id: 3,
            imageUrlEvento: "https://ufam.edu.br/images/Artigos/2023/04-Abril/DC_2.jpg",
            nomeEvento: "Nome do Evento",
            localEvento: "Local do Evento",
            dataEvento: "01/01/2023",
            quantidadeIngressos: 2,
            nomeProprietario: "Proprietário 1",
        },
    ];

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ height: '80px' }}>
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
                            style={{ width: '400px', height: '45px', border: '0', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
                        />
                        <button className="btn btn-primary" type="submit" style={{ width: '60px' }}>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </form>

                <div className="nav justify-content-end">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ustify-content-end">

                            <li className="nav-item">
                                <SaldoComponente saldo={saldoAtual} />
                            </li>
                            <li className="nav-item">
                                <IngressosComprados ingressos={ingressos}></IngressosComprados>
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

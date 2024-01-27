import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket } from '@fortawesome/free-solid-svg-icons';
import PerfilCompradorModal from '../../PerfilModal/Comprador/index.tsx';
import SaldoComponente from '../../CarteiraUsuario/CarteiraItem.tsx';
import IngressosComprados from '../../IngressosComprados/IngressosComprados.tsx';
import { defineSessaoUsuario } from '../../../utils/defineSessaoUsuario.ts';
// import { InfoIngressoType } from '../../../services/listaIngressos.ts';
import { CompraType } from '../../../services/listaIngressos.ts';
import { listaIngressos } from '../../../services/listaIngressos.ts';

const NavbarComprador = () => {
    const [saldoAtual, setSaldoAtual] = useState<number>(0);
    const [ingressos, setIngressos] = useState<InfoIngressoType[]>([]);

    interface InfoIngressoType {
        id: number;
        imageUrlEvento: string;
        nomeEvento: string;
        localEvento: string;
        quantidadeIngressos: number;
        nomeProprietario: string;
    }


    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const resSessao = await defineSessaoUsuario();
                const resIngressos = await listaIngressos();
                const saldo = resSessao.data.saldo;
                setSaldoAtual(saldo);
                const compras = resIngressos?.data.compras;
                let index = 1;
                const ingressosAux: InfoIngressoType[] = [];
                compras?.map((compra: CompraType) => {
                    const ingresso = compra.evento;
                    const usuario = compra.usuario;
                    const ingressoInfo = {
                        id: parseInt(`${ingresso.id}${index}`),
                        imageUrlEvento: "https://ufam.edu.br/images/Artigos/2023/04-Abril/DC_2.jpg",
                        nomeEvento: ingresso.titulo,
                        localEvento: ingresso.localizacao,
                        quantidadeIngressos: 1,
                        nomeProprietario: usuario.nome
                    }
                    ingressosAux.push(ingressoInfo);
                    index++;
                });
                setIngressos(ingressosAux);
            } catch (error) {
                alert("Erro ao tentar obter a sessão do usuário");
                console.error(error);
            }
        })();
    }, []);
    


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

import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ListGroup, OverlayTrigger, Popover } from 'react-bootstrap';
import { logout } from '../../../services/logout.service';
import { setSession } from '../../../redux/slices/session.slice';

const PerfilCompradorModal = () => {
    const [showPopover, setShowPopover] = useState(false);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const popoverStyle = {
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        maxWidth: '300px',
        minWidth: '200px',
    };

    const handleToggle = () => setShowPopover(!showPopover);

    async function doLogout () {
        try {
            await logout();
            dispatch(setSession({
                nome: '',
                sobrenome: '',
                email: ''
            }));
            navigate("/");
        } catch (error) {
            alert("Erro ao tentar realizar o logout");
            console.error(error.response.data.msg);
        }
    }

    //const handleClose = () => setShowPopover(false);

    return (
        <OverlayTrigger
            trigger="click"
            placement="bottom"
            show={showPopover}
            overlay={
                <Popover id="popover-user-profile" style={popoverStyle}>
                    <div className="text-center">
                        {/* Foto de perfil circular */}
                        <img
                            src="https://cdn-icons-png.flaticon.com/128/826/826823.png"
                            alt="Foto de Perfil"
                            className="mb-3"
                            width="50"
                            height="50"
                        />
                        {/* Nome do usuário */}
                        <h6>Web Academy</h6>
                        {/* Lista de ações */}
                        <ListGroup className='mt-3'>
                            <ListGroup.Item action onClick={() => console.log('Configurar Perfil')}>
                                Configurar Perfil
                            </ListGroup.Item>
                            <ListGroup.Item action onClick={() => console.log('Configurações Gerais')}>
                                Configurações Gerais
                            </ListGroup.Item>
                        </ListGroup>
                        <div className="d-grid gap-2">
                            <button type="button" className="btn btn-outline-secondary btn-sm mt-3" onClick={doLogout}>Logout</button>
                        </div>
                    </div>
                </Popover>
            }
            onToggle={handleToggle}
        >
            <Button variant="primary" onClick={handleToggle} className="rounded-circle" style={{ width: '40px', height: '40px' }}>
                <FontAwesomeIcon icon={faUser} />
            </Button>
        </OverlayTrigger>
    );
}

export default PerfilCompradorModal;
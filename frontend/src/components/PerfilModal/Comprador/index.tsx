import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Button, ListGroup, OverlayTrigger, Popover } from 'react-bootstrap';

const PerfilCompradorModal = () => {
    const [showPopover, setShowPopover] = useState(false);

    const popoverStyle = {
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        maxWidth: '300px',
        minWidth: '200px',
    };

    const handleToggle = () => setShowPopover(!showPopover);

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
                            <button type="button" className="btn btn-outline-secondary btn-sm mt-3">Logout</button>
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
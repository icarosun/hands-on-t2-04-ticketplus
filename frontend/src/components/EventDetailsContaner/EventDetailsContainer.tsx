// import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Figure, Modal } from 'react-bootstrap';

// import { setQtdeIngressos } from '../../redux/slices/app.slice';

interface TicketQuantityProps {
    quantity: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TicketQuantity: React.FC<TicketQuantityProps> = ({ quantity, onChange }) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(event.target.value, 10);
        // Verifica se newQuantity é um número inteiro positivo
        if (!isNaN(newQuantity) && newQuantity >= 0 && Number.isInteger(newQuantity)) {
            onChange(event);
        }
    };

    return (
        <div className="mb-3">
            <label className="form-label">Quantidade de Ingressos:</label>
            <input
                type="number"
                className="form-control"
                value={quantity}
                onChange={handleInputChange}
            />
        </div>
    );
};

/*interface AddToCartButtonProps {
    onClick: () => void;
}*/

/*const AddToCartButton: React.FC<AddToCartButtonProps> = ({ onClick }) => (
    <button className="btn btn-primary" onClick={onClick}>
        Adicionar ao Carrinho
    </button>
);*/

// Componente para o botão de realizar uma compra
interface CheckoutButtonProps {
    onClick: () => void;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ onClick }) => (
    <button className="btn btn-primary" onClick={onClick}>
        Comprar
    </button>
);

interface EventDetailsContainerProps {
    show: boolean;
    handleClose: () => void;
    detailsEvent: {
        id: number;
        imageUrl: string;
        title: string;
        price: number;
        description: string;
        place: string,
        handleAddToCart: () => void;
        handleCheckout: () => void;
    };
}

const EventDetailsContainer: React.FC<EventDetailsContainerProps> = ({ show, handleClose, detailsEvent }) => {
    // const [ticketQuantity, setTicketQuantity] = useState(0);

    /*const handleTicketQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTicketQuantity(parseInt(event.target.value, 10));
    };*/

    /*const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setQtdeIngressos({
            qtdeIngressos: ticketQuantity
        }))
    }, [ticketQuantity]);*/

    return (
        <Modal show={show} onHide={handleClose} size="lg" dialogClassName="modal-90w" style={{ borderBottom: 'none' }}>
            <Modal.Header closeButton>
                <Modal.Title>{detailsEvent && detailsEvent.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {detailsEvent && (
                    <div className="row">
                        <div className="col-md-6">
                            <Figure>
                                <Figure.Image
                                    width={350}
                                    height={350}
                                    alt="350x350"
                                    src={detailsEvent.imageUrl}
                                />
                            </Figure>
                            <p><strong>Preço:</strong> R$ {String(detailsEvent.price).replace(".",",")}</p>
                            <p><strong>Local do Evento:</strong> {detailsEvent.place}</p>
                        </div>
                        <div className="col-md-6">
                            <p>{detailsEvent.description}</p>
                            {/*<TicketQuantity
                                quantity={ticketQuantity}
                                onChange={handleTicketQuantityChange}
                            />*/}
                        </div>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                { /* <AddToCartButton onClick={detailsEvent.handleAddToCart} /> */ }
                <CheckoutButton onClick={detailsEvent.handleCheckout} />
            </Modal.Footer>
        </Modal>
    );
}

export default EventDetailsContainer;
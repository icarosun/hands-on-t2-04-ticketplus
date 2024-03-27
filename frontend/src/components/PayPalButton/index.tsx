import {
    useState,
    useEffect
} from "react";
import { useDispatch } from 'react-redux';
import {
    PayPalScriptProvider,
    PayPalButtons
} from "@paypal/react-paypal-js";
import { setOrderId } from "../../redux/slices/app.slice";

import { compraTicket } from "../../services/compra.service";
import { PayPalButtonProps } from "../../interfaces/PayPalButtonProps";
import { Box } from "@mui/material";
import { realizaPedido } from "../../services/pedido.service";
import { CircularProgress } from '@mui/material';

const PayPalButton = (props: PayPalButtonProps) => {
    const [mostraBotoesPagamento, setMostraBotoesPagamento] = useState<boolean>(false);
    const [displayBotoesPayPal, setDisplayBotoesPayPal] = useState("none");
    const [pedidoId, setPedidoId] = useState<string>("");
    const [pagamentoAprovado, setPagamentoAprovado] = useState<boolean>(false);

    const dispatch = useDispatch();

    const onInit = () => {
        setDisplayBotoesPayPal("block");
        setMostraBotoesPagamento(true);
    }

    const createOrder = async () =>  {
        try {
            console.log(props.eventoId);
            return await realizaPedido(
                props.eventoId,
                props.quantity,
                props.tipoTicketId
            ).then((response) => response.json())
            .then((order) => {
                setPedidoId(order.pedidoId);
                dispatch(setOrderId({
                    orderId: order.id
                }));
                return order.id;
            });
        } catch (err) {
            console.error(err);
        }
    }

    async function finalizaCompra () {
        (async () => {
            if (pedidoId !== "" && pagamentoAprovado) {
                try {
                    await compraTicket(pedidoId);
                    document.querySelectorAll("button")[4].click();
                } catch (error) {
                    console.error(error);
                }
            }
        })();
    }

    useEffect(() => {
        finalizaCompra();
    }, [pedidoId]);

    useEffect(() => {
        finalizaCompra();
    }, [pagamentoAprovado]);

    const onApprove = async () =>  {
        setPagamentoAprovado(true);
    }


        return (
            <Box id="paypal-container" sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
                <Box sx={{
                    width: "100%",
                    marginTop: 4,
                    display: `${displayBotoesPayPal}`
                }}>
                    <PayPalScriptProvider
                        options={{
                            clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
                            currency: "BRL",
                            intent: "capture"
                        }}
                    >
                        <PayPalButtons
                            onInit={onInit}
                            createOrder={createOrder}
                            onApprove={onApprove}
                        />
                    </PayPalScriptProvider>
                </Box>
                {!mostraBotoesPagamento &&
                    <Box sx={{
                        marginTop: 10
                    }}>
                        <CircularProgress/>
                    </Box>
                }
            </Box>
        )
}

export default PayPalButton;
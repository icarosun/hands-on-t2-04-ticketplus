import {
    useState,
    useEffect
} from "react";
import { useDispatch } from 'react-redux';
import {
    PayPalScriptProvider,
    PayPalButtons
} from "@paypal/react-paypal-js";

// import { getPayPalToken } from "../../services/getPayPalToken.service";
import { GetPayPalTokenType } from "../../services/getPayPalToken.service";
import { compraTicket } from "../../services/compra.service";
import { PayPalButtonProps } from "../../interfaces/PayPalButtonProps";
import { setMostraBotaoComprar } from "../../redux/slices/app.slice";
import { Box } from "@mui/material";
import { realizaPedido } from "../../services/pedido.service";

const PayPalButton = (props: PayPalButtonProps) => {
    const [dadosAuthPagamento, setDadosAuthPagamento] = useState<GetPayPalTokenType | null>({
        clientId: "",
        dataClientToken: ""
    });
    const [mostraBotoesPagamento, setMostraBotoesPagamento] = useState<boolean>(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (dadosAuthPagamento?.clientId !== "")
            setMostraBotoesPagamento(true);
    }, [dadosAuthPagamento]);

    const onInit = () => {
        dispatch(setMostraBotaoComprar({
            mostraBotaoComprar: true
        }));
    }

    const createOrder = async () =>  {
        try {
            return await realizaPedido(
                props.eventoId,
                props.quantity,
                props.tipoTicketId
            ).then((response) => response.json())
            .then((order) => {
                console.log(order);
                return order.id;
            });
        } catch (err) {
            console.error(err);
        }
    }

    const onApprove = async () =>  {
        try {
            await compraTicket();
            console.log("Compra realizada com sucesso");
        } catch (error) {
            console.error(error);
        }
    }


        return (
            <Box id="paypal-container">
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
        )
}

export default PayPalButton;
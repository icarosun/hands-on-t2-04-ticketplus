import {
    useState,
    useEffect
} from "react";
import {
    PayPalScriptProvider,
    PayPalButtons
} from "@paypal/react-paypal-js";

// import { getPayPalToken } from "../../services/getPayPalToken.service";
import { GetPayPalTokenType } from "../../services/getPayPalToken.service";
import { compraTicket } from "../../services/compra.service";
import { PayPalButtonProps } from "../../interfaces/PayPalButtonProps";

const PayPalButton = (props: PayPalButtonProps) => {
    console.log(`id do pagamento: ${props.ticketId}`)
    const [dadosAuthPagamento, setDadosAuthPagamento] = useState<GetPayPalTokenType | null>({
        clientId: "",
        dataClientToken: ""
    });
    const [mostraBotoesPagamento, setMostraBotoesPagamento] = useState<boolean>(false);

    /*useEffect(() => {
        (async () => {
            try {
                const resData = await getPayPalToken();
                setDadosAuthPagamento(resData);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);*/

    useEffect(() => {
        if (dadosAuthPagamento?.clientId !== "")
            setMostraBotoesPagamento(true);
    }, [dadosAuthPagamento]);

    const createOrder = async () =>  {
        try {
            return fetch(`http://localhost:${import.meta.env.VITE_PORT_BACK}/v1/pedido`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({
                    id: props.ticketId,
                    quantity: 1,
                    intent: "capture",
                    eventoId: 1,
                    formaPagamento: "Cartão de Crédito",
                    tipoTicketId: 1
                })
            }).then((response) => response.json())
            .then((order) => {
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
            <PayPalScriptProvider
                options={{
                    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
                    currency: "BRL",
                    intent: "capture"
                }}
            >
                <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                />
            </PayPalScriptProvider>
        )
}

export default PayPalButton;
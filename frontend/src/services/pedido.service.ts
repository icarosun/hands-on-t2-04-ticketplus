import { httpFetch } from "../utils/httpFetch";

export async function realizaPedido (
    eventoId: number,
    quantity: number,
    tipoTicketId: number
): Promise<any> {
    const formaPagamento = "Cartão de Crédito";

    return await httpFetch(
        "/pedido",
        "POST",
        {
            eventoId: eventoId,
            quantity: quantity,
            formaPagamento: formaPagamento,
            tipoTicketId: tipoTicketId
        }
    );
}
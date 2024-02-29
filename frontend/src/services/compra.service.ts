import { HttpInstance } from "../utils/http";

export async function compraTicket (
    eventoId: number,
    tipoTicketId: number
) {
    return HttpInstance.http.post("/compra",
        {
            eventoId,
            formaPagamento: "Cartão de Crédito",
            tipoTicketId: tipoTicketId
        }
    );
}
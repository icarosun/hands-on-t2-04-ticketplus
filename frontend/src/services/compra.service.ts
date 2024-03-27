import { HttpInstance } from "../utils/http";

export async function compraTicket (
    pedidoId: string
) {
    return await HttpInstance.http.post("/compra", {
        pedidoId
    });
}
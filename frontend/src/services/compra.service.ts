import { HttpInstance } from "../utils/http";

export async function compraTicket (eventoId: string) {
    return HttpInstance.http.post("/compra",
        {
            eventoId
        }
    );
}
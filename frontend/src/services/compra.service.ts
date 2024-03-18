import { HttpInstance } from "../utils/http";

export async function compraTicket () {
    return await HttpInstance.http.post("/compra",);
}
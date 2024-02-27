import { HttpInstance } from "../utils/http";

export async function getTiposTickets () {
    return HttpInstance.http.get("/tipoTicket")
}
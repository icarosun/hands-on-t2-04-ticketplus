import { HttpInstance } from "../utils/http";

export interface tipoTicketsType {
    id: number | "";
    descricao: string;
}

export async function getTiposTicketsService (): Promise<tipoTicketsType[] | null> {
    const res = await HttpInstance.http.get("/tipoTicket");
    return res.data;
}

import { HttpInstance } from "../utils/http";
import { TipoTicketsEventosType } from "./cadastraEvento.service";

export async function getTiposTicketsEventosByEventoId (
    eventoId: number
): Promise<TipoTicketsEventosType[] | null> {
    const res = await HttpInstance.http.get(`/tiposTicketsEventos/${eventoId}`);
    return res.data;
}
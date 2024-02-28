import { HttpInstance } from "../utils/http";

export interface TipoTicketsEventosType {
    tipoTicketId: number;
    quantidade: number;
    preco: number;
}

export interface cadastraEventoType {
    titulo: string;
    descricao: string;
    localizacao: string;
    imageBase64: string;
    tiposTicketsEventos: TipoTicketsEventosType[];
}

export async function cadastraEvento (dadosRequisicao: cadastraEventoType) {
    return HttpInstance.http.post("/evento",
        {
            titulo: dadosRequisicao.titulo,
            descricao: dadosRequisicao.descricao,
            localizacao: dadosRequisicao.localizacao,
            imageBase64: dadosRequisicao.imageBase64,
            tiposTicketsEventos: dadosRequisicao.tiposTicketsEventos
        }
    );
}
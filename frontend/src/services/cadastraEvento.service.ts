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
    faixaEtaria: number;
    categoriaEventoId: number;
    cep: string;
    numero: number;
    imageBase64: string;
    tiposTicketsEventos: TipoTicketsEventosType[];
    dataInicio: string;
    dataFim: string;
}

export async function cadastraEvento (dadosRequisicao: cadastraEventoType) {
    return HttpInstance.http.post("/evento",
        {
            titulo: dadosRequisicao.titulo,
            descricao: dadosRequisicao.descricao,
            localizacao: dadosRequisicao.localizacao,
            faixaEtaria: dadosRequisicao.faixaEtaria,
            categoriaEventoId: dadosRequisicao.categoriaEventoId,
            cep: dadosRequisicao.cep,
            numero: dadosRequisicao.numero,
            imageBase64: dadosRequisicao.imageBase64,
            tiposTicketsEventos: dadosRequisicao.tiposTicketsEventos,
            dataInicio: `${dadosRequisicao.dataInicio}:00Z`,
            dataFim: `${dadosRequisicao.dataFim}:00Z`
        }
    );
}
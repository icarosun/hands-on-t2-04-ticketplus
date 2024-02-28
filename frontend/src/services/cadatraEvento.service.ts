import { HttpInstance } from "../utils/http";

export interface cadastraEventoType {
    titulo: string;
    descricao: string;
    localizacao: string;
    imageBase64: string;
}

export async function cadastraEvento (dadosRequisicao: cadastraEventoType) {
    return HttpInstance.http.post("/evento",
        {
            titulo: dadosRequisicao.titulo,
            descricao: dadosRequisicao.descricao,
            localizacao: dadosRequisicao.localizacao,
            imageBase64: dadosRequisicao.imageBase64
        }
    );
}
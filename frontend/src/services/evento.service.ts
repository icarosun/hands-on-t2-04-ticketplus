import { HttpInstance } from "../utils/http";

export interface DetalhesEventoType {
    titulo: string;
    descricao: string;
    localizacao: string;
    preco: number;
    data?: object;
    imageUrl: string;
}

export async function getDetalhesEvento (idEvento: number): Promise<DetalhesEventoType | null> {
    return await HttpInstance.http.get(`/evento/${idEvento}`);
}

export async function getEventosByOrganizador () {
    return await HttpInstance.http.get("/evento/eventosOrganizador");
}
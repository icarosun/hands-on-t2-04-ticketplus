import { HttpInstance } from "../utils/http";

export interface CompraType {
    id: string;
    formaPagamento: string;
    status: string;
    evento: {
        id: string;
        imageUrl: string;
        titulo: string;
        localizacao: string;
        /* quantidadeIngressos: number; */
    };
    usuario: {
        nome: string;
    };
    data: {
        compras: [];
    };
}

export async function listaIngressos (): Promise<CompraType | null> {
    return HttpInstance.http.get("/compra");
}
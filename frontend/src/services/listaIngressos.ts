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
    comprador: {
        nome: string;
    };
    data: {
        comprasData: [];
    };
    imageUrl: string;
}

export async function getIngressosByComprador (): Promise<CompraType | null> {
    return await HttpInstance.http.get("/compra");
}
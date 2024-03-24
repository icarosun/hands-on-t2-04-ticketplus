import { Evento } from "@prisma/client";

export interface EnderecosEventosType {
    cep: string;
    numero: number;
    cidade: string;
    eventos: Evento[];
}
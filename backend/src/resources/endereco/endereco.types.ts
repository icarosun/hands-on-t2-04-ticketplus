import { EnderecosEventos } from "@prisma/client";

export type CreateEnderecoEventoDto = Pick<EnderecosEventos,
    | "cep"
    | "numero"
    | "cidade"
>;

export interface DadosEnderecoType {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
  }
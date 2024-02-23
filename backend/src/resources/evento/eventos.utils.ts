import _ from "lodash";
import { salvaImagem } from "../../utils/salvaImagem";
import { excluiImagem } from "../../utils/excluiImagem";
import { TipoTicketEventoType } from "./evento.types";
import { TipoTicket } from "@prisma/client";

export function salvaImagemEvento (
    idEvento: number,
    imageBase64: string
) {
    const pastaEvents = `${__dirname.split('/resources/')[0]}/assets/img/events`;
    salvaImagem(`${pastaEvents}/${idEvento}`, imageBase64);
}

export function excluiImagemEvento (idEvento: number) {
    const pastaEvents = `${__dirname.split('/resources/')[0]}/assets/img/events`;
    excluiImagem(`${pastaEvents}/${idEvento}`);
}

export function verificaTiposTickets (
    tiposTickets: TipoTicket[], // tipoTickets[] do banco de dados
    tiposTicketsEventosReq: TipoTicketEventoType[] // tiposTicketsEventos da requisição
): boolean {
    const tiposTicketsIds: number[] = [];
    const tiposTicketsEventosReqIds: number[] = [];
    tiposTickets.map((tipoTicket) => {
        tiposTicketsIds.push(tipoTicket.id)
    });
    // Os ids dos tipos de ticket enviados na requisição devem pertencer a tipos de tickets cadastrados na tabela "tipoTickets" do banco de dados
    for (let tipoTicketEventoReq of tiposTicketsEventosReq) {
        if (!tiposTicketsIds.includes(tipoTicketEventoReq.tipoTicketId))
            return false;
        tiposTicketsEventosReqIds.push(
            tipoTicketEventoReq.tipoTicketId
        );
    }
    // Não pode haver ids de tipos de tickets repetidos na requisição
    const countReqIds = _.countBy(tiposTicketsEventosReqIds);
    const countReqIdsValues = Object.values(countReqIds);
    const uniqueReqIdsValues = _.uniq(countReqIdsValues);
    uniqueReqIdsValues.map((countId) => {
        if (countId !== 1) return false;
    });
    return true;
}
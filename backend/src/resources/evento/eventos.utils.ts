import _ from "lodash";
import { salvaImagem } from "../../utils/salvaImagem";
import { excluiImagem } from "../../utils/excluiImagem";
import { TipoTicketEventoType } from "./evento.types";
import { TipoTicket } from "@prisma/client";
import { TiposTicketsDescricoes } from "../tipoTicket/tipoTicket.constants";

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

function getTipoTicketId (
    tiposTickets: TipoTicket[], // tipoTicket[] do banco de dados
    tipoTicketDescricao: 
        TiposTicketsDescricoes.INTEIRA
        | TiposTicketsDescricoes.MEIA_ENTRADA
        | TiposTicketsDescricoes.VIP
): TipoTicket | undefined {
    return _.find(tiposTickets, (tipoTicket: TipoTicket)  => {
        if (tipoTicket.descricao === tipoTicketDescricao)
            return true;
    }) as TipoTicket;
}

function getTipoTicketPreco (
    tipoTicketId: number,
    tiposTicketsEventosReq: TipoTicketEventoType[]
): TipoTicketEventoType | undefined {
    return _.find(tiposTicketsEventosReq, (tipoTicketEvento: TipoTicketEventoType)  => {
        if (tipoTicketEvento.tipoTicketId === tipoTicketId) {
            return true;   
        }
    }) as TipoTicketEventoType;
}

export function verificaTiposTickets (
    tiposTickets: TipoTicket[], // tipoTicket[] do banco de dados
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
    const uniqueCountReqIdsValues = _.uniq(countReqIdsValues);
    for (let uniqueCountReqIdsValue of uniqueCountReqIdsValues) {
        if (uniqueCountReqIdsValue !== 1) return false;
    };
    // O preço dos tickets de meia-entrada deve ser a metade do preço dos de inteira e o preço dos tickets VIP deve ser necessariamente maior que os preços dos de inteira
    const ticketInteiraId: number = getTipoTicketId(tiposTickets, TiposTicketsDescricoes.INTEIRA)?.id as number;
    const ticketMeiaId: number = getTipoTicketId(tiposTickets, TiposTicketsDescricoes.MEIA_ENTRADA)?.id as number;
    const ticketVipId: number = getTipoTicketId(tiposTickets, TiposTicketsDescricoes.VIP)?.id as number;
    const ticketInteiraPreco: number | undefined = getTipoTicketPreco(ticketInteiraId, tiposTicketsEventosReq)?.preco;
    const ticketMeiaPreco: number | undefined = getTipoTicketPreco(ticketMeiaId, tiposTicketsEventosReq)?.preco;
    const ticketVipPreco: number | undefined = getTipoTicketPreco(ticketVipId, tiposTicketsEventosReq)?.preco;
    if (ticketInteiraPreco && ticketMeiaPreco) {
        const ticketInteiraPrecoNumber = ticketInteiraPreco as number;
        const ticketMeiaPrecoNumber = ticketMeiaPreco as number;
        const ticketMeiaPrecoNumberRound = ticketMeiaPrecoNumber.toFixed(2);
        const metadePrecoInteiraRound = (ticketInteiraPrecoNumber/2).toFixed(2);
        if (ticketMeiaPrecoNumberRound !== metadePrecoInteiraRound) return false;
    }
    if (ticketInteiraPreco && ticketVipPreco) {
        const ticketInteiraPrecoNumber: number = ticketInteiraPreco as number;
        const ticketVipPrecoNumber: number = ticketVipPreco as number;
        if (ticketVipPrecoNumber <= ticketInteiraPrecoNumber) return false;
    }
    return true;
}
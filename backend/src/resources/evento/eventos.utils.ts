import { salvaImagem } from "../../utils/salvaImagem";
import { excluiImagem } from "../../utils/excluiImagem";

export function salvaImagemEvento (idEvento: number, imageBase64: string) {
    const pastaEvents = `${__dirname.split('/resources/')[0]}/assets/img/events`;
    salvaImagem(`${pastaEvents}/${idEvento}`, imageBase64);
}

export function excluiImagemEvento (idEvento: number) {
    const pastaEvents = `${__dirname.split('/resources/')[0]}/assets/img/events`;
    excluiImagem(`${pastaEvents}/${idEvento}`);
}

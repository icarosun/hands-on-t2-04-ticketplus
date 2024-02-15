import { salvaImagem } from "../../utils/salvaImagem";

export function salvaImagemEvento (idEvento: number, imageBase64: string) {
    const pastaEvents = `${__dirname.split('/resources/')[0]}/assets/img/events`;
    salvaImagem(`${pastaEvents}/${idEvento}`, imageBase64);
}
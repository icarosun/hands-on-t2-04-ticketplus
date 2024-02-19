import { Request, Response } from "express";

async function index (req: Request, res: Response) {
    const caminhoRelativoImagem = req.originalUrl.split('/v1/')[1];
    let nomeImagem = '';
    if (caminhoRelativoImagem.includes("events")) nomeImagem = "cartaz.jpg"
    else nomeImagem = "avatar.jpg"
    const caminhoImagem = `${__dirname.split('/resources/')[0]}/assets/${caminhoRelativoImagem}/${nomeImagem}`;
    res.sendFile(caminhoImagem);
}

export default { index };
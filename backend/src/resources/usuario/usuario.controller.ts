import { Request, Response } from "express";
import { listaUsuarios } from "./usuario.service";


export async function index (req: Request, res: Response) {
    /*
        #swagger.summary = "Exibe todos os usuários."
        #swagger.responses[200] = {
   	        schema: { $ref: '#/definitions/Usuarios' }
        }
    */
    try {
        const usuarios = await listaUsuarios();
        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export default { index }
import { Request, Response } from "express";
import { getAllCompradores } from "./comprador.service"; 


export async function index (req: Request, res: Response) {
    /*
        #swagger.summary = "Exibe todos os compradores."
        #swagger.responses[200] = {
   	        schema: { $ref: '#/definitions/Compradores' }
        }
    */
    try {
        const compradores = await getAllCompradores();
        return res.status(200).json(compradores);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export default { index }
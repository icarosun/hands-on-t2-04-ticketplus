import { Request, Response } from "express";
import { getAllOrganizadores } from "./organizador.service";


export async function index (req: Request, res: Response) {
    /*
        #swagger.summary = "Exibe todos os compradores."
        #swagger.responses[200] = {
   	        schema: { $ref: '#/definitions/Compradores' }
        }
    */
    try {
        const organizadores = await getAllOrganizadores();
        return res.status(200).json(organizadores);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export default { index }
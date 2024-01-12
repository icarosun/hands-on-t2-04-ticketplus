import { Request, Response } from "express"
import { createCompra } from "./compra.service"
import { CreateCompraDto } from "./compra.types";


const create = async (req: Request, res: Response) => {
    /* #swagger.summary = 'Adiciona uma compra no banco.' */
    const compra = req.body as CreateCompraDto;
    try {
        const newCompra = await createCompra(compra);
        res.status(201).json(newCompra);
    } catch (e) {
        res.status(500).json(e);
    }
}

export default { create };
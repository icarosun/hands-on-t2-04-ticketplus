import { Request, Response } from "express";
import { createCompra } from "./compra.service";
import { CreateCompraDto } from "./compra.types";

const create = async (req: Request, res: Response) => {
  /* 
    #swagger.summary = 'Adiciona uma compra no banco.'
        #swagger.parameters['body'] = {
      in: 'body',
      schema: { $ref: '#/definitions/ModeloCompraSwagger'}
    }
  */
  let compra = req.body as CreateCompraDto;
  compra = {
    ...compra,
    usuarioId: String(req.session.uid)
  };
  try {
    const newCompra = await createCompra(compra);
    res.status(201).json(newCompra);
  } catch (e) {
    res.status(500).json(e);
  }
};

export default { create };

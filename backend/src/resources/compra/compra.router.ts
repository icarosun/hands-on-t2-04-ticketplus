import { Router } from "express";
import compraController from "./compra.controller";
import { compraSchema } from "./compra.schemas";
import { validarSchema } from "../../middlewares/validarSchema";

const router = Router();

// acrescentar middleware para segurança (validar usuario comprador)
router.post("/", validarSchema(compraSchema), compraController.create);

export default router;

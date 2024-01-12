import { Router } from "express";
import compraController from "./compra.controller"

const router = Router();

// acrescentar middlewares para validação de dados e segurança
router.post("/", compraController.create);

export default router;
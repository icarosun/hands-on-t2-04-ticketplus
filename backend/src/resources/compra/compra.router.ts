import { Router } from "express";
import compraController from "./compra.controller";
import { compraSchema } from "./compra.schemas";
import { validarSchema } from "../../middlewares/validarSchema";
import { usuarioAutenticado } from "../../middlewares/usuarioAutenticado";

const router = Router();

// Rota adicionada apenas para fins de verificação das compras na API. Não deve permanecer na versão final, a "versão de produção"
router.get("/",
    compraController.index
);

router.post("/",
    usuarioAutenticado,
    validarSchema(compraSchema),
    compraController.create
);

export default router;

import { Router } from "express";
import compraController from "./compra.controller";
import { compraSchema } from "./compra.schemas";
import { validarSchema } from "../../middlewares/validarSchema";
import { usuarioAutenticado } from "../../middlewares/usuarioAutenticado";

const router = Router();

router.post("/",
    usuarioAutenticado,
    validarSchema(compraSchema),
    compraController.create
);

export default router;

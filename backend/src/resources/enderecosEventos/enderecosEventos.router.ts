import { Router } from "express";
import { validarSchema } from "../../middlewares/validarSchema";
import { schemaEnderecosEventos } from "./enderecosEventos.schemas";
import enderecosEventosController from "./enderecosEventos.controller";

const router = Router();

router.post(
    "/",
    validarSchema(schemaEnderecosEventos),
    enderecosEventosController.readEventoByCidade
);

export default router;
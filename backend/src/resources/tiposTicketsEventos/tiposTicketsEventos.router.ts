import { Router } from "express";
import tiposTicketsEventosController from "./tiposTicketsEventos.controller";

const router = Router();

router.get("/:eventoId",
    tiposTicketsEventosController.read
);

export default router;
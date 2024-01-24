import { Router } from "express";
import eventoController from "./evento.controller"

const router = Router();

router.get("/",
    eventoController.index
);

router.get("/:idEvento",
    eventoController.getEvento
);

export default router;
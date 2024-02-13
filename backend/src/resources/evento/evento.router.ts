import { Router } from "express";
import eventoController from "./evento.controller"
import { validarSchema } from "../../middlewares/validarSchema";
import Schemasevento from "./evento.schemas";

const router = Router();

router.get("/",
    eventoController.index
);

router.get("/:idEvento",
    eventoController.getEvento
);

router.post("/", 
  validarSchema(Schemasevento.schemaCreateEvento),
  eventoController.create
);

export default router;

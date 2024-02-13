import { Router } from "express";
import eventoController from "./evento.controller"
import { validarSchema } from "../../middlewares/validarSchema";
import SchemasEvento from "./evento.schemas";
import { isOrganizador } from "../../middlewares/isOrganizador";
import { usuarioAutenticado } from "../../middlewares/usuarioAutenticado";

const router = Router();

router.get("/",
    eventoController.index
);

router.get("/:idEvento",
    eventoController.getEvento
);

router.post("/",
  usuarioAutenticado, 
  isOrganizador,
  validarSchema(SchemasEvento.schemaCreateEvento),
  eventoController.create
);

export default router;

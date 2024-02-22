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
  eventoController.read
);

router.post("/",
  usuarioAutenticado, 
  isOrganizador,
  validarSchema(SchemasEvento.schemaCreateEvento),
  eventoController.create
);

router.put("/:idEvento",
  usuarioAutenticado,
  isOrganizador,
  validarSchema(SchemasEvento.schemaUpdateEvento),
  eventoController.update
);

/*router.delete("/:idEvento",
  usuarioAutenticado,
  isOrganizador,
  eventoController.remove
);*/


export default router;

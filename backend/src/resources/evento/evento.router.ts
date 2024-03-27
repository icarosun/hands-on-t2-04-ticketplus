import { Router } from "express";
import eventoController from "./evento.controller";
import { validarSchema } from "../../middlewares/validarSchema";
import SchemasEvento from "./evento.schemas";
import { isOrganizador } from "../../middlewares/isOrganizador";
import { usuarioAutenticado } from "../../middlewares/usuarioAutenticado";

const router = Router();

router.get(
  "/",
  eventoController.index
);

router.post(
  "/",
  usuarioAutenticado,
  isOrganizador,
  validarSchema(SchemasEvento.schemaCreateEvento),
  eventoController.create
);

router.get(
  "/eventosOrganizador",
  usuarioAutenticado,
  isOrganizador,
  eventoController.getEventosByOrganziador
);

router.post(
  "/searchEventosOrganizador",
  usuarioAutenticado,
  isOrganizador,
  eventoController.searchEventosOrganizador
);

router.get(
  "/:idEvento",
  eventoController.read
);

router.get(
  "/categoria/:categoriaEventoId",
  eventoController.readCategoria
);

router.get("/search/many", eventoController.searchByTitulo);

router.put(
  "/:idEvento",
  usuarioAutenticado,
  isOrganizador,
  validarSchema(SchemasEvento.schemaCreateEvento),
  eventoController.update
);

router.put(
  "/:idEvento",
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

import { Router } from "express";
import organizadorController from "./organizador.controller";
import { usuarioAutenticado } from "../../middlewares/usuarioAutenticado";
import { isOrganizador } from "../../middlewares/isOrganizador";

const router = Router();

router.get("/", organizadorController.index);

router.get("/evento", 
  usuarioAutenticado,
  isOrganizador,
  organizadorController.readEventosByOrganizador
);

export default router;

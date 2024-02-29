import { Router } from "express";
import dashboardController from "./dashboard.controller";
import { isOrganizador } from "../../middlewares/isOrganizador";
import { usuarioAutenticado } from "../../middlewares/usuarioAutenticado";

const router = Router();

// titulo do evento
router.get(
  "/:idEvento",
  usuarioAutenticado,
  isOrganizador,
  dashboardController.modalTitle
);

router.get(
  "/cardTotal/:idEvento",
  usuarioAutenticado,
  isOrganizador,
  dashboardController.cardDataTotal
);

router.get(
  "/cardComprados/:idEvento",
  usuarioAutenticado,
  isOrganizador,
  dashboardController.cardDataComprados
);

router.get(
  "/cardReceitaTotal/:idEvento",
  usuarioAutenticado,
  isOrganizador,
  dashboardController.cardDataReceita
);

router.get(
  "/graficoX/:idEvento",
  usuarioAutenticado,
  isOrganizador,
  dashboardController.graficoX
);

router.get(
  "/graficoYDisp/:idEvento",
  usuarioAutenticado,
  isOrganizador,
  dashboardController.graficoYDisp
);

router.get(
  "/graficoYVend/:idEvento",
  usuarioAutenticado,
  isOrganizador,
  dashboardController.graficoYVend
);

export default router;

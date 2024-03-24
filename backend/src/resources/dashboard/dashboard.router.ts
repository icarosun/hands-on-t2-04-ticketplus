import { Router } from "express";
import dashboardController from "./dashboard.controller";
import { isOrganizador } from "../../middlewares/isOrganizador";
import { usuarioAutenticado } from "../../middlewares/usuarioAutenticado";

const router = Router();

router.get(
  "/graficoGeralX",
  usuarioAutenticado,
  isOrganizador,
  dashboardController.graficoXGeral
);

router.get(
  "/tabela",
  usuarioAutenticado,
  isOrganizador,
  dashboardController.tabelaGeral
);

// Porcentagem entre Vendidos e Disponibilizados
router.get(
  "/cardPorcentagemTotal",
  usuarioAutenticado,
  isOrganizador,
  dashboardController.cardPorcentagemTotal
);

router.get(
  "/cardTicketsVendidosTotal",
  usuarioAutenticado,
  isOrganizador,
  dashboardController.cardTicketsVendidosTotal
);

router.get(
  "/cardMelhorEvento",
  usuarioAutenticado,
  isOrganizador,
  dashboardController.cardMelhorEvento
);

router.get(
  "/cardVagasEventos",
  usuarioAutenticado,
  isOrganizador,
  dashboardController.cardVagasTotal
);

router.get(
  "/cardReceitaTotal",
  usuarioAutenticado,
  isOrganizador,
  dashboardController.cardReceitaTotal
);

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

router.get(
  "/tabela/:idEvento",
  usuarioAutenticado,
  isOrganizador,
  dashboardController.tabelaIndividual
);

export default router;

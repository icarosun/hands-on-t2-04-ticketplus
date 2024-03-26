import { Router } from "express";
import dashboardController from "./dashboard.controller";
import { isOrganizador } from "../../middlewares/isOrganizador";
import { usuarioAutenticado } from "../../middlewares/usuarioAutenticado";

const router = Router();

router.get(
  "/graficoGeralYFinanceiro/",
  usuarioAutenticado,
  isOrganizador,
  dashboardController.graficoYGeralFinanceiro
);

router.get(
  "/graficoGeralY/",
  usuarioAutenticado,
  isOrganizador,
  dashboardController.graficoYGeral
);

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

router.get(
  "/graficoFinanceiroPeriodoDados/:idEvento/:periodo",
  usuarioAutenticado,
  isOrganizador,
  dashboardController.graficoFinanceiroPeriodoDados
);

router.get(
  "/graficoGeralPeriodoDados/:idEvento/:periodo",
  usuarioAutenticado,
  isOrganizador,
  dashboardController.graficoGeralPeriodoDados
);

router.get(
  "/cardReceitaTotalPeriodo/:periodo",
  usuarioAutenticado,
  isOrganizador,
  dashboardController.cardReceitaTotal
);

router.get(
  "/cardPorcentagemTotal/:periodo",
  usuarioAutenticado,
  isOrganizador,
  dashboardController.cardPorcentagemTotalPeriodo
);

router.get(
  "/cardVagasEventos/:periodo",
  usuarioAutenticado,
  isOrganizador,
  dashboardController.cardVagasTotalPorPeriodo
);

router.get(
  "/graficoGeralPeriodo/:periodo",
  usuarioAutenticado,
  isOrganizador,
  dashboardController.graficoGeralPeriodo
);

router.get(
  "/tabela/:periodo",
  usuarioAutenticado,
  isOrganizador,
  dashboardController.tabelaGeral
);

// titulo do evento
router.get(
  "/:idEvento",
  usuarioAutenticado,
  isOrganizador,
  dashboardController.modalTitle
);

router.get(
  "/cardTicketsVendidosTotal/:periodo",
  usuarioAutenticado,
  isOrganizador,
  dashboardController.cardTicketsVendidosTotal
);

router.get(
  "/cardMelhorEvento/:periodo",
  usuarioAutenticado,
  isOrganizador,
  dashboardController.cardMelhorEvento
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

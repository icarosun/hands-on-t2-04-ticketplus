-- views para o dashboard
CREATE VIEW resumoGraficoFinanceiroGeral AS
SELECT
  `b`.`id` AS `id`,
  `b`.`titulo` AS `evento`,
  `b`.`organizadorId` AS `organizador`,
  `c`.`descricao` AS `tipo_ticket`,
  IFNULL(sum(`d`.`quantidade`), 0) AS `vendidos`,
  `a`.`preco` AS `preco`,
(IFNULL(sum(`d`.`quantidade`), 0) * `a`.`preco`) AS `total`
FROM
  (
    (
      (
        `ticketplus`.`tipoTicketsEventos` `a`
        JOIN `ticketplus`.`eventos` `b` ON((`b`.`id` = `a`.`eventoId`))
      )
      JOIN `ticketplus`.`tipoTickets` `c` ON((`c`.`id` = `a`.`tipoTicketId`))
    )
    LEFT JOIN `ticketplus`.`pedidos` `d` ON(
      (
        (`d`.`eventoId` = `b`.`id`)
        AND (`d`.`tipoTicketId` = `a`.`tipoTicketId`)
        AND (`d`.`status` = 'Pago')
      )
    )
  )
GROUP BY
  `b`.`id`,
  `b`.`titulo`,
  `b`.`organizadorId`,
  `a`.`preco`,
  `c`.`descricao`
ORDER BY
  `b`.`titulo`,
  `c`.`descricao`;

CREATE VIEW resumoGraficoFinanceiroPorPeriodo AS
SELECT
  `b`.`id` AS `id`,
  `b`.`titulo` AS `evento`,
  `b`.`organizadorId` AS `organizador`,
  `a`.`quantidade` AS `disponivel`,
  `c`.`descricao` AS `tipo_ticket`,
  cast(`d`.`created_at` AS date) AS `data`,
  IFNULL(sum(`d`.`quantidade`), 0) AS `vendido`,
  `a`.`preco` AS `preco`,
(IFNULL(sum(`d`.`quantidade`), 0) * `a`.`preco`) AS `valor`
FROM
  (
    (
      (
        `ticketplus`.`tipoTicketsEventos` `a`
        JOIN `ticketplus`.`eventos` `b` ON((`b`.`id` = `a`.`eventoId`))
      )
      JOIN `ticketplus`.`tipoTickets` `c` ON((`c`.`id` = `a`.`tipoTicketId`))
    )
    JOIN `ticketplus`.`pedidos` `d` ON(
      (
        (`d`.`eventoId` = `b`.`id`)
        AND (`d`.`tipoTicketId` = `a`.`tipoTicketId`)
        AND (`d`.`status` = 'Pago')
      )
    )
  )
GROUP BY
  `b`.`id`,
  `d`.`created_at`,
  `b`.`titulo`,
  `b`.`organizadorId`,
  `a`.`quantidade`,
  `c`.`descricao`,
  `a`.`preco`
ORDER BY
  `b`.`id`,
  `b`.`titulo`,
  `c`.`descricao`;

CREATE VIEW resumoGraficoGeral AS
SELECT
  `b`.`id` AS `id`,
  `b`.`titulo` AS `evento`,
  `b`.`organizadorId` AS `organizador`,
  `a`.`quantidade` AS `disponivel`,
  `c`.`descricao` AS `tipo_ticket`,
  IFNULL(sum(`d`.`quantidade`), 0) AS `vendidos`,
(
    `a`.`quantidade` - IFNULL(sum(`d`.`quantidade`), 0)
  ) AS `restante`
FROM
  (
    (
      (
        `ticketplus`.`tipoTicketsEventos` `a`
        JOIN `ticketplus`.`eventos` `b` ON((`b`.`id` = `a`.`eventoId`))
      )
      JOIN `ticketplus`.`tipoTickets` `c` ON((`c`.`id` = `a`.`tipoTicketId`))
    )
    LEFT JOIN `ticketplus`.`pedidos` `d` ON(
      (
        (`d`.`eventoId` = `b`.`id`)
        AND (`d`.`tipoTicketId` = `a`.`tipoTicketId`)
        AND (`d`.`status` = 'Pago')
      )
    )
  )
GROUP BY
  `b`.`id`,
  `b`.`titulo`,
  `b`.`organizadorId`,
  `a`.`quantidade`,
  `c`.`descricao`
ORDER BY
  `b`.`titulo`,
  `c`.`descricao`;

CREATE VIEW resumoGraficoGeralPorPeriodo AS
SELECT
  `b`.`id` AS `id`,
  `b`.`titulo` AS `evento`,
  `b`.`organizadorId` AS `organizador`,
  `a`.`quantidade` AS `disponivel`,
  `c`.`descricao` AS `tipo_ticket`,
  cast(`d`.`created_at` AS date) AS `data`,
  IFNULL(sum(`d`.`quantidade`), 0) AS `vendidos`,
(
    `a`.`quantidade` - IFNULL(sum(`d`.`quantidade`), 0)
  ) AS `restante`
FROM
  (
    (
      (
        `ticketplus`.`tipoTicketsEventos` `a`
        JOIN `ticketplus`.`eventos` `b` ON((`b`.`id` = `a`.`eventoId`))
      )
      JOIN `ticketplus`.`tipoTickets` `c` ON((`c`.`id` = `a`.`tipoTicketId`))
    )
    JOIN `ticketplus`.`pedidos` `d` ON(
      (
        (`d`.`eventoId` = `b`.`id`)
        AND (`d`.`tipoTicketId` = `a`.`tipoTicketId`)
        AND (`d`.`status` = 'Pago')
      )
    )
  )
GROUP BY
  `b`.`id`,
  `d`.`created_at`,
  `b`.`titulo`,
  `b`.`organizadorId`,
  `a`.`quantidade`,
  `c`.`descricao`
ORDER BY
  `b`.`id`,
  `b`.`titulo`,
  `c`.`descricao`;
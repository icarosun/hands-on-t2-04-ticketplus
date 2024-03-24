SELECT
  `b`.`id` AS `id`,
  `b`.`titulo` AS `evento`,
  `b`.`organizadorId` AS `organizador`,
  `c`.`descricao` AS `tipo_ticket`,
  count(`d`.`id`) AS `vendidos`,
  `a`.`preco` AS `preco`,
(count(`d`.`id`) * `a`.`preco`) AS `total`
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
  `c`.`descricao`
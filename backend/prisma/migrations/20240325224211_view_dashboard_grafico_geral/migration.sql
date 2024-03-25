CREATE VIEW resumoGraficoGeral AS
SELECT b.id as id, b.titulo as evento, b.organizadorId as organizador, a.quantidade as disponivel, c.descricao as tipo_ticket, IFNULL(SUM(d.quantidade),0) as vendidos, (a.quantidade-IFNULL(SUM(d.quantidade),0)) as restante 
FROM tipoTicketsEventos a join eventos b on b.id = a.eventoId join tipoTickets c on c.id = a.tipoTicketId left join pedidos d on d.eventoId = b.id and d.tipoTicketId = a.tipoTicketId and d.status = "Pago" GROUP by b.id, b.titulo, b.organizadorId, a.quantidade, c.descricao order by b.titulo, c.descricao;

CREATE VIEW resumoGraficoFinanceiroGeral AS
SELECT b.id as id, b.titulo as evento, b.organizadorId as organizador, c.descricao as tipo_ticket, IFNULL(SUM(d.quantidade),0) as vendidos, a.preco as preco, (IFNULL(SUM(d.quantidade),0)*preco) as total 
FROM tipoTicketsEventos a join eventos b on b.id = a.eventoId join tipoTickets c on c.id = a.tipoTicketId left join pedidos d on d.eventoId = b.id and d.tipoTicketId = a.tipoTicketId and d.status = "Pago" GROUP by b.id, b.titulo, b.organizadorId, a.preco, c.descricao order by b.titulo, c.descricao;

CREATE VIEW resumoGraficoGeralPorPeriodo AS
SELECT b.id as id, b.titulo as evento, b.organizadorId as organizador, a.quantidade as disponivel, c.descricao as tipo_ticket, DATE(d.created_at) as data, IFNULL(SUM(d.quantidade),0) as vendidos, (a.quantidade-IFNULL(SUM(d.quantidade),0)) as restante 
FROM tipoTicketsEventos a join eventos b on b.id = a.eventoId join tipoTickets c on c.id = a.tipoTicketId join pedidos d on d.eventoId = b.id and d.tipoTicketId = a.tipoTicketId and d.status = "Pago" GROUP by b.id, d.created_at, b.titulo, b.organizadorId, a.quantidade, c.descricao order by b.id, b.titulo, c.descricao;
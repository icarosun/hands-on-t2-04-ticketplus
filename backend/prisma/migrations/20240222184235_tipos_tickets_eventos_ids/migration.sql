/*
  Warnings:

  - You are about to drop the column `preco` on the `eventos` table. All the data in the column will be lost.
  - The primary key for the `tipoTicketsEventos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `tipoTicketsEventos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `eventos` DROP COLUMN `preco`;

-- AlterTable
ALTER TABLE `tipoTicketsEventos` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`eventoId`, `tipoTicketId`);

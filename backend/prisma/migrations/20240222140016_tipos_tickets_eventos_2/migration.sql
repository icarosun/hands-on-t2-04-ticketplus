/*
  Warnings:

  - You are about to drop the column `eventoId` on the `tipoTickets` table. All the data in the column will be lost.
  - Added the required column `vagas` to the `eventos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tipoTickets` DROP FOREIGN KEY `tipoTickets_eventoId_fkey`;

-- AlterTable
ALTER TABLE `eventos` ADD COLUMN `vagas` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tipoTickets` DROP COLUMN `eventoId`;

-- CreateTable
CREATE TABLE `tipoTicketsEventos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipoTicketId` INTEGER NOT NULL,
    `eventoId` INTEGER NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `preco` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tipoTicketsEventos` ADD CONSTRAINT `tipoTicketsEventos_tipoTicketId_fkey` FOREIGN KEY (`tipoTicketId`) REFERENCES `tipoTickets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tipoTicketsEventos` ADD CONSTRAINT `tipoTicketsEventos_eventoId_fkey` FOREIGN KEY (`eventoId`) REFERENCES `eventos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

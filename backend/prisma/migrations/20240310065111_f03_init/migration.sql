/*
  Warnings:

  - Added the required column `enderecoEventoId` to the `eventos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `compras` DROP FOREIGN KEY `compras_ticketId_fkey`;

-- AlterTable
ALTER TABLE `compras` MODIFY `ticketId` CHAR(36) NULL;

-- AlterTable
ALTER TABLE `eventos` ADD COLUMN `enderecoEventoId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `enderecosEventos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cep` CHAR(8) NOT NULL,
    `numero` INTEGER NOT NULL,
    `cidade` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `eventos` ADD CONSTRAINT `eventos_enderecoEventoId_fkey` FOREIGN KEY (`enderecoEventoId`) REFERENCES `enderecosEventos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compras` ADD CONSTRAINT `compras_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `tickets`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

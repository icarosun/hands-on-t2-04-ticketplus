/*
  Warnings:

  - Made the column `ticketId` on table `compras` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `compras` DROP FOREIGN KEY `compras_ticketId_fkey`;

-- AlterTable
ALTER TABLE `compras` MODIFY `ticketId` CHAR(36) NOT NULL;

-- CreateTable
CREATE TABLE `pedidos` (
    `id` CHAR(36) NOT NULL,
    `formaPagamento` VARCHAR(50) NOT NULL,
    `valor` DECIMAL(9, 2) NOT NULL,
    `status` VARCHAR(50) NOT NULL,
    `compradorId` CHAR(36) NOT NULL,
    `eventoId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pedidos` ADD CONSTRAINT `pedidos_compradorId_fkey` FOREIGN KEY (`compradorId`) REFERENCES `compradores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pedidos` ADD CONSTRAINT `pedidos_eventoId_fkey` FOREIGN KEY (`eventoId`) REFERENCES `eventos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compras` ADD CONSTRAINT `compras_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `tickets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

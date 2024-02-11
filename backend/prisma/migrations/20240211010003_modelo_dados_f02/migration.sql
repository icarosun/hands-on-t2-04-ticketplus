/*
  Warnings:

  - You are about to drop the column `usuarioId` on the `compras` table. All the data in the column will be lost.
  - You are about to alter the column `valor` on the `compras` table. The data in that column could be lost. The data in that column will be cast from `Decimal(9,2)` to `Float`.
  - You are about to drop the column `categoria` on the `eventos` table. All the data in the column will be lost.
  - You are about to alter the column `preco` on the `eventos` table. The data in that column could be lost. The data in that column will be cast from `Decimal(9,2)` to `Float`.
  - You are about to drop the `usuarios` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `compradorId` to the `compras` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoriaEventoId` to the `eventos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizadorId` to the `eventos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoTicketId` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `compras` DROP FOREIGN KEY `compras_usuarioId_fkey`;

-- AlterTable
ALTER TABLE `compras` DROP COLUMN `usuarioId`,
    ADD COLUMN `compradorId` CHAR(36) NOT NULL,
    MODIFY `valor` FLOAT NOT NULL;

-- AlterTable
ALTER TABLE `eventos` DROP COLUMN `categoria`,
    ADD COLUMN `categoriaEventoId` INTEGER NOT NULL,
    ADD COLUMN `organizadorId` CHAR(36) NOT NULL,
    MODIFY `preco` FLOAT NOT NULL;

-- AlterTable
ALTER TABLE `tickets` ADD COLUMN `tipoTicketId` CHAR(36) NOT NULL;

-- DropTable
DROP TABLE `usuarios`;

-- CreateTable
CREATE TABLE `compradores` (
    `id` CHAR(36) NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `senha` VARCHAR(100) NOT NULL,
    `saldo` FLOAT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `compradores_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `organizadores` (
    `id` CHAR(36) NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `senha` VARCHAR(100) NOT NULL,
    `conta` VARCHAR(100) NOT NULL,
    `cnpj` CHAR(14) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `organizadores_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipoTickets` (
    `id` CHAR(36) NOT NULL,
    `descricao` VARCHAR(50) NOT NULL,
    `eventoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categoriaEvento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `eventos` ADD CONSTRAINT `eventos_organizadorId_fkey` FOREIGN KEY (`organizadorId`) REFERENCES `organizadores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `eventos` ADD CONSTRAINT `eventos_categoriaEventoId_fkey` FOREIGN KEY (`categoriaEventoId`) REFERENCES `categoriaEvento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tickets` ADD CONSTRAINT `tickets_tipoTicketId_fkey` FOREIGN KEY (`tipoTicketId`) REFERENCES `tipoTickets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compras` ADD CONSTRAINT `compras_compradorId_fkey` FOREIGN KEY (`compradorId`) REFERENCES `compradores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tipoTickets` ADD CONSTRAINT `tipoTickets_eventoId_fkey` FOREIGN KEY (`eventoId`) REFERENCES `eventos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

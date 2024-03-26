/*
  Warnings:

  - You are about to drop the column `saldo` on the `compradores` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cpf]` on the table `compradores` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pedidoId]` on the table `compras` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `compradores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataFim` to the `eventos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataInicio` to the `eventos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantidade` to the `pedidos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `compradores` DROP COLUMN `saldo`,
    ADD COLUMN `cpf` CHAR(11) NOT NULL;

-- AlterTable
ALTER TABLE `eventos` ADD COLUMN `dataFim` DATETIME NOT NULL,
    ADD COLUMN `dataInicio` DATETIME NOT NULL,
    MODIFY `titulo` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `pedidos` ADD COLUMN `quantidade` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `totalTicketsComprados` (
    `cpfComprador` CHAR(11) NOT NULL,
    `eventoId` INTEGER NOT NULL,
    `totalTicketsComprados` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`cpfComprador`, `eventoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `compradores_cpf_key` ON `compradores`(`cpf`);

-- CreateIndex
CREATE UNIQUE INDEX `compras_pedidoId_key` ON `compras`(`pedidoId`);

-- CreateIndex
CREATE FULLTEXT INDEX `eventos_titulo_idx` ON `eventos`(`titulo`);

-- AddForeignKey
ALTER TABLE `totalTicketsComprados` ADD CONSTRAINT `totalTicketsComprados_cpfComprador_fkey` FOREIGN KEY (`cpfComprador`) REFERENCES `compradores`(`cpf`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `totalTicketsComprados` ADD CONSTRAINT `totalTicketsComprados_eventoId_fkey` FOREIGN KEY (`eventoId`) REFERENCES `eventos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

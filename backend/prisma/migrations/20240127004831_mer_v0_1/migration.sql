/*
  Warnings:

  - You are about to drop the column `eventoId` on the `compras` table. All the data in the column will be lost.
  - You are about to drop the column `qtdeIngressos` on the `compras` table. All the data in the column will be lost.
  - You are about to drop the column `valorTotal` on the `compras` table. All the data in the column will be lost.
  - The primary key for the `eventos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `eventos` table. The data in that column could be lost. The data in that column will be cast from `Char(36)` to `Int`.
  - You are about to drop the column `quantidade` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the column `valor` on the `tickets` table. All the data in the column will be lost.
  - You are about to alter the column `eventoId` on the `tickets` table. The data in that column could be lost. The data in that column will be cast from `Char(36)` to `Int`.
  - You are about to drop the column `sobrenome` on the `usuarios` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ticketId]` on the table `compras` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[eventoId]` on the table `tickets` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ticketId` to the `compras` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor` to the `compras` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `compras` DROP FOREIGN KEY `compras_eventoId_fkey`;

-- DropForeignKey
ALTER TABLE `tickets` DROP FOREIGN KEY `tickets_eventoId_fkey`;

-- DropForeignKey
ALTER TABLE `tickets` DROP FOREIGN KEY `tickets_usuarioId_fkey`;

-- AlterTable
ALTER TABLE `compras` DROP COLUMN `eventoId`,
    DROP COLUMN `qtdeIngressos`,
    DROP COLUMN `valorTotal`,
    ADD COLUMN `ticketId` CHAR(36) NOT NULL,
    ADD COLUMN `valor` DECIMAL(9, 2) NOT NULL;

-- AlterTable
ALTER TABLE `eventos` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `categoria` CHAR(100) NOT NULL,
    MODIFY `descricao` TEXT NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `tickets` DROP COLUMN `quantidade`,
    DROP COLUMN `usuarioId`,
    DROP COLUMN `valor`,
    MODIFY `eventoId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `usuarios` DROP COLUMN `sobrenome`;

-- CreateIndex
CREATE UNIQUE INDEX `compras_ticketId_key` ON `compras`(`ticketId`);

-- CreateIndex
CREATE UNIQUE INDEX `tickets_eventoId_key` ON `tickets`(`eventoId`);

-- AddForeignKey
ALTER TABLE `tickets` ADD CONSTRAINT `tickets_eventoId_fkey` FOREIGN KEY (`eventoId`) REFERENCES `eventos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compras` ADD CONSTRAINT `compras_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `tickets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

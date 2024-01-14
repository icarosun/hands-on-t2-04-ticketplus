/*
  Warnings:

  - You are about to drop the column `categoriaId` on the `eventos` table. All the data in the column will be lost.
  - You are about to alter the column `sobrenome` on the `usuarios` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(100)`.
  - You are about to alter the column `tipoUsuario` on the `usuarios` table. The data in that column could be lost. The data in that column will be cast from `Char(40)` to `Char(36)`.
  - You are about to drop the `categorias` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ingressos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoria` to the `eventos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `eventos` DROP FOREIGN KEY `eventos_categoriaId_fkey`;

-- DropForeignKey
ALTER TABLE `ingressos` DROP FOREIGN KEY `ingressos_eventoId_fkey`;

-- AlterTable
ALTER TABLE `eventos` DROP COLUMN `categoriaId`,
    ADD COLUMN `categoria` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `usuarios` MODIFY `sobrenome` VARCHAR(100) NOT NULL,
    MODIFY `tipoUsuario` CHAR(36) NOT NULL;

-- DropTable
DROP TABLE `categorias`;

-- DropTable
DROP TABLE `ingressos`;

-- CreateTable
CREATE TABLE `tickets` (
    `id` CHAR(36) NOT NULL,
    `valor` DECIMAL(9, 2) NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `eventoId` CHAR(36) NOT NULL,
    `usuarioId` CHAR(36) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `compras` (
    `id` CHAR(36) NOT NULL,
    `usuarioId` CHAR(36) NOT NULL,
    `eventoId` CHAR(36) NOT NULL,
    `qtde_ingressos` INTEGER NOT NULL,
    `valor_total` DECIMAL(9, 2) NOT NULL,
    `status` VARCHAR(50) NOT NULL,
    `forma_pagamento` VARCHAR(50) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tickets` ADD CONSTRAINT `tickets_eventoId_fkey` FOREIGN KEY (`eventoId`) REFERENCES `eventos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tickets` ADD CONSTRAINT `tickets_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compras` ADD CONSTRAINT `compras_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compras` ADD CONSTRAINT `compras_eventoId_fkey` FOREIGN KEY (`eventoId`) REFERENCES `eventos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

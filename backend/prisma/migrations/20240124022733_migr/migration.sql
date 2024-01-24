/*
  Warnings:

  - You are about to drop the column `forma_pagamento` on the `compras` table. All the data in the column will be lost.
  - You are about to drop the column `qtde_ingressos` on the `compras` table. All the data in the column will be lost.
  - You are about to drop the column `valor_total` on the `compras` table. All the data in the column will be lost.
  - Added the required column `formaPagamento` to the `compras` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qtdeIngressos` to the `compras` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorTotal` to the `compras` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricao` to the `eventos` table without a default value. This is not possible if the table is not empty.
  - Made the column `usuarioId` on table `tickets` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `tickets` DROP FOREIGN KEY `tickets_usuarioId_fkey`;

-- AlterTable
ALTER TABLE `compras` DROP COLUMN `forma_pagamento`,
    DROP COLUMN `qtde_ingressos`,
    DROP COLUMN `valor_total`,
    ADD COLUMN `formaPagamento` VARCHAR(50) NOT NULL,
    ADD COLUMN `qtdeIngressos` INTEGER NOT NULL,
    ADD COLUMN `valorTotal` DECIMAL(9, 2) NOT NULL,
    MODIFY `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `eventos` ADD COLUMN `descricao` VARCHAR(200) NOT NULL,
    MODIFY `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `tickets` MODIFY `usuarioId` CHAR(36) NOT NULL,
    MODIFY `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `usuarios` MODIFY `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `tickets` ADD CONSTRAINT `tickets_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

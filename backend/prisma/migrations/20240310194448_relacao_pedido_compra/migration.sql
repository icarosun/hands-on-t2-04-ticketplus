/*
  Warnings:

  - You are about to drop the column `compradorId` on the `compras` table. All the data in the column will be lost.
  - You are about to drop the column `eventoId` on the `compras` table. All the data in the column will be lost.
  - You are about to drop the column `formaPagamento` on the `compras` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `compras` table. All the data in the column will be lost.
  - You are about to drop the column `valor` on the `compras` table. All the data in the column will be lost.
  - Added the required column `pedidoId` to the `compras` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `compras` DROP FOREIGN KEY `compras_compradorId_fkey`;

-- DropForeignKey
ALTER TABLE `compras` DROP FOREIGN KEY `compras_eventoId_fkey`;

-- AlterTable
ALTER TABLE `categoriaEvento` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `compras` DROP COLUMN `compradorId`,
    DROP COLUMN `eventoId`,
    DROP COLUMN `formaPagamento`,
    DROP COLUMN `status`,
    DROP COLUMN `valor`,
    ADD COLUMN `pedidoId` CHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `enderecosEventos` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `numero` INTEGER NULL;

-- AlterTable
ALTER TABLE `tipoTickets` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `tipoTicketsEventos` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

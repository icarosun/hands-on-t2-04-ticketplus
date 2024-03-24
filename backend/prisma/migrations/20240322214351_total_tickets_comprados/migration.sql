/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `compradores` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `compradores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `compradores` ADD COLUMN `cpf` CHAR(11) NOT NULL;

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

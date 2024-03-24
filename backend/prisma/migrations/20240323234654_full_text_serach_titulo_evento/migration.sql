/*
  Warnings:

  - You are about to alter the column `dataFim` on the `eventos` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dataInicio` on the `eventos` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `eventos` MODIFY `titulo` VARCHAR(191) NOT NULL,
    MODIFY `dataFim` DATETIME NOT NULL,
    MODIFY `dataInicio` DATETIME NOT NULL;

-- CreateIndex
CREATE FULLTEXT INDEX `eventos_titulo_idx` ON `eventos`(`titulo`);
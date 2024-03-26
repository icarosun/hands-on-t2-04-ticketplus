/*
  Warnings:

  - You are about to alter the column `dataFim` on the `eventos` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dataInicio` on the `eventos` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `eventos` MODIFY `dataFim` DATETIME NOT NULL,
    MODIFY `dataInicio` DATETIME NOT NULL;

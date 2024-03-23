/*
  Warnings:

  - Added the required column `dataFim` to the `eventos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataInicio` to the `eventos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `eventos` ADD COLUMN `dataFim` DATETIME NOT NULL,
    ADD COLUMN `dataInicio` DATETIME NOT NULL;

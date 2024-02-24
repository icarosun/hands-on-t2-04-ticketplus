/*
  Warnings:

  - You are about to drop the column `valor` on the `tipoTicketsEventos` table. All the data in the column will be lost.
  - Added the required column `preco` to the `tipoTicketsEventos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tipoTicketsEventos` DROP COLUMN `valor`,
    ADD COLUMN `preco` DECIMAL(9, 2) NOT NULL;

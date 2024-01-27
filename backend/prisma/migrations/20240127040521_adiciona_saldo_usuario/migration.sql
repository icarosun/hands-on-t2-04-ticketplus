/*
  Warnings:

  - Added the required column `saldo` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `saldo` DECIMAL(9, 2) NOT NULL;

/*
  Warnings:

  - Added the required column `repeteSenha` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `repeteSenha` VARCHAR(100) NOT NULL;

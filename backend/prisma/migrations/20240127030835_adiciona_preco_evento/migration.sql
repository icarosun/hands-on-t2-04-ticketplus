/*
  Warnings:

  - Added the required column `preco` to the `eventos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `eventos` ADD COLUMN `preco` DECIMAL(9, 2) NOT NULL;

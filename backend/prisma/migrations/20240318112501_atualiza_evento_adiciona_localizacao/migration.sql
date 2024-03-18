/*
  Warnings:

  - Added the required column `localizacao` to the `eventos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `eventos` ADD COLUMN `localizacao` VARCHAR(100) NOT NULL;

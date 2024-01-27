/*
  Warnings:

  - Added the required column `eventoId` to the `compras` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `compras` ADD COLUMN `eventoId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `compras` ADD CONSTRAINT `compras_eventoId_fkey` FOREIGN KEY (`eventoId`) REFERENCES `eventos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

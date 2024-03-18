/*
  Warnings:

  - Added the required column `tipoTicketId` to the `pedidos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pedidos` ADD COLUMN `tipoTicketId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `pedidos` ADD CONSTRAINT `pedidos_tipoTicketId_fkey` FOREIGN KEY (`tipoTicketId`) REFERENCES `tipoTickets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to alter the column `conta` on the `organizadores` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(30)`.
  - You are about to alter the column `tipoTicketId` on the `tickets` table. The data in that column could be lost. The data in that column will be cast from `Char(36)` to `Int`.
  - The primary key for the `tipoTickets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `tipoTickets` table. The data in that column could be lost. The data in that column will be cast from `Char(36)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `tickets` DROP FOREIGN KEY `tickets_tipoTicketId_fkey`;

-- AlterTable
ALTER TABLE `organizadores` MODIFY `conta` VARCHAR(30) NOT NULL,
    MODIFY `cnpj` CHAR(18) NOT NULL;

-- AlterTable
ALTER TABLE `tickets` MODIFY `tipoTicketId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tipoTickets` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `tickets` ADD CONSTRAINT `tickets_tipoTicketId_fkey` FOREIGN KEY (`tipoTicketId`) REFERENCES `tipoTickets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

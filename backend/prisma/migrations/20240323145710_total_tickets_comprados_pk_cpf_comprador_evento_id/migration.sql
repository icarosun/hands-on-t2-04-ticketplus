/*
  Warnings:

  - The primary key for the `totalTicketsComprados` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `totalTicketsComprados` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `totalTicketsComprados_id_key` ON `totalTicketsComprados`;

-- AlterTable
ALTER TABLE `totalTicketsComprados` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`cpfComprador`, `eventoId`);

-- AddForeignKey
ALTER TABLE `totalTicketsComprados` ADD CONSTRAINT `totalTicketsComprados_cpfComprador_fkey` FOREIGN KEY (`cpfComprador`) REFERENCES `compradores`(`cpf`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `totalTicketsComprados` ADD CONSTRAINT `totalTicketsComprados_eventoId_fkey` FOREIGN KEY (`eventoId`) REFERENCES `eventos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

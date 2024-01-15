-- DropForeignKey
ALTER TABLE `tickets` DROP FOREIGN KEY `tickets_usuarioId_fkey`;

-- AlterTable
ALTER TABLE `tickets` MODIFY `usuarioId` CHAR(36) NULL;

-- AddForeignKey
ALTER TABLE `tickets` ADD CONSTRAINT `tickets_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

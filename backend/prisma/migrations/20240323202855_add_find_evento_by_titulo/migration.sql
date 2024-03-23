-- AlterTable
ALTER TABLE `eventos` MODIFY `titulo` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE FULLTEXT INDEX `eventos_titulo_idx` ON `eventos`(`titulo`);

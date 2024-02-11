-- AlterTable
ALTER TABLE `compradores` MODIFY `saldo` DECIMAL(9, 2) NOT NULL;

-- AlterTable
ALTER TABLE `compras` MODIFY `valor` DECIMAL(9, 2) NOT NULL;

-- AlterTable
ALTER TABLE `eventos` MODIFY `preco` DECIMAL(9, 2) NOT NULL;

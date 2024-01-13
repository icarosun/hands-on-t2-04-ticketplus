/*
  Warnings:

  - You are about to drop the `carrinho` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `carrinho_ingressos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tipos_usuarios` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usu_tipos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `carrinho` DROP FOREIGN KEY `carrinho_usuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `carrinho_ingressos` DROP FOREIGN KEY `carrinho_ingressos_carrinhoId_fkey`;

-- DropForeignKey
ALTER TABLE `carrinho_ingressos` DROP FOREIGN KEY `carrinho_ingressos_ingressosId_fkey`;

-- DropForeignKey
ALTER TABLE `usu_tipos` DROP FOREIGN KEY `usu_tipos_tipoUsuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `usu_tipos` DROP FOREIGN KEY `usu_tipos_usuarioId_fkey`;

-- DropTable
DROP TABLE `carrinho`;

-- DropTable
DROP TABLE `carrinho_ingressos`;

-- DropTable
DROP TABLE `tipos_usuarios`;

-- DropTable
DROP TABLE `usu_tipos`;

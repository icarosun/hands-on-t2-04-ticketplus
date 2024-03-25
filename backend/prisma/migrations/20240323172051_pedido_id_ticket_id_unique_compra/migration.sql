/*
  Warnings:

  - A unique constraint covering the columns `[pedidoId]` on the table `compras` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `compras_pedidoId_key` ON `compras`(`pedidoId`);

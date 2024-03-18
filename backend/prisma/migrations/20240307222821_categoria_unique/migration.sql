/*
  Warnings:

  - A unique constraint covering the columns `[descricao]` on the table `categoriaEvento` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `categoriaEvento_descricao_key` ON `categoriaEvento`(`descricao`);

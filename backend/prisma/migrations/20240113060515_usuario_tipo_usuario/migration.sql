/*
  Warnings:

  - You are about to drop the column `tipoUsuarioId` on the `usuarios` table. All the data in the column will be lost.
  - Added the required column `tipoUsuario` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuarios` DROP COLUMN `tipoUsuarioId`,
    ADD COLUMN `tipoUsuario` CHAR(40) NOT NULL;

/*
  Warnings:

  - You are about to drop the column `srcImagem` on the `eventos` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `eventos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `eventos` DROP COLUMN `srcImagem`,
    ADD COLUMN `imageUrl` VARCHAR(100) NOT NULL;

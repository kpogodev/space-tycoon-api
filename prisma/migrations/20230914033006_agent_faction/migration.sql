/*
  Warnings:

  - You are about to alter the column `faction` on the `Agent` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - A unique constraint covering the columns `[symbol]` on the table `Agent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[token]` on the table `Agent` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Agent` MODIFY `faction` ENUM('COSMIC', 'VOID', 'GALACTIC', 'QUANTUM', 'DOMINION', 'ASTRO', 'CORSAIRS', 'OBSIDIAN', 'AEGIS', 'UNITED', 'SOLITARY', 'COBALT', 'OMEGA', 'ECHO', 'LORDS', 'CULT', 'ANCIENTS', 'SHADOW', 'ETHEREAL') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Agent_symbol_key` ON `Agent`(`symbol`);

-- CreateIndex
CREATE UNIQUE INDEX `Agent_token_key` ON `Agent`(`token`);

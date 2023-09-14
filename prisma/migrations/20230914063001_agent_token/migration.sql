-- DropIndex
DROP INDEX `Agent_token_key` ON `Agent`;

-- AlterTable
ALTER TABLE `Agent` MODIFY `token` TEXT NOT NULL;

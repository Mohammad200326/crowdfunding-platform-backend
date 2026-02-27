/*
  Warnings:

  - A unique constraint covering the columns `[stripe_account_id]` on the table `campign_creators` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `campign_creators` ADD COLUMN `stripe_account_id` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `campign_creators_stripe_account_id_key` ON `campign_creators`(`stripe_account_id`);

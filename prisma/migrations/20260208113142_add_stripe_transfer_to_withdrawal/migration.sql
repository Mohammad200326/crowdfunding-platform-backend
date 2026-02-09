/*
  Warnings:

  - A unique constraint covering the columns `[stripe_transfer_id]` on the table `withdrawals` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `withdrawals` ADD COLUMN `stripe_transfer_id` VARCHAR(255) NULL,
    ADD COLUMN `transfer_amount_in_minor` INTEGER UNSIGNED NULL;

-- CreateIndex
CREATE UNIQUE INDEX `withdrawals_stripe_transfer_id_key` ON `withdrawals`(`stripe_transfer_id`);

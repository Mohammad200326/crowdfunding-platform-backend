/*
  Warnings:

  - You are about to drop the column `creator_id` on the `bank_accounts` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `donations` table. All the data in the column will be lost.
  - You are about to drop the column `payment_token` on the `donations` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `withdrawals` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stripe_checkout_session_id]` on the table `donations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripe_payment_intent_id]` on the table `donations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `bank_accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `institution_name` to the `campign_creators` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount_in_minor` to the `donations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount_in_minor` to the `withdrawals` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `bank_accounts` DROP FOREIGN KEY `bank_accounts_creator_id_fkey`;

-- DropIndex
DROP INDEX `bank_accounts_creator_id_idx` ON `bank_accounts`;

-- AlterTable
ALTER TABLE `bank_accounts` DROP COLUMN `creator_id`,
    ADD COLUMN `user_id` CHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `campign_creators` ADD COLUMN `institution_name` TEXT NOT NULL,
    ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `donations` DROP COLUMN `amount`,
    DROP COLUMN `payment_token`,
    ADD COLUMN `amount_in_minor` INTEGER UNSIGNED NOT NULL,
    ADD COLUMN `currency` VARCHAR(3) NOT NULL DEFAULT 'usd',
    ADD COLUMN `failure_reason` TEXT NULL,
    ADD COLUMN `paid_at` DATETIME(3) NULL,
    ADD COLUMN `star_value_in_minor` INTEGER UNSIGNED NOT NULL DEFAULT 500,
    ADD COLUMN `stripe_checkout_session_id` VARCHAR(255) NULL,
    ADD COLUMN `stripe_payment_intent_id` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `date_of_birth` DATE NULL;

-- AlterTable
ALTER TABLE `withdrawals` DROP COLUMN `amount`,
    ADD COLUMN `amount_in_minor` INTEGER UNSIGNED NOT NULL,
    ADD COLUMN `approved_at` DATETIME(3) NULL,
    ADD COLUMN `currency` VARCHAR(3) NOT NULL DEFAULT 'usd',
    ADD COLUMN `paid_at` DATETIME(3) NULL,
    MODIFY `status` ENUM('pending', 'approved', 'paid', 'rejected') NOT NULL DEFAULT 'pending';

-- CreateTable
CREATE TABLE `stripe_events` (
    `id` VARCHAR(255) NOT NULL,
    `type` VARCHAR(128) NOT NULL,
    `donation_id` CHAR(36) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `stripe_events_donation_id_idx`(`donation_id`),
    INDEX `stripe_events_created_at_idx`(`created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `bank_accounts_user_id_idx` ON `bank_accounts`(`user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `donations_stripe_checkout_session_id_key` ON `donations`(`stripe_checkout_session_id`);

-- CreateIndex
CREATE UNIQUE INDEX `donations_stripe_payment_intent_id_key` ON `donations`(`stripe_payment_intent_id`);

-- CreateIndex
CREATE INDEX `donations_payment_status_idx` ON `donations`(`payment_status`);

-- CreateIndex
CREATE INDEX `donations_campign_id_payment_status_idx` ON `donations`(`campign_id`, `payment_status`);

-- CreateIndex
CREATE INDEX `withdrawals_status_idx` ON `withdrawals`(`status`);

-- AddForeignKey
ALTER TABLE `bank_accounts` ADD CONSTRAINT `bank_accounts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stripe_events` ADD CONSTRAINT `stripe_events_donation_id_fkey` FOREIGN KEY (`donation_id`) REFERENCES `donations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

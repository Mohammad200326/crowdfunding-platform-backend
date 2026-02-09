/*
  Warnings:

  - Adding platform fee fields to withdrawals table
  - Renaming amount_in_minor to stars_number
*/

-- Add new columns with defaults first
ALTER TABLE `withdrawals` 
    ADD COLUMN `net_stars` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    ADD COLUMN `platform_fee_rate` DOUBLE NOT NULL DEFAULT 0.20,
    ADD COLUMN `platform_fee_stars` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    ADD COLUMN `stars_number` INTEGER UNSIGNED NOT NULL DEFAULT 0;

-- Copy existing data from amount_in_minor to stars_number
UPDATE `withdrawals` SET `stars_number` = COALESCE(`amount_in_minor`, 0);

-- Calculate net_stars and platform_fee_stars for existing records
UPDATE `withdrawals` SET 
    `platform_fee_stars` = FLOOR(`stars_number` * 0.20),
    `net_stars` = `stars_number` - FLOOR(`stars_number` * 0.20);

-- Drop the old column
ALTER TABLE `withdrawals` DROP COLUMN `amount_in_minor`;

-- Remove default from stars_number (optional, Prisma will handle this)
ALTER TABLE `withdrawals` ALTER COLUMN `stars_number` DROP DEFAULT;

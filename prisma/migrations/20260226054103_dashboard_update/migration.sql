-- AlterTable
ALTER TABLE `campaign_updates` ADD COLUMN `status` ENUM('pending', 'confirmed', 'rejected') NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('DONOR', 'CAMPAIGN_CREATOR', 'ADMIN') NOT NULL DEFAULT 'DONOR';

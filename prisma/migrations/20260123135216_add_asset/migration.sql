/*
  Warnings:

  - You are about to drop the column `proof_document` on the `bank_accounts` table. All the data in the column will be lost.
  - You are about to drop the column `media` on the `campaign_updates` table. All the data in the column will be lost.
  - You are about to drop the column `ininstitution_stitution_legal_status` on the `campign_creators` table. All the data in the column will be lost.
  - You are about to drop the column `institution_authorization_letter` on the `campign_creators` table. All the data in the column will be lost.
  - You are about to drop the column `institution_commercial_license` on the `campign_creators` table. All the data in the column will be lost.
  - You are about to drop the column `institution_commissioner_image` on the `campign_creators` table. All the data in the column will be lost.
  - You are about to drop the column `institution_registration_certificate` on the `campign_creators` table. All the data in the column will be lost.
  - You are about to drop the column `institution_representative_id_photo` on the `campign_creators` table. All the data in the column will be lost.
  - You are about to drop the column `upadted_at` on the `campign_creators` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `campigns` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `users` table. All the data in the column will be lost.
  - Added the required column `institution_legal_status` to the `campign_creators` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bank_accounts` DROP COLUMN `proof_document`;

-- AlterTable
ALTER TABLE `campaign_updates` DROP COLUMN `media`;

-- AlterTable
ALTER TABLE `campign_creators` DROP COLUMN `ininstitution_stitution_legal_status`,
    DROP COLUMN `institution_authorization_letter`,
    DROP COLUMN `institution_commercial_license`,
    DROP COLUMN `institution_commissioner_image`,
    DROP COLUMN `institution_registration_certificate`,
    DROP COLUMN `institution_representative_id_photo`,
    DROP COLUMN `upadted_at`,
    ADD COLUMN `institution_legal_status` TEXT NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `campigns` DROP COLUMN `thumbnail`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `avatar`;

-- CreateTable
CREATE TABLE `assets` (
    `id` CHAR(36) NOT NULL,
    `storage_provider_name` ENUM('IMAGE_KIT') NOT NULL DEFAULT 'IMAGE_KIT',
    `file_id` VARCHAR(191) NOT NULL,
    `url` TEXT NOT NULL,
    `file_type` TEXT NOT NULL,
    `file_size_in_kb` INTEGER UNSIGNED NOT NULL,
    `kind` ENUM('USER_AVATAR', 'CAMPAIGN_THUMBNAIL', 'CAMPAIGN_UPDATE_MEDIA', 'INSTITUTION_REGISTRATION_CERTIFICATE', 'INSTITUTION_COMMERCIAL_LICENSE', 'INSTITUTION_REPRESENTATIVE_ID_PHOTO', 'INSTITUTION_COMMISSIONER_IMAGE', 'INSTITUTION_AUTHORIZATION_LETTER', 'BANK_PROOF_DOCUMENT') NOT NULL,
    `owner_id` CHAR(36) NOT NULL,
    `user_id` CHAR(36) NULL,
    `campaign_id` CHAR(36) NULL,
    `campaign_update_id` CHAR(36) NULL,
    `creator_id` CHAR(36) NULL,
    `bank_account_id` CHAR(36) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `assets_file_id_key`(`file_id`),
    INDEX `assets_owner_id_idx`(`owner_id`),
    INDEX `assets_user_id_idx`(`user_id`),
    INDEX `assets_campaign_id_idx`(`campaign_id`),
    INDEX `assets_campaign_update_id_idx`(`campaign_update_id`),
    INDEX `assets_creator_id_idx`(`creator_id`),
    INDEX `assets_bank_account_id_idx`(`bank_account_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `assets` ADD CONSTRAINT `assets_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assets` ADD CONSTRAINT `assets_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assets` ADD CONSTRAINT `assets_campaign_id_fkey` FOREIGN KEY (`campaign_id`) REFERENCES `campigns`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assets` ADD CONSTRAINT `assets_campaign_update_id_fkey` FOREIGN KEY (`campaign_update_id`) REFERENCES `campaign_updates`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assets` ADD CONSTRAINT `assets_creator_id_fkey` FOREIGN KEY (`creator_id`) REFERENCES `campign_creators`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assets` ADD CONSTRAINT `assets_bank_account_id_fkey` FOREIGN KEY (`bank_account_id`) REFERENCES `bank_accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

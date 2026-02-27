/*
  Warnings:

  - You are about to drop the column `date_of_birth` on the `donors` table. All the data in the column will be lost.
  - Added the required column `date_of_birth` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `assets` ADD COLUMN `donor_identity_id` CHAR(36) NULL,
    MODIFY `kind` ENUM('USER_AVATAR', 'CAMPAIGN_THUMBNAIL', 'CAMPAIGN_UPDATE_MEDIA', 'INSTITUTION_REGISTRATION_CERTIFICATE', 'INSTITUTION_COMMERCIAL_LICENSE', 'INSTITUTION_REPRESENTATIVE_ID_PHOTO', 'INSTITUTION_COMMISSIONER_IMAGE', 'INSTITUTION_AUTHORIZATION_LETTER', 'BANK_PROOF_DOCUMENT', 'DONOR_ID_FRONT', 'DONOR_ID_BACK', 'DONOR_ID_SELFIE_WITH_ID') NOT NULL;

-- AlterTable
ALTER TABLE `donors` DROP COLUMN `date_of_birth`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `date_of_birth` DATE NOT NULL,
    MODIFY `country` TEXT NULL,
    MODIFY `phone_number` TEXT NULL,
    MODIFY `notes` TEXT NULL;

-- CreateTable
CREATE TABLE `donor_identities` (
    `id` CHAR(36) NOT NULL,
    `donor_id` CHAR(36) NOT NULL,
    `full_name_on_id` VARCHAR(150) NOT NULL,
    `id_number` VARCHAR(64) NULL,
    `reviewed_at` DATETIME(3) NULL,
    `rejection_reason` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `donor_identities_donor_id_key`(`donor_id`),
    UNIQUE INDEX `donor_identities_id_number_key`(`id_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `assets_donor_identity_id_idx` ON `assets`(`donor_identity_id`);

-- CreateIndex
CREATE INDEX `assets_donor_identity_id_kind_idx` ON `assets`(`donor_identity_id`, `kind`);

-- AddForeignKey
ALTER TABLE `donor_identities` ADD CONSTRAINT `donor_identities_donor_id_fkey` FOREIGN KEY (`donor_id`) REFERENCES `donors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assets` ADD CONSTRAINT `assets_donor_identity_id_fkey` FOREIGN KEY (`donor_identity_id`) REFERENCES `donor_identities`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

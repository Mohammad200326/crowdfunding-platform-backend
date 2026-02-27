-- AlterTable
ALTER TABLE `assets` ADD COLUMN `creator_identity_id` CHAR(36) NULL,
    MODIFY `kind` ENUM('USER_AVATAR', 'CAMPAIGN_THUMBNAIL', 'CAMPAIGN_UPDATE_MEDIA', 'INSTITUTION_REGISTRATION_CERTIFICATE', 'INSTITUTION_COMMERCIAL_LICENSE', 'INSTITUTION_REPRESENTATIVE_ID_PHOTO', 'INSTITUTION_COMMISSIONER_IMAGE', 'INSTITUTION_AUTHORIZATION_LETTER', 'BANK_PROOF_DOCUMENT', 'DONOR_ID_FRONT', 'DONOR_ID_BACK', 'DONOR_ID_SELFIE_WITH_ID', 'CREATOR_ID_FRONT', 'CREATOR_ID_BACK', 'CREATOR_ID_SELFIE_WITH_ID') NOT NULL;

-- CreateTable
CREATE TABLE `creator_identities` (
    `id` CHAR(36) NOT NULL,
    `creator_id` CHAR(36) NOT NULL,
    `full_name_on_id` VARCHAR(150) NOT NULL,
    `id_number` VARCHAR(64) NULL,
    `reviewed_at` DATETIME(3) NULL,
    `rejection_reason` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `creator_identities_creator_id_key`(`creator_id`),
    UNIQUE INDEX `creator_identities_id_number_key`(`id_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `assets_creator_identity_id_idx` ON `assets`(`creator_identity_id`);

-- CreateIndex
CREATE INDEX `assets_creator_identity_id_kind_idx` ON `assets`(`creator_identity_id`, `kind`);

-- AddForeignKey
ALTER TABLE `creator_identities` ADD CONSTRAINT `creator_identities_creator_id_fkey` FOREIGN KEY (`creator_id`) REFERENCES `campign_creators`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assets` ADD CONSTRAINT `assets_creator_identity_id_fkey` FOREIGN KEY (`creator_identity_id`) REFERENCES `creator_identities`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE `users` (
    `id` CHAR(36) NOT NULL,
    `firstName` TEXT NOT NULL,
    `lastName` TEXT NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` TEXT NOT NULL,
    `role` ENUM('DONOR', 'CAMPAIGN_CREATOR') NOT NULL DEFAULT 'DONOR',
    `country` TEXT NOT NULL,
    `phone_number` TEXT NOT NULL,
    `avatar` TEXT NOT NULL,
    `notes` TEXT NOT NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `is_verified` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `verification_status` ENUM('pending', 'confirmed', 'rejected') NOT NULL DEFAULT 'pending',

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_preferences` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `preference` ENUM('WATER', 'HEALTH', 'ENVIROMENT', 'FOOD', 'EDUCATION', 'SHELTER', 'ANIMALS') NOT NULL,

    UNIQUE INDEX `user_preferences_user_id_preference_key`(`user_id`, `preference`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `campigns` (
    `id` CHAR(36) NOT NULL,
    `creator_id` CHAR(36) NOT NULL,
    `title` TEXT NOT NULL,
    `description` TEXT NOT NULL,
    `category` ENUM('WATER', 'HEALTH', 'ENVIROMENT', 'FOOD', 'EDUCATION', 'SHELTER', 'ANIMALS') NOT NULL DEFAULT 'WATER',
    `goal` INTEGER NOT NULL,
    `thumbnail` TEXT NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `motivation_message` TEXT NOT NULL,
    `status` ENUM('pending', 'confirmed', 'rejected') NOT NULL DEFAULT 'pending',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `is_verified` BOOLEAN NOT NULL DEFAULT false,
    `verification_status` ENUM('pending', 'confirmed', 'rejected') NOT NULL DEFAULT 'pending',
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `notes` TEXT NOT NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `likes` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `donations` (
    `id` CHAR(36) NOT NULL,
    `user_id` CHAR(36) NOT NULL,
    `campign_id` CHAR(36) NOT NULL,
    `stars` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,
    `payment_token` TEXT NOT NULL,
    `payment_status` ENUM('pending', 'completed', 'failed') NOT NULL DEFAULT 'pending',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `campaign_updates` (
    `id` CHAR(36) NOT NULL,
    `campign_id` CHAR(36) NOT NULL,
    `title` TEXT NOT NULL,
    `description` TEXT NOT NULL,
    `media` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `campaign_updates_campign_id_idx`(`campign_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `withdrawals` (
    `id` CHAR(36) NOT NULL,
    `creator_id` CHAR(36) NOT NULL,
    `bank_account_id` CHAR(36) NOT NULL,
    `amount` INTEGER NOT NULL,
    `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
    `notes` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `withdrawals_creator_id_idx`(`creator_id`),
    INDEX `withdrawals_bank_account_id_idx`(`bank_account_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `donors` (
    `id` CHAR(36) NOT NULL,
    `user_id` CHAR(36) NOT NULL,
    `date_of_birth` DATE NOT NULL,
    `areas_of_interest` TEXT NOT NULL,
    `preferred_campaign_types` TEXT NOT NULL,
    `geographic_scope` ENUM('local', 'global') NOT NULL,
    `target_audience` TEXT NOT NULL,
    `preferred_campaign_size` INTEGER NOT NULL,
    `preferred_campaign_visibility` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `donors_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `campign_creators` (
    `id` CHAR(36) NOT NULL,
    `type` ENUM('INDIVIDUAL', 'INSTITUTION') NOT NULL,
    `user_id` CHAR(36) NOT NULL,
    `institution_type` TEXT NOT NULL,
    `institution_country` TEXT NOT NULL,
    `institution_date_of_establishment` DATE NOT NULL,
    `ininstitution_stitution_legal_status` TEXT NOT NULL,
    `institution_tax_identification_number` TEXT NOT NULL,
    `institution_registration_number` TEXT NOT NULL,
    `institution_registration_certificate` TEXT NOT NULL,
    `institution_commercial_license` TEXT NOT NULL,
    `institution_representative_name` TEXT NOT NULL,
    `institution_representative_position` TEXT NOT NULL,
    `institution_representative_registration_number` TEXT NOT NULL,
    `institution_representative_id_photo` TEXT NOT NULL,
    `institution_commissioner_image` TEXT NOT NULL,
    `institution_authorization_letter` TEXT NOT NULL,
    `institution_website` TEXT NOT NULL,
    `institution_representative_social_media` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `upadted_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `campign_creators_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bank_accounts` (
    `id` CHAR(36) NOT NULL,
    `creator_id` CHAR(36) NOT NULL,
    `bank_name` TEXT NOT NULL,
    `iban` TEXT NOT NULL,
    `is_verified` BOOLEAN NOT NULL DEFAULT false,
    `proof_document` TEXT NOT NULL,
    `notes` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `bank_accounts_creator_id_idx`(`creator_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_preferences` ADD CONSTRAINT `user_preferences_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `campigns` ADD CONSTRAINT `campigns_creator_id_fkey` FOREIGN KEY (`creator_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donations` ADD CONSTRAINT `donations_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donations` ADD CONSTRAINT `donations_campign_id_fkey` FOREIGN KEY (`campign_id`) REFERENCES `campigns`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `campaign_updates` ADD CONSTRAINT `campaign_updates_campign_id_fkey` FOREIGN KEY (`campign_id`) REFERENCES `campigns`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `withdrawals` ADD CONSTRAINT `withdrawals_creator_id_fkey` FOREIGN KEY (`creator_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `withdrawals` ADD CONSTRAINT `withdrawals_bank_account_id_fkey` FOREIGN KEY (`bank_account_id`) REFERENCES `bank_accounts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donors` ADD CONSTRAINT `donors_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `campign_creators` ADD CONSTRAINT `campign_creators_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bank_accounts` ADD CONSTRAINT `bank_accounts_creator_id_fkey` FOREIGN KEY (`creator_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

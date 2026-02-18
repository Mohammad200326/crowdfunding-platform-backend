/*
  Warnings:

  - You are about to drop the column `likes` on the `campigns` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `campigns` DROP COLUMN `likes`;

-- CreateTable
CREATE TABLE `CampaignLike` (
    `userId` CHAR(36) NOT NULL,
    `campaignId` CHAR(36) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `CampaignLike_campaignId_idx`(`campaignId`),
    INDEX `CampaignLike_userId_idx`(`userId`),
    PRIMARY KEY (`userId`, `campaignId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CampaignLike` ADD CONSTRAINT `CampaignLike_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignLike` ADD CONSTRAINT `CampaignLike_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `campigns`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

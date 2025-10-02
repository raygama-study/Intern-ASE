/*
  Warnings:

  - You are about to drop the `comment_reports` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `story_reports` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `comment_reports` DROP FOREIGN KEY `comment_reports_ibfk_1`;

-- DropForeignKey
ALTER TABLE `comment_reports` DROP FOREIGN KEY `comment_reports_ibfk_2`;

-- DropForeignKey
ALTER TABLE `story_reports` DROP FOREIGN KEY `story_reports_ibfk_1`;

-- DropForeignKey
ALTER TABLE `story_reports` DROP FOREIGN KEY `story_reports_ibfk_2`;

-- AlterTable
ALTER TABLE `stories` ADD COLUMN `isFlagged` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `comment_reports`;

-- DropTable
DROP TABLE `story_reports`;

-- CreateTable
CREATE TABLE `profanes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_story` INTEGER NOT NULL,
    `category` VARCHAR(255) NOT NULL,

    INDEX `id_story`(`id_story`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `profanes` ADD CONSTRAINT `profanes_ibfk_1` FOREIGN KEY (`id_story`) REFERENCES `stories`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

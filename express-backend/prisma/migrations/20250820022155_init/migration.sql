-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comment_reports` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_comment` INTEGER NOT NULL,
    `id_moderator` INTEGER NULL,
    `reason` TEXT NULL,
    `is_approved` BOOLEAN NULL,
    `is_reported_by_ai` BOOLEAN NULL DEFAULT false,

    INDEX `id_comment`(`id_comment`),
    INDEX `id_moderator`(`id_moderator`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_story` INTEGER NOT NULL,
    `content` TEXT NOT NULL,
    `status` ENUM('posted', 'hold', 'deleted') NOT NULL DEFAULT 'posted',

    INDEX `id_story`(`id_story`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_story` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    INDEX `id_story`(`id_story`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `moderators` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `name` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `username`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` TEXT NOT NULL,
    `status` ENUM('posted', 'hold', 'deleted') NOT NULL DEFAULT 'posted',
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletion_token` VARCHAR(100) NULL,
    `deleted_at` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `story_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_story` INTEGER NOT NULL,
    `id_categories` INTEGER NOT NULL,

    INDEX `id_categories`(`id_categories`),
    INDEX `id_story`(`id_story`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `story_reports` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_story` INTEGER NOT NULL,
    `id_moderator` INTEGER NULL,
    `reason` TEXT NULL,
    `is_approved` BOOLEAN NULL,
    `is_reported_by_ai` BOOLEAN NULL DEFAULT false,

    INDEX `id_moderator`(`id_moderator`),
    INDEX `id_story`(`id_story`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `comment_reports` ADD CONSTRAINT `comment_reports_ibfk_1` FOREIGN KEY (`id_comment`) REFERENCES `comments`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `comment_reports` ADD CONSTRAINT `comment_reports_ibfk_2` FOREIGN KEY (`id_moderator`) REFERENCES `moderators`(`id`) ON DELETE SET NULL ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`id_story`) REFERENCES `stories`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `images` ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`id_story`) REFERENCES `stories`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `story_categories` ADD CONSTRAINT `story_categories_ibfk_1` FOREIGN KEY (`id_story`) REFERENCES `stories`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `story_categories` ADD CONSTRAINT `story_categories_ibfk_2` FOREIGN KEY (`id_categories`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `story_reports` ADD CONSTRAINT `story_reports_ibfk_1` FOREIGN KEY (`id_story`) REFERENCES `stories`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `story_reports` ADD CONSTRAINT `story_reports_ibfk_2` FOREIGN KEY (`id_moderator`) REFERENCES `moderators`(`id`) ON DELETE SET NULL ON UPDATE RESTRICT;

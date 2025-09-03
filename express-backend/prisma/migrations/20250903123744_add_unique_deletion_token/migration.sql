/*
  Warnings:

  - A unique constraint covering the columns `[deletion_token]` on the table `stories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `stories_deletion_token_key` ON `stories`(`deletion_token`);

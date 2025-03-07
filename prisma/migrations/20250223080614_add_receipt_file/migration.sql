/*
  Warnings:

  - Added the required column `copyOfReceipt` to the `Receipt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Receipt` ADD COLUMN `copyOfReceipt` VARCHAR(191) NOT NULL;

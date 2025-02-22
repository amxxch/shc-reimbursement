/*
  Warnings:

  - Added the required column `uid` to the `Reimbursement_Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Reimbursement_Request` ADD COLUMN `uid` VARCHAR(191) NOT NULL;

/*
  Warnings:

  - You are about to drop the column `claimant_id` on the `Reimbursement_Request` table. All the data in the column will be lost.
  - Added the required column `email` to the `Reimbursement_Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `Reimbursement_Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `Reimbursement_Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `Reimbursement_Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Reimbursement_Request` DROP COLUMN `claimant_id`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `first_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `last_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone_number` VARCHAR(191) NOT NULL;

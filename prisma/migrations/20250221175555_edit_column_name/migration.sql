/*
  Warnings:

  - You are about to drop the column `event_poster` on the `Reimbursement_Request` table. All the data in the column will be lost.
  - Added the required column `email_poster` to the `Reimbursement_Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Reimbursement_Request` DROP COLUMN `event_poster`,
    ADD COLUMN `email_poster` VARCHAR(191) NOT NULL;

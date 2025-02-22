-- CreateTable
CREATE TABLE `Reimbursement_Request` (
    `request_id` INTEGER NOT NULL AUTO_INCREMENT,
    `claimant_id` INTEGER NOT NULL,
    `event_name` VARCHAR(191) NOT NULL,
    `event_date` DATETIME(3) NOT NULL,
    `organizing_committee` VARCHAR(191) NOT NULL,
    `num_of_participants` INTEGER NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `total_amount` DOUBLE NOT NULL,
    `event_poster` VARCHAR(191) NOT NULL,
    `participant_list` VARCHAR(191) NOT NULL,
    `submission_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(191) NOT NULL DEFAULT 'Pending',

    PRIMARY KEY (`request_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Receipt` (
    `receipt_id` INTEGER NOT NULL AUTO_INCREMENT,
    `request_id` INTEGER NOT NULL,
    `payment_method` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,

    PRIMARY KEY (`receipt_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Additional_Documents` (
    `doc_id` INTEGER NOT NULL AUTO_INCREMENT,
    `receipt_id` INTEGER NOT NULL,
    `doc_type` VARCHAR(191) NOT NULL,
    `file_path` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`doc_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Receipt` ADD CONSTRAINT `Receipt_request_id_fkey` FOREIGN KEY (`request_id`) REFERENCES `Reimbursement_Request`(`request_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Additional_Documents` ADD CONSTRAINT `Additional_Documents_receipt_id_fkey` FOREIGN KEY (`receipt_id`) REFERENCES `Receipt`(`receipt_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

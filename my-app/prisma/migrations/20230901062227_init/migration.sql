-- CreateTable
CREATE TABLE `todo` (
    `todo_id` INTEGER NOT NULL AUTO_INCREMENT,
    `todo_category` VARCHAR(191) NOT NULL,
    `todo_title` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `todo_todo_category_key`(`todo_category`),
    PRIMARY KEY (`todo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

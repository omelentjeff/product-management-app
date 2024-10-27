-- Drop the `user_entity`, `product`, and `nutritional_fact` tables if they exist
DROP TABLE IF EXISTS `user_entity`;
DROP TABLE IF EXISTS `product`;
DROP TABLE IF EXISTS `nutritional_fact`;

-- Drop the database if it exists
DROP DATABASE IF EXISTS `products_db`;

-- Create the database
CREATE DATABASE IF NOT EXISTS `products_db`;

-- Switch to the new database
USE `products_db`;

-- Create the `nutritional_fact` table
CREATE TABLE IF NOT EXISTS `nutritional_fact` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `calories` INT,
    `kilojoules` INT,
    `fat` DECIMAL(10, 2),
    `carbohydrates` DECIMAL(10, 2),
    `sugars` DECIMAL(10, 2),
    `polyols` DECIMAL(10, 2),
    `fibers` DECIMAL(10, 2),
    `protein` DECIMAL(10, 2),
    `sodium` DECIMAL(10, 2),
    `vitaminc` DECIMAL(10, 2),
    `calcium` DECIMAL(10, 2)
);

-- Create the `product` table with a foreign key to `nutritional_fact`
CREATE TABLE IF NOT EXISTS `product` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `manufacturer` VARCHAR(255),
    `name` VARCHAR(255),
    `weight` DECIMAL(10, 2),
    `nutritional_fact_id` BIGINT,
    `photo_url` VARCHAR(255),
    `gtin` VARCHAR(50),
    CONSTRAINT `fk_product_nutritional_fact` FOREIGN KEY (`nutritional_fact_id`) REFERENCES `nutritional_fact` (`id`) ON DELETE CASCADE
);

-- Create the `user_entity` table for user information
CREATE TABLE IF NOT EXISTS `user_entity` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `username` VARCHAR(255) UNIQUE NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(50) NOT NULL
);

-- Add indexes for faster query performance on frequently searched columns
CREATE INDEX idx_nutritional_fact_id ON `product`(`nutritional_fact_id`);
CREATE INDEX idx_username ON `user_entity`(`username`);

-- Drop user if it already exists
DROP USER IF EXISTS 'product_admin'@'%';

-- Create a new user and grant privileges on the `products_db` database
CREATE USER 'product_admin'@'%' IDENTIFIED BY 'productPW1!';
GRANT ALL PRIVILEGES ON `products_db`.* TO 'product_admin'@'%';
FLUSH PRIVILEGES;


INSERT INTO `nutritional_fact` (`calories`, `kilojoules`, `fat`, `carbohydrates`, `sugars`, `polyols`, `fibers`, `protein`, `sodium`) VALUES
(263, 1097, 2.9, 94, 0.24, 88, 0.93, 0.14, 0.03),
(269, 1118, 3.8, 93, 0, 88, 0.99, 0, 0.03),
(271, 1131, 3.6, 94, 0, 89, 0.94, 0, 0.03),
(268, 1115, 3.9, 92, 0, 87, 0.95, 0, 0.19),
(275, 1145, 3.9, 93, 0, 0, 0, 0, 0.9),
(273, 1139, 4.3, 93, 0, 88, 0.93, 0, 0.03),
(272, 1134, 4.2, 93, 0.11, 88, 0.93, 0.12, 0.03),
(274, 1140, 4.4, 93, 0.11, 88, 0.94, 0.12, 0.03);

INSERT INTO `product` (`manufacturer`, `name`, `weight`, `nutritional_fact_id`, `photo_url`, `gtin`) VALUES
('Cloetta', 'Läkerol Dents Raspberry Salmiak', 36, 1, 'uploads/images/raspberry-salmiak.webp', '6420256016909'),
('Cloetta', 'Läkerol Dents Menthol', 36, 2, 'uploads/images/menthol.webp', '6420256001523'),
('Cloetta', 'Läkerol Dents Sweetmint', 36, 3, 'uploads/images/sweetmint.webp', '6420256002131'),
('Cloetta', 'Läkerol Dents Apple Fresh White', 36, 4, 'uploads/images/apple-fresh-white.webp', '6420256012512'),
('Cloetta', 'Läkerol Dents Menthol (85g)', 85, 5, 'uploads/images/menthol-large.webp', '6420256013519'),
('Cloetta', 'Läkerol Dents Licorice Vanilla', 85, 6, 'uploads/images/licorice-vanilla.webp', '6420256012918'),
('Cloetta', 'Läkerol Dents Strawberry Cream', 85, 7, 'uploads/images/strawberry-cream.webp', '6420256012901'),
('Cloetta', 'Läkerol Dents Sweet Mango', 85, 8, 'uploads/images/sweet-mango.webp', '6420256016299');

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
    `vitamin_c` DECIMAL(10, 2),
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

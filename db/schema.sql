-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema instanews2
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `instanews2` ;

-- -----------------------------------------------------
-- Schema instanews2
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `instanews2` DEFAULT CHARACTER SET utf8 ;
USE `instanews2` ;

-- -----------------------------------------------------
-- Table `instanews2`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `instanews2`.`users` (
  `idusers` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NULL,
  `token` VARCHAR(45) NULL,
  `lastUpdate` DATETIME NULL,
  PRIMARY KEY (`idusers`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `instanews2`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `instanews2`.`categories` (
  `idcategories` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`idcategories`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `instanews2`.`feed`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `instanews2`.`feed` (
  `idfeed` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `url` VARCHAR(45) NULL,
  `categories_idcategories` INT NULL,
  PRIMARY KEY (`idfeed`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `instanews2`.`news`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `instanews2`.`news` (
  `idnews` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  `url` VARCHAR(45) NULL,
  `date` DATETIME NULL,
  `feed_idfeed` INT NULL,
  PRIMARY KEY (`idnews`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `instanews2`.`users_has_categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `instanews2`.`users_has_categories` (
  `users_idusers` INT NOT NULL,
  `categories_idcategories` INT NOT NULL,
  PRIMARY KEY (`users_idusers`, `categories_idcategories`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `instanews2`.`subscription`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `instanews2`.`subscription` (
  `users_idusers` INT NOT NULL,
  `feed_idfeed` INT NOT NULL,
  PRIMARY KEY (`users_idusers`, `feed_idfeed`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

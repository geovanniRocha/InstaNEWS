-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema instanews
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `instanews` ;

-- -----------------------------------------------------
-- Schema instanews
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `instanews` DEFAULT CHARACTER SET utf8 ;
USE `instanews` ;

-- -----------------------------------------------------
-- Table `instanews`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `instanews`.`categories` (
  `idcategories` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idcategories`))
ENGINE = InnoDB
AUTO_INCREMENT = 17
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `instanews`.`feed`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `instanews`.`feed` (
  `idfeed` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `url` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idfeed`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `instanews`.`news`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `instanews`.`news` (
  `idnews` INT(11) NOT NULL AUTO_INCREMENT,
  `Title` VARCHAR(100) NULL,
  `description` VARCHAR(100) NULL,
  `url` VARCHAR(45) NULL,
  `feed_idfeed` INT(11) NULL,
  PRIMARY KEY (`idnews`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `instanews`.`subscription`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `instanews`.`subscription` (
  `users_idusers` INT(11) NOT NULL,
  `feed_idfeed` INT(11) NOT NULL,
  PRIMARY KEY (`users_idusers`, `feed_idfeed`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `instanews`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `instanews`.`users` (
  `idusers` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `token` VARCHAR(45) NULL DEFAULT NULL,
  `last_update` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`idusers`))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `instanews`.`users_has_categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `instanews`.`users_has_categories` (
  `users_idusers` INT(11) NOT NULL,
  `categories_idcategories` INT(11) NOT NULL,
  PRIMARY KEY (`users_idusers`, `categories_idcategories`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `instanews`.`categories`
-- -----------------------------------------------------
START TRANSACTION;
USE `instanews`;
INSERT INTO `instanews`.`categories` (`idcategories`, `name`) VALUES (1, 'Breaking News');
INSERT INTO `instanews`.`categories` (`idcategories`, `name`) VALUES (2, 'Colleges and Universities');
INSERT INTO `instanews`.`categories` (`idcategories`, `name`) VALUES (4, 'Current Events');
INSERT INTO `instanews`.`categories` (`idcategories`, `name`) VALUES (3, 'Environmental');
INSERT INTO `instanews`.`categories` (`idcategories`, `name`) VALUES (5, 'Government');
INSERT INTO `instanews`.`categories` (`idcategories`, `name`) VALUES (6, 'Magazines');
INSERT INTO `instanews`.`categories` (`idcategories`, `name`) VALUES (7, 'Media');
INSERT INTO `instanews`.`categories` (`idcategories`, `name`) VALUES (8, 'Newspapers');
INSERT INTO `instanews`.`categories` (`idcategories`, `name`) VALUES (9, 'Politics');
INSERT INTO `instanews`.`categories` (`idcategories`, `name`) VALUES (10, 'Regional News');
INSERT INTO `instanews`.`categories` (`idcategories`, `name`) VALUES (11, 'Religion-and-Spirituality');
INSERT INTO `instanews`.`categories` (`idcategories`, `name`) VALUES (12, 'Sports');
INSERT INTO `instanews`.`categories` (`idcategories`, `name`) VALUES (13, 'Technology');
INSERT INTO `instanews`.`categories` (`idcategories`, `name`) VALUES (14, 'Traffic & Roads');
INSERT INTO `instanews`.`categories` (`idcategories`, `name`) VALUES (15, 'Weather');
INSERT INTO `instanews`.`categories` (`idcategories`, `name`) VALUES (16, 'Weblogs');

COMMIT;


-- -----------------------------------------------------
-- Data for table `instanews`.`feed`
-- -----------------------------------------------------
START TRANSACTION;
USE `instanews`;
INSERT INTO `instanews`.`feed` (`idfeed`, `name`, `url`) VALUES (1, 'ABC', ' https://abcnews.go.com/');
INSERT INTO `instanews`.`feed` (`idfeed`, `name`, `url`) VALUES (2, 'G1', ' https://g1.globo.com/');
INSERT INTO `instanews`.`feed` (`idfeed`, `name`, `url`) VALUES (3, 'InfoMoney', ' http://www.infomoney.com.br');
INSERT INTO `instanews`.`feed` (`idfeed`, `name`, `url`) VALUES (4, 'Forbes', ' https://www.forbes.com/');
INSERT INTO `instanews`.`feed` (`idfeed`, `name`, `url`) VALUES (5, 'exame', ' https://exame.abril.com.br/');
INSERT INTO `instanews`.`feed` (`idfeed`, `name`, `url`) VALUES (6, 'NewsAPI', ' https://newsapi.org');

COMMIT;


-- -----------------------------------------------------
-- Data for table `instanews`.`news`
-- -----------------------------------------------------
START TRANSACTION;
USE `instanews`;
INSERT INTO `instanews`.`news` (`idnews`, `Title`, `description`, `url`, `feed_idfeed`) VALUES (1, 'non interdum in ante', 'nisl aenean lectus pellentesque eget nunc', 'https://dailymotion.com/nila.xml', 6);
INSERT INTO `instanews`.`news` (`idnews`, `Title`, `description`, `url`, `feed_idfeed`) VALUES (2, 'erat nila', 'interdum venenatis turpis enim blandit', 'https://xinhuanet.com/dictumst/maecenas/ut/massa/quis/augue/luctus.jsp', 3);
INSERT INTO `instanews`.`news` (`idnews`, `Title`, `description`, `url`, `feed_idfeed`) VALUES (3, 'suscipit a', 'erat nila tempus vivamus in felis eu sapien cursus', 'https://wufoo.com/nila/quisque/arcu/libero/rutrum/ac.xml', 6);
INSERT INTO `instanews`.`news` (`idnews`, `Title`, `description`, `url`, `feed_idfeed`) VALUES (4, 'non sodales', 'luctus et ultrices posuere cubilia curae nila', 'https://hc360.com/porttitor/id/consequat/in/consequat/ut.html', 4);
INSERT INTO `instanews`.`news` (`idnews`, `Title`, `description`, `url`, `feed_idfeed`) VALUES (5, 'pulvinar sed nisl', 'vestibulum ante ipsum primis in faucibus orci', 'https://bing.com/nonummy/integer.jsp', 4);
INSERT INTO `instanews`.`news` (`idnews`, `Title`, `description`, `url`, `feed_idfeed`) VALUES (6, 'natoque', 'quisque porta volutpat erat', 'https://smugmug.com/leo/maecenas.jpg', 4);
INSERT INTO `instanews`.`news` (`idnews`, `Title`, `description`, `url`, `feed_idfeed`) VALUES (7, 'lacinia sapien', 'volutpat in congue etiam justo etiam pretium iaculis justo in', 'https://xinhuanet.com/tempus/vel/pede/morbi/porttitor.jsp', 2);
INSERT INTO `instanews`.`news` (`idnews`, `Title`, `description`, `url`, `feed_idfeed`) VALUES (8, 'in blandit', 'lectus vestibulum quam sapien varius ut blandit non interdum', 'https://intel.com/tortor/duis/mattis/egestas/metus/aenean.aspx', 1);
INSERT INTO `instanews`.`news` (`idnews`, `Title`, `description`, `url`, `feed_idfeed`) VALUES (9, 'pede ac diam', 'tortor quis turpis sed', 'https://ucla.edu/magna/at.js', 1);
INSERT INTO `instanews`.`news` (`idnews`, `Title`, `description`, `url`, `feed_idfeed`) VALUES (10, 'dui', 'integer ac neque duis bibendum morbi non quam nec', 'http://51.la/massa/id.aspx', 6);

COMMIT;


-- -----------------------------------------------------
-- Data for table `instanews`.`subscription`
-- -----------------------------------------------------
START TRANSACTION;
USE `instanews`;
INSERT INTO `instanews`.`subscription` (`users_idusers`, `feed_idfeed`) VALUES (8, 4);
INSERT INTO `instanews`.`subscription` (`users_idusers`, `feed_idfeed`) VALUES (9, 6);
INSERT INTO `instanews`.`subscription` (`users_idusers`, `feed_idfeed`) VALUES (4, 2 );
INSERT INTO `instanews`.`subscription` (`users_idusers`, `feed_idfeed`) VALUES (6, 5);
INSERT INTO `instanews`.`subscription` (`users_idusers`, `feed_idfeed`) VALUES (2, 2);
INSERT INTO `instanews`.`subscription` (`users_idusers`, `feed_idfeed`) VALUES (1, 4 );
INSERT INTO `instanews`.`subscription` (`users_idusers`, `feed_idfeed`) VALUES (5, 2  );
INSERT INTO `instanews`.`subscription` (`users_idusers`, `feed_idfeed`) VALUES (7, 1);
INSERT INTO `instanews`.`subscription` (`users_idusers`, `feed_idfeed`) VALUES (7, 5);
INSERT INTO `instanews`.`subscription` (`users_idusers`, `feed_idfeed`) VALUES (8, 5);

COMMIT;


-- -----------------------------------------------------
-- Data for table `instanews`.`users`
-- -----------------------------------------------------
START TRANSACTION;
USE `instanews`;
INSERT INTO `instanews`.`users` (`idusers`, `email`, `token`, `last_update`) VALUES (1, 'freitenbach0@dropbox.com', '863344b22f625c1487160479124bcc4a5b3bb780', '2017-12-14 16:45:36');
INSERT INTO `instanews`.`users` (`idusers`, `email`, `token`, `last_update`) VALUES (2, 'pwaggett1@newyorker.com', '9a5dc5504f8c5f1bff73350f99db4ffa67caf3ac', '2018-02-14 05:47:30');
INSERT INTO `instanews`.`users` (`idusers`, `email`, `token`, `last_update`) VALUES (3, 'gnarracott2@chronoengine.com', 'b12a2e7d9e9f60311e354cf37c44fdab5afb4212', '2018-02-09 19:14:23');
INSERT INTO `instanews`.`users` (`idusers`, `email`, `token`, `last_update`) VALUES (4, 'ssomerbell3@bigcartel.com', '27ebdf213fd3885d2858da55fbf962086b40be2d', '2018-01-30 02:29:31');
INSERT INTO `instanews`.`users` (`idusers`, `email`, `token`, `last_update`) VALUES (5, 'mgarroway4@diigo.com', '356100dba88a36ad13455af1a95c84c01982e720', '2017-09-15 00:13:07');
INSERT INTO `instanews`.`users` (`idusers`, `email`, `token`, `last_update`) VALUES (6, 'sedens5@spiegel.de', 'f1c8310c7f1970a52b97f7e8fe7826e6b5f9f5b4', '2018-08-07 21:25:19');
INSERT INTO `instanews`.`users` (`idusers`, `email`, `token`, `last_update`) VALUES (7, 'ehalms6@yellowbook.com', '39d3622b9cfa29d3d1aff4ad76c4114da5878bb4', '2018-04-26 22:50:16');
INSERT INTO `instanews`.`users` (`idusers`, `email`, `token`, `last_update`) VALUES (8, 'jparlet7@pbs.org', 'ab49101663ac132248030bf70a74fae8dcd16c39', '2017-12-13 05:30:23');
INSERT INTO `instanews`.`users` (`idusers`, `email`, `token`, `last_update`) VALUES (9, 'sboissieux8@istockphoto.com', 'baff4a28f435bbf21f8f993512bb60bb8a29e36b', '2018-05-05 23:53:13');
INSERT INTO `instanews`.`users` (`idusers`, `email`, `token`, `last_update`) VALUES (10, 'nspires9@godaddy.com', '39b97a5912b56365f3f6af8565162f7a392cb01f', '2018-05-05 16:41:51');

COMMIT;


-- -----------------------------------------------------
-- Data for table `instanews`.`users_has_categories`
-- -----------------------------------------------------
START TRANSACTION;
USE `instanews`;
INSERT INTO `instanews`.`users_has_categories` (`users_idusers`, `categories_idcategories`) VALUES (10, 7);
INSERT INTO `instanews`.`users_has_categories` (`users_idusers`, `categories_idcategories`) VALUES (9, 7);
INSERT INTO `instanews`.`users_has_categories` (`users_idusers`, `categories_idcategories`) VALUES (10, 6);
INSERT INTO `instanews`.`users_has_categories` (`users_idusers`, `categories_idcategories`) VALUES (9, 14);
INSERT INTO `instanews`.`users_has_categories` (`users_idusers`, `categories_idcategories`) VALUES (7, 7);
INSERT INTO `instanews`.`users_has_categories` (`users_idusers`, `categories_idcategories`) VALUES (2, 3);
INSERT INTO `instanews`.`users_has_categories` (`users_idusers`, `categories_idcategories`) VALUES (9, 16);
INSERT INTO `instanews`.`users_has_categories` (`users_idusers`, `categories_idcategories`) VALUES (10, 9);
INSERT INTO `instanews`.`users_has_categories` (`users_idusers`, `categories_idcategories`) VALUES (7, 14);
INSERT INTO `instanews`.`users_has_categories` (`users_idusers`, `categories_idcategories`) VALUES (10, 13);
INSERT INTO `instanews`.`users_has_categories` (`users_idusers`, `categories_idcategories`) VALUES (9, 12);
INSERT INTO `instanews`.`users_has_categories` (`users_idusers`, `categories_idcategories`) VALUES (4, 7);
INSERT INTO `instanews`.`users_has_categories` (`users_idusers`, `categories_idcategories`) VALUES (3, 2);
INSERT INTO `instanews`.`users_has_categories` (`users_idusers`, `categories_idcategories`) VALUES (5, 3);
INSERT INTO `instanews`.`users_has_categories` (`users_idusers`, `categories_idcategories`) VALUES (4, 1);
INSERT INTO `instanews`.`users_has_categories` (`users_idusers`, `categories_idcategories`) VALUES (9, 15);
INSERT INTO `instanews`.`users_has_categories` (`users_idusers`, `categories_idcategories`) VALUES (1, 16);
INSERT INTO `instanews`.`users_has_categories` (`users_idusers`, `categories_idcategories`) VALUES (8, 2);
INSERT INTO `instanews`.`users_has_categories` (`users_idusers`, `categories_idcategories`) VALUES (3, 1);
INSERT INTO `instanews`.`users_has_categories` (`users_idusers`, `categories_idcategories`) VALUES (6, 9);
INSERT INTO `instanews`.`users_has_categories` (`users_idusers`, `categories_idcategories`) VALUES (6, 7);
INSERT INTO `instanews`.`users_has_categories` (`users_idusers`, `categories_idcategories`) VALUES (9, 8);
INSERT INTO `instanews`.`users_has_categories` (`users_idusers`, `categories_idcategories`) VALUES (7, 11);
INSERT INTO `instanews`.`users_has_categories` (`users_idusers`, `categories_idcategories`) VALUES (8, 12);
INSERT INTO `instanews`.`users_has_categories` (`users_idusers`, `categories_idcategories`) VALUES (4, 12);
INSERT INTO `instanews`.`users_has_categories` (`users_idusers`, `categories_idcategories`) VALUES (1, 11);
INSERT INTO `instanews`.`users_has_categories` (`users_idusers`, `categories_idcategories`) VALUES (2, 13);
INSERT INTO `instanews`.`users_has_categories` (`users_idusers`, `categories_idcategories`) VALUES (7, 15);
INSERT INTO `instanews`.`users_has_categories` (`users_idusers`, `categories_idcategories`) VALUES (10, 10);
INSERT INTO `instanews`.`users_has_categories` (`users_idusers`, `categories_idcategories`) VALUES (1, 2);
INSERT INTO `instanews`.`users_has_categories` (`users_idusers`, `categories_idcategories`) VALUES (4, 16);
INSERT INTO `instanews`.`users_has_categories` (`users_idusers`, `categories_idcategories`) VALUES (7, 9);

COMMIT;


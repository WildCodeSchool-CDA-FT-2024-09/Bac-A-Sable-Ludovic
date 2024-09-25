CREATE TABLE `repo`(
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(100) NOT NULL,
    `URL` text NOT NULL,
    `status_id` int DEFAULT NULL,
    CONSTRAINT `repo_status_id`FOREIGN KEY (`status_id`) REFERENCES `status` (`id`)  ON DELETE SET NULL ON UPDATE CASCADE 
)
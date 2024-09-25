CREATE TABLE `status`(
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(50) NOT NULL,
    PRIMARY KEY (`id`)
    )

CREATE TABLE `repo`(
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(100) NOT NULL,
    `URL` text NOT NULL,
    `status_id` int NOT NULL, 
    PRIMARY KEY (`id`),
    CONSTRAINT `repo_status_id` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`)  
)

CREATE TABLE `language`(
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(100) NOT NULL,
    PRIMARY KEY (`id`)
)

CREATE TABLE `repo_language`(
    `repo_id` int NOT NULL,
    `language_id` int NOT NULL,
    CONSTRAINT `repo_language_repo_id` FOREIGN KEY (`repo_id`) REFERENCES `repo` (`id`),
    CONSTRAINT `repo_language_language_id` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`)
)

CREATE TABLE `comment`(
    `id` int NOT NULL AUTO_INCREMENT,
    `content` text NOT NULL,
    `repo_id` int NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `comment_repo_id` FOREIGN KEY (`repo_id`) REFERENCES `repo` (`id`)
)


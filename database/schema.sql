-- Disabling foreign key checks temporarily, to avoid errors.
SET FOREIGN_KEY_CHECKS = 0;

-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `users`
(
    `id` INT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(100) NOT NULL UNIQUE,      
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL,
    `profile_picture_url` VARCHAR(255) NULL,
    `bio` TEXT NULL,
    `github_username` VARCHAR(255) NULL UNIQUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
)
ENGINE = InnoDB;

-- Indexing for users table
CREATE INDEX `idx_username` ON `users` (`username`);
CREATE INDEX `idx_email` ON `users` (`email`);


-- -----------------------------------------------------
-- Table `posts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `posts`
(
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,                  -- Foreign Key: users table
    `title` VARCHAR(255) NOT NULL,           -- Title
    `code_snippet` TEXT NOT NULL,            -- Code snippet
    `language` VARCHAR(50) NULL,             -- Programming language
    `description` TEXT NULL,                 -- Description of the code. *OPTIONAL*
    `github_repo_url` VARCHAR(255) NULL,     -- Link to GitHub Repositry *OPTIONAL*
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_posts_user_id`
        FOREIGN KEY (`user_id`)
        REFERENCES `users` (`id`)
        ON DELETE CASCADE          -- If a user is deleted, their posts are also deleted
        ON UPDATE CASCADE
)
ENGINE = InnoDB;

-- Indexing for posts table
CREATE INDEX `idx_posts_user_id` ON `posts` (`user_id`);
CREATE INDEX `idx_posts_language` ON `posts` (`language`);


-- -----------------------------------------------------
-- Table `comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `comments`
(
    `id` INT NOT NULL AUTO_INCREMENT,
    `post_id` INT NOT NULL,                  -- Foreign Key: posts table
    `user_id` INT NOT NULL,                  -- Foreign Key: users table
    `content` TEXT NOT NULL,                 -- Comment
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_comments_post_id`
        FOREIGN KEY (`post_id`)
        REFERENCES `posts` (`id`)
        ON DELETE CASCADE,        -- If post is deletec, comments related to it will also be deleted
    CONSTRAINT `fk_comments_user_id`
        FOREIGN KEY (`user_id`)
        REFERENCES `users` (`id`)
        ON DELETE CASCADE         -- If a user is deleted, all relative comments are also deleted
)
ENGINE = InnoDB;

-- Indexing for comments table
CREATE INDEX `idx_comments_post_id` ON `comments` (`post_id`);
CREATE INDEX `idx_comments_user_id` ON `comments` (`user_id`);


-- -----------------------------------------------------
-- Table `reactions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reactions`
(
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,                  -- Foreign Key: users table
    `entity_id` INT NOT NULL,                -- ID of relative entity
    `entity_type` VARCHAR(50) NOT NULL,      -- Type of relative entity
    `reaction_type` VARCHAR(50) NOT NULL,    -- Reaction
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `uq_user_entity_reaction` (`user_id` ASC, `entity_id` ASC, `entity_type` ASC, `reaction_type` ASC), -- Ensures users can only react once per entity
    CONSTRAINT `fk_reactions_user_id`
        FOREIGN KEY (`user_id`)
        REFERENCES `users` (`id`)
        ON DELETE CASCADE         -- If a user is deleted, their reactions are also deleted
)
ENGINE = InnoDB;

-- Indexing for reactions table
CREATE INDEX `idx_reactions_user_id` ON `reactions` (`user_id`);
CREATE INDEX `idx_reactions_entity_id_type` ON `reactions` (`entity_id`, `entity_type`);


-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

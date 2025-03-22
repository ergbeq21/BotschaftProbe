CREATE TABLE `allUsers` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`age` int NOT NULL,
	`email` varchar(255) NOT NULL,
	`username` varchar(255) NOT NULL,
	`role` varchar(50) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`session` varchar(255) NOT NULL,
	`sessionExpiration` timestamp NOT NULL,
	`password` varchar(255) NOT NULL,
	CONSTRAINT `allUsers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`besucher_id` serial AUTO_INCREMENT NOT NULL,
	`vorname` varchar(50) NOT NULL,
	`nachname` varchar(50) NOT NULL,
	`email` varchar(255) NOT NULL,
	CONSTRAINT `users_besucher_id` PRIMARY KEY(`besucher_id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `events` MODIFY COLUMN `event_name` varchar(255) NOT NULL;
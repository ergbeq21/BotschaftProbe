CREATE TABLE `users` (
	`besucher_id` serial AUTO_INCREMENT NOT NULL,
	`vorname` varchar(50) NOT NULL,
	`nachname` varchar(50) NOT NULL,
	`email` varchar(255) NOT NULL,
	CONSTRAINT `users_besucher_id` PRIMARY KEY(`besucher_id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);

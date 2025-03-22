CREATE TABLE `events` (
	`event_id` serial AUTO_INCREMENT NOT NULL,
	`event_name` varchar(200) NOT NULL,
	CONSTRAINT `events_event_id` PRIMARY KEY(`event_id`)
);

CREATE TABLE `todo` (
	`id` integer PRIMARY KEY NOT NULL,
	`text` text NOT NULL,
	`complete` integer DEFAULT false NOT NULL,
	`completed_at` text
);

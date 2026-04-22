CREATE TABLE `appointments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clientName` varchar(100) NOT NULL,
	`clientPhone` varchar(20) NOT NULL,
	`clientEmail` varchar(320),
	`serviceId` int NOT NULL,
	`barberId` int NOT NULL,
	`appointmentDate` date NOT NULL,
	`appointmentTime` time NOT NULL,
	`notes` text,
	`status` enum('pending','confirmed','cancelled','completed') NOT NULL DEFAULT 'pending',
	`whatsappSent` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `appointments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `barbers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`bio` text,
	`photoUrl` text,
	`specialty` varchar(200),
	`active` boolean NOT NULL DEFAULT true,
	`sortOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `barbers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `gallery` (
	`id` int AUTO_INCREMENT NOT NULL,
	`imageUrl` text NOT NULL,
	`caption` varchar(200),
	`category` varchar(50) DEFAULT 'work',
	`active` boolean NOT NULL DEFAULT true,
	`sortOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `gallery_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`price` decimal(10,2) NOT NULL,
	`durationMinutes` int NOT NULL DEFAULT 30,
	`icon` varchar(50) DEFAULT 'scissors',
	`active` boolean NOT NULL DEFAULT true,
	`sortOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `services_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `site_settings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`key` varchar(100) NOT NULL,
	`value` text,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `site_settings_id` PRIMARY KEY(`id`),
	CONSTRAINT `site_settings_key_unique` UNIQUE(`key`)
);
--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clientName` varchar(100) NOT NULL,
	`rating` int NOT NULL DEFAULT 5,
	`comment` text NOT NULL,
	`active` boolean NOT NULL DEFAULT true,
	`sortOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `testimonials_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `working_hours` (
	`id` int AUTO_INCREMENT NOT NULL,
	`barberId` int NOT NULL,
	`dayOfWeek` int NOT NULL,
	`startTime` time NOT NULL,
	`endTime` time NOT NULL,
	`active` boolean NOT NULL DEFAULT true,
	CONSTRAINT `working_hours_id` PRIMARY KEY(`id`)
);

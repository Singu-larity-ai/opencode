ALTER TABLE `auth_user` RENAME COLUMN `authing_id` TO `casdoor_id`;
--> statement-breakpoint
DROP INDEX IF EXISTS `auth_user_authing_id_idx`;
--> statement-breakpoint
CREATE INDEX `auth_user_casdoor_id_idx` ON `auth_user` (`casdoor_id`);

-- CREATE DATABASE `userdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `contact_number` varchar(8) DEFAULT NULL,
  `email_address` varchar(200) NOT NULL,
  `address` varchar(200) DEFAULT NULL,
  `isNewUser` tinyint(4) NOT NULL DEFAULT '1'
); 


-- ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 30, 2025 at 04:13 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `travel_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `destinations`
--

CREATE TABLE `destinations` (
  `destination_id` int(11) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `destination_name` varchar(100) NOT NULL,
  `category` varchar(50) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `full_description` text DEFAULT NULL,
  `image_url` text DEFAULT NULL,
  `price_range` varchar(50) DEFAULT NULL,
  `map_embed_url` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `destinations`
--

INSERT INTO `destinations` (`destination_id`, `slug`, `destination_name`, `category`, `country`, `description`, `full_description`, `image_url`, `price_range`, `map_embed_url`, `created_at`) VALUES
(1, 'swiss-alps', 'Swiss Alps', 'Mountain', 'Switzerland', 'Experience the breathtaking beauty of the Swiss Alps with world-class skiing, hiking trails, and stunning mountain vistas.', 'The Swiss Alps offer some of the most spectacular mountain scenery in the world, with peaks reaching over 4,000 meters. Whether you\'re an experienced mountaineer or a casual hiker, there are trails and activities for every skill level. The region is also famous for its charming alpine villages, crystal-clear lakes, and excellent skiing conditions during winter months.', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', '$1200', 'https://www.google.com/maps?q=46.8182,8.2275&output=embed', '2025-06-28 09:59:35'),
(2, 'santorini', 'Santorini', 'Island', 'Greece', 'Discover the iconic white-washed buildings and stunning sunsets of this beautiful Greek island paradise.', 'Santorini is one of the most picturesque islands in the world, known for its dramatic volcanic landscape, stunning caldera views, and beautiful beaches. The island\'s unique architecture, with white buildings perched on cliffs overlooking the Aegean Sea, creates a magical atmosphere that attracts visitors from around the globe.', 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2079&q=80', '$800', 'https://www.google.com/maps?q=36.3932,25.4615&output=embed', '2025-06-28 09:59:35'),
(3, 'banff', 'Banff National Park', 'National Park', 'Canada', 'Explore the pristine wilderness of Canada\'s oldest national park with crystal-clear lakes and majestic mountains.', 'Banff National Park is a UNESCO World Heritage site that offers some of the most stunning natural landscapes in North America. From the iconic turquoise waters of Lake Louise to the dramatic peaks of the Canadian Rockies, every corner of this park offers breathtaking views and incredible wildlife viewing opportunities.', 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80', '$900', 'https://www.google.com/maps?q=51.4968,-115.9281&output=embed', '2025-06-28 09:59:35'),
(4, 'tokyo', 'Tokyo', 'City', 'Japan', 'Experience the perfect blend of traditional culture and modern innovation in Japan\'s vibrant capital city.', 'Tokyo is a fascinating metropolis where ancient temples stand alongside futuristic skyscrapers, and traditional tea ceremonies coexist with cutting-edge technology. The city offers an incredible variety of experiences, from exploring historic neighborhoods to shopping in the world\'s largest electronics district.', 'https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80', '$1100', 'https://www.google.com/maps?q=35.6762,139.6503&output=embed', '2025-06-28 09:59:35'),
(5, 'machu-picchu', 'Machu Picchu', 'Ancient Site', 'Peru', 'Journey to the ancient Incan citadel perched high in the Andes Mountains, a UNESCO World Heritage site.', 'Machu Picchu is one of the most impressive archaeological sites in the world, offering a glimpse into the sophisticated engineering and architectural skills of the Inca civilization. The site\'s dramatic mountain setting and mysterious history continue to captivate visitors from around the world.', 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2036&q=80', '$750', 'https://www.google.com/maps?q=-13.1631,-72.5450&output=embed', '2025-06-28 09:59:35'),
(6, 'new-zealand', 'New Zealand', 'Country', 'New Zealand', 'Discover the stunning landscapes of Middle-earth with adventure activities and breathtaking natural beauty.', 'New Zealand offers some of the most diverse and spectacular scenery in the world, from snow-capped mountains to pristine beaches, from geothermal wonders to ancient forests. The country is a paradise for adventure seekers, offering activities like bungee jumping, skydiving, hiking, and water sports.', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', '$1500', 'https://www.google.com/maps?q=-40.9006,174.8860&output=embed', '2025-06-28 09:59:35');

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `destination_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`id`, `user_id`, `destination_id`, `created_at`) VALUES
(28, 1, 1, '2025-06-30 00:48:39'),
(29, 1, 4, '2025-06-30 01:07:48');

-- --------------------------------------------------------

--
-- Table structure for table `related_destinations`
--

CREATE TABLE `related_destinations` (
  `id` int(11) NOT NULL,
  `destination_id` int(11) NOT NULL,
  `related_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `related_destinations`
--

INSERT INTO `related_destinations` (`id`, `destination_id`, `related_id`) VALUES
(1, 1, 3),
(2, 1, 6),
(3, 2, 5),
(4, 2, 6),
(5, 3, 1),
(6, 3, 4),
(7, 4, 3),
(8, 4, 6),
(9, 5, 2),
(10, 5, 4),
(11, 6, 1),
(12, 6, 5);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `destination_id` int(11) NOT NULL,
  `reviewer_name` varchar(100) NOT NULL,
  `rating` float DEFAULT NULL CHECK (`rating` between 1 and 5),
  `comment` text DEFAULT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `destination_id`, `reviewer_name`, `rating`, `comment`, `created_at`) VALUES
(2, 3, 'ddd', 2, 'fdd', '2025-06-28'),
(3, 3, 'hgfrt', 2, 'trer', '2025-06-28'),
(4, 3, 'gterre', 5, 'trger', '2025-06-28'),
(5, 3, 'reger', 5, 'ergerg', '2025-06-28'),
(6, 3, 'f', 1, 'gff', '2025-06-28'),
(7, 5, 'Doma', 5, 'wee', '2025-06-30');

-- --------------------------------------------------------

--
-- Table structure for table `travel_tips`
--

CREATE TABLE `travel_tips` (
  `id` int(11) NOT NULL,
  `destination_id` int(11) NOT NULL,
  `best_time_to_visit` varchar(100) DEFAULT NULL,
  `getting_there` text DEFAULT NULL,
  `currency` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `travel_tips`
--

INSERT INTO `travel_tips` (`id`, `destination_id`, `best_time_to_visit`, `getting_there`, `currency`) VALUES
(1, 1, 'June to September for hiking, December to March for skiing', 'Fly to Zurich or Geneva, then take train to mountain regions', 'Swiss Franc (CHF)'),
(2, 2, 'May to October, with peak season in July and August', 'Fly to Santorini International Airport or take ferry from Athens', 'Euro (EUR)'),
(3, 3, 'June to September for hiking, December to March for skiing', 'Fly to Calgary International Airport, then drive 1.5 hours to Banff', 'Canadian Dollar (CAD)'),
(4, 4, 'March to May (cherry blossom season) and September to November', 'Fly to Narita or Haneda International Airport', 'Japanese Yen (JPY)'),
(5, 5, 'April to October (dry season)', 'Fly to Cusco, then take train or hike the Inca Trail', 'Peruvian Sol (PEN)'),
(6, 6, 'December to February (summer) for outdoor activities', 'Fly to Auckland, Wellington, or Christchurch International Airport', 'New Zealand Dollar (NZD)');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_type` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `email`, `password`, `user_type`, `created_at`) VALUES
(1, 'Mohamed Doma', 'modoma2002@gmail.com', '$2y$10$nl8ByByURFHXdLCnbmfBkuLSL7HvgpLk4zTEus7LIHRhlhTZmqf2C', 1, '2025-06-28 10:00:06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `destinations`
--
ALTER TABLE `destinations`
  ADD PRIMARY KEY (`destination_id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_favorite` (`user_id`,`destination_id`),
  ADD KEY `destination_id` (`destination_id`);

--
-- Indexes for table `related_destinations`
--
ALTER TABLE `related_destinations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `destination_id` (`destination_id`),
  ADD KEY `related_id` (`related_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `destination_id` (`destination_id`);

--
-- Indexes for table `travel_tips`
--
ALTER TABLE `travel_tips`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `destination_id` (`destination_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `destinations`
--
ALTER TABLE `destinations`
  MODIFY `destination_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `related_destinations`
--
ALTER TABLE `related_destinations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `travel_tips`
--
ALTER TABLE `travel_tips`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`destination_id`) REFERENCES `destinations` (`destination_id`) ON DELETE CASCADE;

--
-- Constraints for table `related_destinations`
--
ALTER TABLE `related_destinations`
  ADD CONSTRAINT `related_destinations_ibfk_1` FOREIGN KEY (`destination_id`) REFERENCES `destinations` (`destination_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `related_destinations_ibfk_2` FOREIGN KEY (`related_id`) REFERENCES `destinations` (`destination_id`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`destination_id`) REFERENCES `destinations` (`destination_id`) ON DELETE CASCADE;

--
-- Constraints for table `travel_tips`
--
ALTER TABLE `travel_tips`
  ADD CONSTRAINT `travel_tips_ibfk_1` FOREIGN KEY (`destination_id`) REFERENCES `destinations` (`destination_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

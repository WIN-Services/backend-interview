
## Description

The project is an order management system with web service API for managing orders. Developed using Node.js and Express also MySQL is used as the database.

## Tech Stack

- **Language Used:** Javascript (Node.js)
- **Framework Used:** Express
- **Database:** MySQL

## Trade-Offs

For simple and quick development of this project, several trade-offs were considered:
1. Although we have added pagination in the get all orders API to prevent large datasets processing, we we'll need indexing in the database for production
2. Credentials have been hardcoded in some of the places for quick development
3. No mysql migration setup implemented, need to create tables manually (Provided the quries)
4. No authentication implemented for APIs (Supposed to be used jwt for authorization)

## Assumptions

- The provided sample data format is slightly changed for consistency in naming the keys/data.
- The project assumes that the Mysql installed in the system.

## Environment Setup

1. Clone the repository, navigate to the project directory
2. Run npm install
3. Setup enviroment variables (in .env file in the root, refer env example)
4. Run mysql queries provided below
5. Run npm start

## MySQL queries
1. CREATE TABLE `orders` (
  `order_id` bigint NOT NULL AUTO_INCREMENT,
  `total_fee` FLOAT NOT NULL,
  `service_ids` text NOT NULL
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB
2. CREATE TABLE `services` (
  `service_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`service_id`)
) ENGINE=InnoDB
3. INSERT INTO services (name) VALUES ("Inspection"),("Testing"),("Analysis");

## Delivered
- Order management APIs
  - Create order
  - Get order
  - Update order
  - Delete order
  - Get all orders (with pagination)
- Test Cases
  - Order APIs

## Time Spent
- Development: 2-3 Hrs for the developement, spent time in solutioning, developing application, debugging etc. 
- Testing: 40 mins spent testing and fixing bugs
- Documentation: 30 mins spent writing README file

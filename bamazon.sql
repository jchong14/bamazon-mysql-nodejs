DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT, /* unique id for each product */
  product_name VARCHAR (255) NOT NULL, /* name of the product*/
  department_name VARCHAR (255) NOT NULL,
  price DECIMAL (10, 2) NOT NULL, /*cost to customer*/
  stock_quantity INT (10) NOT NULL, /*how much of the product is available in stores*/
  PRIMARY KEY (item_id)
);

INSERT INTO products
	(product_name, department_name, price, stock_quantity)
VALUES
	('Macbook Pro','Electronics',799.99,1000),
  ('Apple TV','Electronics',89.99,5000),
  ('Nike Pegasus', 'Shoes', 120.99, 2000),
  ('Refridgerator', 'Appliances', 1200.99, 2500),
  ('Chair', 'Appliances', 199.99, 3000),
  ("Survival Towel", "Necessities", 42.42, 42),
  ("Bill and Ted's Excellent Adventure", "Films", 15.00, 25),
  ("Mad Max: Fury Road", "Films", 25.50, 57),
  ("Monopoly", "Board Games", 30.50, 35),
  ("Yahtzee", "Board Games", 19.95, 23);

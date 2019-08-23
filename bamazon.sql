DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(20) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("USB Charger 24hrs", "Electronics", 25.00, 33);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("USB Charger 48hrs", "Electronics", 50.00, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Small Bluetooth Speaker", "Electronics", 75.00, 24);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Large Bluetooth Speaker", "Electronics", 150.00, 48);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Wireless Charger", "Electronics", 15.00, 58);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone X Cell Phone Case", "Accessories", 10.00, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone USB Cable", "Accessories", 5.00, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Micro USB USB Cable", "Accessories", 5.00, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone X Screen Protector", "Accessories", 12.00, 77);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("S Series Screen Protector", "Accessories", 10.00, 6);

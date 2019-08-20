DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT (4) NOT NULL,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(20) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (90,"USB Charger 24hrs", "Electronics", 25.00, 100);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (91, "USB Charger 48hrs", "Electronics", 50.00, 100);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (92, "Small Bluetooth Speaker", "Electronics", 75.00, 100);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (93, "Large Bluetooth Speaker", "Electronics", 150.00, 100);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (94, "Wireless Charger", "Electronics", 15.00, 100);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (95, "iPhone X Cell Phone Case", "Accessories", 10.00, 100);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (96, "iPhone USB Cable", "Accessories", 5.00, 100);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (97, "Micro USB USB Cable", "Accessories", 5.00, 100);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (98, "iPhone X Screen Protector", "Accessories", 12.00, 100);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (99, "S Series Screen Protector", "Accessories", 10.00, 100);

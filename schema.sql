DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products
(
    item_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    
);


/*insert initial values into table */
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Black Panther Action Figure", "Toys", 7.99, 4),
("Captain Marvel Action Figure", "Toys", 7.99, 4),
("4K Television", "Home Theater", 821.74, 4),
("Android TV & Media Player", "Home Theater", 159.79, 4),
("Dolby Surround Sound", "Home Theater", 549.22, 4)
("8TB External Hard Drive", "Computers", 109.74, 4),
("Wireless Mouse", "Computers", 8.74, 4),
("Wireless Keyboard", "Computers", 21.74, 4),
("Docking Station", "Computers", 89.33, 4),
("Dell XPS 15", "Computers", 2199.00, 4);

/* see entire table */
SELECT * FROM products;


/* Show a row by item_id */
SELECT * FROM products WHERE item_id = '${itemID}';

/* using string templating to change value of row item in node */
UPDATE products SET stock_quantity = stock_quantity - ${quantity};
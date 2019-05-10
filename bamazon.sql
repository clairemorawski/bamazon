-- Drops the "bamazon_db" if it exists currently --
DROP DATABASE IF EXISTS bamazon_db;
-- Creates the "bamazon_db" database --
CREATE DATABASE bamazon_db;

-- Makes it so all of the following code will affect bamazon_db --
USE bamazon_db;

-- Creates the table "products" within bamazon_db --
CREATE TABLE products
(
    -- Makes a string column called "item_id" which cannot contain null and is a unique id for each product --
    item_id INTEGER(50)
    AUTO_INCREMENT NOT NULL,
    -- Makes a string column called "product_name" with the name of each product --
    product_name VARCHAR
    (30) NOT NULL,
    -- Makes a sting column called "department_name" --
    department_name VARCHAR
    (30) NOT NULL,
    -- Makes an numeric column called "price" which is the cost of each product to the customer --
    price INTEGER
    (10) NOT NULL,
    -- Makes a numeric column called "stock_quantity" which is how much of the product is available to stores --
    stock_quantity INTEGER
    (10) NOT NULL,
    PRIMARY KEY
    (item_id)
);


    -- Creates new rows containing data in all named columns --
    INSERT INTO products
        (item_id, product_name, department_name, price, stock_quantity)
    VALUES
        (01, "iPhone Charger", "Cell Phones & Accessories", 10, 100);

    INSERT INTO products
        (item_id, product_name, department_name, price, stock_quantity)
    VALUES
        (02, "Futon", "Home & Kitchen", 75, 40);

    INSERT INTO products
        (item_id, product_name, department_name, price, stock_quantity)
    VALUES
        (03, "Patio Lights", "Garden & Outdoor", 75, 250);

    INSERT INTO products
        (item_id, product_name, department_name, price, stock_quantity)
    VALUES
        (04, "Blender", "Appliances", 45, 200);

    INSERT INTO products
        (item_id, product_name, department_name, price, stock_quantity)
    VALUES
        (05, "Mascara", "Beauty & Personal Care", 4, 500);

    INSERT INTO products
        (item_id, product_name, department_name, price, stock_quantity)
    VALUES
        (06, "Markers", "Arts, Crafts, & Sewing", 7, 400);

    INSERT INTO products
        (item_id, product_name, department_name, price, stock_quantity)
    VALUES
        (07, "Car Radio & Speakers", "Automotive Parts & Accessories", 200, 30);

    INSERT INTO products
        (item_id, product_name, department_name, price, stock_quantity)
    VALUES
        (08, "Women's Multi Vitamins", "Health & Household", 12, 150);

    INSERT INTO products
        (item_id, product_name, department_name, price, stock_quantity)
    VALUES
        (09, "Printer Ink Cartiridges", "Home & Business Services", 30, 275);

    INSERT INTO products
        (item_id, product_name, department_name, price, stock_quantity)
    VALUES
        (10, "Duffel Bag", "Luggage & Travel Gear", 80, 110)
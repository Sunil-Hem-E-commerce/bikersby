/* 
This is script file to create all the required tables on the database.
Logging into specific Postgres users must be controlled by it's corresponding batch file in the same directory.
*/

--01--
CREATE TABLE districts (
    district_id SERIAL PRIMARY KEY,
    district_name VARCHAR(30) NOT NULL
);

--02--
CREATE TABLE addresses (
    address_id SERIAL PRIMARY KEY,
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    district_id INT NOT NULL,
    CONSTRAINT fk_address_district FOREIGN KEY (district_id) REFERENCES districts(district_id)
);

--03--
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(25),
    -- using 'user' instead of 'user_name' throws syntax error.
    -- it might get confused with USER() of SQL. avoid that!!
    user_name VARCHAR(100) NOT NULL,
    pwd_hash VARCHAR(255) NOT NULL,
    default_address INT NOT NULL,
    user_status char NOT NULL,
    joined_on TIMESTAMP NOT NULL,
    -- Need to configure disk to store logo as image and access via it's location.
    profile_img VARCHAR(255),
    CONSTRAINT fk_user_address FOREIGN KEY (default_address) REFERENCES addresses(address_id)
);

--04--
CREATE TABLE showrooms (
    showroom_id SERIAL PRIMARY KEY,
    showroom VARCHAR(100) NOT NULL,
    sr_phone VARCHAR(25) NOT NULL,
    sr_email VARCHAR(255),
    address_id INT NOT NULL,
    CONSTRAINT fk_showroom_address FOREIGN KEY (address_id) REFERENCES addresses(address_id)
);

--05--
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product VARCHAR(100) NOT NULL,
    product_des VARCHAR(255) NOT NULL,
    overall_rating INT NOT NULL,
    mileage VARCHAR(15) NOT NULL
);

--06--
CREATE TABLE colors (
    color_id SERIAL PRIMARY KEY,
    color VARCHAR(100) NOT NULL,
    hex VARCHAR(6) NOT NULL
);

--07--
CREATE TABLE companies (
    company_id SERIAL PRIMARY KEY,
    company VARCHAR(100) NOT NULL,
    -- Need to configure disk to store logo as image and access via it's location.
    logo VARCHAR(255)
);

--08--
CREATE TABLE categories (
    cat_id SERIAL PRIMARY KEY,
    category VARCHAR(30) NOT NULL
);

--09--
CREATE TABLE product_items (
    item_id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    color_id INT NOT NULL,
    company_id INT NOT NULL,
    cat_id INT NOT NULL,
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    price int NOT NULL,
    CONSTRAINT fk_product_item_product FOREIGN KEY (product_id) REFERENCES products(product_id),
    CONSTRAINT fk_product_item_colors FOREIGN KEY (color_id) REFERENCES colors(color_id),
    CONSTRAINT fk_product_item_company FOREIGN KEY (company_id) REFERENCES companies(company_id),
    CONSTRAINT fk_product_item_category FOREIGN KEY (cat_id) REFERENCES categories(cat_id)
);

--10--
CREATE TABLE ratings (
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    indv_rating INT,
    comment TEXT,
    CONSTRAINT fk_rating_user FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_rating_product FOREIGN KEY (product_id) REFERENCES products(product_id),
    CONSTRAINT pk_rating PRIMARY KEY (user_id, product_id)
);

--11--
CREATE TABLE inventories (
    inventory_id SERIAL NOT NULL UNIQUE,
    showroom_id INT NOT NULL,
    item_id INT NOT NULL,
    shipping CHAR NOT NULL DEFAULT 'y',
    quantity INT NOT NULL DEFAULT 0,
    sku VARCHAR(255),
    CONSTRAINT fk_inventory_showroom FOREIGN KEY (showroom_id) REFERENCES showrooms(showroom_id),
    CONSTRAINT fk_inventory_product_item FOREIGN KEY (item_id) REFERENCES product_items(item_id),
    CONSTRAINT pk_inventories PRIMARY KEY (showroom_id, item_id)
);

--12--
CREATE TABLE carts (
    cart_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    inventory_id INT NOT NULL,
    cart_quantity INT NOT NULL DEFAULT 1,
    CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_cart_inventory FOREIGN KEY (inventory_id) REFERENCES inventories(inventory_id)
);

--13--
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    order_placed TIMESTAMP NOT NULL,
    order_status VARCHAR(255) NOT NULL DEFAULT 'Ready to ship!',
    -- need to calculate before inserting price
    order_price INT NOT NULL
);

--14--
CREATE TABLE order_item (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    cart_id INT NOT NULL,
    CONSTRAINT fk_order_item_order FOREIGN KEY (order_id) REFERENCES orders(order_id),
    CONSTRAINT fk_order_item_cart FOREIGN KEY (cart_id) REFERENCES carts(cart_id)
);

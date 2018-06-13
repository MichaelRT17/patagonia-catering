CREATE TABLE products (
product_id SERIAL PRIMARY KEY,
product_name VARCHAR(30),
product_img TEXT,
product_price DECIMAL,
product_desc VARCHAR(100),
quantity INTEGER,
feeds VARCHAR(30)
);

CREATE TABLE users (
user_id SERIAL PRIMARY KEY,
user_name VARCHAR(50),
user_img TEXT,
email TEXT,
auth_id TEXT
);

CREATE TABLE cart_items (
cart_entry_id SERIAL PRIMARY KEY,
product_id INTEGER REFERENCES products(product_id),
user_id INTEGER REFERENCES users(user_id),
time TIMESTAMP
);
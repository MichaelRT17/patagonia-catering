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

create table events (
event_id serial primary key,
user_id INTEGER REFERENCES users(user_id),
address VARCHAR(80),
city VARCHAR(40),
state VARCHAR(2),
zipcode INTEGER,
date TEXT,
start_time TEXT,
end_time TEXT
);

CREATE TABLE event_cart (
event_cart_entry_id SERIAL PRIMARY KEY,
product_id INTEGER REFERENCES products(product_id),
user_id INTEGER REFERENCES users(user_id),
amount INTEGER,
event_id INTEGER REFERENCES events(event_id)
);
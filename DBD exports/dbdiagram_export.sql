CREATE TABLE customer (
  id serial PRIMARY KEY,
  first_name varchar(30),
  last_name varchar(30),
  email varchar(50),
  email_verified boolean,
  created_at timestamp,
  password_id int
);

CREATE TABLE physical_address (
  id serial PRIMARY KEY,
  customer_id int,
  street_number int,
  directional varchar(30),
  street varchar(50),
  unit_type varchar(30),
  unit_number int,
  zip_code varchar(30),
  city varchar(30),
  province char(2),
  is_billing boolean,
  is_shipping boolean
);

CREATE TABLE password (
  id serial PRIMARY KEY,
  customer_id int,
  hased_password varchar(50),
  active boolean
);

CREATE TABLE product (
  catalog_id serial PRIMARY KEY,
  name varchar(50),
  description text,
  SKU varchar(50),
  category_id int,
  price decimal
);

CREATE TABLE inventory (
  product_id int PRIMARY KEY,
  quantity int,
  modified_at date
);

CREATE TABLE category (
  id serial PRIMARY KEY,
  name varchar(30),
  description text
);

CREATE TABLE cart (
  id serial PRIMARY KEY,
  customer_id int,
  modified_at timestamp
);

CREATE TABLE cart_item (
  cart_id int,
  product_id int,
  quantity int,
  primary key (cart_id, product_id)
);

CREATE TABLE order (
  id serial PRIMARY KEY,
  created_at timestamp,
  customer_id int,
  cart_id int,
  total decimal,
  payment_id int
);

CREATE TABLE payment (
  id serial PRIMARY KEY,
  customer_id int,
  order_id int,
  billing_address_id int,
  amount decimal,
  status varchar(30),
  processed_at timestamp
);

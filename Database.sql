CREATE TABLE users (
  user_id int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  contact_number varchar(10) DEFAULT NULL,
  email varchar(100) NOT NULL,
  password varchar(255) NOT NULL,
  role enum('user','admin') DEFAULT NULL,
  PRIMARY KEY (user_id),
  UNIQUE KEY email (email)
) 

CREATE TABLE toppings (
  topping_id int NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  price decimal(10,2) NOT NULL,
  PRIMARY KEY (topping_id)
) 

CREATE TABLE pizzas (
  pizza_id int NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  base_price decimal(10,2) NOT NULL,
  PRIMARY KEY (pizza_id)
) 

CREATE TABLE orders (
  order_id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  pizza_id int NOT NULL,
  reference_number varchar(250) NOT NULL,
  pizza_type enum('thin','thick') NOT NULL,
  additional_comments text,
  total_cost decimal(10,2) DEFAULT NULL,
  status enum('new','in_progress','ready') DEFAULT NULL,
  PRIMARY KEY (order_id),
  UNIQUE KEY reference_number (reference_number),
  KEY user_id (user_id),
  KEY orders_pizza (pizza_id),
  REFERENCES users (user_id) ,
  REFERENCES pizzas (pizza_id) 
)

CREATE TABLE order_toppings (
  order_id int NOT NULL,
  topping_id int NOT NULL,
  PRIMARY KEY (order_id,topping_id),
  KEY topping_id (topping_id),
  REFERENCES orders (order_id) 
  REFERENCES toppings (topping_id) 
  )
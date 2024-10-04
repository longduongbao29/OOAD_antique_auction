DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    role ENUM('user', 'admin') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password, role) VALUES ('Long Duong','1234','$2a$08$eDO6YfBEcPz32vAGtiiF6O640ag.d6sATOLbxUYgyFsBzdcr7DQOW','user');

DROP TABLE IF EXISTS auction_products;
CREATE TABLE auction_products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    owner_id INT NOT NULL,
    time_start DATETIME NOT NULL,
    time_end DATETIME NOT NULL, 
    initial_bid INT NOT NULL,
    current_bid INT NOT NULL,
    step_bid_in_price INT NOT NULL,
    step_bid_in_time INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO auction_products (name,description,owner_id,time_start,time_end,initial_bid,current_bid,step_bid_in_price,step_bid_in_time,image_url) VALUES
('Ancient Vase','This is a rare antique vase from the Ming Dynasty, perfect for collectors.',1,'2024-10-04 07:00:10','2024-12-04 07:00:10',1500,1500,100,3, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7h8ZdeOFd8Y4ytPfzTpixv0jsS_u_t0somQ&s'),
('Old Coin','Dropped coin',1,'2024-10-03 07:00:10','2024-10-04 20:10:10',1500,6000,100,5, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkEWPbNvPN7wQAtga13OWDqUxkl8y1uAydkw&s'),
('Medieval Sword','Made of gold',1,'2024-10-04 07:00:10','2024-10-04 15:00:10',130,1500,100,4, 'https://swordis.com/wp-content/uploads/2023/11/medieval-sword.png'),
('Roman Statue','Freedom',1,'2024-10-04 07:00:10','2024-12-04 07:00:10',1500,12000,100,2, 'https://northcotepottery.com/cdn/shop/products/CD0020SALACIASTATUE.jpg?v=1658118775'),
('Vintage Watch','Apple watch',1,'2024-10-04 07:00:10','2024-12-04 07:00:10',1000,2900,100,3, 'https://www.truefacet.com/guide/wp-content/uploads/2017/06/VINTAGE-WATCH-min.jpg');


DROP TABLE IF EXISTS auction_history;
CREATE TABLE auction_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    auctioneer_id INT NOT NULL,
    bid_price INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS place_bid_history;
CREATE TABLE place_bid_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    buyer_id INT NOT NULL,
    auction_id INT NOT NULL,
    place_bid_price INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS user_follow;
CREATE TABLE user_follow (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    auction_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
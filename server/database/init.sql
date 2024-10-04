DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    role ENUM('seller', 'buyer', 'admin') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password, role) VALUES ('Long Duong','1234','$2a$08$eDO6YfBEcPz32vAGtiiF6O640ag.d6sATOLbxUYgyFsBzdcr7DQOW','seller');

DROP TABLE IF EXISTS auction_products;
CREATE TABLE auction_products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO auction_products (name, image_url) VALUES
('Ancient Vase', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7h8ZdeOFd8Y4ytPfzTpixv0jsS_u_t0somQ&s'),
('Old Coin', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkEWPbNvPN7wQAtga13OWDqUxkl8y1uAydkw&s'),
('Medieval Sword', 'https://swordis.com/wp-content/uploads/2023/11/medieval-sword.png'),
('Roman Statue', 'https://northcotepottery.com/cdn/shop/products/CD0020SALACIASTATUE.jpg?v=1658118775'),
('Vintage Watch', 'https://www.truefacet.com/guide/wp-content/uploads/2017/06/VINTAGE-WATCH-min.jpg');


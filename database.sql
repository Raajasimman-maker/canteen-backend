CREATE DATABASE IF NOT EXISTS canteen_db;
USE canteen_db;

CREATE TABLE IF NOT EXISTS quotations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    partyName VARCHAR(255) NOT NULL,
    mobile VARCHAR(20),
    eventName VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    placeOfSupply VARCHAR(100) DEFAULT 'Tamil Nadu',
    session1 JSON,
    session2 JSON,
    items1 JSON,
    items2 JSON,
    subtotal1 DECIMAL(10, 2),
    subtotal2 DECIMAL(10, 2),
    total DECIMAL(10, 2),
    receivedAmount DECIMAL(10, 2) DEFAULT 0,
    previousBalance DECIMAL(10, 2) DEFAULT 0,
    currentBalance DECIMAL(10, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

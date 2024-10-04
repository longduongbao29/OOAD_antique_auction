const db = require('../config/db');

// Lấy danh sách đấu giá cho buyer (toàn bộ đấu giá)
exports.getAllAuctions = (req, res) => {
    db.query('SELECT * FROM auction_products', (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(results);
    });
};

// Lấy danh sách đấu giá của seller
exports.getSellerAuctions = (req, res) => {
    db.query('SELECT * FROM auction_products WHERE user_id = ?', [req.user.id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(results);
    });
};

// Tạo đấu giá mới (chỉ seller)
exports.createAuction = (req, res) => {
    const { artifactName, description, startingBid, endTime } = req.body;

    db.query('INSERT INTO auction_products (artifactName, description, startingBid, endTime, user_id) VALUES (?, ?, ?, ?, ?)',
        [artifactName, description, startingBid, endTime, req.user.id], (err, result) => {
            if (err) return res.status(500).json({ error: 'Database error' });
            res.status(201).json({ message: 'Auction created successfully' });
        });
};

exports.getAuction = (req, res) => {
    id = req.params.id;
    db.query('SELECT * FROM auction_products WHERE id = ?',[id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(results[0]);
    });
}
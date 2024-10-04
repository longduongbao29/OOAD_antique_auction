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
    const { name, description, owner_id, time_start, time_end,initial_bid, current_bid,step_bid_in_price, step_bid_in_time,image_url } = req.body;

    db.query('INSERT INTO auction_products ( name, description, owner_id, time_start, time_end,initial_bid, current_bid,step_bid_in_price, step_bid_in_time,image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [name, description, owner_id, time_start, time_end,initial_bid, current_bid,step_bid_in_price, step_bid_in_time,image_url], (err, result) => {
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

exports.getByOwnerId = (req, res) => {
    id = req.params.id;
    db.query('SELECT * FROM auction_products WHERE owner_id = ?',[id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(results[0]);
    });
}
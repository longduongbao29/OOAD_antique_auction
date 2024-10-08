const db = require('../config/db');

// Lấy danh sách đấu giá cho buyer (toàn bộ đấu giá)
exports.getAllAuctions = (req, res) => {
    db.query('SELECT * FROM auction_products', (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(results);
    });
};

// Lấy danh sách đấu giá của seller
exports.getSelling = (req, res) => {
    db.query('SELECT * FROM auction_products WHERE owner_id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(results);
    });
};
exports.getBuying = (req, res) => {
    db.query('SELECT * FROM user_follow WHERE user_id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        
        db.query('SELECT * FROM auction_products WHERE owner_id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(results);
    });
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

exports.deleteAuction = (req, res) => {
    id = req.params.id;
    db.query('DELETE FROM auction_products WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        return res.json({message: "Delete"});
    });
}
exports.placeBid = (req, res) => {
    const { user_id, auction_id, bid_price } = req.body;
    db.query('SELECT * FROM auction_products WHERE id = ?', [auction_id], (err, results) => {
        const auction = results[0];
        if (bid_price <= auction.current_bid) {
            res.status(400).json({ message: "Your bid must higher than current bid!!!" });
        }
        else {
            db.query('INSERT IGNORE INTO user_follow (user_id, auction_id) VALUES (?,?) ', [user_id, auction_id]);
            db.query('INSERT INTO place_bid_history (buyer_id, auction_id, place_bid_price) VALUES (?,?,?)', [user_id, auction_id, bid_price]);  
            db.query('UPDATE auction_products SET current_bid = ? WHERE id = ?', [bid_price, auction_id]);
            res.status(200).json({ message: "Placed bid!!!" });
        }
    });
  
}
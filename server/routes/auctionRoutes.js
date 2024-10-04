const express = require('express');
const router = express.Router();
const auctionController = require('../controllers/auctionController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

// Lấy danh sách đấu giá cho buyer (toàn bộ đấu giá)
router.get('/getall',authenticateToken, auctionController.getAllAuctions);
router.get('/get/:id', authenticateToken, auctionController.getAuction)
router.get('/get-by-owner-id/:id',authenticateToken, auctionController.getByOwnerId )

// Lấy danh sách đấu giá của seller
router.get('/seller', authenticateToken, auctionController.getSellerAuctions);

// Tạo đấu giá mới (chỉ seller)
router.post('/create', authenticateToken, auctionController.createAuction);

module.exports = router;

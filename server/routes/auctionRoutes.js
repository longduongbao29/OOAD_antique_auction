const express = require('express');
const router = express.Router();
const auctionController = require('../controllers/auctionController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

// Lấy danh sách đấu giá cho buyer (toàn bộ đấu giá)
router.get('/getall',authenticateToken, auctionController.getAllAuctions);
router.get('/get/:id', authenticateToken, auctionController.getAuction)
router.get('/getselling/:id',authenticateToken, auctionController.getSelling )
router.get('/getbuying/:id', authenticateToken, auctionController.getBuying)
// Lấy danh sách đấu giá của seller

router.put('/delete_auction/:id', authenticateToken,auctionController.deleteAuction)

// Tạo đấu giá mới (chỉ seller)
router.post('/create', authenticateToken, auctionController.createAuction);

router.post('/place_bid', authenticateToken, auctionController.placeBid)

module.exports = router;

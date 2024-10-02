const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const auctionRoutes = require('./routes/auctionRoutes');
const app = express();

// Sử dụng cors middleware
app.use(cors()); // Cho phép tất cả các origin
app.use(morgan('combined'));
app.use(bodyParser.json());  // Sử dụng để parse JSON body

// Sử dụng route cho đấu giá
app.use('/api/auctions', auctionRoutes);
// Sử dụng route
app.use('/api/auth', authRoutes);

// Chạy server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

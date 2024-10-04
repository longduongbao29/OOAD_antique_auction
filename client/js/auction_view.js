import { loadNavbar } from './navbar.js';
let currentPrice = 1500; // Giá hiện tại

function placeBid() {
    const bidAmount = parseInt(document.getElementById('bidAmount').value);
    const bidMessage = document.getElementById('bidMessage');

    if (isNaN(bidAmount) || bidAmount <= currentPrice) {
        bidMessage.textContent = "Your bid must be higher than the current price.";
        bidMessage.style.color = 'red';
    } else {
        currentPrice = bidAmount;
        document.getElementById('currentPrice').textContent = "$" + currentPrice;
        bidMessage.textContent = "Bid placed successfully!";
        bidMessage.style.color = 'green';
    }
}

const token = localStorage.getItem('token')
document.addEventListener('DOMContentLoaded', function() {
    fetch(`http://localhost:3000/api/auctions/get/${window.localStorage.getItem('current_view_id')}`, {
        method: 'GET', // Hoặc 'POST' nếu bạn đang gửi dữ liệu
        headers: {
        'Authorization': `${token}`, // Thêm token vào headers
        'Content-Type': 'application/json' // Nếu cần thiết
        }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            const productList = document.getElementById('auction-container');
            
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            
            productDiv.innerHTML =
            `<div class="product-image">
                <img id="productImg" src="${data.image_url}" alt="Product Image">
            </div>
            <div class="product-info">
                    <h1 id="productName">${data.name}</h1>
                    <p id="productDescription">
                        This is a rare antique vase from the Ming Dynasty, perfect for collectors.
                    </p>
                    <p id="currentBid">Current Bid: <span id="currentPrice">$1500</span></p>
                    <p id="auctionEnd">Auction Ends In: <span id="endTime">02:15:00</span></p>

                    <div class="bid-section">
                        <label for="bidAmount">Your Bid:</label>
                        <input type="number" id="bidAmount" min="1501" placeholder="Enter your bid">
                        <button onclick="placeBid()">Place Bid</button>
                    </div>

                    <p id="bidMessage"></p>
            </div>`;
            
            productList.appendChild(productDiv);

        })
        .catch(error => console.error('Error fetching products:', error));
    
  
   
    
});



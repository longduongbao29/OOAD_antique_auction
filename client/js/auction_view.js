import { loadNavbar } from './navbar.js';

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
            
            
            const productList = document.getElementById('auction-container');
            
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            const startTime = new Date();
            const endTime = new Date(data.time_end);
            let timeDiff = endTime - startTime - 7*60*60*1000;
            
            let ended = false;
            if (timeDiff < 0) {
                timeDiff = -timeDiff;
                ended = true;
            }

            const diffInDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Lấy số ngày
            const diffInHours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Lấy số giờ còn lại
            const diffInMinutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)); // Lấy số phút còn lại
            let time_remain;
            if (ended) {
                time_remain =`Ended: ${diffInDays}d ${diffInHours}h ${diffInMinutes}m`
            }
            else {
                time_remain = `Time remain: ${diffInDays}d ${diffInHours}h ${diffInMinutes}m`
            }
            console.log(data);
            
            productDiv.innerHTML =
            `<div class="product-image">
                <img id="productImg" src="${data.image_url}" alt="Product Image">
            </div>
            <div class="product-info">
                    <h1 id="productName">${data.name}</h1>
                    <p id="productDescription">
                        ${data.description}
                    </p>
                    <p id="currentBid">Initital Bid: <span id="currentPrice">$${data.initial_bid}</span></p>
                    <p id="currentBid">Current Bid: <span id="currentPrice">$${data.current_bid}</span></p>
                    <p id="auctionEnd">${time_remain}</p>

                    <div id="bit-section" class="bid-section">
                    </div>

                    <p id="bidMessage"></p>
            </div>`;
            
            productList.appendChild(productDiv);
            const bitSection = document.getElementById('bit-section');
            if (ended) {
                bitSection.innerHTML = `<p>This auction ended!!!</p>`
            }
            else {
                bitSection.innerHTML = `<label for="bidAmount">Your Bid:</label>
                        <input type="number" id="bidAmount" min="${data.current_bid}" step="${data.step_bid_in_price}" placeholder="Enter your bid">
                        <button onclick="placeBid()">Place Bid</button>`
            }
            

        })
        .catch(error => console.error('Error fetching products:', error));
    
  
   
    
});



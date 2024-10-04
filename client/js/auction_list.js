import { loadNavbar } from './navbar.js';
// You can add functionality here to interact with your auction system

const token = localStorage.getItem('token')
document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/api/auctions/getall', {
        method: 'GET', // Hoặc 'POST' nếu bạn đang gửi dữ liệu
        headers: {
        'Authorization': `${token}`, // Thêm token vào headers
        'Content-Type': 'application/json' // Nếu cần thiết
        }
        })
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('product-list');
            
            data.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');
                const currentTime = new Date();
                
                
                let startTime = new Date(product.time_start.replace("T"," ").replace("Z",""));
                let endTime = new Date(product.time_end.replace("T"," ").replace("Z",""));
    
                let timeDiff = endTime - currentTime;
                console.log(startTime, currentTime, endTime);
                let time_remain;
                

                let ended = false;
                if (timeDiff < 0) {
                    timeDiff = -timeDiff;
                    ended = true;
                }

                const diffInDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Lấy số ngày
                const diffInHours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Lấy số giờ còn lại
                const diffInMinutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)); // Lấy số phút còn lại
                if (ended) {
                    time_remain =`Ended: ${diffInDays}d ${diffInHours}h ${diffInMinutes}m`
                }
                else {
                    time_remain = `Time remain: ${diffInDays}d ${diffInHours}h ${diffInMinutes}m`
                }
                if (startTime <= currentTime ) {
                     productDiv.innerHTML = `
                    <img src="${product.image_url}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <p>Current bid: $${product.current_bid}</p>
                    <p>${time_remain} </p>
                    <button data-id="${product.id}" class="bid-btn">Place bid</button>
                `;
                productList.appendChild(productDiv);
                const bidButtons = document.querySelectorAll('.bid-btn');

                bidButtons.forEach(button => {
                    button.addEventListener('click', function () {
                        const productId = this.getAttribute('data-id');
                        
                        localStorage.setItem('current_view_id', productId);
                        window.location.href = "auction_view.html";
                    });
                });
                }
               

            });
        })
        .catch(error => console.error('Error fetching products:', error));
    
  
   
    
});

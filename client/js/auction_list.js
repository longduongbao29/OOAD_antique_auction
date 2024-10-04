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
                
                productDiv.innerHTML = `
                    <img src="${product.image_url}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <p>Current bid: </p>
                    <p>Time remain: </p>
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

            });
        })
        .catch(error => console.error('Error fetching products:', error));
    
  
   
    
});

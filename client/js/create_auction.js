import { loadNavbar } from './navbar.js';
document.getElementById("auctionForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const user = jwt_decode(token);
    console.log(user);
    
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const ownerId = user.id;
    const timeStart = document.getElementById("time_start").value;
    const timeEnd = document.getElementById("time_end").value;
    const initialBid = document.getElementById("initial_bid").value;
    const currentBid = initialBid;
    const stepBidInPrice = document.getElementById("step_bid_in_price").value;
    const stepBidInTime = document.getElementById("step_bid_in_time").value;
    const imageUrl = document.getElementById("image_url").value;

    const auctionProduct = {
        name,
        description,
        owner_id: ownerId,
        time_start: timeStart,
        time_end: timeEnd,
        initial_bid: initialBid,
        current_bid: currentBid,
        step_bid_in_price: stepBidInPrice,
        step_bid_in_time: stepBidInTime,
        image_url: imageUrl
    };

    fetch('http://localhost:3000/api/auctions/create', {

        method: 'POST', // Hoặc 'POST' nếu bạn đang gửi dữ liệu
        headers: {
        'Authorization': `${token}`, // Thêm token vào headers
        'Content-Type': 'application/json' // Nếu cần thiết
        },
        body: JSON.stringify(auctionProduct),
        })
        .then(response => {
            response.json(); 
            alert(response)
        })
        .then(data => {
            window.location.href = "dashboard.html"
        })
        .catch(error => console.error('Error fetching products:', error));
    
});

// Lắng nghe sự kiện nhập URL và hiển thị ảnh preview
document.getElementById("image_url").addEventListener("input", function() {
    const imageUrl = document.getElementById("image_url").value;
    const imagePreview = document.getElementById("imagePreview");

    if (imageUrl) {
        imagePreview.src = imageUrl;
    } else {
        imagePreview.src = "";
    }
});

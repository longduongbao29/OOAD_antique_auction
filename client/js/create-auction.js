const token = localStorage.getItem('token');

// Kiểm tra xem người dùng đã đăng nhập chưa
if (!token) {
    alert('You are not logged in. Please log in.');
    window.location.href = 'login.html';
}

// Xử lý tạo đấu giá
document.getElementById('createAuctionForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const artifactName = document.getElementById('artifactName').value;
    const description = document.getElementById('description').value;
    const startingBid = document.getElementById('startingBid').value;
    const endTime = document.getElementById('endTime').value;

    const payload = { artifactName, description, startingBid, endTime };

    try {
        const response = await fetch('http://localhost:3000/api/auctions', {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Auction created successfully!');
            window.location.href = 'dashboard.html';
        } else {
            alert(`Error: ${data.error}`);
        }
    } catch (error) {
        alert('Something went wrong. Please try again.');
    }
});

// Xử lý trở về Dashboard
document.getElementById('backButton').addEventListener('click', () => {
    window.location.href = 'dashboard.html';
});

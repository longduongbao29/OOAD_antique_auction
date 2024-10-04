// Hàm để load file navbar.html vào trang hiện tại
// import { displayUserInfo } from "./dashboard";
export function loadNavbar() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
            setupNavbar(); // Sau khi load xong thì cài đặt sự kiện
        });
}

// Hàm để cài đặt các sự kiện cho navigation bar
function setupNavbar() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You are not logged in. Please log in.');
        window.location.href = 'index.html';
    } else {
        const user = jwt_decode(token);


        document.getElementById('logoutButton').addEventListener('click', () => {
            localStorage.removeItem('token');
            alert('You have been logged out.');
            window.location.href = 'index.html';
        });
    }
}

// Gọi hàm để load thanh navigation bar khi trang load
loadNavbar();
window.addEventListener("DOMContentLoaded", (event) => {
    // document.querySelector('.dropbtn').addEventListener('click', function () {
    //     const dropdownContent = this.nextElementSibling;

    //     // Toggle trạng thái hiển thị
    //     dropdownContent.classList.toggle('dropdown-active');
    // });

    // Đóng dropdown nếu người dùng click ra ngoài
    window.onclick = function (event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            for (var i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('dropdown-active')) {
                    openDropdown.classList.remove('dropdown-active');
                }
            }
        }
    };

});
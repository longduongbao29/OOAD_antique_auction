// URL API endpoint
const API_URL = 'http://localhost:3000/api/auth';

// Xử lý đăng ký người dùng
window.addEventListener("DOMContentLoaded", (event) => {
    const el = document.getElementById('registerForm');
    if (el) {
        el.addEventListener('submit', async function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const role = 'user';

            const payload = { name, email, password, role };

            try {
                const response = await fetch(`${API_URL}/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Registration successful!');
                    window.location.href = 'index.html';
                } else {
                    alert(`Error: ${data.error}`);
                }
            } catch (error) {
                alert('Something went wrong. Please try again.', error);
            }
        });
    }

});


// Xử lý đăng nhập người dùng
window.addEventListener("DOMContentLoaded", (event) => {
    const el = document.getElementById('loginForm');
    if (el) {
        el.addEventListener('submit', async function (e) {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const payload = { email, password };

            try {
                const response = await fetch(`${API_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Login successful!');
                    // Lưu JWT token vào localStorage hoặc sessionStorage
                    localStorage.setItem('token', data.token);
                    // Chuyển hướng đến trang chính của hệ thống
                    window.location.href = 'dashboard.html';
                } else {
                    alert(`Error: ${data.error}`);
                }
            } catch (error) {
                alert('Something went wrong. Please try again.');
            }
        });
    }

});

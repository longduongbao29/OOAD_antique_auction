import { loadNavbar } from './navbar.js'; // Import hàm loadNavbar để tải thanh điều hướng
// Hàm để lưu thông tin mới (sửa tên, email, đổi mật khẩu)

// Hàm để cập nhật tên người dùng
function updateUserName(token, newName) {
    fetch('/api/user/update-name', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Sử dụng token nếu cần
        },
        body: JSON.stringify({ name: newName })
    })
        .then(response => {
            if (response.ok) {
                console.log('User name updated successfully!');
                closeModal('editNameModal');
            } else {
                console.error('Failed to update user name:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error updating user name:', error);
        });
}

// Hàm để cập nhật email người dùng
function updateUserEmail(token, newEmail) {
    fetch('/api/user/update-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email: newEmail })
    })
        .then(response => {
            if (response.ok) {
                console.log('User email updated successfully!');
                closeModal('editEmailModal');
            } else {
                console.error('Failed to update user email:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error updating user email:', error);
        });
}

// Hàm để đổi mật khẩu người dùng
function changeUserPassword(token, currentPassword, newPassword) {
    fetch('/api/user/change-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
    })
        .then(response => {
            if (response.ok) {
                console.log('Password changed successfully!');
                closeModal('changePasswordModal');
            } else {
                console.error('Failed to change password:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error changing password:', error);
        });
}

// Hàm hiển thị thông tin người dùng
function displayUserInfo(token) {
    const userInfoDiv = document.getElementById('userInfo');
    const user = jwt_decode(token);

    userInfoDiv.innerHTML = `
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Role:</strong> ${user.role}</p>
    `;
}


// Hàm xử lý đóng modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "none";
}

// Hàm để lưu thông tin mới (sửa tên, email, đổi mật khẩu)
// Hàm khởi tạo
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (token) {
        displayUserInfo(token);
        // loadNavbar(); // Uncomment this if you have a navbar to load

        // Thiết lập sự kiện cho các nút chỉnh sửa
        setupEditButtons(); // This function will handle the edit button clicks

        // Lưu thông tin mới
        saveNewInfo(token); // Lưu thông tin mới
    }

    // Mở modal sửa tên
    document.getElementById('editNameBtn').addEventListener('click', () => {
        document.getElementById('editNameModal').style.display = 'block';
    });

    // Mở modal sửa email
    document.getElementById('editEmailBtn').addEventListener('click', () => {
        document.getElementById('editEmailModal').style.display = 'block';
    });

    // Mở modal đổi mật khẩu
    document.getElementById('changePasswordBtn').addEventListener('click', () => {
        document.getElementById('changePasswordModal').style.display = 'block';
    });

    // Đóng các modal
    document.getElementById('closeNameModal').onclick = () => closeModal('editNameModal');
    document.getElementById('closeEmailModal').onclick = () => closeModal('editEmailModal');
    document.getElementById('closePasswordModal').onclick = () => closeModal('changePasswordModal');
});

// Hàm để thiết lập sự kiện cho các nút chỉnh sửa
function setupEditButtons() {
    const editNameBtn = document.getElementById('editNameBtn');
    const editEmailBtn = document.getElementById('editEmailBtn');
    const changePasswordBtn = document.getElementById('changePasswordBtn');

    if (editNameBtn) {
        editNameBtn.addEventListener('click', () => {
            document.getElementById('editNameModal').style.display = 'block';
        });
    }

    if (editEmailBtn) {
        editEmailBtn.addEventListener('click', () => {
            document.getElementById('editEmailModal').style.display = 'block';
        });
    }

    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', () => {
            document.getElementById('changePasswordModal').style.display = 'block';
        });
    }

    // Đóng các modal
    document.getElementById('closeNameModal')?.addEventListener('click', () => closeModal('editNameModal'));
    document.getElementById('closeEmailModal')?.addEventListener('click', () => closeModal('editEmailModal'));
    document.getElementById('closePasswordModal')?.addEventListener('click', () => closeModal('changePasswordModal'));
}

// Hàm để lưu thông tin mới (sửa tên, email, đổi mật khẩu)
function saveNewInfo(token) {
    const saveNameButton = document.getElementById('saveNameButton');
    const saveEmailButton = document.getElementById('saveEmailButton');
    const savePasswordButton = document.getElementById('savePasswordButton');

    if (saveNameButton) {
        saveNameButton.addEventListener('click', () => {
            const newName = document.getElementById('newName').value;
            if (newName) {
                updateUserName(token, newName);
            }
        });
    }

    if (saveEmailButton) {
        saveEmailButton.addEventListener('click', () => {
            const newEmail = document.getElementById('newEmail').value;
            if (newEmail) {
                updateUserEmail(token, newEmail);
            }
        });
    }

    if (savePasswordButton) {
        savePasswordButton.addEventListener('click', () => {
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            if (currentPassword && newPassword) {
                changeUserPassword(token, currentPassword, newPassword);
            }
        });
    }
}
document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra đăng nhập trước
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) {
        return;
    }

    // Load user data từ localStorage
    const usersData = localStorage.getItem('users');
    const ordersData = localStorage.getItem('orders');

    const users = usersData ? JSON.parse(usersData) : [];
    const orders = ordersData ? JSON.parse(ordersData) : [];

    // Hiển thị thông tin user hiện tại
    const currentUserFromStorage = users.find(user => user.username === currentUser.username);
    if (currentUserFromStorage) {
        document.getElementById('user-fullname').textContent = currentUserFromStorage.fullname || 'Chưa cập nhật';
        document.getElementById('user-username').textContent = currentUserFromStorage.username || 'Chưa cập nhật';
        document.getElementById('user-email').textContent = currentUserFromStorage.email || 'Chưa cập nhật';
        document.getElementById('user-phone').textContent = currentUserFromStorage.phone || 'Chưa cập nhật';
        document.getElementById('user-createdAt').textContent = currentUserFromStorage.createdAt ? 
            new Date(currentUserFromStorage.createdAt).toLocaleDateString('vi-VN') : 'Chưa cập nhật';
        
        // Cập nhật avatar với tên user
        const avatar = document.querySelector('.profile-avatar');
        if (avatar && currentUserFromStorage.fullname) {
            avatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUserFromStorage.fullname)}&background=4361ee&color=fff&size=120`;
        }
    }

    // Hiển thị đơn hàng
    const ordersBody = document.getElementById('orders-body');
    const noOrders = document.getElementById('no-orders');

    if (orders.length > 0) {
        ordersBody.innerHTML = '';
        noOrders.style.display = 'none';

        orders.forEach(order => {
            const row = document.createElement('tr');
            
            // Xác định class trạng thái
            let statusClass = 'status-pending';
            if (order.status.toLowerCase().includes('hoàn thành')) {
                statusClass = 'status-completed';
            } else if (order.status.toLowerCase().includes('hủy')) {
                statusClass = 'status-cancelled';
            } else if (order.status.toLowerCase().includes('xử lý')) {
                statusClass = 'status-processing';
            }

            row.innerHTML = `
                <td>${order.orderId || 'N/A'}</td>
                <td>${order.date ? new Date(order.date).toLocaleDateString('vi-VN') : 'N/A'}</td>
                <td>${order.items ? order.items.length : 0} sản phẩm</td>
                <td>${order.paymentMethod || 'Chưa rõ'}</td>
                <td><span class="status ${statusClass}">${order.status || 'Đang xử lý'}</span></td>
                <td>${order.total ? order.total.toLocaleString('vi-VN') + ' đ' : '0 đ'}</td>
                <td>

                </td>
            `;
            ordersBody.appendChild(row);
        });
    } else {
        ordersBody.innerHTML = '';
        noOrders.style.display = 'flex';
    }

    // Tính toán và hiển thị thống kê đơn hàng
    if (orders.length > 0) {
        const totalOrders = orders.length;
        const completedOrders = orders.filter(o => o.status && o.status.toLowerCase().includes('hoàn thành')).length;
        const processingOrders = orders.filter(o => o.status && o.status.toLowerCase().includes('xử lý')).length;
        const cancelledOrders = orders.filter(o => o.status && o.status.toLowerCase().includes('hủy')).length;
        const totalSpending = orders.reduce((sum, o) => sum + (o.total || 0), 0);

        // Cập nhật thống kê
        document.querySelector('.profile-stats').innerHTML = `
            <div class="detail-item">
                <span class="detail-label">Tổng đơn hàng:</span>
                <span class="detail-value">${totalOrders}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Đơn hàng thành công:</span>
                <span class="detail-value text-success">${completedOrders}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Đơn hàng đang xử lý:</span>
                <span class="detail-value text-warning">${processingOrders}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Đơn hàng đã hủy:</span>
                <span class="detail-value text-danger">${cancelledOrders}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Tổng chi tiêu:</span>
                <span class="detail-value text-primary">${totalSpending.toLocaleString('vi-VN')} đ</span>
            </div>
        `;
    }

    // Sự kiện cho nút "Đặt hàng ngay"
    const orderNowBtn = document.querySelector('#no-orders .btn-primary');
    if (orderNowBtn) {
        orderNowBtn.addEventListener('click', function() {
            window.location.href = 'cart.html';
        });
    }

    // Xử lý xóa lịch sử đơn hàng
    const clearHistoryBtn = document.getElementById('clear-history-btn');
    const deleteModal = document.getElementById('delete-confirm-modal');
    const confirmDeleteBtn = document.getElementById('confirm-delete');
    const cancelDeleteBtn = document.getElementById('cancel-delete');
    
    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', function() {
            deleteModal.style.display = 'flex';
        });
    }
    
    if (cancelDeleteBtn) {
        cancelDeleteBtn.addEventListener('click', function() {
            deleteModal.style.display = 'none';
        });
    }
    
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', function() {
            localStorage.removeItem('orders');
            document.getElementById('orders-body').innerHTML = '';
            document.getElementById('no-orders').style.display = 'flex';
            
            document.querySelector('.profile-stats').innerHTML = `
                <div class="detail-item">
                    <span class="detail-label">Tổng đơn hàng:</span>
                    <span class="detail-value">0</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Đơn hàng thành công:</span>
                    <span class="detail-value text-success">0</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Đơn hàng đang xử lý:</span>
                    <span class="detail-value text-warning">0</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Đơn hàng đã hủy:</span>
                    <span class="detail-value text-danger">0</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Tổng chi tiêu:</span>
                    <span class="detail-value text-primary">0 đ</span>
                </div>
            `;
            
            deleteModal.style.display = 'none';
            alert('Đã xóa toàn bộ lịch sử đơn hàng!');
        });
    }

    // Xử lý cập nhật thông tin cá nhân và mật khẩu
    const settingsBtn = document.querySelector('.btn-settings');
    const editModal = document.getElementById('edit-profile-modal');
    const cancelEditBtn = document.getElementById('cancel-edit');
    const profileForm = document.getElementById('profile-form');
    
    if (settingsBtn) {
        settingsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Lấy thông tin user hiện tại
            const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
            const usersData = localStorage.getItem('users');
            const users = usersData ? JSON.parse(usersData) : [];
            const user = users.find(u => u.username === currentUser.username);
            
            if (user) {
                // Điền thông tin vào form
                document.getElementById('edit-fullname').value = user.fullname || '';
                document.getElementById('edit-email').value = user.email || '';
                document.getElementById('edit-phone').value = user.phone || '';
                
                // Hiển thị modal
                editModal.style.display = 'flex';
            }
        });
    }
    
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', function() {
            // Reset các field mật khẩu
            document.getElementById('current-password').value = '';
            document.getElementById('new-password').value = '';
            document.getElementById('confirm-password').value = '';
            editModal.style.display = 'none';
        });
    }
    
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Lấy dữ liệu từ form
            const fullname = document.getElementById('edit-fullname').value;
            const email = document.getElementById('edit-email').value;
            const phone = document.getElementById('edit-phone').value;
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            // Lấy thông tin user hiện tại
            const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
            const usersData = localStorage.getItem('users');
            let users = usersData ? JSON.parse(usersData) : [];
            const userIndex = users.findIndex(u => u.username === currentUser.username);
            
            // Kiểm tra mật khẩu nếu có thay đổi
            if (currentPassword || newPassword || confirmPassword) {
                if (!currentPassword) {
                    alert('Vui lòng nhập mật khẩu hiện tại để thay đổi mật khẩu');
                    return;
                }
                
                if (newPassword !== confirmPassword) {
                    alert('Mật khẩu mới và xác nhận mật khẩu không khớp');
                    return;
                }
                
                if (newPassword.length < 6) {
                    alert('Mật khẩu mới phải có ít nhất 6 ký tự');
                    return;
                }
                
                // Kiểm tra mật khẩu hiện tại
                if (users[userIndex].password !== currentPassword) {
                    alert('Mật khẩu hiện tại không đúng');
                    return;
                }
                
                // Cập nhật mật khẩu mới
                users[userIndex].password = newPassword;
            }
            
            // Cập nhật thông tin khác
            users[userIndex] = {
                ...users[userIndex],
                fullname: fullname,
                email: email,
                phone: phone
            };
            
            // Lưu lại vào localStorage
            localStorage.setItem('users', JSON.stringify(users));
            
            // Cập nhật sessionStorage
            const updatedUser = {
                ...currentUser,
                fullname: fullname,
                email: email,
                phone: phone
            };
            sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
            
            // Cập nhật giao diện
            document.getElementById('user-fullname').textContent = fullname;
            document.getElementById('user-email').textContent = email;
            document.getElementById('user-phone').textContent = phone;
            
            // Cập nhật avatar
            const avatar = document.querySelector('.profile-avatar');
            if (avatar && fullname) {
                avatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullname)}&background=4361ee&color=fff&size=120`;
            }
            
            // Đóng modal
            editModal.style.display = 'none';
            
            // Reset password fields
            document.getElementById('current-password').value = '';
            document.getElementById('new-password').value = '';
            document.getElementById('confirm-password').value = '';
            
            // Hiển thị thông báo
            alert('Cập nhật thông tin thành công!');
            
            // Cập nhật welcome message
            const welcomeMsg = document.getElementById('welcome-msg');
            if (welcomeMsg) {
                welcomeMsg.textContent = `Xin chào ${fullname}`;
            }
        });
    }
});
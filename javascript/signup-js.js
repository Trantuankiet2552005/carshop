// Lấy dữ liệu người dùng từ localStorage (nếu có)
let users = JSON.parse(localStorage.getItem('users')) || [];

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Lấy giá trị từ form
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const fullname = document.getElementById('fullname').value.trim();
    const phone = document.getElementById('phone').value.trim();
    
    // Reset thông báo lỗi
    document.getElementById('username-error').textContent = '';
    document.getElementById('email-error').textContent = '';
    document.getElementById('password-error').textContent = '';
    document.getElementById('confirm-error').textContent = '';
    
    // Validate form
    let isValid = true;
    
    // Kiểm tra username
    if (username.length < 6) {
        document.getElementById('username-error').textContent = 'Tên đăng nhập phải có ít nhất 6 ký tự';
        isValid = false;
    } else if (users.some(user => user.username === username)) {
        document.getElementById('username-error').textContent = 'Tên đăng nhập đã tồn tại';
        isValid = false;
    }
    
    // Kiểm tra email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('email-error').textContent = 'Email không hợp lệ';
        isValid = false;
    } else if (users.some(user => user.email === email)) {
        document.getElementById('email-error').textContent = 'Email đã được đăng ký';
        isValid = false;
    }
    
    // Kiểm tra mật khẩu
    if (password.length < 6) {
        document.getElementById('password-error').textContent = 'Mật khẩu phải có ít nhất 6 ký tự';
        isValid = false;
    }
    
    // Kiểm tra xác nhận mật khẩu
    if (password !== confirmPassword) {
        document.getElementById('confirm-error').textContent = 'Mật khẩu không khớp';
        isValid = false;
    }
    
    // Nếu form hợp lệ
    if (isValid) {
        // Tạo user mới
        const newUser = {
            username,
            email,
            password, // Lưu ý: Trong thực tế cần mã hóa mật khẩu trước khi lưu
            fullname,
            phone,
            createdAt: new Date().toISOString()
        };
        
        // Thêm user vào mảng users
        users.push(newUser);
        
        // Lưu vào localStorage
        localStorage.setItem('users', JSON.stringify(users));
        
        // Thông báo thành công
        alert('Đăng ký thành công! Vui lòng đăng nhập.');
        
        // Chuyển hướng đến trang đăng nhập
        window.location.href = 'login.html';
    }
});
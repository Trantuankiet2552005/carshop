document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Find user
    const user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
        alert('Đăng nhập thành công!');
        // Save current user to session
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        // Redirect to home page
        window.location.href = '../html-subprogram/index-center.html';
    } else {
        alert('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
});
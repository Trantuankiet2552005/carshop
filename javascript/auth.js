function checkLoginStatus() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const welcomeMsg = document.getElementById('welcome-msg');
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const logoutBtn = document.getElementById('logout-btn');

    if (currentUser) {
        if (welcomeMsg) {
            welcomeMsg.textContent = `Xin chào ${currentUser.fullname}`;
            welcomeMsg.style.display = 'inline';
        }
        if (loginBtn) loginBtn.style.display = 'none';
        if (signupBtn) signupBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'inline';
    }
}

// Gọi hàm khi trang tải
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    
    // Thêm sự kiện đăng xuất
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            sessionStorage.removeItem('currentUser');
            window.location.href = '../html-subprogram/index-center.html';
        });
    }
});


//@@@@@@@@@@@@@@@@@
function checkLoginStatus() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const welcomeMsg = document.getElementById('welcome-msg');
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const logoutBtn = document.getElementById('logout-btn');

    if (currentUser) {
        if (welcomeMsg) {
            welcomeMsg.textContent = `Xin chào ${currentUser.fullname}`;
            welcomeMsg.style.display = 'inline';
        }
        if (loginBtn) loginBtn.style.display = 'none';
        if (signupBtn) signupBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'inline';
    } else {
        // Nếu chưa đăng nhập và đang ở trang profile thì chuyển hướng
        if (window.location.pathname.includes('profile.html')) {
            window.location.href = 'login.html';
        }
    }
}

// Gọi hàm khi trang tải
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    
    // Thêm sự kiện đăng xuất
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            sessionStorage.removeItem('currentUser');
            window.location.href = '../html-subprogram/index-center.html';
        });
    }
});


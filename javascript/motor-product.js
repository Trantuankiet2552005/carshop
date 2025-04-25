
// Lấy ID từ URL
const urlParams = new URLSearchParams(window.location.search);
const motorId = urlParams.get('id');

// Tìm xe máy theo ID
const motor = motors.find(m => m.id === parseInt(motorId));

if (motor) {
    // Hiển thị tên và giá
    document.getElementById('product-name').textContent = motor.name;
    document.getElementById('product-price').textContent = motor.price;

    // Hiển thị ảnh chính và ảnh nhỏ
    const gallery = document.getElementById('product-gallery');
    gallery.innerHTML = `
        <img src="../images/${motor.image}" alt="${motor.name}" class="main-image">
        <div class="thumbnail-container">
            <img src="../images/${motor.image}" alt="${motor.name}" class="thumbnail">
        </div>
    `;

    // Hiển thị thông số kỹ thuật
    const specsList = document.getElementById('product-specs');
    specsList.innerHTML = `
        <li><span>Loại xe:</span> <span>${motor.type}</span></li>
        <li><span>Hãng xe:</span> <span>${motor.brand}</span></li>
        <li><span>Phân khối:</span> <span>${motor.cc}</span></li>
        <li><span>Hộp số:</span> <span>${motor.atcvt}</span></li>
    `;

    // Thêm nút hành động
    document.querySelector('.product-info').innerHTML += `
        <div class="product-actions">
            <button class="add-to-cart-btn" data-id="${motor.id}">Thêm vào giỏ hàng</button>
            <button class="buy-now-btn" data-id="${motor.id}">Mua ngay</button>
        </div>
    `;

    // Xử lý nút thêm vào giỏ hàng
    document.querySelector('.add-to-cart-btn').addEventListener('click', function () {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

        if (!currentUser) {
            alert('Vui lòng đăng nhập để tiếp tục!');
            window.location.href = 'login.html';
            return;
        }

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.id === motor.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: motor.id,
                name: motor.name,
                price: motor.price,
                image: motor.image,
                quantity: 1
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        // Hiển thị thông báo thêm thành công
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = 'Đã thêm vào giỏ hàng!';
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);

        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: #4CAF50;
                color: white;
                padding: 20px 30px;
                border-radius: 10px;
                box-shadow: 0 4px 10px rgba(0,0,0,0.25);
                z-index: 1000;
                font-size: 16px;
                animation: fadeOut 3s forwards;
            }
            @keyframes fadeOut {
                0% { opacity: 1; }
                80% { opacity: 1; }
                100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);

              // Lưu giỏ hàng vào localStorage
              localStorage.setItem('cart', JSON.stringify(cart));

              // Cập nhật số lượng giỏ hàng
              updateCartCount();
              setTimeout(() => {
                  location.reload();
                }, 2000); //
    });

    // Thay đổi ảnh chính khi click ảnh nhỏ
    document.querySelector('.thumbnail').addEventListener('click', function () {
        document.querySelector('.main-image').src = this.src;
    });
}

// Xử lý nút mua ngay
document.querySelector('.buy-now-btn').addEventListener('click', function () {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    if (!currentUser) {
        alert('Vui lòng đăng nhập để tiếp tục!');
        window.location.href = 'login.html';
        return;
    }
    //xóa giỏ hàng
    localStorage.removeItem('buynow');

    let buynow = JSON.parse(localStorage.getItem('buynow')) || [];
    const existingItem = buynow.find(item => item.id === motor.id);

    buynow.push({
        id: motor.id,
        name: motor.name,
        price: motor.price,
        image: motor.image,
        quantity: 1
    });

    //thêm vào giỏ hàng
    localStorage.setItem('buynow', JSON.stringify(buynow));
    window.location.href = '../html-subprogram/pay-buynow.html';
});


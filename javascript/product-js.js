// Lấy thông tin sản phẩm từ URL
const urlParams = new URLSearchParams(window.location.search);
const carId = urlParams.get('id');

// Tìm xe trong mảng cars (từ cars-js.js)
    const car = cars.find(c => c.name.replace(/\s+/g, '-').toLowerCase() === carId);

if (car) {
    // Hiển thị thông tin sản phẩm
    document.getElementById('product-name').textContent = car.name;
    document.getElementById('product-price').textContent = car.price;
    
    // Thêm hình ảnh
    const gallery = document.getElementById('product-gallery');
    gallery.innerHTML = `
        <img src="../images/${car.image}" alt="${car.name}" class="main-image">
        <div class="thumbnail-container">
            <img src="../images/${car.image}" alt="${car.name}" class="thumbnail">
        </div>
    `;
    
    // Thêm thông số kỹ thuật
    const specsList = document.getElementById('product-specs');
    specsList.innerHTML = `
        <li><span>Loại xe:</span> <span>${car.type}</span></li>
        <li><span>Hãng xe:</span> <span>${car.brand}</span></li>
        <li><span>Nhiên liệu:</span> <span>${car.fuel}</span></li>
    `;
    
    // Thêm nút hành động
    document.querySelector('.product-info').innerHTML += `
        <div class="product-actions">
            <button class="add-to-cart-btn" data-id="${car.id}">Thêm vào giỏ hàng</button>
            <button class="buy-now-btn" data-id="${car.id}">Mua ngay</button>
        </div>
    `;

    // Xử lý nút "Thêm vào vỏ hàng"
    document.querySelector('.add-to-cart-btn').addEventListener('click', function() {
        const productId = parseInt(this.getAttribute('data-id'));
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        
        if (!currentUser) {
            alert('Vui lòng đăng nhập để tiếp tục!');
            window.location.href = 'login.html';
            return;
        }

        // Lấy giỏ hàng hiện tại từ localStorage (nếu chưa có thì là mảng rỗng)
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Kiểm tra xem sản phẩm đã có trong giỏ chưa
        const existingItem = cart.find(item => item.id === car.id);

        if (existingItem) {
            // Nếu đã có, tăng số lượng lên 1
            existingItem.quantity += 1;
            // Hiển thị thông báo đã thêm vào giỏ hàng
            const notification = document.createElement('div');
            notification.classList.add('notification'); // 👈 dùng đúng class có CSS
            notification.textContent = 'Đã thêm vào giỏ hàng!';
            document.body.appendChild(notification);

            // Ẩn thông báo sau 3 giây
            setTimeout(() => {
                notification.remove();
            }, 3000);

            // CSS cho thông báo
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
        } else {
            // Nếu chưa có, thêm mới vào giỏ hàng
            cart.push({
                id: car.id,
                name: car.name,
                price: car.price,
                image: car.image,
                quantity: 1
            });

            // Hiển thị thông báo đã thêm vào giỏ hàng
            const notification = document.createElement('div');
            notification.classList.add('notification'); // 👈 dùng đúng class có CSS
            notification.textContent = 'Đã thêm vào giỏ hàng!';
            document.body.appendChild(notification);

            // Ẩn thông báo sau 3 giây
            setTimeout(() => {
                notification.remove();
            }, 3000);

            // CSS cho thông báo
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
        }

        // Lưu giỏ hàng vào localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Cập nhật số lượng giỏ hàng
        updateCartCount();
        setTimeout(() => {
            location.reload();
          }, 2000); //
          






    });

    // Xử lý click ảnh nhỏ
    document.querySelector('.thumbnail').addEventListener('click', function() {
        document.querySelector('.main-image').src = this.src;
    });
}
// Xử lý nút mua ngay
document.querySelector('.buy-now-btn').addEventListener('click', function () {
    const productId = parseInt(this.getAttribute('data-id'));
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    if (!currentUser) {
        alert('Vui lòng đăng nhập để tiếp tục!');
        window.location.href = 'login.html';
        return;
    }

    // XÓA giỏ hàng "mua ngay" cũ
    localStorage.removeItem('buynow');

    // TẠO giỏ hàng "mua ngay" mới chỉ với 1 sản phẩm
    const buynow = [{
        id: car.id,
        name: car.name,
        price: car.price,
        image: car.image,
        quantity: 1
    }];

    // Lưu vào localStorage
    localStorage.setItem('buynow', JSON.stringify(buynow));

    // Điều hướng sang trang thanh toán (nếu có)
    window.location.href = '../html-subprogram/pay-buynow.html';
});



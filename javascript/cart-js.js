// Lấy dữ liệu giỏ hàng từ localStorage
function getCartData() {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
}

// Hiển thị dữ liệu giỏ hàng
function displayCartItems() {
    const cartItems = getCartData();
    const cartContainer = document.getElementById('cart-items'); // đúng ID

    
    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Giỏ hàng của bạn đang trống</p>';
        return;
    }

    let html = '';
    cartItems.forEach((item, index) => {
        html += `
            <div class="cart-item">
                <div class="item-image">
                    <img src="../images/${item.image}" alt="${item.name}">
                </div>
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <p class="price">${item.price}</p>
                    <div class="quantity-control">
                        <button class="decrease-btn" data-index="${index}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="increase-btn" data-index="${index}">+</button>
                    </div>
                </div>
                <button class="remove-btn" data-index="${index}">Xóa</button>
            </div>
        `;
    });

    cartContainer.innerHTML = html;
    
    // Tính và hiển thị tổng tiền
    updateCartTotal(cartItems);
}

// Tính tổng tiền giỏ hàng
function updateCartTotal(cartItems) {
    const subtotal = cartItems.reduce((total, item) => {
        // Chuyển đổi giá từ chuỗi "1,789,000,000 VND" thành số 1789000000
        const priceNumber = parseFloat(item.price.replace(/[^\d]/g, ''));
        return total + (priceNumber * item.quantity);
    }, 0);

    // Hiển thị tổng tiền (định dạng lại nếu cần)
    document.getElementById('subtotal').textContent = formatCurrency(subtotal);
    document.getElementById('total').textContent = formatCurrency(subtotal);
}

// Định dạng tiền tệ
function formatCurrency(amount) {
    return amount.toLocaleString('vi-VN') + ' VND';
}

// Gọi hàm khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
    displayCartItems();
    updateCartCount();
    // Thêm sự kiện cho các nút (nếu cần)
    document.addEventListener('click', function(e) {
        const cartItems = getCartData();
        
        // Xử lý nút tăng số lượng
        if (e.target.classList.contains('increase-btn')) {
            const index = e.target.getAttribute('data-index');
            cartItems[index].quantity++;
            localStorage.setItem('cart', JSON.stringify(cartItems));
            displayCartItems();
            updateCartCount(); 
            setTimeout(() => {
                location.reload();
              }, 2000); //

        }
        
        // Xử lý nút giảm số lượng
        if (e.target.classList.contains('decrease-btn')) {
            const index = e.target.getAttribute('data-index');
            if (cartItems[index].quantity > 1) {
                cartItems[index].quantity--;
                localStorage.setItem('cart', JSON.stringify(cartItems));
                displayCartItems();
                updateCartCount(); 
                setTimeout(() => {
                    location.reload();
                  }, 2000); //

            }
        }
        
        // Xử lý nút xóa
        if (e.target.classList.contains('remove-btn')) {
            const index = e.target.getAttribute('data-index');
            cartItems.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cartItems));
            displayCartItems();
            updateCartCount(); 
            setTimeout(() => {
                location.reload();
              }, 2000); //

        }
    });
});

function updateCartCount() {
    const cart = getCartData();
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElem = document.querySelector('.cart-count');
    if (cartCountElem) cartCountElem.textContent = totalCount;
}




// Lấy dữ liệu từ localStorage
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Tính tổng quantity
const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

// Gắn vào phần tử có class "cart-count"
document.getElementById('cart-count').textContent = totalQuantity;


//Nút thanh toán
document.getElementById('checkout-btn').addEventListener('click', function() {
    window.location.href = 'pay.html';
  });
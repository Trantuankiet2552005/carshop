// Hàm định dạng số thẻ
function formatCardNumber(input) {
    let value = input.value.replace(/\D/g, '');
    let formatted = '';
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += ' ';
      }
      formatted += value[i];
    }
    input.value = formatted;
  }
  
  // Hàm định dạng ngày hết hạn
  function formatExpiryDate(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    input.value = value;
  }
  
  // Hàm hiển thị lỗi
  function showError(elementId, errorId, message) {
    document.getElementById(elementId).classList.add('input-error');
    document.getElementById(errorId).textContent = message;
    document.getElementById(errorId).classList.remove('hidden');
    return false;
  }
  
  // Hàm ẩn lỗi
  function hideError(elementId, errorId) {
    document.getElementById(elementId).classList.remove('input-error');
    document.getElementById(errorId).classList.add('hidden');
    return true;
  }
  
  // Hàm kiểm tra thông tin khách hàng
  function validateCustomerInfo() {
    let isValid = true;
    
    // Kiểm tra họ tên
    const name = document.getElementById('name').value.trim();
    if (name === '') {
      isValid = showError('name', 'name-error', 'Vui lòng nhập họ tên');
    } else {
      hideError('name', 'name-error');
    }
    
    // Kiểm tra email
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      isValid = showError('email', 'email-error', 'Vui lòng nhập email hợp lệ');
    } else {
      hideError('email', 'email-error');
    }
    
    // Kiểm tra số điện thoại
    const phone = document.getElementById('phone').value.trim();
    const phoneRegex = /^\d{10,}$/;
    if (!phoneRegex.test(phone)) {
      isValid = showError('phone', 'phone-error', 'Vui lòng nhập số điện thoại (ít nhất 10 số)');
    } else {
      hideError('phone', 'phone-error');
    }
    
    // Kiểm tra địa chỉ
    const address = document.getElementById('address').value.trim();
    if (address === '') {
      isValid = showError('address', 'address-error', 'Vui lòng nhập địa chỉ');
    } else {
      hideError('address', 'address-error');
    }
    
    return isValid;
  }
  
  // Hàm kiểm tra thông tin thẻ tín dụng
  function validateCreditCard() {
    let isValid = true;
    
    // Kiểm tra số thẻ
    const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
    if (cardNumber.length < 16 || !/^\d+$/.test(cardNumber)) {
      isValid = showError('card-number', 'card-number-error', 'Vui lòng nhập số thẻ hợp lệ (16 số)');
    } else {
      hideError('card-number', 'card-number-error');
    }
    
    // Kiểm tra ngày hết hạn
    const cardExpiry = document.getElementById('card-expiry').value;
    const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (!expiryRegex.test(cardExpiry)) {
      isValid = showError('card-expiry', 'card-expiry-error', 'Vui lòng nhập ngày hết hạn hợp lệ (MM/YY)');
    } else {
      hideError('card-expiry', 'card-expiry-error');
    }
    
    // Kiểm tra CVV
    const cardCvv = document.getElementById('card-cvv').value;
    if (cardCvv.length < 3 || !/^\d+$/.test(cardCvv)) {
      isValid = showError('card-cvv', 'card-cvv-error', 'Vui lòng nhập mã CVV (3-4 số)');
    } else {
      hideError('card-cvv', 'card-cvv-error');
    }
    
    // Kiểm tra tên chủ thẻ
    const cardName = document.getElementById('card-name').value.trim();
    if (cardName === '') {
      isValid = showError('card-name', 'card-name-error', 'Vui lòng nhập tên chủ thẻ');
    } else {
      hideError('card-name', 'card-name-error');
    }
    
    return isValid;
  }
  
  // Hàm tạo mã đơn hàng
  function generateOrderId() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomChar = chars[Math.floor(Math.random() * chars.length)];
    const randomNums = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join('');
    return `${randomChar}${randomNums}`;
  }
  
  // Biến lưu trữ mã đơn hàng toàn cục
  let currentOrderId = '';
  
  // Hàm lưu thông tin thẻ vào localStorage (chỉ lưu 4 số cuối và tên chủ thẻ)
  function saveCardToLocalStorage(cardInfo) {
    const cardToSave = {
      lastFourDigits: cardInfo.cardNumber.slice(-4),
      cardExpiry: cardInfo.cardExpiry,
      cardName: cardInfo.cardName
    };
    localStorage.setItem('card', JSON.stringify(cardToSave));
  }
  
  // Hàm xóa thông tin thẻ đã lưu
  function clearSavedCard() {
    localStorage.removeItem('card');
  }
  
  // Hàm cập nhật thông tin thanh toán
  function updatePaymentInfo(isCod = false) {
    const buynow = JSON.parse(localStorage.getItem("buynow")) || [];
    let total = 0;
    buynow.forEach(item => {
      const price = Number(item.price.replace(/\D/g, ""));
      total += price * item.quantity;
    });
    
    // Tạo mã đơn hàng mới nếu chưa có
    if (!currentOrderId) {
      currentOrderId = generateOrderId();
    }
    
    if (isCod) {
      const deposit = Math.round(total * 0.1);
      document.getElementById('deposit-amount').textContent = `Số tiền cọc: ${deposit.toLocaleString()} VND`;
      document.getElementById('cod-deposit').innerHTML = `Số tiền cần chuyển: <span class="text-red-600 font-bold">${deposit.toLocaleString()} VND</span>`;
      document.getElementById('cod-content').innerHTML = `Nội dung chuyển khoản: <strong>${currentOrderId}</strong>`;
    } else {
      document.getElementById('bank-deposit').innerHTML = `Số tiền cần chuyển: <span class="text-red-600 font-bold">${total.toLocaleString()} VND</span>`;
      document.getElementById('bank-content').innerHTML = `Nội dung chuyển khoản: <strong>${currentOrderId}</strong>`;
    }
    
    return currentOrderId;
  }
  
  function completePayment() {
    // Lấy thông tin khách hàng
    const customerInfo = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      address: document.getElementById('address').value.trim()
    };
    
    // Lấy phương thức thanh toán
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    // Lấy thông tin giỏ hàng
    const buynow = JSON.parse(localStorage.getItem("buynow")) || [];
    
    // Tính tổng tiền
    let total = 0;
    buynow.forEach(item => {
      const price = Number(item.price.replace(/\D/g, ""));
      total += price * item.quantity;
    });
    
    // Lấy thông tin thẻ nếu thanh toán bằng thẻ
    let cardInfo = null;
    if (paymentMethod === 'wallet') {
      cardInfo = {
        cardNumber: document.getElementById('card-number').value.replace(/\s/g, ''),
        cardExpiry: document.getElementById('card-expiry').value,
        cardName: document.getElementById('card-name').value.trim(),
        cardCvv: document.getElementById('card-cvv').value
      };
      // Lưu thông tin thẻ vào localStorage (chỉ lưu thông tin an toàn)
      saveCardToLocalStorage(cardInfo);
    }
    
    // Lưu thông tin đơn hàng
    const orderData = {
      orderId: currentOrderId,
      customer: customerInfo,
      items: buynow.map(item => ({
        ...item,
        price: Number(item.price.replace(/\D/g, ""))
      })),
      paymentMethod,
      cardInfo: paymentMethod === 'wallet' ? {
        lastFourDigits: cardInfo.cardNumber.slice(-4),
        cardName: cardInfo.cardName
      } : null,
      total,
      deposit: paymentMethod === 'cod' ? Math.round(total * 0.1) : total,
      date: new Date().toISOString(),
      paymentContent: currentOrderId,
      status: 'pending'
    };
    
    // Lưu đơn hàng vào localStorage
    saveOrderToLocalStorage(orderData);
    
    // Ẩn modal thanh toán
    document.getElementById('cod-modal').classList.add('hidden');
    document.getElementById('bank-modal').classList.add('hidden');
    
    // Hiển thị modal thành công
    document.getElementById('order-id').textContent = currentOrderId;
    document.getElementById('success-modal').classList.remove('hidden');
    
    // Xóa giỏ hàng
    localStorage.removeItem('buynow');
  }
  
  // Hàm lưu đơn hàng vào localStorage
  function saveOrderToLocalStorage(orderData) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.setItem('currentOrder', JSON.stringify(orderData));
  }
  
  // Hàm đóng modal thành công và chuyển về trang chủ
  function closeSuccessModal() {
    document.getElementById('success-modal').classList.add('hidden');
    window.location.href = '../html-subprogram/index-center.html';
  }
  
  // Hàm chuyển đến trang bill tương ứng với phương thức thanh toán
  function goToBillPage() {
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    let billPage = '';
    
    switch(paymentMethod) {
      case 'cod':
        billPage = '../html-subprogram/bill-cod.html';
        break;
      case 'bank':
        billPage = '../html-subprogram/bill-online.html';
        break;
      case 'wallet':
        billPage = '../html-subprogram/bill-card.html';
        break;
      default:
        billPage = '../html-subprogram/bill-online.html';
    }
    
    window.location.href = `${billPage}?orderId=${currentOrderId}`;
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const buynow = JSON.parse(localStorage.getItem("buynow")) || [];
    const orderDetails = document.getElementById("order-details");
    const codNote = document.getElementById("cod-note");
    const depositAmountEl = document.getElementById("deposit-amount");
    const paymentWarning = document.getElementById("payment-warning");
    const paymentInputs = document.querySelectorAll('input[name="payment"]');
    const creditCardForm = document.getElementById("credit-card-form");
    const confirmBtn = document.getElementById("confirm-btn");
  
    let total = 0;
  
    // Hiển thị đơn hàng
    if (buynow.length === 0) {
      orderDetails.innerHTML = '<p class="text-center py-4">Giỏ hàng trống</p>';
    } else {
      buynow.forEach(item => {
        const price = Number(item.price.replace(/\D/g, ""));
        const itemTotal = price * item.quantity;
        total += itemTotal;
  
        const itemHTML = `
          <div class="flex justify-between items-center py-2">
            <div class="flex items-center space-x-4">
              <img src="../images/${item.image}" alt="${item.name}" class="w-12 h-12 object-contain rounded-xl shadow bg-white">
              <div>
                <p class="font-medium">${item.name}</p>
                <p class="text-sm text-gray-500">${item.quantity} x ${item.price}</p>
              </div>
            </div>
            <p class="font-bold text-red-500">${itemTotal.toLocaleString()} VND</p>
          </div>
        `;
        orderDetails.insertAdjacentHTML("beforeend", itemHTML);
      });
  
      // Thêm tổng cộng
      orderDetails.insertAdjacentHTML("beforeend", `
        <div class="border-t pt-4 mt-4">
          <div class="flex justify-between">
            <p class="text-lg font-semibold">Tổng cộng</p>
            <p class="text-lg font-bold text-red-600">${total.toLocaleString()} VND</p>
          </div>
        </div>
      `);
    }
  
    // Kiểm tra và hiển thị thông tin thẻ đã lưu (nếu có)
    const savedCard = JSON.parse(localStorage.getItem('card'));
    if (savedCard) {
      document.getElementById('card-number').value = '•••• •••• •••• ' + savedCard.lastFourDigits;
      document.getElementById('card-expiry').value = savedCard.cardExpiry;
      document.getElementById('card-name').value = savedCard.cardName;
      // CVV không hiển thị vì lý do bảo mật
    }
  
    // Xử lý chọn phương thức thanh toán
    paymentInputs.forEach(input => {
      input.addEventListener("change", () => {
        paymentWarning.classList.add("hidden");
        if (input.value === "cod") {
          codNote.classList.remove("hidden");
          creditCardForm.classList.add("hidden");
          updatePaymentInfo(true);
        } else if (input.value === "wallet") {
          codNote.classList.add("hidden");
          creditCardForm.classList.remove("hidden");
        } else {
          codNote.classList.add("hidden");
          creditCardForm.classList.add("hidden");
          updatePaymentInfo();
        }
      });
    });
  
    // Tự động định dạng số thẻ và ngày hết hạn
    document.getElementById('card-number').addEventListener('input', function() {
      formatCardNumber(this);
    });
    
    document.getElementById('card-expiry').addEventListener('input', function() {
      formatExpiryDate(this);
    });
  
    // Xử lý xác nhận thanh toán
    confirmBtn.addEventListener("click", () => {
      // Kiểm tra thông tin khách hàng
      if (!validateCustomerInfo()) {
        return;
      }
  
      // Kiểm tra phương thức thanh toán
      const selectedPayment = document.querySelector('input[name="payment"]:checked');
      if (!selectedPayment) {
        paymentWarning.classList.remove("hidden");
        return;
      }
      paymentWarning.classList.add("hidden");
  
      // Kiểm tra thông tin thẻ nếu thanh toán bằng thẻ
      if (selectedPayment.value === "wallet" && !validateCreditCard()) {
        return;
      }
  
      // Xử lý theo phương thức thanh toán
      if (selectedPayment.value === "cod") {
        updatePaymentInfo(true);
        document.getElementById('cod-modal').classList.remove('hidden');
      } else if (selectedPayment.value === "bank") {
        updatePaymentInfo();
        document.getElementById('bank-modal').classList.remove('hidden');
      } else if (selectedPayment.value === "wallet") {
        completePayment();
      }
    });
  
    // Xử lý nút hoàn thành
    document.getElementById('complete-btn').addEventListener('click', goToBillPage);
    
    // Xử lý nút đóng modal
    document.getElementById('close-success-modal').addEventListener('click', closeSuccessModalpay);
  });
  
  // Hàm đóng modal thành công và chuyển về trang chủ
  function closeSuccessModalpay() {
    document.getElementById('success-modal').classList.add('hidden');
    window.location.href = '../html-subprogram/pay.html';
  }
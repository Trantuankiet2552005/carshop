// Hàm định dạng tiền tệ
function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

// Hàm định dạng ngày
function formatDate(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// Hàm gửi email (giả lập)
function sendInvoice() {
  alert('Hóa đơn đã được gửi đến email của quý khách!');
  // Trong thực tế, bạn sẽ gọi API gửi email ở đây
}

// Hàm tải PDF hoàn chỉnh
function downloadInvoice() {
  const { jsPDF } = window.jspdf;
  const element = document.querySelector('.print-area');
  const invoiceId = document.getElementById('invoice-id').textContent;
  
  // Tạo PDF với định dạng A4 (210mm x 297mm)
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });
  
  // Thêm nội dung vào PDF
  html2canvas(element, {
    scale: 2, // Tăng độ phân giải
    logging: false,
    useCORS: true,
    allowTaint: true,
    scrollX: 0,
    scrollY: 0,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight
  }).then(canvas => {
    const imgData = canvas.toDataURL('image/png', 1.0);
    const imgWidth = 190; // Chiều rộng nội dung trong A4 (trừ lề)
    const imgHeight = canvas.height * imgWidth / canvas.width;
    
    // Tính toán vị trí để căn giữa
    const marginLeft = (210 - imgWidth) / 2;
    
    pdf.addImage(imgData, 'PNG', marginLeft, 10, imgWidth, imgHeight);
    
    // Lưu file PDF
    pdf.save(`HoaDon_${invoiceId}.pdf`);
  }).catch(error => {
    console.error('Lỗi khi tạo PDF:', error);
    alert('Có lỗi xảy ra khi tạo PDF. Vui lòng thử lại.');
  });
}

document.addEventListener("DOMContentLoaded", function() {
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get('orderId');
  
  // Lấy thông tin đơn hàng từ localStorage
  const orderData = JSON.parse(localStorage.getItem('currentOrder'));
  
  // Kiểm tra khớp mã đơn hàng
  if (!orderData || orderData.orderId !== orderId) {
    alert('Không tìm thấy thông tin đơn hàng hoặc mã đơn hàng không khớp');
    window.location.href = '/';
    return;
  }
  
  // Đặt thông tin hóa đơn
  document.getElementById('invoice-id').textContent = orderId;
  document.getElementById('invoice-date').textContent = formatDate(new Date(orderData.date));
  document.getElementById('payment-content').textContent = orderData.paymentContent || orderId;

  // Hiển thị thông tin khách hàng
  const customer = orderData.customer;
  document.getElementById('customer-name').textContent = customer.name;
  document.getElementById('customer-phone').textContent = customer.phone;
  document.getElementById('customer-email').textContent = customer.email;
  document.getElementById('customer-address').textContent = customer.address;

  // Hiển thị phương thức thanh toán
  document.getElementById('payment-method').textContent = "Thẻ tín dụng";
  
  // Hiển thị thông tin thẻ (nếu có)
  if (orderData.cardInfo) {
    // Format số thẻ để hiển thị (chỉ hiển thị 4 số cuối)
    const cardNumber = orderData.cardInfo.cardNumber;
    const last4Digits = cardNumber.slice(-4);
    const maskedNumber = '•••• •••• •••• ' + last4Digits;
    
    document.getElementById('card-number').textContent = maskedNumber;
    document.getElementById('card-expiry').textContent = orderData.cardInfo.cardExpiry;
    document.getElementById('card-holder').textContent = orderData.cardInfo.cardName.toUpperCase();
  }

  // Tính toán và hiển thị chi tiết đơn hàng
  let subtotal = 0;
  const orderItems = document.getElementById('order-items');
  
  orderData.items.forEach((item, index) => {
    const price = item.price;
    const quantity = item.quantity;
    const itemTotal = price * quantity;
    subtotal += itemTotal;

    const row = document.createElement('tr');
    row.className = 'hover:bg-gray-50';
    row.innerHTML = `
      <td class="text-sm">${index + 1}</td>
      <td class="text-sm">${item.name}</td>
      <td class="text-sm text-center">${formatCurrency(price)}</td>
      <td class="text-sm text-center">${quantity}</td>
      <td class="text-sm text-right font-medium">${formatCurrency(itemTotal)}</td>
    `;
    orderItems.appendChild(row);
  });

  // Hiển thị tổng cộng
  const discount = orderData.discount || 0;
  const total = subtotal - discount;
  const paidAmount = total; // Thanh toán bằng thẻ là thanh toán toàn bộ
  const remaining = 0;

  document.getElementById('subtotal').textContent = formatCurrency(subtotal);
  document.getElementById('discount').textContent = formatCurrency(discount);
  document.getElementById('total').textContent = formatCurrency(total);
  document.getElementById('paid-amount').textContent = formatCurrency(paidAmount);
  document.getElementById('remaining').textContent = formatCurrency(remaining);
});

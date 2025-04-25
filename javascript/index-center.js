// index-center.js
// ==============

document.addEventListener('DOMContentLoaded', function() {
    // Hiển thị 6 xe ngẫu nhiên
    const featuredContainer = document.getElementById('featured-cars');
    const shuffledCars = [...cars].sort(() => 0.5 - Math.random());
    const selectedCars = shuffledCars.slice(0, 6);
    
    selectedCars.forEach(car => {
        const card = document.createElement('div');
        card.className = "car-card";
        card.innerHTML = `
            <img src="images/${car.image}" alt="${car.name}" class="car-image">
            <div class="car-info">
                <h3 class="car-name">${car.name}</h3>
                <p class="car-price">${car.price}</p>
                <div class="car-actions">
                    <a href="html-subprogram/product.html?id=${car.id}" class="view-btn">Xem chi tiết</a>
                    <button class="add-to-cart-btn" data-id="${car.id}">Thêm vào giỏ</button>
                </div>
            </div>
        `;
        featuredContainer.appendChild(card);
    });
});
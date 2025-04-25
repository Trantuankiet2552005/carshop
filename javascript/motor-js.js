// Thêm dòng này ở đầu file motor-js.js
import { motors } from './motor-dp.js';

const motorsContainer = document.getElementById('motors-container');
const typeButtons = document.querySelectorAll('#type-filters .filter-btn');
const brandButtons = document.querySelectorAll('#brand-filters .filter-btn');
const ccButtons = document.querySelectorAll('#cc-filters .filter-btn');

let selectedType = "all";
let selectedBrand = "all";
let selectedCC = "all";

function renderMotors() {
    motorsContainer.innerHTML = "";

    const filteredMotors = motors.filter(motor => {
        const matchType = selectedType === "all" || motor.type === selectedType;
        const matchBrand = selectedBrand === "all" || motor.brand === selectedBrand;
        
        let matchCC = true;
        if (selectedCC === "small") matchCC = parseInt(motor.cc) < 300;
        else if (selectedCC === "medium") matchCC = parseInt(motor.cc) >= 300 && parseInt(motor.cc) <= 700;
        else if (selectedCC === "large") matchCC = parseInt(motor.cc) > 700;
        return matchType && matchBrand && matchCC;
    });

    filteredMotors.forEach(motor => {
        const card = document.createElement('div');
        card.className = "motor-card";
        card.innerHTML = `
            <img src="../images/${motor.image}" alt="${motor.name}" class="motor-image">
            <div class="motor-info">
                <h3 class="motor-name">${motor.name}</h3>
                <p class="motor-price">${motor.price}</p> 
                <div class="motor-details">
                    <span class="motor-detail">${motor.type}</span>
                    <span class="motor-detail">${motor.brand}</span>
                    <span class="motor-detail">${motor.cc}</span>
                    <span class="motor-detail">${motor.atcvt}</span>
                </div>
                <div class="motor-actions">
                    <a href="motor-product.html?id=${motor.id}" class="view-btn">Xem chi tiết</a>
                </div>
            </div>
        `;
        motorsContainer.appendChild(card);
    });
}


function handleFilterClick(buttons, type) {
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            if (type === "type") selectedType = btn.dataset.type;
            if (type === "brand") selectedBrand = btn.dataset.brand;
            if (type === "cc") selectedCC = btn.dataset.cc;

            renderMotors();
        });
    });
}

handleFilterClick(typeButtons, "type");
handleFilterClick(brandButtons, "brand");
handleFilterClick(ccButtons, "cc");

// Gọi hàm khi trang tải
document.addEventListener('DOMContentLoaded', function() {
    renderMotors();
    checkLoginStatus();
    
    // Thêm sự kiện đăng xuất
    document.getElementById('logout-btn').addEventListener('click', function(e) {
        e.preventDefault();
        sessionStorage.removeItem('currentUser');
        window.location.reload();
    });
});
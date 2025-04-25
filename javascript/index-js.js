//####
//###########################################################
// Dữ liệu tin tức thực tế từ các trang báo lớn
const newsData = [
    {
      title: "VinFast VF 3 ra mắt với giá từ 235 triệu đồng",
      description: "VinFast chính thức mở đặt cọc VF 3 từ ngày 13/5 đến 15/5/2024 với giá ưu đãi 235 triệu đồng (thuê pin) và 315 triệu đồng (kèm pin). Sau thời gian này, giá sẽ tăng lên 240 triệu và 322 triệu đồng tương ứng.",
      image: "../images/vf3.jpg",
      date: "07 Th05 2024",
      source: "Dân Trí",
      url: "https://dantri.com.vn/o-to-xe-may/vinfast-vf-3-chot-gia-tu-235-trieu-dong-co-sac-nhanh-va-man-hinh-cam-ung-20240507181337014.htm"
    },
    {
      title: "Honda SH 2024 ra mắt tại Việt Nam, giá từ 89,9 triệu đồng",
      description: "Honda SH 2024 chính thức ra mắt thị trường Việt Nam với nhiều nâng cấp về thiết kế và công nghệ, giá bán khởi điểm từ 89,9 triệu đồng tại TP.HCM.",
      image: "../images/sh.jpg",
      date: "13 Th03 2025",
      source: "VTCNEWS.com",
      url: "https://vtcnews.vn/bang-gia-xe-sh-moi-nhat-thang-3-2025-ar931210.html"
    },
    {
      title: "Toyota Fortuner GR Sport 2024 ra mắt tại Thái Lan, giá quy đổi 1,3 tỷ đồng",
      description: "Toyota Fortuner GR Sport 2024 vừa ra mắt tại Thái Lan với thiết kế thể thao, lưới tản nhiệt sơn đen bóng và đèn chiếu sáng Full LED. Xe hướng đến khách hàng trẻ yêu thích phong cách mạnh mẽ.",
      image: "../images/fortunerr.jpg",
      date: "19 Th05 2024",
      source: "Banker.vn",
      url: "https://banker.vn/toyota-fortuner-gr-sport-2024-vua-ra-mat-tai-thai-lan-gia-quy-doi-13-ty-dong"
    },
    {
      title: "Xe máy điện Dibao Jeek ra mắt tại Việt Nam với giá từ 15,69 triệu đồng",
      description: "Dibao giới thiệu mẫu xe máy điện Jeek với ba phiên bản: One, New (2 phanh đĩa) và Man. Giá bán dao động từ 15,69 triệu đến 19,59 triệu đồng, phù hợp với học sinh, sinh viên.",
      image: "../images/jeek.jpg",
      date: "18 Th05 2024",
      source: "Thông Tin Xe",
      url: "https://thongtinxe.net/gia-xe-may-dien-dibao/"
    },
    {
      title: "Mercedes-Benz E-Class 2024 ra mắt tại Việt Nam, giá từ 2,378 tỷ đồng",
      description: "Mercedes-Benz E-Class 2024 chính thức ra mắt với ba phiên bản: E180, E200 Exclusive và E300 AMG. Giá lăn bánh dao động từ 2,378 đến 3,533 tỷ đồng, tùy thuộc vào khu vực và chương trình khuyến mãi.",
      image: "../images/e2024.jpg",
      date: "17 Th05 2024",
      source: "VNTRE",
      url: "https://vntre.vn/xe-mercedes-e-class-2024-gia-lan-banh-and-thong-so-ky-thuat-a8312.html"
    },
    {
      title: "BYD ra mắt Sealion 6 và Sealion 8 tại Việt Nam, giá từ 1,569 tỷ đồng",
      description: "BYD chính thức giới thiệu hai mẫu SUV điện Sealion 6 và Sealion 8 tại Việt Nam. Sự kiện thu hút hơn 2.200 khách tham dự, với 800 lượt lái thử và hàng trăm đơn đặt cọc, khẳng định sức hút của xe điện Trung Quốc.",
      image: "../images/byd6.jpg",
      date: "23 Th04 2025",
      source: "Điện Tử Ứng Dụng",
      url: "https://dientuungdung.vn/byd-viet-nam-vuot-ky-vong-xuyen-quoc-gia-hanh-trinh-cong-nghe-xanh-day-an-tuong-8894.html"
    }
  ];
  

// Hiển thị tin tức
function renderNews() {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    
    newsData.forEach(news => {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';
        newsCard.innerHTML = `
            <div class="news-img" style="background-image: url('${news.image}');">
                <div class="news-date">
                    <span>${news.date.split(' ')[0]}</span>
                    <span>${news.date.split(' ')[1]}</span>
                </div>
            </div>
            <div class="news-content">
                <h3>${news.title}</h3>
                <p>${news.description}</p>
                <p class="news-source">Nguồn: ${news.source}</p>
                <a href="${news.url}" target="_blank" class="news-link">Xem thêm <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        newsContainer.appendChild(newsCard);
    });
}

// Gọi hàm khi trang tải
document.addEventListener('DOMContentLoaded', function() {
    renderNews();
    // ... các hàm khác đã có
});


//#############
const carsContainer = document.getElementById('cars-container');
const typeButtons = document.querySelectorAll('#type-filters .filter-btn');
const brandButtons = document.querySelectorAll('#brand-filters .filter-btn');
const fuelButtons = document.querySelectorAll('#fuel-filters .filter-btn');

let selectedType = "all";
let selectedBrand = "all";
let selectedFuel = "all";

function renderCars() {
    carsContainer.innerHTML = "";

    const filteredCars = cars.filter(car => {
        const matchType = selectedType === "all" || car.type === selectedType;
        const matchBrand = selectedBrand === "all" || car.brand === selectedBrand;
        const matchFuel = selectedFuel === "all" || car.fuel === selectedFuel;
        return matchType && matchBrand && matchFuel;
    });

    filteredCars.forEach(car => {
        const card = document.createElement('div');
        card.className = "car-card";
        card.innerHTML = `
        <img src="../images/${car.image}" alt="${car.name}" class="car-image">
        <div class="car-info">
            <h3 class="car-name">${car.name}</h3>
            <p class="car-price">${car.price}</p>
            <div class="car-details">
                <span class="car-detail">${car.type}</span>
                <span class="car-detail">${car.brand}</span>
                <span class="car-detail">${car.fuel}</span>
            </div>
            <a href="product.html?id=${car.name.replace(/\s+/g, '-').toLowerCase()}" class="view-btn">Xem chi tiết</a>
       
          </div>
    `;
        carsContainer.appendChild(card);
    });
}

function handleFilterClick(buttons, type) {
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            if (type === "type") selectedType = btn.dataset.type;
            if (type === "brand") selectedBrand = btn.dataset.brand;
            if (type === "fuel") selectedFuel = btn.dataset.fuel;

            renderCars();
        });
    });
}

handleFilterClick(typeButtons, "type");
handleFilterClick(brandButtons, "brand");
handleFilterClick(fuelButtons, "fuel");

// Gọi hàm khi trang tải
document.addEventListener('DOMContentLoaded', function() {
    renderCars();
    checkLoginStatus();
    
    // Thêm sự kiện đăng xuất
    document.getElementById('logout-btn').addEventListener('click', function(e) {
        e.preventDefault();
        sessionStorage.removeItem('currentUser');
        window.location.reload();
    });
});


//#####################################################################
  // Lấy nút submit
  const submitBtn = document.getElementById('submitBtn');
  // — Modal chung: tái sử dụng hàm tạo modal —
  function createModal(message) {
    const modal = document.createElement('div');
    Object.assign(modal.style, {
      display: 'none',
      position: 'fixed',
      top: 0, left: 0,
      width: '100%', height: '100%',
      background: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    });
    modal.innerHTML = `
      <div style="
        background:#fff;
        padding:20px 30px;
        border-radius:8px;
        box-shadow:0 2px 10px rgba(0,0,0,0.3);
        text-align:center;
        min-width:300px;
      ">
        <h2>${message}</h2>
        <button class="modalOkBtn" style="
          margin-top:15px;
          padding:8px 16px;
          border:none;
          background:#28a745;
          color:#fff;
          border-radius:4px;
          cursor:pointer;
        ">OK</button>
      </div>
    `;
    document.body.appendChild(modal);
    // Đóng modal khi click OK hoặc click nền
    modal.querySelector('.modalOkBtn').addEventListener('click', () => {
      modal.style.display = 'none';
    });
    modal.addEventListener('click', e => {
      if (e.target === modal) modal.style.display = 'none';
    });
    return modal;
  }

  // Tạo 2 modal
  const registerModal = createModal('Đăng kí thành công');
  const messageModal  = createModal('Gửi tin nhắn thành công');

  // Gán nút và sự kiện
  document.getElementById('submitBtn')
    .addEventListener('click', e => {
      e.preventDefault();
      registerModal.style.display = 'flex';
    });

  document.getElementById('messageBtn')
    .addEventListener('click', e => {
      e.preventDefault();
      messageModal.style.display = 'flex';
    });

  //############################
    // Slider functionality
    document.addEventListener('DOMContentLoaded', function() {
        // Hero slider
        const slides = document.querySelectorAll('.slide');
        const dotsContainer = document.querySelector('.slider-dots');
        let currentSlide = 0;
        
        // Create dots
        slides.forEach((slide, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if(index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        // Next/previous controls
        document.querySelector('.next-slide').addEventListener('click', nextSlide);
        document.querySelector('.prev-slide').addEventListener('click', prevSlide);
        
        function nextSlide() {
            goToSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
        }
        
        function prevSlide() {
            goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
        }
        
        function goToSlide(n) {
            slides[currentSlide].classList.remove('active');
            document.querySelectorAll('.dot')[currentSlide].classList.remove('active');
            
            currentSlide = n;
            
            slides[currentSlide].classList.add('active');
            document.querySelectorAll('.dot')[currentSlide].classList.add('active');
        }
        
        // Auto slide
        setInterval(nextSlide, 5000);
        
        // Back to top button
        const backToTopBtn = document.getElementById('backToTop');
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
        
        // Countdown timer
        function updateCountdown() {
            document.querySelectorAll('.promo-countdown').forEach(countdown => {
                const endDate = new Date(countdown.dataset.date).getTime();
                const now = new Date().getTime();
                const distance = endDate - now;
                
                if (distance < 0) {
                    countdown.innerHTML = "<span>Sắp diễn ra</span>";
                    return;
                }
                
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                countdown.querySelector('.days').textContent = days.toString().padStart(2, '0');
                countdown.querySelector('.hours').textContent = hours.toString().padStart(2, '0');
                countdown.querySelector('.minutes').textContent = minutes.toString().padStart(2, '0');
                countdown.querySelector('.seconds').textContent = seconds.toString().padStart(2, '0');
            });
        }
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
        
        // Load featured products
        // This would be replaced with actual data from your database
        const featuredGrid = document.querySelector('.featured-grid');
        const featuredProducts = [
            {
                id: 1,
                name: 'Mercedes-Benz C200',
                price: '1.850.000.000 VND',
                image: '../images/c200av1.jpg',
                category: 'car'
            },
            {
                id: 2,
                name: 'BMW R 1250 GS',
                price: '1,100,000,000 VND',
                image: '../images/bmw-r1250gs.jpg',
                category: 'motor'
            },
            {
                id: 3,
                name: 'Lexus LX 600',
                price: '9,210,000,000 VND',
                image: '../images/lx600.jpg',
                category: 'car'
            },
            {
                id: 4,
                name: 'Harley-Davidson Pan America 1250',
                price: "1,050,000,000 VND",
                image: '../images/2022 Harley-Davidson Pan America 1250 Special Vivid Black.jpg',
                category: 'motor'
            },
            {
                id: 5,
                name: 'Toyota Land Cruiser Prado',
                price: '2,623,000,000 VND',
                image: '../images/landcruiserPrado.jpg',
                category: 'car'
            },
            {
                id: 6,
                name: 'Honda CB1000 Hornet',
                price: "500,000,000 VND",
                image: '../images/cb1000hornet.jpg',
                category: 'motor'
            },
        ];
        
        function renderFeaturedProducts(category = 'all') {
            featuredGrid.innerHTML = '';
            const filteredProducts = category === 'all' 
                ? featuredProducts 
                : featuredProducts.filter(product => product.category === category);
            
            filteredProducts.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'featured-card';
                productCard.innerHTML = `
                    <div class="featured-img" style="background-image: url('${product.image}')">
                        <div class="featured-overlay">
                                              </div>
                    </div>
                    <div class="featured-info">
                        <h3>${product.name}</h3>
                        <span class="price">${product.price}</span>
                    </div>
                `;
                featuredGrid.appendChild(productCard);
            });
        }
        
        renderFeaturedProducts();
        
        // Tab filtering
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelector('.tab-btn.active').classList.remove('active');
                this.classList.add('active');
                renderFeaturedProducts(this.dataset.category);
            });
        });
    });

    document.getElementById('jsCallBtn').addEventListener('click', () => {
        // Sẽ nhảy qua ứng dụng quay số với số đã định
        window.location.href = 'tel:+84 23126021';
      });


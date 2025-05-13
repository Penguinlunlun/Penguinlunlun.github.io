// 等待DOM完全加載
document.addEventListener('DOMContentLoaded', function() {
    // 滾動時顯示動畫元素
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 觀察所有需要動態顯示的元素
    const animatedElements = document.querySelectorAll('.slide-in-left, .slide-in-right, .scale-in');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // 滾動時改變導航欄樣式
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 40px';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '20px 40px';
            navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // 漢堡選單功能
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // 切換導航選單顯示
        navLinks.style.transform = navLinks.style.transform === 'translateX(0%)' ? 'translateX(100%)' : 'translateX(0%)';
        
        // 漢堡按鈕動畫
        burger.classList.toggle('toggle');
    });
    
    // 點擊導航項後收起選單
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.style.transform = 'translateX(100%)';
                burger.classList.remove('toggle');
            }
        });
    });
    
    // 技能進度條動畫
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // 表單提交處理
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 這裡可以添加表單提交邏輯，如AJAX請求
            
            // 模擬表單提交後重置
            alert('謝謝您的訊息！我會盡快回覆您。');
            contactForm.reset();
        });
    }
});

// 控制漢堡選單的CSS
document.querySelector('.burger').addEventListener('click', function() {
    this.classList.toggle('toggle');
});

// 添加CSS類以實現漢堡選單的動畫
const style = document.createElement('style');
style.innerHTML = `
    .burger.toggle .line1 {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    .burger.toggle .line2 {
        opacity: 0;
    }
    .burger.toggle .line3 {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style); 
